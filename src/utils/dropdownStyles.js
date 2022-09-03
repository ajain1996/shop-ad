import { StyleSheet } from "react-native";

export const dropdownStyles = StyleSheet.create({
    container: {
        width: 85,
        paddingHorizontal: 4
    },
    dropdown: {
        height: 30,
        color: "#000",
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 14,
        color: "#777",
        marginLeft: -8
    },
    iconStyle: {
        width: 24,
        height: 24,
    },
});