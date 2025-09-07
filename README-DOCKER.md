# 🐳 Docker Setup - Register User App

Este documento fornece instruções completas para executar a aplicação Register User usando Docker com backend Node.js/Express e MongoDB.

## 📋 Índice

- [Pré-requisitos](#-pré-requisitos)
- [Configuração Rápida](#-configuração-rápida)
- [Configuração Detalhada](#-configuração-detalhada)
- [Comandos Docker](#-comandos-docker)
- [Monitoramento](#-monitoramento)
- [Troubleshooting](#-troubleshooting)
- [Desenvolvimento](#-desenvolvimento)

## 🔧 Pré-requisitos

- **Docker**: Versão 20.10 ou superior
- **Docker Compose**: Versão 2.0 ou superior
- **Git**: Para clonar o repositório
- **Conta Docker Hub**: Para push das imagens (opcional)

### Verificar Instalação

```bash
docker --version
docker-compose --version
```

## ⚡ Configuração Rápida

### 1. Preparar Ambiente

```bash
# Copiar arquivo de configuração
cp .env.docker .env

# Dar permissões aos scripts (Linux/Mac)
chmod +x docker-build-push.sh
```

### 2. Executar com Docker Compose

```bash
# Subir todos os serviços
docker-compose up -d

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f
```

### 3. Acessar Aplicação

- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **API Usuarios**: http://localhost:3001/api/users
- **MongoDB Express** (opcional): http://localhost:8081

## 🔍 Configuração Detalhada

### Estrutura de Arquivos Docker

```
📁 register-user-react-master/
├── 📁 backend/
│   ├── 🐳 Dockerfile              # Imagem do backend
│   ├── 🚫 .dockerignore          # Arquivos ignorados
│   └── 📄 server.js              # Código do servidor
├── 📁 mongodb-init/
│   └── 🗃️ init-db.js             # Script de inicialização do MongoDB
├── 🐳 docker-compose.yml         # Orquestração dos containers
├── ⚙️ .env.docker                # Configurações de ambiente
├── 🔨 docker-build-push.sh       # Script de build (Linux/Mac)
├── 🔨 docker-build-push.bat      # Script de build (Windows)
└── 📖 README-DOCKER.md          # Esta documentação
```

### Serviços Configurados

#### 🗄️ MongoDB
- **Imagem**: `mongo:7.0`
- **Porta**: `27017`
- **Volume**: `mongodb_data` (persistente)
- **Network**: `register-user-network`
- **Credenciais**: admin/senha123

#### 🚀 Backend API
- **Imagem**: `fabriciosergioC/register-user-backend:latest`
- **Porta**: `3001`
- **Network**: `register-user-network`
- **Dependências**: MongoDB (health check)

#### 🖥️ Mongo Express (Opcional)
- **Imagem**: `mongo-express:1.0.2`
- **Porta**: `8081`
- **Profile**: `admin`

### Variáveis de Ambiente

Arquivo `.env`:

```env
# Ambiente
NODE_ENV=production

# Backend
BACKEND_PORT=3001

# MongoDB
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=senha123
MONGO_DATABASE=register-users
```

## 📦 Comandos Docker

### Build e Push

```bash
# Linux/Mac
./docker-build-push.sh

# Windows
docker-build-push.bat

# Manual - Build da imagem
docker build -t fabriciosergioC/register-user-backend:latest ./backend

# Manual - Push para Docker Hub
docker push fabriciosergioC/register-user-backend:latest
```

### Docker Compose

```bash
# Iniciar todos os serviços
docker-compose up -d

# Iniciar com Mongo Express
docker-compose --profile admin up -d

# Parar serviços
docker-compose down

# Parar e remover volumes
docker-compose down -v

# Rebuild e restart
docker-compose up -d --build

# Ver logs em tempo real
docker-compose logs -f

# Ver logs específicos
docker-compose logs backend
docker-compose logs mongodb
```

### Comandos Individuais

```bash
# Executar apenas MongoDB
docker run -d \
  --name register-mongodb \
  --network register-user-network \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=senha123 \
  mongo:7.0

# Executar apenas Backend
docker run -d \
  --name register-backend \
  --network register-user-network \
  -p 3001:3001 \
  -e MONGODB_URI=mongodb://admin:senha123@register-mongodb:27017/register-users?authSource=admin \
  fabriciosergioC/register-user-backend:latest
```

## 📊 Monitoramento

### Health Checks

```bash
# Verificar saúde do backend
curl http://localhost:3001/health

# Verificar API completa
curl http://localhost:3001/api/health

# Status dos containers
docker-compose ps

# Recursos utilizados
docker stats
```

### Logs

```bash
# Todos os logs
docker-compose logs

# Logs específicos
docker-compose logs backend
docker-compose logs mongodb

# Seguir logs em tempo real
docker-compose logs -f --tail=50
```

### Monitoramento do MongoDB

```bash
# Conectar ao MongoDB
docker exec -it register-user-mongodb mongosh

# Comandos MongoDB
use register-users
db.users.find()
db.stats()
```

## 🛠️ Troubleshooting

### Problemas Comuns

#### 1. Container não inicia

```bash
# Verificar logs
docker-compose logs [service-name]

# Verificar configurações
docker-compose config

# Reiniciar serviço específico
docker-compose restart [service-name]
```

#### 2. Erro de conexão com MongoDB

```bash
# Verificar se MongoDB está executando
docker-compose ps mongodb

# Testar conexão
docker exec register-user-backend curl http://localhost:3001/health

# Verificar rede
docker network ls
docker network inspect register-user-network
```

#### 3. Porta já em uso

```bash
# Verificar portas em uso
netstat -tulpn | grep :3001
netstat -tulpn | grep :27017

# Parar serviços conflitantes
docker-compose down
```

#### 4. Problemas de permissão

```bash
# Linux/Mac - Dar permissões
chmod +x docker-build-push.sh

# Verificar usuário Docker
docker info | grep Username
```

### Limpeza do Sistema

```bash
# Remover containers parados
docker container prune

# Remover imagens não utilizadas
docker image prune

# Remover volumes não utilizados
docker volume prune

# Limpeza completa (CUIDADO!)
docker system prune -a --volumes
```

## 👨‍💻 Desenvolvimento

### Desenvolvimento Local com Docker

```bash
# Executar em modo desenvolvimento
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Rebuild durante desenvolvimento
docker-compose up -d --build backend
```

### Debug do Container

```bash
# Entrar no container do backend
docker exec -it register-user-backend sh

# Verificar arquivos no container
docker exec register-user-backend ls -la /app

# Verificar variáveis de ambiente
docker exec register-user-backend env
```

### Testes

```bash
# Testar endpoints
curl -X GET http://localhost:3001/api/users
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste Docker","age":25}'
```

## 🔐 Segurança

### Produção

Para ambiente de produção, considere:

1. **Credenciais Fortes**:
   ```env
   MONGO_ROOT_PASSWORD=sua_senha_forte_aqui
   ```

2. **SSL/TLS**: Configure certificados

3. **Firewall**: Restrinja acesso às portas

4. **Updates**: Mantenha imagens atualizadas

5. **Backup**: Configure backup dos volumes

## 📝 Logs de Mudanças

### v1.0.0 (2025-01-06)
- ✅ Configuração inicial do Docker
- ✅ Backend Node.js/Express containerizado
- ✅ MongoDB configurado com persistência
- ✅ Rede personalizada para comunicação
- ✅ Health checks implementados
- ✅ Scripts de build e push
- ✅ Documentação completa

---

## 📞 Suporte

Para problemas ou dúvidas:

1. Verificar este documento
2. Consultar logs: `docker-compose logs`
3. Verificar issues no repositório
4. Contatar: fabricio.sergio672@gmail.com

---

**Desenvolvido por**: Fabricio Sergio  
**Docker Hub**: [fabriciosergioC](https://hub.docker.com/u/fabriciosergioC)  
**Versão**: 1.0.0