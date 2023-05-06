import React from "react";

const { kakao } = window;

const Visualization=({position,map,type})=>{
    let content, stC,fC;
    if (type==="temp"){
        stC='#FF3DE5';
        fC='#FF8AEF';
        content=`<Detail class="label">고온 지역</Detail>`;
    }else if (type==="hum"){
        content=`<Detail class="label">다습 지역</Detail>`;
        stC='#39DE2A';
        fC='#A2FF99';
    }

    var polygon = new kakao.maps.Circle({
        // path:polygonPath, // 그려질 다각형의 좌표 배열입니다
        center: new kakao.maps.LatLng(position.Latitude, position.Logitude),
        radius: 50,
        strokeWeight: 3, // 선의 두께입니다
        strokeColor: stC, // 선의 색깔입니다
        strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid', // 선의 스타일입니다
        fillColor: fC, // 채우기 색깔입니다
        fillOpacity: 0.7 // 채우기 불투명도 입니다
    });
    polygon.setMap(map);
    var customOverlay=new kakao.maps.CustomOverlay({
        // map: map, // 커스텀오버레이를 표시할 지도입니다 
        content: content,  // 커스텀오버레이에 표시할 내용입니다
        xAnchor: 0,
        yAnchor: 0,
        position: new kakao.maps.LatLng(position.Latitude, position.Logitude)  // 커스텀오버레이를 표시할 위치입니다. 위치는 다각형의 마지막 좌표로 설정합니다
    });   
      kakao.maps.event.addListener(polygon,'mousedown',function(){
        customOverlay.setMap(map);
      });

      kakao.maps.event.addListener(polygon, 'mouseup', function () {
        setTimeout(function () {
          customOverlay.setMap();
        });
      });

    return(
        <>
        </>
    );
}

export default Visualization;