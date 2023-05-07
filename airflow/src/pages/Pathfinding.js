import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import EcoMap from "../components/EcoMap";
import { dbService } from './../firebase';
import HistoryBtn from "../components/HistoryBtn";
import MapBtn from "../components/MapBtn";
import FindingBtn from "../components/FindingBtn";
const { kakao } = window;

const Pathfinding=()=>{
    const [positions,setPositions]=useState([]);
    const [map,setMap]=useState(null);
    const container = useRef(<Map/>);
        
    useEffect(()=>{
        dbService.collection("airflow")
            .where("Check","==",true)
            .get()
            .then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    const parray= {
                        id:doc.id,
                        ...doc.data(),
                    };
                    setPositions((positions)=>[parray,...positions]);
                });
            });
        const options = {
            center: new kakao.maps.LatLng(37.545472, 126.965074),
            level: 3
        };
        const map1 = new kakao.maps.Map(container.current, options);
        setMap(map1);  
    },[]);

    return(
        <Container>
            <Title>
              <img src="img/airflow.png" alt="logo"/>
            </Title>
            <Box>
                <Map ref={container}>
                    {positions&&
                        positions.map((pin)=>(
                            <EcoMap 
                                map={map}
                                key={pin.id}
                                position={pin}
                            />
                        ))
                    }
                </Map>
                <Btn>
                    <HistoryBtn />
                    <MapBtn />
                    <FindingBtn/>            
                </Btn>
            </Box>
        </Container>
    );    
}

export default Pathfinding;

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

const Map = styled.div`
  /* position: static; */
  /* top:-30px; */
  /* z-index: 99; */
  text-align: center;
  /* width:100%; */
  height:100vh;
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

