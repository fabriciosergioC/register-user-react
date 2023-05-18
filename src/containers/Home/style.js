import styled from "styled-components";
import Background from "../../imagens/background1.svg"
import { Link } from "react-router-dom"

export const Container = styled.div`

background: url("${Background}");
background-size :cover;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
`;

export const Imagem = styled.img`
margin-top: 14px;

`;
export const ContainerSecundario = styled.div`

background: linear-gradient(157.44deg,
      rgba(255, 255, 255, 0.6) 0.84%,
      rgba(255, 255, 255, 0.6) 0.85%,
      rgba(255, 255, 255, 0.15) 100%);
border-radius: 61px 61px 0px 0px;
padding: 50px 36px;
height: 100vh;
flex-direction: column;
display: flex;
`;

export const H1 = styled.h1`

font-style: normal;
font-weight: 700;
font-size: 34px;
line-height: 40px;
text-align: center;
color: #FFFFFF;

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

background: rgba(0, 0, 0, 0.8);
 border-radius: 14px;
 width: 342px;
 height: 74px;
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

 & :hover{
    opacity: 0.8;
 }

 &:active{

    opacity: 0.8;
 }

margin-top: 130px;
`;


