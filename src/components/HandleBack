import {memo, useEffect} from 'react';
import {BackHandler} from 'react-native';

const HandleBack = props => {
  const onBack = () => {
    return props.onBack();
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBack);
    };
  });

  return props.children;
};

export default memo(HandleBack);
