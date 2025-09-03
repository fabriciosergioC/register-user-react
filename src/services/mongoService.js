import mongoose from 'mongoose';

// Schema do usuário
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 120
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Model do usuário
const User = mongoose.model('User', userSchema);

class MongoService {
  constructor() {
    this.isConnected = false;
  }

  // Conectar ao MongoDB
  async connect() {
    try {
      // Substitua pela sua connection string do MongoDB Atlas
      const connectionString = process.env.REACT_APP_MONGODB_URI || 
        'mongodb+srv://username:password@cluster.mongodb.net/register-users?retryWrites=true&w=majority';
      
      await mongoose.connect(connectionString);
      this.isConnected = true;
      console.log('Conectado ao MongoDB Atlas!');
      return true;
    } catch (error) {
      console.error('Erro ao conectar ao MongoDB:', error);
      this.isConnected = false;
      return false;
    }
  }

  // Criar usuário
  async createUser(userData) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      
      const user = new User(userData);
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  // Buscar todos os usuários
  async getUsers() {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      
      const users = await User.find().sort({ createdAt: -1 });
      return users;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  }

  // Deletar usuário
  async deleteUser(userId) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      
      const deletedUser = await User.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw error;
    }
  }

  // Atualizar usuário
  async updateUser(userId, userData) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      
      const updatedUser = await User.findByIdAndUpdate(
        userId, 
        userData, 
        { new: true, runValidators: true }
      );
      return updatedUser;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }
}

// Exportar instância única
const mongoService = new MongoService();
export default mongoService;