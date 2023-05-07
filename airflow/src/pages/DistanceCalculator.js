import { useState } from 'react';

function DistanceCalculator() {
  const [lat1, setLat1] = useState('');
  const [lon1, setLon1] = useState('');
  const [lat2, setLat2] = useState('');
  const [lon2, setLon2] = useState('');
  const [distance, setDistance] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const distanceInMeter = getDistanceFromLatLonInMeter(lat1, lon1, lat2, lon2);
    setDistance(distanceInMeter);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>위도1: </label>
          <input type="text" value={lat1} onChange={(event) => setLat1(event.target.value)} />
        </div>
        <div>
          <label>경도1: </label>
          <input type="text" value={lon1} onChange={(event) => setLon1(event.target.value)} />
        </div>
        <div>
          <label>위도2: </label>
          <input type="text" value={lat2} onChange={(event) => setLat2(event.target.value)} />
        </div>
        <div>
          <label>경도2: </label>
          <input type="text" value={lon2} onChange={(event) => setLon2(event.target.value)} />
        </div>
        <button type="submit">계산</button>
      </form>
      {distance && (
        <p>
          두 지점 간의 거리는 {distance} 미터입니다.
        </p>
      )}
    </div>
  );
}

function getDistanceFromLatLonInMeter(lat1, lon1, lat2, lon2) {
  // 위에서 작성한 코드를 그대로 가져옵니다.
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

export default DistanceCalculator;
