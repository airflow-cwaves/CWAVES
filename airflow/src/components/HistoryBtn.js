import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HistoryBtn=({focus})=>{
    const nav=useNavigate();
    const onBtnClick=()=>{
        nav('/guide');

    }
    return(
        <Btn onClick={onBtnClick}>
            <Img f={focus} src="img/info.png" alt="history"  width="25px" height="25px"/>
            <Content f={focus}>
                사용팁
            </Content>
        </Btn>
    )
}

export default HistoryBtn;

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
