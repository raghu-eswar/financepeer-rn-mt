import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Card, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Api from '../../api';
import {meApiGet} from '../../api/paths';
import {COLOR} from '../../common/constants';
import {getAppPermissions} from '../../common/permissions';
import Banner from '../../components/banner';
import BottomTab from '../../components/bottom_tab/BottomTab';
import HandleBack from '../../components/HandleBack';
import Loader from '../../components/Loader';

const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    getUser();
    getAppPermissions();
  }, []);

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

  return (
    <HandleBack>
      {user && (
        <SafeAreaView style={styles.root}>
          <View style={styles.container}>
            <View style={styles.flex}>
              <Card style={styles.card}>
                <Card.Content style={styles.row}>
                  <Avatar.Image size={84} source={{uri: user.picture.medium}} />
                  <View style={{paddingLeft: 18}}>
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
                  </View>
                </Card.Content>
              </Card>
              <Title style={styles.sectionTitle}>Popular Locations</Title>
              <Banner />
            </View>
          </View>
        </SafeAreaView>
      )}
      <BottomTab user={user} />
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
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    paddingBottom: 25,
    justifyContent: 'flex-end',
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
  row: {
    flexDirection: 'row',
  },
  labelIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    paddingHorizontal: 8,
  },
  sectionTitle: {
    color: COLOR.black,
    padding: 12,
  },
});
export default HomeScreen;
