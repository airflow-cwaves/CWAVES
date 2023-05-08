import React, { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { dbService } from "../firebase";
import Visualization from "../components/Visualization";

const { kakao } = window;
var colorList=['#FD9D9D','#FDEE9D','#AFCDAA', '#9DC4FD','white']
var strokeList=['#FE8080','#FEEA80','#96AC8E', '#80A3FE','white']

const Kakao=()=>{
    const container = useRef(<Map/>);
    const [positions,setPositions]=useState([]);
    const [map,setMap]=useState(null);
    const [c,setC]=useState(null);
    var type=5;
    var categoryList= ['고온','미세먼지','유해가스','건조','전체'];
    const onCategoryClick=(category)=>{
        if(category===4){
            setPositions([]);
            setC(null);
        }else{
            setC(category);
            setPositions([]);
        }
    };
    useEffect(()=>{
        dbService.collection("airflow")
        .where("Check","==",true)
        .get()
        .then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                if(doc.data().Temperature>=33) type=0;
                else if(doc.data().Dust>=36) type=1;
                else if(doc.data().Gas>23) type=2;
                else if(doc.data().Humidity<=35) type=3;
                const parray= {
                    id:doc.id,
                    ...doc.data(),
                    type:type,
                };
                setPositions((positions)=>[parray,...positions]);
            });
        });
        const options = {
            center: new kakao.maps.LatLng(37.545472, 126.965074),
            level: 3
        };
        // 지도에 다각형을 표시합니다
        const map1 = new kakao.maps.Map(container.current, options);
        setMap(map1);

    },[c]);

    return(
        <>
        <Map ref={container}>
            <CateList>
                {categoryList.map((category)=>(
                    <Category
                        onClick={()=>onCategoryClick(categoryList.indexOf(category))} 
                        i={categoryList.indexOf(category)}
                        key={categoryList.indexOf(category)}>
                        {category}
                    </Category>
                ))}
            </CateList>
            {positions&&
                positions.map((position)=>(
                    <Visualization
                        key={position.id}
                        position={position}
                        map={map}
                        type={position.type}
                        isCheck={c}
                    />
                ))
            }
        </Map>
        </>
        
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
const Category =styled.div`
    position: relative;
    top: 10px;
    z-index: 2;
    margin: 0 2px;
    padding: 2px 4px;
    width: fit-content;
    background-color: white;
    border-radius: 10px;
    background-color: ${props=> colorList[props.i]};
    border: ${props=> strokeList[props.i]};
    box-shadow: 0px 0px 5px grey;
`;
const CateList=styled.div`
    display: inline-flex;
    justify-content: space-around;
`;

export default Kakao;