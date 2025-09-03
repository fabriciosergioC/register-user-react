import React, { useRef, useState } from "react";

// Importar serviço do MongoDB
import mongoService from "../../services/mongoService";

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
    // Criar usuário no MongoDB
    const newUser = await mongoService.createUser({
      name: name,
      age: parseInt(age)
    });
    
    // Limpar campos
    inputName.current.value = '';
    inputAge.current.value = '';
    
    // Feedback visual
    alert(`Usuário ${newUser.name} cadastrado com sucesso no MongoDB!`);
    
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    
    // Fallback para localStorage se MongoDB falhar
    const fallbackUser = {
      id: Date.now(),
      name: name,
      age: parseInt(age)
    };
    
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = [...existingUsers, fallbackUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Limpar campos
    inputName.current.value = '';
    inputAge.current.value = '';
    
    alert('Usuário cadastrado localmente (MongoDB não disponível)!');
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