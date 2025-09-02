import styled from "styled-components";
import Background from "../../imagens/background1.svg"
import { Link } from "react-router-dom"

export const Container = styled.div`

background: url("${Background}");
background-size: cover;
background-position: center;
background-repeat: no-repeat;
min-height: 100vh;
width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    padding: 20px;
    
    @media (max-width: 768px) {
        gap: 20px;
        padding: 10px;
    }
`;

export const Imagem = styled.img`
margin-top: 14px;
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
min-height: auto;
height: auto;
flex-direction: column;
display: flex;
width: 100%;
max-width: 400px;
backdrop-filter: blur(10px);
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
font-size: 16px;
line-height: 20px;
display: flex;
align-items: center;
letter-spacing: -0.408px;
padding-left: 20px;
color: #EEEEEE;
margin-top: 15px;
margin-bottom: 8px;

@media (max-width: 768px) {
    font-size: 14px;
    line-height: 18px;
    padding-left: 18px;
    margin-top: 12px;
    margin-bottom: 6px;
}

@media (max-width: 480px) {
    font-size: 12px;
    line-height: 16px;
    padding-left: 15px;
    margin-top: 10px;
    margin-bottom: 5px;
}
`;

export const Imput = styled.input`

background: rgba(255, 255, 255, 0.25);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 14px;
width: 100%;
height: 50px;
border: none;
outline: none;
padding-left: 20px;
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 22px;
color: #FFFFFF;
margin-bottom: 20px;

&::placeholder {
    color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 768px) {
    font-size: 16px;
    line-height: 20px;
    height: 45px;
    padding-left: 18px;
    margin-bottom: 18px;
}

@media (max-width: 480px) {
    font-size: 14px;
    line-height: 18px;
    height: 42px;
    padding-left: 15px;
    margin-bottom: 15px;
}
`;

export const Button = styled(Link)`

background: rgba(0, 0, 0, 0.8);
 border-radius: 14px;
 width: 100%;
 height: 60px;
 border: none;
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
 text-decoration: none;
 margin-top: 30px;

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


