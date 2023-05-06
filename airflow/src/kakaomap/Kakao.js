import React, { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { dbService } from "../firebase";
import Visualization from "../components/Visualization";

const { kakao } = window;
var polygonPath = [
    new kakao.maps.LatLng(37.545465145649576, 126.96520280169624),
    new kakao.maps.LatLng(37.545458085478554, 126.96511679275952),
    new kakao.maps.LatLng(37.54548043867851, 126.96506290510864),
    new kakao.maps.LatLng(37.54547328515681, 126.96495000794919),
    new kakao.maps.LatLng(37.545490859851004, 126.96481816664641),
    new kakao.maps.LatLng(37.545401296099739, 126.9646916806749),
    new kakao.maps.LatLng(37.54548334215462, 126.96460040542974),
    new kakao.maps.LatLng(37.545485176064975, 126.96447939729541),
    new kakao.maps.LatLng(37.545417277011726, 126.96439906680272),
    new kakao.maps.LatLng(37.54586322853736, 126.96441277823229),
    new kakao.maps.LatLng(37.54581577388131, 126.96437805752437),
    new kakao.maps.LatLng(37.545779813154405, 126.96440781273165),
    new kakao.maps.LatLng(37.54581633405741, 126.96453938654304),
    new kakao.maps.LatLng(37.54580569884398, 126.96472228175628),
    new kakao.maps.LatLng(37.545752219367345, 126.96490001069012),
    new kakao.maps.LatLng(37.54565801908533, 126.96503491859678),
    new kakao.maps.LatLng(37.54563139100987, 126.96515604858434),
    new kakao.maps.LatLng(37.54564506393239, 126.9651990028593)
];

const Kakao=()=>{
    const container = useRef(<Map/>);
    const [positions,setPositions]=useState([]);
    const [map,setMap]=useState(null);
    const [rate,setRate]=useState('공기청정도 낮음');

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
  position: relative;
  text-align: center;
  width:100%;
  height:30rem;
`;

const Detail=styled.div`
    background-color: white;
`;
export default Kakao;