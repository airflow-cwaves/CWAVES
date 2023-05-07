import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MapBtn=({focus})=>{
    const nav=useNavigate();
    const onBtnClick=()=>{
        nav('/main')
    }

    console.log(focus);
    return(
        <Btn onClick={onBtnClick}>
            <Img src="img/pin.png" f={focus} alt="mainmap" width="20px" height="25px"/>
            <Content f={focus}>
                실시간지도
            </Content>
        </Btn>
    )
}

export default MapBtn;

const Btn =styled.div`
    margin: 7px 0;
    width: 25vw;
`;
const Content =styled.div`
    color: ${props=> props.f &&'#487D3F'};
    font-weight: ${props=> props.f &&'bold'};
`;
const Img=styled.img`
    filter: ${props=> props.f &&'invert(42%) sepia(12%) saturate(1844%) hue-rotate(65deg) brightness(95%) contrast(84%);'};
`;