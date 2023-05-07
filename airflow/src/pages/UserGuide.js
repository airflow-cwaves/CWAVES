import styled from "styled-components";
import React from "react";
import HistoryBtn from "../components/HistoryBtn";
import MapBtn from "../components/MapBtn";
import FindingBtn from "../components/FindingBtn";
const Guide5=()=>{


    return(
        <>

        <Container>
            <Title>
              <img src="img/airflow.png" alt="logo"/>
            </Title>
            <h5>
            <a href ="#">실시간 지도     </a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="##">길찾기  </a>
            </h5>
        </Container>

            <Box0>
            <h3 id ="#">🙋‍♀️실시간 지도를 사용하고 싶어요!</h3>
            <Box1>
                <div><b>고온?</b></div>
                <Box2>기상청 폭염주의보 기준에 따라 33℃ 이상인 경우에 고온입니다.</Box2>
            </Box1>
            <Box1>
                <div><b>미세먼지?</b></div>
                <Box2>환경부 미세먼지 예보 등급에 따라 36㎍/㎥ 이상인 “나쁨”부터 나타납니다. 외출시 마스크를 착용하고 외출해주세요!</Box2>
            </Box1>
            <Box1>
                <div><b>유해가스?</b></div>
                <Box2>LPG</Box2>
                <Box3>액화석유가스로 불리며 가정이나 음식점에서 사용됩니다.</Box3>
                <Box2>메테인</Box2>
                <Box3>교토의정서에서 정의한 6대 온실가스 중 하나로, 지구온난화를 유발합니다.</Box3>
                <Box2>스모크</Box2>
                <Box3>현재 대기중의 스모크, 즉 연기 가스의 농도를 말합니다.</Box3>
                </Box1>
            <Box1>
                <div><b>건조?</b></div>
                <Box2>기상청 건조조주의보 기준에 따라 35%이하인 경우에 건조조입니다.</Box2>
            </Box1>

            <h3 id="##">🙋‍♀️길찾기를 사용하고 싶어요!</h3>
            <Box1>
            <div><b>에코 길찾기</b></div>
            <Box2>최근에 측정한 값을 통해 미세먼지의 농도와 온도가 낮은 곳으로 현재 위치에서 목표까지 에코 길찾기를 안내합니다.</Box2>
            </Box1>
            <Box1>
            <div><b>빠른 길찾기</b></div>
            <Box2>기존의 kakao길찾기를 통해 현재 위치에서 목표까지 가장 빠른 길찾기를 안내합니다.</Box2>
            </Box1>
            </Box0>
<Container>
    <Box>
            <Btn>
                    <HistoryBtn focus={true}/>
                    <MapBtn focus={false}/>
                    <FindingBtn focus={false} />            

        
                      
        </Btn></Box>
        </Container>
        </>
        
        
        
        
        
        
    );
}


export default Guide5;
const Box0= styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin-bottom: 10vh;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  /* background-color: #aedafc; */
  width: 100vw;
  margin:auto;
  text-align: center;
`;

const Title = styled.div`
  background-color: white;
  margin: 2vh 0 1vh;
`;

const Box1 = styled.div`
    margin-left: 30px; 
    margin-bottom: 10px;
`;

const Box2 = styled.div`
    margin-left:15px; 
`;

const Box3 = styled.div`
    margin-left: 15px; 
    margin-bottom: 10px;
`;

const Btn=styled.div`
    position: fixed;
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