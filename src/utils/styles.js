import { StyleSheet } from "react-native";
import { COLORS } from "./theme";

export const commonStyles = StyleSheet.create({
    customCard: {
        width: "100%",
        backgroundColor: "#fff",
        elevation: 12,
        shadowColor: "#333",
        paddingHorizontal: 20,
        borderRadius: 9,
        paddingVertical: 16
    },
    commonElevation: {
        elevation: 8, shadowColor: "#333", backgroundColor: "#fff", width: "100%",
    },
    commonBtnStyle: {
        width: 226, height: 52,
        backgroundColor: COLORS.pink,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    commonBorderedBtnStyle: {
        width: 226, height: 52,
        borderWidth: 1.6,
        borderColor: COLORS.pink,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    commonBorderedRoundBtnStyle: {
        width: 226, height: 52,
        borderWidth: 1.6,
        borderColor: COLORS.pink,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    centerStyles: {
        justifyContent: "center",
        alignItems: "center"
    },
    fs10_400: {
        fontSize: 10,
        fontWeight: "400",
        color: "#000"
    },
    fs10_500: {
        fontSize: 10,
        fontWeight: "500",
        color: "#000"
    },
    fs10_600: {
        fontSize: 10,
        fontWeight: "600",
        color: "#000"
    },
    fs10_700: {
        fontSize: 10,
        fontWeight: "700",
        color: "#000"
    },
    fs10_400: {
        fontSize: 10,
        fontWeight: "400",
        color: "#000"
    },
    fs12_400: {
        fontSize: 12,
        fontWeight: "400",
        color: "#000"
    },
    fs12_500: {
        fontSize: 12,
        fontWeight: "500",
        color: "#000"
    },
    fs12_600: {
        fontSize: 12,
        fontWeight: "600",
        color: "#000"
    },
    fs12_700: {
        fontSize: 12,
        fontWeight: "700",
        color: "#000"
    },
    fs13_300: {
        fontSize: 13,
        fontWeight: "300",
        color: "#000"
    },
    fs13_400: {
        fontSize: 13,
        fontWeight: "400",
        color: "#000"
    },
    fs13_500: {
        fontSize: 13,
        fontWeight: "500",
        color: "#000"
    },
    fs14_300: {
        fontSize: 14,
        fontWeight: "300",
        color: "#000"
    },
    fs14_400: {
        fontSize: 14,
        fontWeight: "400",
        color: "#000"
    },
    fs14_500: {
        fontSize: 14,
        fontWeight: "500",
        color: "#000"
    },
    fs14_600: {
        fontSize: 14,
        fontWeight: "600",
        color: "#000"
    },
    fs14_700: {
        fontSize: 14,
        fontWeight: "700",
        color: "#000"
    },
    fs15_400: {
        fontSize: 15,
        fontWeight: "400",
        color: "#000"
    },
    fs15_500: {
        fontSize: 15,
        fontWeight: "500",
        color: "#000"
    },
    fs15_600: {
        fontSize: 15,
        fontWeight: "600",
        color: "#000"
    },
    fs16_400: {
        fontSize: 16,
        fontWeight: "400",
        color: "#000"
    },
    fs16_500: {
        fontSize: 16,
        fontWeight: "500",
        color: "#000"
    },
    fs16_600: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000"
    },
    fs16_700: {
        fontSize: 16,
        fontWeight: "700",
        color: "#000"
    },
    fs18_400: {
        fontSize: 18,
        fontWeight: "400",
        color: "#000"
    },
    fs18_500: {
        fontSize: 18,
        fontWeight: "500",
        color: "#000"
    },
    fs18_700: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000"
    },
    fs22_600: {
        fontSize: 22,
        fontWeight: "600",
        color: "#000"
    },
    fs22_700: {
        fontSize: 22,
        fontWeight: "700",
        color: "#000"
    },
    fs24_400: {
        fontSize: 24,
        fontWeight: "400",
        color: "#000"
    },
    fs24_500: {
        fontSize: 24,
        fontWeight: "500",
        color: "#000"
    },
    fs24_600: {
        fontSize: 24,
        fontWeight: "600",
        color: "#000"
    },
    fs24_700: {
        fontSize: 24,
        fontWeight: "700",
        color: "#000"
    },
    row: {
        flexDirection: "row",
        alignItems: 'center'
    },
    rowStart: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'flex-start'
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    rowAround: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center'
    },
    rowEvenly: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: 'center'
    },
});