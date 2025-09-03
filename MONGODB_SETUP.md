# Configuração do MongoDB Atlas

## Passo 1: Criar conta no MongoDB Atlas

1. Acesse: https://www.mongodb.com/cloud/atlas
2. Clique em "Try Free"
3. Registre-se com seu email ou Google

## Passo 2: Criar um Cluster

1. Escolha o plano **FREE** (M0 Sandbox)
2. Selecione a região mais próxima
3. Clique em "Create Cluster"
4. Aguarde alguns minutos para criar

## Passo 3: Configurar Acesso

### Database User:
1. Vá em "Database Access"
2. Clique em "Add New Database User"
3. Crie um usuário e senha (anote!)
4. Permissão: "Read and write to any database"

### Network Access:
1. Vá em "Network Access"
2. Clique em "Add IP Address"
3. Escolha "Allow access from anywhere" (0.0.0.0/0)
4. Confirme

## Passo 4: Obter Connection String

1. Vá em "Clusters"
2. Clique em "Connect"
3. Escolha "Connect your application"
4. Copie a connection string
5. Substitua `<password>` pela sua senha

## Passo 5: Configurar no Projeto

1. Abra o arquivo `.env` na raiz do projeto
2. Substitua a linha:
```
REACT_APP_MONGODB_URI=mongodb+srv://seu-usuario:sua-senha@seu-cluster.mongodb.net/register-users?retryWrites=true&w=majority
```

### Exemplo real:
```
REACT_APP_MONGODB_URI=mongodb+srv://fabricio:minhasenha123@cluster0.abc123.mongodb.net/register-users?retryWrites=true&w=majority
```

## Passo 6: Testar

1. Reinicie o servidor React: `npm start`
2. Cadastre um usuário
3. Se aparecer "cadastrado no MongoDB", funcionou!
4. Se aparecer "cadastrado localmente", verifique a configuração

## Troubleshooting

- **Erro de conexão**: Verifique IP whitelist e credenciais
- **Erro de autenticação**: Confirme usuário e senha
- **Funciona local**: Sistema tem fallback para localStorage

## Vantagens do MongoDB

- ✅ **Persistência real** dos dados
- ✅ **Acesso de qualquer lugar**
- ✅ **Escalabilidade**
- ✅ **Backup automático**
- ✅ **Interface web** para gerenciar dados