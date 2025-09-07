# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Define o autor da imagem
LABEL maintainer="fabricio.sergio672@gmail.com"
LABEL description="Backend API para Register User React App"

# Cria o diretório de trabalho
WORKDIR /app

# Copia o package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências
RUN npm install --production && npm cache clean --force

# Cria um usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copia o código fonte
COPY --chown=nodejs:nodejs . .

# Remove arquivos desnecessários
RUN rm -rf node_modules/.cache

# Muda para o usuário não-root
USER nodejs

# Expõe a porta que a aplicação usa
EXPOSE 3001

# Define variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3001

# Comando de saúde para verificar se o container está funcionando
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3001/health || exit 1

# Comando para iniciar a aplicação
CMD ["npm", "start"]