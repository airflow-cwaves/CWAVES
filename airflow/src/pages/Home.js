import React from "react";
import Kakao from "../kakaomap/Kakao";
import styled from "styled-components";
import FindingBtn from "../components/FindingBtn";

const Home =()=>{

    return (
        <Container>
            <Title>AIRFLOW</Title>
            <Box>
                <Kakao/>
                <Btn>
                    <FindingBtn/>            
                </Btn>
            </Box>
        </Container>
    );
};

export default Home;

const Container = styled.div`
  background-color: #aedafc;
  width: 95vw;
  margin:auto;
  text-align: center;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const Title = styled.div`
  /* text-align: center; */
`;

const Btn=styled.div`
    position: relative;
    bottom: 30px;
    /* right: -500px; */
    /* left: 100px; */
    z-index: 1;
`;