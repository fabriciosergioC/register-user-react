import styled from "styled-components";
import Background from "../../imagens/background.svg"
import { Link } from "react-router-dom"

export const Container = styled.div`

background: url("${Background}");
background-size: cover;
background-position: center;
background-repeat: no-repeat;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    height: 100%;
    min-height: 100vh;
    padding: 20px;
    
    @media (max-width: 768px) {
        gap: 20px;
        padding: 10px;
    }
`;

export const Imagem = styled.img`
margin-top: 15px;
max-width: 100%;
height: auto;
width: auto;

@media (max-width: 768px) {
    margin-top: 10px;
    max-width: 80%;
}

@media (max-width: 480px) {
    max-width: 70%;
}
`;
export const ContainerSecundario = styled.div`

background: linear-gradient(157.44deg,
      rgba(255, 255, 255, 0.6) 0.84%,
      rgba(255, 255, 255, 0.6) 0.85%,
      rgba(255, 255, 255, 0.15) 100%);
border-radius: 30px;
padding: 40px 36px;
flex-direction: column;
display: flex;
backdrop-filter: blur(45px);
height: auto;
min-height: auto;
width: 100%;
max-width: 400px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

@media (max-width: 768px) {
    padding: 30px 24px;
    border-radius: 25px;
    max-width: 90%;
}

@media (max-width: 480px) {
    padding: 25px 20px;
    border-radius: 20px;
    max-width: 95%;
}
`;

export const H1 = styled.h1`

font-style: normal;
font-weight: 700;
font-size: 28px;
line-height: 32px;
text-align: center;
color: #FFFFFF;
margin-bottom: 25px;

@media (max-width: 768px) {
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 20px;
}

@media (max-width: 480px) {
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 15px;
}
`;

export const NomeInput = styled.p`
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 22px;
display: flex;
align-items: center;
letter-spacing: -0.408px;
padding-left: 25px;
color: #EEEEEE;

`;

export const Imput = styled.input`

background: rgba(255, 255, 255, 0.25);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 14px;
width: 342px;
height: 58px;
border: none;
outline: none;
padding-left: 25px;
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 28px;
color: #FFFFFF;
margin-bottom: 25px;
`;

export const Button = styled(Link)`

background: transparent;
 border-radius: 14px;
 width: 100%;
 height: 60px;
 border: 1px solid #FFFFFF;
 font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 28px;
cursor: pointer;
color: #FFFFFF;
cursor: pointer;
 display: flex;
 justify-content: center;
 align-items: center;
 gap: 20px;
 margin-top: 30px;
 text-decoration: none;

 &:hover{
    opacity: 0.8;
 }

 &:active{
    opacity: 0.8;
 }

@media (max-width: 768px) {
    font-size: 16px;
    height: 55px;
    gap: 15px;
    margin-top: 25px;
}

@media (max-width: 480px) {
    font-size: 15px;
    height: 50px;
    gap: 10px;
    margin-top: 20px;
}
`;

export const User = styled.li`

background: rgba(255, 255, 255, 0.25);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 14px;
width: 100%;
height: 50px;
border: none;
outline: none;
display: flex;
align-items: center;
justify-content: space-between;
margin-top: 15px;
padding: 0 20px;

p{
   font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color:#FFFFFF;
    margin: 0;
}

button {
   background: none;
   cursor: pointer;
   border: none;
   padding: 5px;
   display: flex;
   align-items: center;
   justify-content: center;
}

@media (max-width: 768px) {
    height: 45px;
    padding: 0 15px;
    margin-top: 12px;
    
    p {
        font-size: 14px;
        line-height: 20px;
    }
}

@media (max-width: 480px) {
    height: 42px;
    padding: 0 12px;
    margin-top: 10px;
    
    p {
        font-size: 12px;
        line-height: 18px;
    }
    
    button img {
        width: 14px;
        height: 14px;
    }
}
`;

