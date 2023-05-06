import React, { useState, useEffect } from 'react';

function findLowestDustPath(start, end, mapData) {
  const paths = getAllPossiblePaths(start, end, mapData);
  let lowestDustPath = null;
  let lowestDust = Infinity;

  paths.forEach((path) => {
    let dust = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const current = path[i];
      const next = path[i + 1];
      dust += mapData[current][next];
    }
    if (dust < lowestDust) {
      lowestDust = dust;
      lowestDustPath = path;
    }
  });

  return lowestDustPath;
}

function getAllPossiblePaths(start, end, mapData) {
  const visited = new Set();
  const paths = [];

  function dfs(path) {
    const current = path[path.length - 1];
    if (current === end) {
      paths.push(path);
      return;
    }
    visited.add(current);
    const neighbors = getNeighbors(current, mapData);
    neighbors.forEach((neighbor) => {
      if (!visited.has(neighbor)) {
        dfs([...path, neighbor]);
      }
    });
    visited.delete(current);
  }

  dfs([start]);
  return paths;
}

function getNeighbors(current, mapData) {
  const neighbors = [];
  for (let i = 0; i < mapData.length; i++) {
    if (mapData[current][i] !== Infinity) {
      neighbors.push(i);
    }
  }
  return neighbors;
}

function Map({ mapData, start, end }) {
  const [lowestDustPath, setLowestDustPath] = useState(null);

  useEffect(() => {
    const path = findLowestDustPath(start, end, mapData);
    setLowestDustPath(path);
  }, [start, end, mapData]);

  return (
    <div>
      {lowestDustPath ? (
        <p>Lowest dust path: {lowestDustPath.join(' -> ')}</p>
      ) : (
        <p>Finding lowest dust path...</p>
      )}
    </div>
  );
}