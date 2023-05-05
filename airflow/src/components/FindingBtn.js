import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FindingBtn =()=>{
    const nav=useNavigate();
    const onBtnClick=()=>{
        nav('/pathfinding')
    };
    return (
        <Btn onClick={onBtnClick}>
            clean 길찾기 버튼
        </Btn>
    );

};

export default FindingBtn;

const Btn =styled.div`
    background-color: skyblue;
    width: fit-content;
`;