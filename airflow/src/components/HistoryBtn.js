import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HistoryBtn=()=>{
    const nav=useNavigate();
    const onBtnClick=()=>{
        //window.alert('서비스 준비 중입니다.');
        nav('/mylocation');
    }
    return(
        <Btn onClick={onBtnClick}>
            <img src="img/log.png" alt="history"  width="25px" height="25px"/>
            <div>
                예전기록
            </div>
        </Btn>
    )
}

export default HistoryBtn;

const Btn =styled.div`
    margin: 7px 0;
    width: fit-content;
`;