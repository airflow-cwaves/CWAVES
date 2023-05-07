import React from "react";
const { kakao } = window;

const Visualization=({position,map,type,isCheck})=>{
    var colorList=['#FD9D9D','#FDEE9D','#AFCDAA', '#9DC4FD'];
    var strokeList=['#FE8080','#FEEA80','#96AC8E', '#80A3FE'];
    var categoryList= ['온도','미세먼지 수치','유해가스 수치','습도',"℃","ug/m^3","ppm","%"];
    var categoryList1 = ['Temperature','Dust','Gas','Humidity'];
    var a= categoryList1[type];
    var content='<div id="informing">';
    if(type===1){
        content= content+categoryList[type] +": <br>"
        +position[a]+categoryList[type+4];
        if(position[a]<=75){
            content= content+" (나쁨)";
        }else{
            content= content+" (아주나쁨)";
        }
        content=content+"</div>";
    }else if(type===0|| type===3){
        content= content+categoryList[type] +": "
        +position[a]+categoryList[type+4];
        content=content+"</div>";
    }else if(type===2){
        content= content+"LPG 수치: "+position[a+"_lpg"]+categoryList[type+4]
        +"<br>메테인 수치: "+position[a+"_methane"]+categoryList[type+4]
        +"<br>Smoke 수치: "+position[a+"_smoke"]+categoryList[type+4];
        content=content+"</div>";
    }
    var polygon = new kakao.maps.Circle({
        // path:polygonPath, // 그려질 다각형의 좌표 배열입니다
        center: new kakao.maps.LatLng(position.Latitude, position.Logitude),
        radius: 30,
        strokeWeight: 3, // 선의 두께입니다
        strokeColor: strokeList[type], // 선의 색깔입니다
        strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: '', // 선의 스타일입니다
        fillColor: colorList[type], // 채우기 색깔입니다
        fillOpacity: 0.7 // 채우기 불투명도 입니다
    });
    if(isCheck==null){
        if(type>=0 && type<5){
            polygon.setMap(map);
        }
    }else{
        if(type===isCheck){
            polygon.setMap(map);
        }
    }
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