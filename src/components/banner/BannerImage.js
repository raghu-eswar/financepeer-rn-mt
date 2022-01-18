import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Paragraph, Title} from 'react-native-paper';
import {COLOR} from '../../common/constants';

const BannerImage = ({image}) => {
  return (
    <View style={styles.bannerContainer}>
      <View style={styles.imageContainer}>
        <Image source={{uri: image.uri}} style={styles.image} />
      </View>
      <View style={styles.imageDetails}>
        <Title numberOfLines={1} style={{color: COLOR.white}}>
          {image.title}
        </Title>
        <Paragraph numberOfLines={2} style={{color: COLOR.white}}>
          {image.subtitle}
        </Paragraph>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
    backgroundColor: COLOR.white,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    elevation: 6,
    shadowColor: COLOR.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },
  image: {
    width: '100%',
    borderRadius: 8,
    borderBottomLeftRadius: 8,
    height: '100%',
    resizeMode: 'cover',
  },
  imageDetails: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    padding: 12,
    backgroundColor: '#00000040',
    borderRadius: 8,
    bottom: 8,
    elevation: 8,
    shadowColor: COLOR.transparent,
  },
});

export default BannerImage;
