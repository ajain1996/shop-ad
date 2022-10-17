import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { Button } from "react-native-paper";

export default function App() {
    const mapRef = useRef(null);
    const [region, setRegion] = useState({
        latitude: 51.5079145,
        longitude: -0.0899163,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const tokyoRegion = {
        latitude: 35.6762,
        longitude: 139.6503,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };
    const goToTokyo = () => {
        //complete this animation in 3 seconds
        mapRef.current.animateToRegion(tokyoRegion, 3 * 1000);
    };
    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 24.8607,
                    longitude: 67.0011,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onRegionChangeComplete={(region) => setRegion(region)}
            />
            <Button onPress={() => goToTokyo()} title="Go to Tokyo" />
            <Text style={styles.text}>Current latitude{region.latitude}</Text>
            <Text style={styles.text}>Current longitude{region.longitude}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    text: {
        fontSize: 20,
        backgroundColor: "lightblue",
    },
});