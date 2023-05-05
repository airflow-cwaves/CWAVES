import React, { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

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
    const [map,setMap]=useState(null);
    const [rate,setRate]=useState('공기청정도 낮음');
    let content=`<Detail class="label">${rate}</Detail>`;
    useEffect(()=>{
        const options = {
            center: new kakao.maps.LatLng(37.545472, 126.965074),
            level: 3
        };
        var polygon = new kakao.maps.Circle({
            // path:polygonPath, // 그려질 다각형의 좌표 배열입니다
            center: polygonPath[0],
            radius: 50,
            strokeWeight: 3, // 선의 두께입니다
            strokeColor: '#39DE2A', // 선의 색깔입니다
            strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일입니다
            fillColor: '#A2FF99', // 채우기 색깔입니다
            fillOpacity: 0.7 // 채우기 불투명도 입니다
        });
        // 지도에 다각형을 표시합니다
      const map1 = new kakao.maps.Map(container.current, options);
      setMap(map1);
      polygon.setMap(map1);
      var customOverlay=new kakao.maps.CustomOverlay({
        // map: map, // 커스텀오버레이를 표시할 지도입니다 
        content: content,  // 커스텀오버레이에 표시할 내용입니다
        xAnchor: 0,
        yAnchor: 0,
        position: polygonPath[0]  // 커스텀오버레이를 표시할 위치입니다. 위치는 다각형의 마지막 좌표로 설정합니다
    });   
      kakao.maps.event.addListener(polygon,'mousedown',function(){
        customOverlay.setMap(map1);
        console.log('dd');
      });
    //   kakao.maps.event.addListener(polygon,'onclick',function(){
    //     customOverlay.setMap(map1);
    //   });
      kakao.maps.event.addListener(polygon, 'mouseup', function () {
        setTimeout(function () {
          customOverlay.setMap();
        });
      });

    },[]);
    

    return(
        <>
            <Map 
                ref={container}
            />
        </>

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