import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FindingBtn =({focus})=>{
    const nav=useNavigate();
    const onBtnClick=()=>{
        nav('/pathfinding')
    };
    return (
        <Btn onClick={onBtnClick}>
            <Img f={focus} src="img/path.png" alt="pathfinding"  width="20px" height="25px"/>
            <Content f={focus}>
                길찾기
            </Content>
        </Btn>
    );

};

export default FindingBtn;

const Btn =styled.div`
    margin: 7px 0;
    width: fit-content;
`;

const Content =styled.div`
    color: ${props=> props.f &&'#487D3F'};
    font-weight: ${props=> props.f &&'bold'};
`;
const Img=styled.img`
    filter: ${props=> props.f &&'invert(42%) sepia(12%) saturate(1844%) hue-rotate(65deg) brightness(95%) contrast(84%);'};
`;