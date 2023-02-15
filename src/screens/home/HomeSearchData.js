import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import Auth from '../../services/Auth';
import {getOffersByLocationPostRequest} from '../../utils/API';
import {setOffer} from '../../redux/reducer/offer';
import {commonStyles} from '../../utils/styles';
import {useDispatch, useSelector} from 'react-redux';
import {SIZES} from '../../utils/theme';

export default function HomeSearchData({
  showSuggestion,
  loading,
  suggestionTitleData,
  setSuggestionTitleData,
  setShowSuggestion,
  setLocationTitle,
}) {
  const dispatch = useDispatch();
  const {offerData} = useSelector(state => state.Offer);
  console.log(
    suggestionTitleData,
    '<<< suggestion title data',
    loading,
    '<<< loading',
  );
  return showSuggestion ? (
    <ScrollView style={{width: SIZES.width, backgroundColor: '#fff'}}>
      {loading ? (
        <View
          style={{width: '100%', height: 180, ...commonStyles.centerStyles}}>
          <ActivityIndicator size={40} />
        </View>
      ) : suggestionTitleData?.length === 0 && offerData.length === 0 ? (
        <View
          style={{
            backgroundColor: '#fff',
            height: 90,
            ...commonStyles.centerStyles,
          }}>
          <Text style={{...commonStyles.fs14_400, color: '#000'}}>
            No Result
          </Text>
        </View>
      ) : (
        suggestionTitleData?.map((suggTitles, index) => {
          return (
            <TouchableHighlight
              style={{padding: 12, width: '100%'}}
              underlayColor="#ccc"
              key={index}
              onPress={() => {
                Auth.getLocalStorageData('bearer').then(token => {
                  getOffersByLocationPostRequest(
                    suggTitles?.location,
                    token,
                    response => {
                      if (response !== null) {
                        dispatch(setOffer(response?.data));
                        // setSuggestionTitleData(response?.data);
                        setShowSuggestion(false);
                        setLocationTitle(suggTitles?.location);
                      }
                    },
                  );
                });
              }}>
              <Text style={{...commonStyles.fs12_400, color: '#000'}}>
                {suggTitles?.location}
              </Text>
            </TouchableHighlight>
          );
        })
      )}
    </ScrollView>
  ) : (
    <></>
  );
}
