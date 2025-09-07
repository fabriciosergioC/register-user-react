const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
let isMongoConnected = false;

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI não definida nas variáveis de ambiente');
    }
    
    console.log('🔄 Tentando conectar ao MongoDB Atlas...');
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // 5 segundos (reduzido)
      bufferCommands: true, // Permitir buffer para evitar erros
      maxPoolSize: 10,
      minPoolSize: 1,
    });
    
    isMongoConnected = true;
    console.log('✅ MongoDB Atlas conectado com sucesso!');
    console.log(`📋 Database: ${mongoose.connection.db.databaseName}`);
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);
    isMongoConnected = false;
    console.log('ℹ️  Iniciando servidor sem MongoDB (modo offline)');
    console.log('ℹ️  Endpoints estarão disponíveis mas retornarão erro de DB');
    // Não fazer exit para permitir desenvolvimento local
  }
};

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    minlength: [2, 'Nome deve ter pelo menos 2 caracteres'],
    maxlength: [50, 'Nome deve ter no máximo 50 caracteres']
  },
  age: {
    type: Number,
    required: [true, 'Idade é obrigatória'],
    min: [1, 'Idade deve ser pelo menos 1'],
    max: [120, 'Idade deve ser no máximo 120']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para atualizar updatedAt antes de salvar
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const User = mongoose.model('User', userSchema);

// Routes

// GET /api/users - Buscar todos os usuários
app.get('/api/users', async (req, res) => {
  try {
    // Verificar se MongoDB está conectado
    if (!isMongoConnected || mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'MongoDB não está conectado',
        fallback: 'Use localStorage no frontend'
      });
    }

    const users = await User.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor ao buscar usuários',
      error: error.message,
      fallback: 'Use localStorage no frontend'
    });
  }
});

// POST /api/users - Criar novo usuário
app.post('/api/users', async (req, res) => {
  try {
    // Verificar se MongoDB está conectado
    if (!isMongoConnected || mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'MongoDB não está conectado',
        fallback: 'Use localStorage no frontend'
      });
    }

    const { name, age } = req.body;

    // Validação básica
    if (!name || !age) {
      return res.status(400).json({
        success: false,
        message: 'Nome e idade são obrigatórios'
      });
    }

    // Verificar se usuário já existe (mesmo nome)
    const existingUser = await User.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') } 
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Usuário com este nome já existe'
      });
    }

    const user = new User({ name: name.trim(), age: parseInt(age) });
    const savedUser = await user.save();

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: savedUser
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor ao criar usuário',
      error: error.message,
      fallback: 'Use localStorage no frontend'
    });
  }
});

// GET /api/users/:id - Buscar usuário por ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de usuário inválido'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor ao buscar usuário',
      error: error.message
    });
  }
});

// PUT /api/users/:id - Atualizar usuário
app.put('/api/users/:id', async (req, res) => {
  try {
    const { name, age } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        ...(name && { name: name.trim() }),
        ...(age && { age: parseInt(age) }),
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Usuário atualizado com sucesso',
      data: user
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de usuário inválido'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor ao atualizar usuário',
      error: error.message
    });
  }
});

// DELETE /api/users/:id - Deletar usuário
app.delete('/api/users/:id', async (req, res) => {
  try {
    // Verificar se MongoDB está conectado
    if (!isMongoConnected || mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'MongoDB não está conectado',
        fallback: 'Use localStorage no frontend'
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Usuário deletado com sucesso',
      data: user
    });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de usuário inválido'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor ao deletar usuário',
      error: error.message,
      fallback: 'Use localStorage no frontend'
    });
  }
});

// Health check - Para Docker
app.get('/health', (req, res) => {
  const mongoStatus = isMongoConnected && mongoose.connection.readyState === 1;
  res.status(200).json({ status: 'ok', database: mongoStatus });
});

// Health check detalhado - Para API
app.get('/api/health', (req, res) => {
  const mongoStatus = isMongoConnected && mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado';
  
  res.json({
    success: true,
    message: 'API funcionando!',
    timestamp: new Date().toISOString(),
    database: mongoStatus,
    mongoReadyState: mongoose.connection.readyState,
    endpoints: {
      'GET /api/users': 'Listar usuários',
      'POST /api/users': 'Criar usuário',
      'DELETE /api/users/:id': 'Deletar usuário'
    }
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Register User API - Backend funcionando!',
    version: '1.0.0',
    endpoints: {
      users: {
        'GET /api/users': 'Listar todos os usuários',
        'POST /api/users': 'Criar novo usuário',
        'GET /api/users/:id': 'Buscar usuário por ID',
        'PUT /api/users/:id': 'Atualizar usuário',
        'DELETE /api/users/:id': 'Deletar usuário'
      },
      health: 'GET /api/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint não encontrado',
    requestedPath: req.path,
    availableEndpoints: [
      'GET /',
      'GET /api/health',
      'GET /api/users',
      'POST /api/users',
      'GET /api/users/:id',
      'PUT /api/users/:id',
      'DELETE /api/users/:id'
    ]
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Erro global:', error);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Algo deu errado'
  });
});

// Start server
const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`👥 Usuários: http://localhost:${PORT}/api/users`);
  });
};

startServer();