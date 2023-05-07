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
            <img src="img/path.png" alt="pathfinding"  width="20px" height="25px"/>
            <div>
                길찾기
            </div>
        </Btn>
    );

};

export default FindingBtn;

const Btn =styled.div`
    margin: 7px 0;
    width: fit-content;
`;