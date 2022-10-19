import React from "react";
import { Modal, StyleSheet, Text, View, TouchableHighlight, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/reducer/user";
import Auth from "../../services/Auth";
import { commonStyles } from "../../utils/styles";
import { SIZES } from "../../utils/theme";

const ModalMenu = ({ modalVisible, callback, navigation }) => {
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.User);

    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n userdataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa: ", userData);

    var username = "";
    if (userData !== null && userData !== undefined) {
        username = userData[0]?.email?.split("@")[0]
    }

    return (
        <View style={{ alignItems: "flex-start" }} >
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    callback();
                }}
            >
                <TouchableHighlight style={styles.centeredView} onPress={() => { callback() }} underlayColor="transparent">
                    <View style={styles.modalView}>
                        <View style={{ width: 100, height: 100, backgroundColor: "#f7f8f9", borderRadius: 100, ...commonStyles.centerStyles }}>
                            <Image
                                source={require("../../assets/img/auth-svg.png")}
                                style={{ width: 60, height: 60 }}
                            />
                        </View>
                        <Text style={[commonStyles.fs18_700, { marginTop: 5 }]}>{username}</Text>
                        <Text /><Text />
                        <TouchableHighlight
                            style={[styles.button]}
                            underlayColor="#dcdcdc"
                            onPress={() => { navigation.navigate("GetMembershipScreen") }}
                        >
                            <Text style={styles.textStyle}>Get Membership</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={[styles.button]}
                            underlayColor="#dcdcdc"
                            onPress={() => {
                                Auth.logout().then(() => {
                                    dispatch(removeUser([]));
                                })
                            }}
                        >
                            <Text style={styles.textStyle}>Logout</Text>
                        </TouchableHighlight>
                    </View>
                </TouchableHighlight>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: SIZES.width,
        height: SIZES.height,
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: SIZES.width / 1.6,
        height: SIZES.height + 80,
        marginTop: 80
    },
    button: {
        padding: 20,
        width: SIZES.width / 1.6,
        backgroundColor: "#f7f8f9",
        marginTop: 8
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    textStyle: {
        color: "#000",
        fontWeight: "bold",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default ModalMenu;