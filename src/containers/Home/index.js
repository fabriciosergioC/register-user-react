import React, { useState, useRef } from "react";


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

  const[ users ,setUser] = useState([])
  const inputName = useRef()
  const inputAge =  useRef()

async function addUser(){
  
  const {data : newUser} = await axios.post("http://localhost:3001/users" ,
  {name:inputName.current.value ,age:inputAge.current.value})
setUser([...users,newUser])
 
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