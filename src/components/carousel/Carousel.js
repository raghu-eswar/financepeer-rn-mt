import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import {Caption, Paragraph, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import {COLOR} from '../../common/constants';
import {IMAGES} from '../../common/imageData';

const SPACE = 10;

const Carousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const {width, height} = useWindowDimensions();
  const imageWidth = width * 0.5;
  const imageHeight = imageWidth * 1.3;
  const ITEM_WIDTH = width * 0.85;
  const ITEM_HEIGHT = ITEM_WIDTH * 1.8;
  const PLACEHOLDER_ITEM_SIZE = (width - ITEM_WIDTH) / 2;
  const navigation = useNavigation();

  return (
    <View style={styles.flex}>
      <View
        style={[
          styles.absolute,
          {
            width: width,
            height: height,
          },
        ]}>
        {IMAGES.map((item, index) => {
          const inputRange = [
            (index - 2) * ITEM_WIDTH,
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          if (!item) {
            return (
              <View style={styles.emptyAbsoluteView} key={index.toString()} />
            );
          }
          return (
            <Animated.Image
              source={{uri: item.uri}}
              key={index.toString()}
              style={[
                styles.absolute,
                {
                  width: width,
                  height: height,
                  opacity: opacity,
                },
              ]}
              blurRadius={10}
            />
          );
        })}
      </View>
      <SafeAreaView style={{paddingTop: 12}}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.backIcon}>
            <Feather
              name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-left'}
              size={Platform.OS === 'ios' ? 38 : 24}
              color={COLOR.black}
            />
          </View>
        </TouchableWithoutFeedback>
        <Animated.FlatList
          data={IMAGES}
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH}
          decelerationRate={0}
          bounces={false}
          contentContainerStyle={{alignItems: 'center'}}
          keyExtractor={(ignored, index) => index.toString()}
          horizontal
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={16}
          renderItem={({item, index}) => {
            if (!item) {
              return <View style={{width: PLACEHOLDER_ITEM_SIZE}} />;
            }
            const inputRange = [
              (index - 2) * ITEM_WIDTH,
              (index - 1) * ITEM_WIDTH,
              index * ITEM_WIDTH,
            ];
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [-10, -30, -10],
              extrapolate: 'clamp',
            });
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.9, 1, 0.9],
              extrapolate: 'clamp',
            });
            const shadowRadius = scrollX.interpolate({
              inputRange,
              outputRange: [3, 8, 3],
              extrapolate: 'clamp',
            });

            return (
              <View style={{width: ITEM_WIDTH}}>
                <Animated.View
                  style={[
                    styles.carouselView,
                    {
                      transform: [{translateY: translateY}, {scale: scale}],
                      height: ITEM_HEIGHT,
                      shadowRadius: shadowRadius,
                      elevation: shadowRadius,
                    },
                  ]}>
                  <Image
                    source={{uri: item.uri}}
                    style={[
                      styles.image,
                      {
                        width: ITEM_WIDTH - SPACE,
                        height: imageHeight,
                      },
                    ]}
                  />
                  <View style={styles.details}>
                    <Title numberOfLines={2}>{item.title}</Title>
                    <Paragraph numberOfLines={2}>{item.subtitle}</Paragraph>
                    <Caption numberOfLines={8}>{item.description}</Caption>
                  </View>
                </Animated.View>
              </View>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
  flex: {
    flex: 1,
    alignItems: 'center',
  },
  emptyAbsoluteView: {
    width: 0,
    height: 0,
    position: 'absolute',
  },
  backIcon: {
    left: Platform.OS === 'ios' ? 0 : 8,
  },
  carouselView: {
    marginHorizontal: SPACE / 2,
    paddingBottom: SPACE,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: COLOR.white,
    shadowColor: COLOR.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
  },
  image: {
    borderRadius: 8,
    borderBottomLeftRadius: 8,
    resizeMode: 'cover',
  },
  details: {
    flex: 1,
    paddingHorizontal: 12,
    width: '100%',
  },
});

export default Carousel;
