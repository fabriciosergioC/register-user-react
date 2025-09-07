#!/bin/bash

# ========================================
# SCRIPT DE BUILD E PUSH - REGISTER USER APP
# ========================================
# Este script automatiza o build e push das imagens Docker para o Docker Hub

set -e  # Sair em caso de erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações
DOCKER_USERNAME="fabriciosergioC"
BACKEND_IMAGE="register-user-backend"
FRONTEND_IMAGE="register-user-frontend"
VERSION=${1:-"latest"}

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  BUILD E PUSH - REGISTER USER DOCKER  ${NC}"
echo -e "${BLUE}========================================${NC}"

# Função para logging
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

# Verificar se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    error "Docker não está rodando. Inicie o Docker e tente novamente."
fi

# Verificar se está logado no Docker Hub
if ! docker info | grep -q "Username"; then
    warning "Não está logado no Docker Hub. Execute: docker login"
    read -p "Deseja fazer login agora? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker login
    else
        error "Login necessário para push no Docker Hub"
    fi
fi

log "Iniciando build das imagens do backend e frontend..."

# Build da imagem do backend
cd backend
log "Fazendo build da imagem: ${DOCKER_USERNAME}/${BACKEND_IMAGE}:${VERSION}"

docker build \
    --tag "${DOCKER_USERNAME}/${BACKEND_IMAGE}:${VERSION}" \
    --tag "${DOCKER_USERNAME}/${BACKEND_IMAGE}:latest" \
    --platform linux/amd64,linux/arm64 \
    --build-arg BUILD_DATE="$(date -u +'%Y-%m-%dT%H:%M:%SZ')" \
    --build-arg VERSION="${VERSION}" \
    .

if [ $? -eq 0 ]; then
    log "Build do backend concluído com sucesso!"
else
    error "Falha no build do backend"
fi

cd ..

# Build da imagem do frontend
log "Fazendo build da imagem: ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:${VERSION}"

docker build \
    --tag "${DOCKER_USERNAME}/${FRONTEND_IMAGE}:${VERSION}" \
    --tag "${DOCKER_USERNAME}/${FRONTEND_IMAGE}:latest" \
    --platform linux/amd64,linux/arm64 \
    --build-arg BUILD_DATE="$(date -u +'%Y-%m-%dT%H:%M:%SZ')" \
    --build-arg VERSION="${VERSION}" \
    --target production \
    .

if [ $? -eq 0 ]; then
    log "Build do frontend concluído com sucesso!"
else
    error "Falha no build do frontend"
fi

# Push das imagens
log "Fazendo push das imagens para o Docker Hub..."

# Push da versão específica do backend
log "Pushing ${DOCKER_USERNAME}/${BACKEND_IMAGE}:${VERSION}"
docker push "${DOCKER_USERNAME}/${BACKEND_IMAGE}:${VERSION}"

# Push da versão latest do backend (se não for latest)
if [ "$VERSION" != "latest" ]; then
    log "Pushing ${DOCKER_USERNAME}/${BACKEND_IMAGE}:latest"
    docker push "${DOCKER_USERNAME}/${BACKEND_IMAGE}:latest"
fi

# Push da versão específica do frontend
log "Pushing ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:${VERSION}"
docker push "${DOCKER_USERNAME}/${FRONTEND_IMAGE}:${VERSION}"

# Push da versão latest do frontend (se não for latest)
if [ "$VERSION" != "latest" ]; then
    log "Pushing ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:latest"
    docker push "${DOCKER_USERNAME}/${FRONTEND_IMAGE}:latest"
fi

log "Push concluído com sucesso!"

# Limpar imagens antigas (opcional)
read -p "Deseja limpar imagens Docker antigas? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    log "Limpando imagens não utilizadas..."
    docker image prune -f
    log "Limpeza concluída!"
fi

# Mostrar informações das imagens criadas
log "Imagens criadas:"
docker images | grep "${DOCKER_USERNAME}/${BACKEND_IMAGE}"
docker images | grep "${DOCKER_USERNAME}/${FRONTEND_IMAGE}"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}         DEPLOY CONCLUÍDO!              ${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Arquitetura de 3 containers criada:${NC}"
echo -e "${BLUE}1. Frontend: ${DOCKER_USERNAME}/${FRONTEND_IMAGE}:${VERSION}${NC}"
echo -e "${BLUE}2. Backend: ${DOCKER_USERNAME}/${BACKEND_IMAGE}:${VERSION}${NC}"
echo -e "${BLUE}3. MongoDB: mongo:7.0${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Para usar a aplicação:${NC}"
echo -e "${BLUE}1. docker-compose up -d${NC}"
echo -e "${BLUE}2. Frontend: http://localhost:80${NC}"
echo -e "${BLUE}3. Backend: http://localhost:3001${NC}"
echo -e "${GREEN}========================================${NC}"