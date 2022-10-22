import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
// import MapView from "react-native-maps";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Button } from "react-native-paper";

export default function LocationScreen() {
    const mapRef = useRef(null);

    const [region, setRegion] = useState({
        latitude: 51.5079145,
        longitude: -0.0899163,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 3.78825,
                    longitude: -12.4324,
                    latitudeDelta: 10.015,
                    longitudeDelta: 10.0121,
                }}
                zoomEnabled={true}
                showsUserLocation={true}
                onRegionChangeComplete={(region) => setRegion(region)}
            />
            <Text style={styles.text}>Current latitude{region.latitude}</Text>
            <Text style={styles.text}>Current longitude{region.longitude}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: Dimensions.get("window").height,
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
    },
    // container: {
    //     ...StyleSheet.absoluteFillObject,
    //     flex: 1,
    //     justifyContent: "flex-end",
    //     alignItems: "center",
    // },
    // map: {
    //     ...StyleSheet.absoluteFillObject,
    // },
    text: {
        fontSize: 20,
        backgroundColor: "lightblue",
    },
});