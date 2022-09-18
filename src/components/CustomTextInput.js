import { View, Text, TextInput, Image } from 'react-native'
import React from 'react'
import { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function CustomTextInput({ placeholder, value, onChange, keyboardType, ...rest }) {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <View>
            <View style={{ position: "absolute", left: 18, top: 12 }}>
                <Text style={{ fontSize: 18, color: isSelected ? "#fff" : "#0A5281" }}>@</Text>
                {/* <Entypo name='email' size={30} color={isSelected ? "#fff" : "#0A5281"} /> */}
            </View>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#0A5281"
                onFocus={() => { setIsSelected(true) }}
                onBlur={() => { setIsSelected(false) }}
                onChangeText={onChange}
                keyboardType={keyboardType}
                defaultValue={value}
                style={{
                    width: "100%", height: 55, borderWidth: 1, borderRadius: 4,
                    borderColor: isSelected ? "#fff" : "#0A5281",
                    paddingHorizontal: 50, color: "#fff"
                }}
                {...rest}
            />
            <View style={{ position: "absolute", right: 18, top: 17 }}>
                <Image
                    source={require("../assets/img/cross.png")}
                    style={{ width: isSelected ? 22 : 0, height: isSelected ? 22 : 0, tintColor: "#fff" }}
                />
            </View>
        </View>
    )
}
