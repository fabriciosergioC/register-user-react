// ========================================
// SCRIPT DE INICIALIZAÇÃO - MONGODB
// ========================================
// Este script é executado quando o MongoDB é inicializado pela primeira vez

print('🔄 Inicializando banco de dados register-users...');

// Selecionar o banco de dados
db = db.getSiblingDB('register-users');

// Criar usuário para a aplicação (opcional)
try {
    db.createUser({
        user: "appuser",
        pwd: "apppassword",
        roles: [
            {
                role: "readWrite",
                db: "register-users"
            }
        ]
    });
    print('✅ Usuário da aplicação criado com sucesso!');
} catch (e) {
    print('ℹ️  Usuário da aplicação já existe ou erro: ' + e);
}

// Criar coleção de usuários se não existir
if (!db.getCollectionNames().includes('users')) {
    db.createCollection('users');
    print('✅ Coleção "users" criada com sucesso!');
} else {
    print('ℹ️  Coleção "users" já existe');
}

// Inserir dados de exemplo (opcional)
const sampleUsers = [
    {
        name: "João Silva",
        age: 30,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Maria Santos",
        age: 25,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

try {
    const result = db.users.insertMany(sampleUsers);
    print('✅ ' + result.insertedIds.length + ' usuários de exemplo inseridos!');
} catch (e) {
    print('ℹ️  Erro ao inserir usuários de exemplo (podem já existir): ' + e);
}

// Criar índices para melhor performance
try {
    db.users.createIndex({ "name": 1 }, { unique: false });
    db.users.createIndex({ "createdAt": -1 });
    print('✅ Índices criados com sucesso!');
} catch (e) {
    print('ℹ️  Índices já existem ou erro: ' + e);
}

print('🎉 Inicialização do MongoDB concluída!');
print('📊 Total de usuários no banco: ' + db.users.countDocuments());
print('🔗 Banco pronto para conexões da aplicação');