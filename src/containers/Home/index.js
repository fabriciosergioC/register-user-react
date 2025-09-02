import React, { useRef } from "react";

// Removido axios temporariamente para usar localStorage
// import axios from "axios";

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
  const inputAge =  useRef()

function addUser(){
  // Validação dos campos
  const name = inputName.current.value.trim();
  const age = inputAge.current.value.trim();
  
  if (!name || !age) {
    alert('Por favor, preencha todos os campos!');
    return;
  }
  
  // Criar novo usuário
  const newUser = {
    id: Date.now(), // ID simples baseado no timestamp
    name: name,
    age: parseInt(age)
  };
  
  // Buscar usuários existentes do localStorage
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Adicionar novo usuário
  const updatedUsers = [...existingUsers, newUser];
  
  // Salvar no localStorage
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  
  // Limpar campos
  inputName.current.value = '';
  inputAge.current.value = '';
  
  // Feedback visual
  alert('Usuário cadastrado com sucesso!');
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

        <Button  to = "/usuarios" onClick={addUser}>
          Cadastrar <img alt="seta" src={Seta}/>
          </Button>        

      </ContainerSecundario>
    </Container>
  );

}

export default Home;