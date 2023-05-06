import React, { useEffect, useState } from "react";
const { kakao } = window;

const EcoMap=({position, map,pid})=>{
    const [place,setPlace]=useState();
    var geocoder = new kakao.maps.services.Geocoder();
    var ps = new kakao.maps.services.Places();  

    function makeOverListener(map, marker, infowindow) {
        return function() {
            infowindow.open(map, marker);
            var s= document.getElementById('eco');
            s.addEventListener("click",function(){
                console.log("Wow");
                window.alert("에코길찾기 알고리즘실행하기");
            })
        };
    }
    
    function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
    function placesSearchCB(data, status) {
        if (status === kakao.maps.services.Status.OK) {
            setPlace(data[0].id);
            // 정상적으로 검색이 완료됐으면
        } 
        else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
            return;
    
        } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
        }
        else{
            console.log("뭐여");
        }
    }
        
    useEffect(()=>{
        searchDetailAddrFromCoords(new kakao.maps.LatLng(position.Latitude, position.Logitude), function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                ps.keywordSearch(result[0].address.address_name, placesSearchCB);
            }   
        });
    },[]);
    useEffect(()=>{
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            clickable: true,
            position: new kakao.maps.LatLng(position.Latitude, position.Logitude), // 마커를 표시할 위치
            // title : position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            // image : markerImage // 마커 이미지 
        });
        var iwContent1 = '<div id="eco" style="padding:5px;">에코 길찾기</div>'
        var iwContent=`<a href="https://map.kakao.com/link/to/${place}" 
        style="color:blue" target="_blank">빠른 길찾기</a>` // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                    
        var infowindow = new kakao.maps.InfoWindow({
            position : new kakao.maps.LatLng(position.Latitude, position.Logitude),
            removable: true, 
            content : iwContent1+iwContent
        });
        // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
        
        kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow,marker.position));
            // 마커 위에 인포윈도우를 표시합니다
        marker.setMap(map);

    },[place]);

    return (
        <>
    
        </>
    );
};

export default EcoMap;

