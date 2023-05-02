import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Title = styled.div`
  text-align: center;
`;
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
    const navi=useNavigate();
    
    useEffect(()=>{
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.545472, 126.965074),
            level: 3
        };
        var polygon = new kakao.maps.Polygon({
            path:polygonPath, // 그려질 다각형의 좌표 배열입니다
            strokeWeight: 3, // 선의 두께입니다
            strokeColor: '#39DE2A', // 선의 색깔입니다
            strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일입니다
            fillColor: '#A2FF99', // 채우기 색깔입니다
            fillOpacity: 0.7 // 채우기 불투명도 입니다
        });
        
        // 지도에 다각형을 표시합니다
      const map = new kakao.maps.Map(container, options);
      polygon.setMap(map);
      

    },[]);

    return(
        <>
            <Title>AIRFLOW</Title>
            <div id="map" 
            style={{textAlign:"center",display:"flex",width:"500px",height:"400px"}}
            // onClick={navi} 
            // onMouseDown={navi}
            >

            </div>
        </>

    );
}

export default Kakao;