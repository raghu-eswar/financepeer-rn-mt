import {Platform} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const permissionsList = Platform.select({
  ios: [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.CAMERA],
  android: [
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.CAMERA,
  ],
  default: [],
});

export const getAppPermissions = async () => {
  for (const permissions of permissionsList) {
    try {
      const result = await request(permissions);

      switch (result) {
        case RESULTS.UNAVAILABLE:
          break;
        case RESULTS.DENIED:
          getAppPermissions();
          break;
        case RESULTS.LIMITED:
          break;
        case RESULTS.GRANTED:
          break;
        case RESULTS.BLOCKED:
          break;
      }
    } catch (e) {}
  }
};
