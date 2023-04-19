import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {setOffer} from '../../redux/reducer/offer';
import Auth from '../../services/Auth';
import {getAllCategoriesAPI, getOffersByCategoryAPI} from '../../utils/API';
import {commonStyles} from '../../utils/styles';
import {SIZES} from '../../utils/theme';

const CategoryModal = ({
  modalVisible,
  callback,
  navigation,
  selectedCategory = () => {},
}) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    Auth.getLocalStorageData('bearer').then(token => {
      getAllCategoriesAPI(token, response => {
        if (response !== null) {
          if (response?.data !== null || response?.data !== undefined) {
            setCategories(response?.data);
          }
        }
      });
    });
  }, []);

  return (
    <View style={{alignItems: 'flex-start'}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          callback();
        }}>
        <TouchableHighlight
          style={styles.centeredView}
          onPress={() => {
            callback();
          }}
          underlayColor="transparent">
          <View style={styles.modalView}>
            <ScrollView>
              {categories?.map((item, index) => {
                return (
                  <TouchableHighlight
                    key={index}
                    style={[styles.button]}
                    underlayColor="#dcdcdc"
                    onPress={() => {
                      Auth.getLocalStorageData('bearer').then(token => {
                        getOffersByCategoryAPI(item?._id, token, response => {
                          if (response !== null) {
                            dispatch(setOffer(response?.data));
                            callback();
                          }
                        });
                      });
                    }}>
                    <Text style={styles.textStyle}>{item?.categoryName}</Text>
                  </TouchableHighlight>
                );
              })}
            </ScrollView>
          </View>
        </TouchableHighlight>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: SIZES.width,
    height: SIZES.height,
  },
  centeredView2: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: SIZES.width,
    height: SIZES.height,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: SIZES.width,
    height: 320,
    marginTop: 80,
  },
  modalView2: {
    backgroundColor: '#f7f8f9',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 12,
    width: SIZES.width,
  },
  button: {
    padding: 20,
    width: SIZES.width / 1.1,
    backgroundColor: '#f7f8f9',
    marginBottom: 8,
  },
  button2: {
    padding: 15,
    width: '100%',
    backgroundColor: '#dcdcdc',
    marginTop: 8,
    alignItems: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  switchAccount: {
    width: 120,
    height: 38,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: '#000',
    ...commonStyles.centerStyles,
    marginTop: 6,
  },
});

export default CategoryModal;
