import React, { useState, useEffect } from "react";
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
 

  useEffect(() => {
    async function carregarUsers() {
      const { data: newUser } = await axios.get("http://localhost:3001/users")
      setUser(newUser)
    }
    carregarUsers()

  }, [])

  async function deleteUser(usersId) {

    await axios.delete(`http://localhost:3001/users/${usersId}`)
    const newUser = users.filter((user) => user.id !== usersId)
    setUser(newUser)
  }

  return (
    <Container>
      <Imagem alt="logo-imagem" src={People1} />

      <ContainerSecundario>

        <H1>Usuarios</H1>

        <ul>
          {users.map((user) => (
            <User key={user.id}>
              <p>{user.name} </p>  <p>{user.age} </p>
              <button onClick={() => deleteUser(user.id)}>
                <img src={Lixo} alt="lixo" />
              </button>
            </User>
          ))}

        </ul>

        <Button to = "/">
           <img alt="seta" src={Seta} />Voltar
        </Button>

      </ContainerSecundario>
    </Container>
  );

}

export default Users;