//위,경도 이용해서 거리 구하는 법

import React, { Component, useEffect, useState } from 'react';
import { dbService } from './../firebase';
import styled from "styled-components";
import { Link } from 'react-router-dom';

const FindDistance = () => {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        dbService.collection("airflow2")
            .where("Check", "==", true)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const parray = {
                        id: doc.id,
                        ...doc.data(),
                    };
                    setPositions((positions) => [parray, ...positions]);
                });
            });
    }, []);

    console.log(positions)


    //documentId로 도착지점 idx찾기
    const endDocumentId = "4u1Hf963wZJiNjAODdwz";
    const endIdx = positions.findIndex((position) => position.id === endDocumentId);
    console.log(endIdx)
    

    //인접행렬 초기화
    const adjacencyMatrix = [];
    for (let i = 0; i < positions.length; i++) {
        adjacencyMatrix[i] = [];
        for (let j = 0; j < positions.length; j++) {
            adjacencyMatrix[i][j] = 0; //인접행렬 0으로 초기화
        }
    }

    console.log(adjacencyMatrix)
    positions.forEach((position1, index1) => {
        for (let index2 = 0; index2 < positions.length; index2++) {
            if(index1 == index2) continue; //자기 자신과의 거리는 0
            
            const position2 = positions[index2];
            console.log(position1.info, position2.info)
            const distance = getDistanceFromLatLonInMeter(
                position1.Latitude,
                position1.Logitude,
                position2.Latitude,
                position2.Logitude
            );
            
            let tmp_temp = 0; 
            if(position2.Temperature >= 26 && position2.Temperature <30){ //에어컨 적정온도
                tmp_temp += position2.Temperature;
            }
            else if(position2.Temperature >= 30 && position2.Temperature <33){
                tmp_temp += position2.Temperature*10;
            }
            else if(position2.Temperature >= 33 && position2.Temperature <36){ //폭염 주의보
                tmp_temp += position2.Temperature*20;
            }
            else if(position2.Temperature >= 36){ //폭염 경보 
                tmp_temp += position2.Temperature*40;
            }

            let tmp_dust = 0; 
            if(position2.Dust >= 16 && position2.Dust <= 35){
                tmp_dust += position2.Dust; 
            }
            else if(position2.Dust > 35 && position2.Dust <=75){
                tmp_dust += position2.Dust*2;
            }
            else if(position2.Dust > 75){
                tmp_dust += position2.Dust*10;
            }

            if(distance <= 100){
                adjacencyMatrix[index1][index2] = distance + tmp_temp + tmp_dust; //시작 index1 -> 도착 end1
                //adjacencyMatrix[index2][index1] = distance + tmp_temp + tmp_dust;
            }
            else{
                adjacencyMatrix[index1][index2] = 99999999; //시작 index1 -> 도착 end1
                //adjacencyMatrix[index2][index1] = 99999999;
            }
        }
    });

    const start = 3;
    const end = 2;
    const shortestDistance = dijkstra(adjacencyMatrix, start, end);
    const path = shortestDistance.join(" -> "); // 최단경로 출력
    console.log(`최단거리: ${shortestDistance[end]}, 최단경로: ${path}`);


    return (
        <>
            <h1>FindDistance</h1>
        </>
    );
}

export default FindDistance;


function getDistanceFromLatLonInMeter(lat1, lon1, lat2, lon2) {
    //console.log(lat1, lon1, lat2, lon2)
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

/*
function dijkstra(adjacencyMatrix, start, end) {
    const n = adjacencyMatrix.length;

    // 초기화
    const dist = new Array(n).fill(Number.MAX_SAFE_INTEGER);
    const visited = new Array(n).fill(false);
    const via = new Array(n).fill(null);
    dist[start] = 0;

    // 다익스트라 알고리즘
    for (let i = 0; i < n - 1; i++) {
        // 현재까지 방문하지 않은 정점 중에서 가장 가까운 정점을 선택
        let minDistance = Number.MAX_SAFE_INTEGER;
        let u;
        for (let j = 0; j < n; j++) {
            if (!visited[j] && dist[j] < minDistance) {
                minDistance = dist[j];
                u = j;
            }
        }

        // 가장 가까운 정점 방문
        visited[u] = true;

        // 방문한 정점과 인접한 정점들의 최단거리 갱신
        for (let v = 0; v < n; v++) {
            if (!visited[v] && adjacencyMatrix[u][v] !== 0) {
                dist[v] = Math.min(dist[v], dist[u] + adjacencyMatrix[u][v]);
            }
        }
    }

    return dist[end];
}
*/

function dijkstra(adjacencyMatrix, start, end) {
    const n = adjacencyMatrix.length;
    const dist = new Array(n).fill(Infinity);
    const visited = new Array(n).fill(false);
    const via = new Array(n).fill(null);

    dist[start] = 0;

    for (let i = 0; i < n - 1; i++) {
        const u = getMinDistanceVertex(dist, visited);
        visited[u] = true;

        for (let v = 0; v < n; v++) {
            if (adjacencyMatrix[u][v] !== 0 && !visited[v]) {
                const alt = dist[u] + adjacencyMatrix[u][v];
                if (alt < dist[v]) {
                    dist[v] = alt;
                    via[v] = u;
                }
            }
        }
    }

    return getPath(end, via).concat(end); // 최단경로 배열 반환
}

function getMinDistanceVertex(dist, visited) {
    let minIndex = -1;
    let minDist = Infinity;

    for (let i = 0; i < dist.length; i++) {
        if (!visited[i] && dist[i] < minDist) {
            minIndex = i;
            minDist = dist[i];
        }
    }

    return minIndex;
}

function getPath(end, via) {
    const path = [];
    let current = end;
    while (current !== undefined) {
        path.unshift(current);
        current = via[current];
    }
    return path;
}


