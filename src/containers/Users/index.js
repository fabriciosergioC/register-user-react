import React, { useState, useEffect } from "react";
// Usar backend API
import axios from "axios";

import People1 from "../../imagens/people1.svg"
import Seta from "../../imagens/setaEsquerda.png"
import Lixo from "../../imagens/lixeira.svg"

import {
  Container,
  H1,
  ContainerSecundario,
  Imagem,
  Button,
  User,
} from "./style";

function Users() {

  const [users, setUser] = useState([])
  const [isLoading, setIsLoading] = useState(false)
 

  useEffect(() => {
    async function carregarUsers() {
      console.log('🔄 Iniciando carregamento de usuários...');
      setIsLoading(true);
      
      // Detectar se está no Railway (ambiente de produção)
      const isRailwayProduction = window.location.hostname.includes('railway.app') || window.location.hostname.includes('up.railway.app');
      
      if (isRailwayProduction) {
        console.log('🚂 Detectado Railway - usando localStorage apenas');
        
        // Usar localStorage no Railway
        try {
          const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
          console.log('📦 Dados do localStorage (Railway):', savedUsers);
          setUser(savedUsers);
          console.log('✅ Usuários carregados do localStorage (Railway):', savedUsers.length);
        } catch (localError) {
          console.error('❌ Erro no localStorage (Railway):', localError);
          setUser([]);
        }
        
        setIsLoading(false);
        return;
      }
      
      // Código original para desenvolvimento local com backend
      try {
        // Tentar buscar da API primeiro
        console.log('📡 Ambiente local - tentando buscar da API MongoDB...');
        const response = await axios.get('/api/users');
        
        console.log('📊 Resposta completa da API:', response);
        console.log('📊 Status da resposta:', response.status);
        console.log('📊 Dados da resposta:', response.data);
        
        if (response.data.success && response.data.data) {
          setUser(response.data.data);
          console.log('✅ Usuários carregados do MongoDB:', response.data.data);
          console.log('📊 Total de usuários no MongoDB:', response.data.data.length);
          setIsLoading(false);
          return; // Sair se API funcionou
        } else {
          throw new Error('API retornou dados inválidos');
        }
        
      } catch (error) {
        console.error('❌ Erro completo ao carregar da API:', error);
        console.error('❌ Erro response:', error.response);
        console.error('❌ Erro message:', error.message);
        
        // Se for erro de rede
        if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
          console.log('🚫 Erro de rede - Backend pode estar offline');
        }
        
        console.log('💾 Tentando carregar do localStorage como fallback...');
        
        // Fallback para localStorage se API falhar
        try {
          const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
          console.log('📦 Dados do localStorage:', savedUsers);
          setUser(savedUsers);
          console.log('⚠️ Usuários carregados do localStorage:', savedUsers.length);
        } catch (localError) {
          console.error('❌ Erro no localStorage:', localError);
          setUser([]);
        }
      }
      
      setIsLoading(false);
    }
    
    carregarUsers();
  }, [])

  async function deleteUser(userId) {
    // Detectar se está no Railway (ambiente de produção)
    const isRailwayProduction = window.location.hostname.includes('railway.app') || window.location.hostname.includes('up.railway.app');
    
    if (isRailwayProduction) {
      console.log('🚂 Detectado Railway - usando localStorage para deletar');
      
      try {
        // Deletar do localStorage no Railway
        const updatedUsers = users.filter((user) => user.id !== userId);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUser(updatedUsers);
        
        alert('✅ Usuário removido com sucesso!');
        console.log('✅ Usuário removido do localStorage (Railway)');
      } catch (localError) {
        console.error('❌ Erro ao deletar do localStorage (Railway):', localError);
        alert('❌ Erro ao remover usuário. Tente novamente.');
      }
      return;
    }
    
    // Código original para desenvolvimento local com backend
    try {
      // Tentar deletar da API primeiro
      console.log('🗑️ Ambiente local - tentando deletar da API MongoDB...');
      const response = await axios.delete(`/api/users/${userId}`);
      
      if (response.data.success) {
        // Atualizar estado local removendo o usuário
        const updatedUsers = users.filter((user) => user._id !== userId);
        setUser(updatedUsers);
        
        alert('✅ Usuário removido da API com sucesso!');
      } else {
        throw new Error(response.data.message || 'Erro ao deletar');
      }
      
    } catch (error) {
      console.error('❌ Erro ao deletar da API, usando localStorage:', error);
      
      try {
        // Fallback para localStorage
        const updatedUsers = users.filter((user) => user.id !== userId);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUser(updatedUsers);
        
        alert('⚠️ Usuário removido localmente (API indisponível)!');
      } catch (localError) {
        console.error('❌ Erro no localStorage:', localError);
        alert('❌ Erro ao remover usuário. Tente novamente.');
      }
    }
  }

  return (
    <Container>
      <Imagem alt="logo-imagem" src={People1} />

      <ContainerSecundario>

        <H1>Usuarios {isLoading && '(Carregando...)'}</H1>

        <ul>
          {isLoading ? (
            <p style={{color: '#FFFFFF', textAlign: 'center', margin: '20px 0'}}>Carregando usuários...</p>
          ) : users.length > 0 ? (
            users.map((user) => (
              <User key={user._id || user.id}>
                <p>{user.name} </p>  <p>{user.age} anos</p>
                <button onClick={() => deleteUser(user._id || user.id)}>
                  <img src={Lixo} alt="lixo" />
                </button>
              </User>
            ))
          ) : (
            <p style={{color: '#FFFFFF', textAlign: 'center', margin: '20px 0'}}>Nenhum usuário cadastrado ainda.</p>
          )}
        </ul>

        <Button to = "/">
           <img alt="seta" src={Seta} />Voltar
        </Button>

      </ContainerSecundario>
    </Container>
  );

}

export default Users;