import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import {FAB} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR} from '../../common/constants';
import HandleBack from '../../components/HandleBack';
import Loader from '../../components/Loader';

const PhotosScreen = () => {
  const {width, height} = useWindowDimensions();
  const [photos, setPhotos] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setIsFetching(false);
  };

  const openCamera = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
      saveToPhotos: true,
    };
    const result = await launchCamera(options);
    setPhotos([result.assets[0], ...photos]);
  };

  const openPhoto = index => {
    setShowModel(true);
    setActiveIndex(index);
  };

  return (
    <HandleBack>
      <SafeAreaView style={styles.root}>
        <View style={styles.container}>
          <View style={styles.flex}>
            <FlatList
              data={photos}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(ignored, index) => index.toString()}
              onScroll={() => {}}
              scrollEventThrottle={16}
              numColumns={4}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={[
                      styles.imageContainer,
                      {
                        width: (width - 16) / 4 - 8,
                      },
                    ]}>
                    <TouchableWithoutFeedback
                      key={index.toString()}
                      onPress={() => openPhoto(index)}>
                      <Image source={{uri: item.uri}} style={styles.image} />
                    </TouchableWithoutFeedback>
                  </View>
                );
              }}
            />
          </View>
          <FAB
            style={styles.fab}
            small
            icon="plus"
            onPress={() => openCamera()}
          />
        </View>
        <Modal
          visible={showModel}
          transparent={true}
          onRequestClose={() => setShowModel(false)}>
          <ImageViewer
            index={activeIndex}
            enableSwipeDown
            onCancel={() => setShowModel(false)}
            backgroundColor={COLOR.white}
            useNativeDriver
            imageUrls={photos.map(photo => {
              return {
                url: photo.uri,
              };
            })}
          />
        </Modal>
      </SafeAreaView>
      {isFetching && <Loader />}
    </HandleBack>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    flex: 1,
    padding: 8,
    paddingBottom: 25,
    justifyContent: 'flex-end',
  },
  flex: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  imageContainer: {
    margin: 4,
    shadowColor: COLOR.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 6,
    shadowOpacity: 0.35,
    elevation: 4,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    aspectRatio: 1 / 1,
    borderRadius: 8,
  },
});
export default PhotosScreen;
