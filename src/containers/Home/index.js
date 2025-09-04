import React, { useRef, useState } from "react";

// Usar backend API
import axios from "axios";

import People from "../../imagens/people.svg"
import Seta from "../../imagens/setaDireita.svg"


import {
  Container,
  H1,
  ContainerSecundario,
  Imagem,
  NomeInput,
  Imput,
  Button,
}from "./style";

function Home() { 

  const inputName = useRef()
  const inputAge = useRef()
  const [isLoading, setIsLoading] = useState(false)

async function addUser(){
  // Verificar se os refs estão disponíveis
  if (!inputName.current || !inputAge.current) {
    console.error('❌ Refs não estão disponíveis ainda');
    alert('❌ Erro interno: Campos não estão prontos. Tente novamente.');
    return;
  }
  
  // Validação dos campos
  const name = inputName.current.value.trim();
  const age = inputAge.current.value.trim();
  
  if (!name || !age) {
    alert('Por favor, preencha todos os campos!');
    return;
  }
  
  if (isNaN(age) || age < 1 || age > 120) {
    alert('Por favor, insira uma idade válida (1-120)!');
    return;
  }
  
  setIsLoading(true);
  
  try {
    console.log('🚀 Tentando enviar para MongoDB via API...');
    
    // Enviar para backend API
    const response = await axios.post('http://localhost:3001/api/users', {
      name: name,
      age: parseInt(age)
    });
    
    console.log('📡 Resposta da API:', response.data);
    
    if (response.data.success) {
      // Verificar refs antes de limpar
      if (inputName.current && inputAge.current) {
        inputName.current.value = '';
        inputAge.current.value = '';
      }
      
      // Feedback visual
      alert(`✅ Usuário ${response.data.data.name} salvo no MongoDB com sucesso!`);
      console.log('✅ Usuário salvo no MongoDB:', response.data.data);
    } else {
      throw new Error(response.data.message || 'Erro desconhecido');
    }
    
  } catch (error) {
    console.error('❌ Erro completo:', error);
    console.error('❌ Erro response:', error.response);
    console.error('❌ Erro message:', error.message);
    
    // Se for erro de referência DOM
    if (error.message.includes('Cannot set properties of null')) {
      alert('❌ Erro interno: Problema com os campos do formulário.');
      setIsLoading(false);
      return;
    }
    
    // Se for erro de rede, mostrar detalhes
    if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      alert('❌ Erro de conexão! Verifique se o backend está rodando na porta 3001.');
      setIsLoading(false);
      return;
    }
    
    // Se for erro CORS
    if (error.message.includes('CORS')) {
      alert('❌ Erro de CORS! Verifique a configuração do backend.');
      setIsLoading(false);
      return;
    }
    
    // Se for erro específico da API
    if (error.response && error.response.data) {
      alert(`❌ Erro da API: ${error.response.data.message}`);
      setIsLoading(false);
      return;
    }
    
    console.log('💾 Backend indisponível. Usando localStorage como fallback...');
    
    // Só usar localStorage como último recurso
    const fallbackUser = {
      id: Date.now(),
      name: name,
      age: parseInt(age),
      createdAt: new Date().toISOString()
    };
    
    try {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      console.log('📊 Usuários existentes no localStorage:', existingUsers);
      
      const updatedUsers = [...existingUsers, fallbackUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      console.log('✅ Usuário salvo no localStorage:', fallbackUser);
      console.log('📊 Total de usuários agora:', updatedUsers.length);
      
      // Verificar refs antes de limpar
      if (inputName.current && inputAge.current) {
        inputName.current.value = '';
        inputAge.current.value = '';
      }
      
      alert(`⚠️ Usuário ${fallbackUser.name} salvo localmente (MongoDB indisponível)!`);
    } catch (localError) {
      console.error('❌ Erro ao salvar no localStorage:', localError);
      alert('❌ Erro crítico: Não foi possível salvar nem no MongoDB nem localmente.');
    }
  }
  
  setIsLoading(false);
}

  return (
    <Container>
      <Imagem alt="logo-imagem" src={People} />

      <ContainerSecundario>
        
        <H1>Ola</H1>

        <NomeInput>Nome</NomeInput>
        <Imput ref={inputName} placeholder="Nome" />

        <NomeInput>Idade</NomeInput>
        <Imput ref={inputAge} placeholder="Idade" />

        <Button to="/usuarios" onClick={addUser} disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Cadastrar'} <img alt="seta" src={Seta}/>
        </Button>        

      </ContainerSecundario>
    </Container>
  );

}

export default Home;