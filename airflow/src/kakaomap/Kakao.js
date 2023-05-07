import React, { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { dbService } from "../firebase";
import Visualization from "../components/Visualization";

const { kakao } = window;

const Kakao=()=>{
    const container = useRef(<Map/>);
    const [positions,setPositions]=useState([]);
    const [map,setMap]=useState(null);

    useEffect(()=>{
        dbService.collection("airflow")
        .where("Check","==",true)
        .get()
        .then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                if(doc.data().Temperature>23){
                    const parray= {
                        id:doc.id,
                        ...doc.data(),
                        type:"temp",
                    };
                    setPositions((positions)=>[parray,...positions]);
                }else if(doc.data().Humidity>65){
                    const parray= {
                        id:doc.id,
                        ...doc.data(),
                        type:"hum",
                    };
                    setPositions((positions)=>[parray,...positions]);
                }

            });
        });
        const options = {
            center: new kakao.maps.LatLng(37.545472, 126.965074),
            level: 3
        };
        
        // 지도에 다각형을 표시합니다
      const map1 = new kakao.maps.Map(container.current, options);
      setMap(map1);

    },[]);
    

    return(
        <Map ref={container}>
            {positions&&
                positions.map((position)=>(
                    <Visualization
                        key={position.id}
                        position={position}
                        map={map}
                        type={position.type}
                    />
                ))
            }
        </Map>

    );
}


const Map = styled.div`
  /* position: static; */
  /* top:-30px; */
  /* z-index: 99; */
  text-align: center;
  /* width:100%; */
  height:100vh;
`;

export default Kakao;