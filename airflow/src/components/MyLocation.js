import React, { useState, useEffect } from 'react';
import { useGeolocated } from 'react-geolocated';

function MyLocation() {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : coords ? (
        <table>
            <tbody>
                <tr>
                    <td>latitude</td>
                    <td>{coords.latitude}</td>
                </tr>
                <tr>
                    <td>longitude</td>
                    <td>{coords.longitude}</td>
                </tr>
                <tr>
                    <td>altitude</td>
                    <td>{coords.altitude}</td>
                </tr>
                <tr>
                    <td>heading</td>
                    <td>{coords.heading}</td>
                </tr>
                <tr>
                    <td>speed</td>
                    <td>{coords.speed}</td>
                </tr>
            </tbody>
        </table>
    ) : (
        <div>Getting the location data&hellip; </div>
    );
    /*
    const [position, setPosition] = useState({});

    useEffect(() => {
        if (props.coords) {
            setPosition({
                latitude: props.coords.latitude,
                longitude: props.coords.longitude,
            });
        }
    }, [props.coords]);

    return (
        <div>
            <h2>My Location</h2>
            {position.latitude && position.longitude ? (
                <p>
                    위치
                </p>
            ) : (
                <p>Fetching location...</p>
            )}
        </div>
    );
    */
}

export default MyLocation;

//My current position is ({position.latitude}, {position.longitude})