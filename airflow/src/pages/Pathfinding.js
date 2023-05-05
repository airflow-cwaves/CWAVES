import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
const { kakao } = window;

const Pathfinding=()=>{
    const [map,setMap]=useState(null);
    const container = useRef(<Map/>);
    useEffect(()=>{
        
        const options = {
            center: new kakao.maps.LatLng(37.545472, 126.965074),
            level: 3
        };
        const map1 = new kakao.maps.Map(container.current, options);
        setMap(map1);
        var positions = [
            {
                title: '카카오', 
                latlng: new kakao.maps.LatLng(37.545965, 126.965802)
            },
            {
                title: '생태연못', 
                latlng: new kakao.maps.LatLng(37.544180, 126.965062)
            },
            {
                title: '텃밭', 
                latlng: new kakao.maps.LatLng(37.543901, 126.963818)
            },
            {
                title: '근린공원',
                latlng: new kakao.maps.LatLng(37.545501, 126.964691)
            }
        ];
        function makeOverListener(map, marker, infowindow) {
            return function() {
                infowindow.open(map, marker);
            };
        }
        
        // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
        function makeOutListener(infowindow) {
            return function() {
                infowindow.close();
            };
        }
        for (var i = 0; i < positions.length; i ++) {
        
            // 마커 이미지의 이미지 크기 입니다
            // var imageSize = new kakao.maps.Size(24, 35); 
            
            // 마커 이미지를 생성합니다    
            // var markerImage = new kakao.maps.MarkerImage(/*imageSrc,*/ imageSize); 
            
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                clickable: true,
                position: positions[i].latlng, // 마커를 표시할 위치
                title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                // image : markerImage // 마커 이미지 
            });

            var iwContent = '<div style="padding:5px;"><br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                iwRemovable =true,
                iwPosition =  positions[i].latlng//인포윈도우 표시 위치입니다

            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                position : iwPosition,
                removable: iwRemovable, 
                content : iwContent 
            });
            
            // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
            kakao.maps.event.addListener(marker, 'click', makeOverListener(map1, marker, infowindow));
                // 마커 위에 인포윈도우를 표시합니다
            marker.setMap(map1);
        }
    },[]);

    
    return(
        <Container>
            <Title>AIRFLOW</Title>
            <Box>
                <Map 
                    ref={container}
                />
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