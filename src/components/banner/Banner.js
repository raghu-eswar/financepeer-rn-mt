import {useFocusEffect} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR} from '../../common/constants';
import {IMAGES} from '../../common/imageData';
import BannerImage from './BannerImage';

const BANNER_IMAGES = IMAGES.filter(item => !!item);
const SPACE = 10;

const Banner = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const {width, height} = useWindowDimensions();
  const flatlist = useRef(null);
  const ITEM_WIDTH = width;
  const ITEM_HEIGHT = ITEM_WIDTH * 0.7;
  const inputRange = BANNER_IMAGES.map((_, i) => i * ITEM_WIDTH);
  const translateY = scrollX.interpolate({
    inputRange: inputRange,
    outputRange: BANNER_IMAGES.map((_, i) => i * 2 * SPACE),
    extrapolate: 'clamp',
  });
  useFocusEffect(
    React.useCallback(() => {
      const interval = setInterval(() => {
        const newIndex =
          activeIndex < BANNER_IMAGES.length ? activeIndex + 1 : 0;
        scrollToIndex(newIndex);
      }, 2000);
      return () => clearInterval(interval);
    }, [activeIndex]),
  );

  const scrollToIndex = newIndex => {
    flatlist.current &&
      flatlist.current.scrollToIndex({
        animated: true,
        index: newIndex,
      });
    setActiveIndex(newIndex);
  };

  return (
    <View style={styles.center}>
      <Animated.FlatList
        ref={flatlist}
        data={IMAGES}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={styles.center}
        keyExtractor={(ignored, index) => index.toString()}
        horizontal
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        onMomentumScrollEnd={e =>
          setActiveIndex(Math.floor(e.nativeEvent.contentOffset.x / ITEM_WIDTH))
        }
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        renderItem={({item}) => {
          if (!item) {
            return null;
          }

          return (
            <View
              style={[
                styles.banner,
                {
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                },
              ]}>
              <BannerImage image={item} />
            </View>
          );
        }}
      />
      <View style={styles.indicatorContainer}>
        {BANNER_IMAGES.map((_, i) => (
          <View
            key={i.toString()}
            style={[
              styles.indicator,
              styles.indicatorInactive,
              {
                left: SPACE * i * 2,
              },
            ]}
          />
        ))}
        <Animated.View
          style={[
            styles.indicator,
            styles.indicatorActive,
            {
              transform: [{translateX: translateY}],
            },
          ]}
        />
      </View>
      <View style={[styles.absolute, styles.center, styles.buttonLeft]}>
        <TouchableOpacity
          onPress={() =>
            flatlist.current &&
            activeIndex > 0 &&
            scrollToIndex(activeIndex - 1)
          }>
          <MaterialCommunityIcons
            name="chevron-left"
            size={32}
            color={COLOR.white}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.absolute, styles.center, styles.buttonRight]}>
        <TouchableOpacity
          onPress={() =>
            flatlist.current &&
            activeIndex < BANNER_IMAGES.length &&
            scrollToIndex(activeIndex + 1)
          }>
          <MaterialCommunityIcons
            name="chevron-right"
            size={32}
            color={COLOR.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    elevation: 8,
    shadowColor: COLOR.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 3,
    shadowOpacity: 0.1,
  },
  absolute: {
    position: 'absolute',
  },
  indicatorContainer: {
    flexDirection: 'row',
    padding: SPACE,
    alignItems: 'center',
    width: BANNER_IMAGES.length * (SPACE + 8),
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
  },
  indicatorInactive: {
    borderWidth: 1,
    borderColor: COLOR.textPrimary,
  },
  indicatorActive: {
    backgroundColor: COLOR.primary,
  },
  buttonLeft: {
    left: 5,
  },
  buttonRight: {
    right: 5,
  },
  flex: {
    flex: 1,
  },
});

export default Banner;
