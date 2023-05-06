import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import EcoMap from "../components/EcoMap";
import { dbService } from './../firebase';
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
            <Title>AIRFLOW</Title>
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
            </Box>
        </Container>
    );    
}

export default Pathfinding;
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
const Map = styled.div`
  position: relative;
  text-align: center;
  width:100%;
  height:30rem;
`;







