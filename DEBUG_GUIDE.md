# 🐛 Guia de Debug - Dados não aparecem na tela

## 🔍 **Como investigar o problema:**

### **1. Teste passo a passo:**

#### **Passo 1: Acessar a aplicação**
- **URL:** http://localhost:3000
- **Abra o console** do navegador (F12 → Console)

#### **Passo 2: Cadastrar um usuário**
1. **Preencha:** Nome e Idade
2. **Clique:** "Cadastrar"
3. **Observe no console:**
   - ❌ Erro de API → vai usar localStorage
   - ✅ Sucesso → dados salvos

#### **Passo 3: Ir para página de usuários**
1. **Clique** no botão após cadastrar
2. **URL:** http://localhost:3000/usuarios
3. **Observe no console:**
   - 🔄 "Iniciando carregamento..."
   - 📡 "Tentando buscar da API..."
   - ⚠️ "Erro ao carregar da API..."
   - 💾 "Tentando carregar do localStorage..."
   - ✅ "Usuários carregados do localStorage: X"

#### **Passo 4: Debug localStorage**
1. **Na página de usuários**
2. **Clique:** botão "Debug localStorage"
3. **Veja** o alert com dados do localStorage

### **2. Possíveis problemas e soluções:**

#### **Problema 1: API não conecta**
**Sintomas:**
- Console mostra erro de conexão
- Dados salvos no localStorage

**Solução:**
- ✅ Normal! Backend está offline
- ✅ Dados salvos localmente funcionam

#### **Problema 2: LocalStorage vazio**
**Sintomas:**
- Debug localStorage mostra "Vazio"
- Nenhum usuário aparece

**Soluções:**
1. **Cadastre um usuário primeiro**
2. **Verifique se alert de sucesso aparece**
3. **Recarregue a página de usuários**

#### **Problema 3: Dados salvos mas não aparecem**
**Sintomas:**
- Debug localStorage mostra dados
- Lista ainda vazia

**Soluções:**
1. **Recarregue a página** (F5)
2. **Verifique console** por erros
3. **Teste navegação:** Home → Usuarios

## 🔧 **Debug manual no console:**

### **Verificar localStorage:**
```javascript
// No console do navegador (F12)
localStorage.getItem('users')
```

### **Adicionar usuário manual:**
```javascript
// No console do navegador
const testUser = {id: Date.now(), name: "Teste", age: 25};
const users = JSON.parse(localStorage.getItem('users') || '[]');
users.push(testUser);
localStorage.setItem('users', JSON.stringify(users));
console.log('Usuário teste adicionado!');
```

### **Limpar localStorage:**
```javascript
// No console do navegador
localStorage.removeItem('users');
console.log('LocalStorage limpo!');
```

## 📊 **Status esperado:**

### **Com backend offline:**
1. ❌ API retorna erro 503
2. ✅ Fallback para localStorage
3. ✅ Dados persistem localmente
4. ✅ Interface funciona normalmente

### **Logs no console:**
```
🔄 Iniciando carregamento de usuários...
📡 Tentando buscar da API...
⚠️ Erro ao carregar da API: [erro]
💾 Tentando carregar do localStorage...
📦 Dados do localStorage: [array]
✅ Usuários carregados do localStorage: X
```

## 🚨 **Se ainda não funcionar:**

1. **Limpe o cache** do navegador (Ctrl+Shift+R)
2. **Teste em aba anônima**
3. **Verifique se ambos os servidores estão rodando:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

**Agora teste e me conte o que aparece no console! 🔍**