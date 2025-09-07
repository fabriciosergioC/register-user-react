@echo off
REM ========================================
REM SCRIPT DE BUILD E PUSH - REGISTER USER APP (WINDOWS)
REM ========================================

setlocal enabledelayedexpansion

REM Configurações
set DOCKER_USERNAME=fabriciosergioC
set BACKEND_IMAGE=register-user-backend
set FRONTEND_IMAGE=register-user-frontend
set VERSION=%1
if "%VERSION%"=="" set VERSION=latest

echo ========================================
echo   BUILD E PUSH - REGISTER USER DOCKER  
echo ========================================

REM Verificar se o Docker está rodando
docker info >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker não está rodando. Inicie o Docker e tente novamente.
    exit /b 1
)

echo [INFO] Iniciando build da imagem do backend...

REM Build da imagem do backend
cd backend
echo [INFO] Fazendo build da imagem: %DOCKER_USERNAME%/%BACKEND_IMAGE%:%VERSION%

docker build ^
    --tag "%DOCKER_USERNAME%/%BACKEND_IMAGE%:%VERSION%" ^
    --tag "%DOCKER_USERNAME%/%BACKEND_IMAGE%:latest" ^
    .

if errorlevel 1 (
    echo [ERROR] Falha no build do backend
    exit /b 1
)

echo [INFO] Build do backend concluído com sucesso!
cd ..

REM Verificar login no Docker Hub
echo [INFO] Verificando login no Docker Hub...
docker info | findstr "Username" >nul
if errorlevel 1 (
    echo [WARNING] Não está logado no Docker Hub
    set /p login="Deseja fazer login agora? (y/N): "
    if /i "!login!"=="y" (
        docker login
    ) else (
        echo [ERROR] Login necessário para push no Docker Hub
        exit /b 1
    )
)

REM Push das imagens
echo [INFO] Fazendo push das imagens para o Docker Hub...

echo [INFO] Pushing %DOCKER_USERNAME%/%BACKEND_IMAGE%:%VERSION%
docker push "%DOCKER_USERNAME%/%BACKEND_IMAGE%:%VERSION%"

if not "%VERSION%"=="latest" (
    echo [INFO] Pushing %DOCKER_USERNAME%/%BACKEND_IMAGE%:latest
    docker push "%DOCKER_USERNAME%/%BACKEND_IMAGE%:latest"
)

echo [INFO] Push concluído com sucesso!

REM Mostrar informações das imagens criadas
echo [INFO] Imagens criadas:
docker images | findstr "%DOCKER_USERNAME%/%BACKEND_IMAGE%"

echo ========================================
echo          DEPLOY CONCLUÍDO!              
echo ========================================
echo Para usar as imagens:
echo 1. Backend: docker run -p 3001:3001 %DOCKER_USERNAME%/%BACKEND_IMAGE%:%VERSION%
echo 2. Completo: docker-compose up -d
echo ========================================

pause