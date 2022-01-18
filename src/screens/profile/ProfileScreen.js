import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Card, Title} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Geolocation from 'react-native-geolocation-service';
import Api from '../../api';
import {meApiGet, weather2_5Get} from '../../api/paths';
import {COLOR} from '../../common/constants';
import HandleBack from '../../components/HandleBack';
import Loader from '../../components/Loader';

const ProfileScreen = ({navigation, route}) => {
  const [user, setUser] = useState(route.params?.user);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [area, setArea] = useState(null);
  const [country, setCountry] = useState(null);
  const [temperature, setTemperature] = useState(null);

  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (!user) {
      await getUser();
    }
    await fetchCoordinates();
  };

  useEffect(() => {
    if (!!latitude && !!longitude) {
      fetchWeatherReport(latitude, longitude);
    }
  }, [latitude, longitude]);

  const fetchWeatherReport = async (lat, long) => {
    try {
      setIsFetching(true);
      const res = await Api.get(weather2_5Get(lat, long));
      setCountry(res.sys?.country);
      setArea(res.name);
      setTemperature(res.main?.temp);
    } catch (e) {
    } finally {
      setIsFetching(false);
    }
  };

  const getUser = async () => {
    try {
      setIsFetching(true);
      const res = await Api.get(meApiGet());
      setUser(res.results[0]);
    } catch (e) {
    } finally {
      setIsFetching(false);
    }
  };

  const fetchCoordinates = async () => {
    await Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        if (error.code === 1 || error.code === 2) {
          navigation.goBack();
        } else if (error.code === 3) {
          fetchCoordinates();
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
        forceRequestLocation: true,
      },
    );
  };

  const onBack = () => {
    navigation.goBack();
    return true;
  };

  return (
    <HandleBack onBack={onBack}>
      {user && (
        <View style={styles.root}>
          <View style={styles.container}>
            <View style={styles.flex}>
              <Card style={styles.card}>
                <Card.Content>
                  <Avatar.Image
                    size={144}
                    source={{uri: user.picture.medium}}
                    style={styles.avatar}
                  />
                  <View style={{paddingTop: 28}}>
                    <Title>{`${user.name.title} ${user.name.first} ${user.name.last}`}</Title>
                    <View style={styles.labelIcon}>
                      <MaterialCommunityIcons
                        name="email"
                        size={24}
                        color={COLOR.primary}
                      />
                      <Text style={styles.label}>{user.email}</Text>
                    </View>
                    <View style={styles.labelIcon}>
                      <MaterialCommunityIcons
                        name="phone"
                        size={24}
                        color={COLOR.primary}
                      />
                      <Text style={styles.label}>{user.cell}</Text>
                    </View>
                    <View style={styles.labelIcon}>
                      <MaterialCommunityIcons
                        name="calendar-month"
                        size={24}
                        color={COLOR.primary}
                      />
                      <Text style={styles.label}>
                        {moment(new Date(user.dob.date)).format(
                          'dddd, MMMM Do YYYY, h:mm:ss a',
                        )}
                      </Text>
                    </View>
                    <View style={styles.labelIcon}>
                      <Entypo name="address" size={24} color={COLOR.primary} />
                      <Text style={styles.label}>
                        {`${user.location.city}, ${user.location.state}, ${user.location.country},`}
                      </Text>
                    </View>
                    {!!area && !!country && !!temperature && (
                      <View style={styles.labelIcon}>
                        <MaterialCommunityIcons
                          name="map-marker-radius"
                          size={24}
                          color={COLOR.primary}
                        />
                        <Text style={styles.label}>
                          {`${area}, ${country}, ${temperature},`}
                        </Text>
                      </View>
                    )}
                  </View>
                </Card.Content>
              </Card>
            </View>
          </View>
        </View>
      )}
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
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  flex: {
    flex: 1,
  },
  card: {
    paddingTop: 24,
    marginBottom: 24,
    borderBottomEndRadius: 18,
    borderBottomStartRadius: 18,
    elevation: 8,
    shadowColor: COLOR.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 3,
    shadowOpacity: 0.1,
  },
  avatar: {
    alignSelf: 'center',
  },
  labelIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    paddingHorizontal: 8,
  },
});
export default ProfileScreen;
