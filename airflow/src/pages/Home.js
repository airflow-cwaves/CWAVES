import React from "react";
import Kakao from "../kakaomap/Kakao";
import styled from "styled-components";
import FindingBtn from "../components/FindingBtn";
import HistoryBtn from "../components/HistoryBtn";
import MapBtn from "../components/MapBtn";

const Home =()=>{

    return (
        <Container>
            <Title>
              <img src="img/airflow.png" alt="logo"/>
            </Title>
            <Box>
                <Kakao/>
                <Btn>
                    <HistoryBtn />
                    <MapBtn focus={true}/>
                    <FindingBtn focus={false} />            
                </Btn>
            </Box>
        </Container>
    );
};

export default Home;

const Container = styled.div`
  /* background-color: #aedafc; */
  width: 100vw;
  margin:auto;
  text-align: center;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  background-color: white;
  margin: 2vh 0 1vh;

`;

const Btn=styled.div`
    position: absolute;
    width: 90%;
    display: inline-flex;
    justify-content: space-around;
    border-radius: 10px;
    margin: 2% 5%;
    background-color: white;
    bottom: 1vh;
    z-index: 1;
    box-shadow: 0px 0px 10px gray;
`;