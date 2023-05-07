//위,경도 이용해서 거리 구하는 법

import React, { Component } from 'react';
import { dbService } from './../firebase';
import styled from "styled-components";
import { Link } from 'react-router-dom';

function getDistanceFromLatLonInMeter(lat1, lon1, lat2, lon2) {
    const earthRadiusInMeter = 6371000;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distanceInMeter = earthRadiusInMeter * c;
    return distanceInMeter;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  
const distanceInMeter = getDistanceFromLatLonInMeter(37.5665, 126.9780, 51.5072, -0.1276);
console.log(distanceInMeter); // 출력: 9422378.919537076 (미터 단위)
