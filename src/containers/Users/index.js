import React, { useState, useEffect } from "react";
// Removido axios temporariamente para usar localStorage
// import axios from "axios";

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
 

  useEffect(() => {
    function carregarUsers() {
      // Buscar usuários do localStorage
      const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      setUser(savedUsers);
    }
    carregarUsers()

  }, [])

  function deleteUser(usersId) {
    // Filtrar usuário removido
    const updatedUsers = users.filter((user) => user.id !== usersId);
    
    // Atualizar localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Atualizar estado
    setUser(updatedUsers);
    
    // Feedback visual
    alert('Usuário removido com sucesso!');
  }

  return (
    <Container>
      <Imagem alt="logo-imagem" src={People1} />

      <ContainerSecundario>

        <H1>Usuarios</H1>

        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <User key={user.id}>
                <p>{user.name} </p>  <p>{user.age} anos</p>
                <button onClick={() => deleteUser(user.id)}>
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