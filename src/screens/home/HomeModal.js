import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import CustomCheckbox from '../../components/CustomCheckbox';
import Auth from '../../services/Auth';
import { addNewFeedbackPostAPI } from '../../utils/API';
import { commonStyles } from '../../utils/styles';
import { SIZES } from '../../utils/theme';
import Toast from 'react-native-simple-toast';

const HomeModal = ({
  modalVisible,
  feedbackFor,
  feedbackNumber,
  callback,
  showSave = true,
  onSaveIT = () => { },
  setModalVisible,
  savedCallback,
}) => {
  const { userData } = useSelector(state => state.User);

  const [showCheck, setShowCheck] = useState(false);
  const [isChecked, setIsChecked] = useState('');
  const [uData, setUData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (userData !== null && userData !== undefined) {
      setUData(userData[0]);
    }
  }, []);

  const handleFeedback = () => {
    if (isChecked?.length === 0) {
      setError(true);
    } else {
      setLoading(true);
      Auth.getLocalStorageData('bearer').then(token => {
        addNewFeedbackPostAPI(
          uData?.name,
          uData?.mobile,
          uData?.email,
          feedbackFor,
          feedbackNumber,
          isChecked,
          token,
          response => {
            setLoading(false);
            if (response !== null) {
              if (response?.created_feedback) {
                Toast.show('Feedback submitted Successfully!');
                setModalVisible(false);
              }
            }
          },
        );
      });
    }
  };

  const [isSaved, setIsSaved] = useState(false);

  return (
    <View style={{ alignItems: 'flex-start' }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // callback();
          setModalVisible(!modalVisible);
        }}>
        <TouchableHighlight
          style={styles.centeredView}
          onPress={() => {
            // callback();
            setModalVisible(!modalVisible);
          }}
          underlayColor="transparent">
          <TouchableOpacity style={styles.modalView} activeOpacity={1}>
            <TouchableHighlight
              style={[styles.button]}
              underlayColor="#dcdcdc"
              onPress={() => {
                setShowCheck(true);
              }}>
              <Text style={styles.textStyle}>Report</Text>
            </TouchableHighlight>
            {showSave && (
              <>
                <View
                  style={{
                    width: SIZES.width / 1.6,
                    height: 1,
                    backgroundColor: '#dcdcdc',
                  }}
                />
                <TouchableHighlight
                  style={[styles.button]}
                  underlayColor="#dcdcdc"
                  onPress={() => {
                    setIsSaved(!isSaved);
                    onSaveIT();
                    savedCallback();
                  }}>
                  {isSaved ? (
                    <Text style={styles.textStyle}>Saved</Text>
                  ) : (
                    <Text style={styles.textStyle}>Save</Text>
                  )}
                </TouchableHighlight>
              </>
            )}

            {showCheck ? (
              <View style={{ marginVertical: 10 }}>
                <TextInput
                  placeholder=""
                  placeholderTextColor="#999"
                  defaultValue={isChecked}
                  onChangeText={val => {
                    setIsChecked(val);
                    setError(false);
                  }}
                  style={{ ...styles.reportInput }}
                />
                {error ? (
                  <Text
                    style={{
                      ...commonStyles.fs13_400,
                      color: 'red',
                      marginTop: -6,
                      marginBottom: 6,
                    }}>
                    ! Feedback required
                  </Text>
                ) : (
                  <></>
                )}

                <CustomCheckbox
                  title="Spam"
                  isChecked={isChecked}
                  setIsChecked={setIsChecked}
                  callback={() => {
                    setError(false);
                    setModalVisible(!modalVisible);
                  }}
                />
                <CustomCheckbox
                  title="Offensive"
                  isChecked={isChecked}
                  setIsChecked={setIsChecked}
                  callback={() => {
                    setError(false);
                    setModalVisible(!modalVisible);
                  }}
                />
                <CustomCheckbox
                  title="Violent"
                  isChecked={isChecked}
                  setIsChecked={setIsChecked}
                  callback={() => {
                    setError(false);
                    setModalVisible(!modalVisible);
                  }}
                />
                <CustomCheckbox
                  title="Sexually inappropriate"
                  isChecked={isChecked}
                  setIsChecked={setIsChecked}
                  callback={() => {
                    setError(false);
                    setModalVisible(!modalVisible);
                  }}
                />

                <SubmitFeedbackbtn
                  btnText={loading ? 'loading' : 'Submit Feedback'}
                  onPress={handleFeedback}
                />
              </View>
            ) : (
              <></>
            )}
          </TouchableOpacity>
        </TouchableHighlight>
      </Modal>
    </View>
  );
};

function SubmitFeedbackbtn({ btnText, onPress }) {
  return (
    <LinearGradient
      colors={['#E27127', '#EDAA26']}
      style={{ zIndex: 1, borderRadius: 4, marginTop: 6 }}>
      <TouchableHighlight
        style={[styles.btnWrapper]}
        onPress={onPress}
        underlayColor="E27127">
        <Text style={{ ...commonStyles.fs16_500, color: '#fff' }}>{btnText}</Text>
      </TouchableHighlight>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: SIZES.width,
    height: SIZES.height,
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: SIZES.width / 1.6,
  },
  button: {
    padding: 20,
    width: SIZES.width / 1.6,
    backgroundColor: '#f7f8f9',
    alignItems: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: '#000',
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  reportInput: {
    width: SIZES.width / 1.8,
    height: 48,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    marginBottom: 6,
    color: '#000',
    paddingHorizontal: 12,
  },
  btnWrapper: {
    width: '100%',
    height: 48,
    ...commonStyles.centerStyles,
  },
});

export default HomeModal;
