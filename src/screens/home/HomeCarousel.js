import * as React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {commonStyles} from '../../utils/styles';
import {SIZES} from '../../utils/theme';

const slideList = [
  {image: require('../../assets/img/offerimage.jpeg')},
  // { image: require("../../assets/img/prod/i2.webp") },
  // { image: require("../../assets/img/prod/i3.webp") },
  // { image: require("../../assets/img/prod/i4.webp") },
  // { image: require("../../assets/img/prod/i5.webp") },
  // { image: require("../../assets/img/prod/i7.webp") },
  // { image: require("../../assets/img/prod/i8.webp") },
];

export default function HomeCarousel() {
  return (
    <FlatList
      data={slideList}
      renderItem={({item}) => {
        return <Slide data={item} />;
      }}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}

function Slide({data}) {
  return (
    <View
      style={{
        ...commonStyles.centerStyles,
        paddingVertical: 14,
        paddingHorizontal: 10,
      }}>
      <Image
        source={data.image}
        resizeMode="contain"
        style={{height: 200, width: SIZES.width - 20, borderRadius: 12}}
      />
    </View>
  );
}
