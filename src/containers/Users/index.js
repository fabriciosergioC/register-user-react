import React, { useState, useEffect } from "react";
// Importar serviço do MongoDB
import mongoService from "../../services/mongoService";

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
      setIsLoading(true);
      
      try {
        // Tentar buscar do MongoDB primeiro
        const mongoUsers = await mongoService.getUsers();
        setUser(mongoUsers);
        console.log('Usuários carregados do MongoDB:', mongoUsers.length);
        
      } catch (error) {
        console.error('Erro ao carregar do MongoDB, usando localStorage:', error);
        
        // Fallback para localStorage se MongoDB falhar
        const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        setUser(savedUsers);
      }
      
      setIsLoading(false);
    }
    
    carregarUsers();
  }, [])

  async function deleteUser(userId) {
    try {
      // Tentar deletar do MongoDB
      await mongoService.deleteUser(userId);
      
      // Atualizar estado local
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUser(updatedUsers);
      
      alert('Usuário removido do MongoDB com sucesso!');
      
    } catch (error) {
      console.error('Erro ao deletar do MongoDB, usando localStorage:', error);
      
      // Fallback para localStorage
      const updatedUsers = users.filter((user) => user.id !== userId);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUser(updatedUsers);
      
      alert('Usuário removido localmente!');
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