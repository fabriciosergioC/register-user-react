# Dockerfile para Frontend React - Multi-stage build
# Estágio 1: Build da aplicação React
FROM node:18-alpine AS build

# Define o autor da imagem
LABEL maintainer="fabricio.sergio672@gmail.com"
LABEL description="Frontend React para Register User App"

# Instala dependências necessárias
RUN apk add --no-cache python3 make g++

# Cria o diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./

# Instala dependências (incluindo devDependencies para build)
RUN npm ci --silent

# Copia o código fonte
COPY . .

# Define variáveis de ambiente para build
ENV REACT_APP_API_URL=http://localhost:3001
ENV GENERATE_SOURCEMAP=false
ENV CI=false

# Build da aplicação para produção
RUN npm run build

# Estágio 2: Servidor nginx para produção
FROM nginx:1.25-alpine AS production

# Instala curl para health checks
RUN apk add --no-cache curl

# Remove configuração padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia configuração personalizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia arquivos buildados do estágio anterior
COPY --from=build /app/build /usr/share/nginx/html

# Cria usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /usr/share/nginx/html && \
    chown -R nodejs:nodejs /var/cache/nginx && \
    chown -R nodejs:nodejs /var/log/nginx && \
    chown -R nodejs:nodejs /etc/nginx/conf.d

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80/health || exit 1

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]