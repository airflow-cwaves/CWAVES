import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MapBtn=()=>{
    const nav=useNavigate();
    const onBtnClick=()=>{
        nav('/main')
    }

    return(
        <Btn onClick={onBtnClick}>
            <img src="img/pin.png" alt="mainmap" width="20px" height="25px"/>
            <div>
                실시간지도
            </div>
        </Btn>
    )
}

export default MapBtn;

const Btn =styled.div`
    margin: 7px 0;
    width: 25vw;
`;
const Content =styled.div`

`;