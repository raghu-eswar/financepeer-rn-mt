import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button, Card, Paragraph, Title} from 'react-native-paper';
import {COLOR} from '../../common/constants';
import HandleBack from '../../components/HandleBack';
import Loader from '../../components/Loader';
import DATA from '../../common/data.json';
import {DB} from '../../database/db';

const NotesScreen = ({navigation, route}) => {
  const [isFetching, setIsFetching] = useState(true);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const _notes = await DB.getNotes();
      setNotes(_notes);
    } catch (e) {
    } finally {
      setIsFetching(false);
    }
  };

  const storeNotes = async () => {
    try {
      setIsFetching(true);
      await DB.addNotes(DATA);
      const _notes = await DB.getNotes();
      setNotes(_notes);
    } catch (e) {
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <HandleBack>
      <View style={styles.root}>
        <View style={styles.container}>
          {!!notes && !!notes.length ? (
            <FlatList
              data={notes}
              keyExtractor={(ignored, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <Card style={styles.card}>
                    <Card.Content>
                      <Title style={{color: COLOR.black}}>{item.title}</Title>
                      <Paragraph style={{color: COLOR.gray}}>
                        {item.body}
                      </Paragraph>
                    </Card.Content>
                  </Card>
                );
              }}
            />
          ) : (
            <Button icon={'cloud-download'} onPress={() => storeNotes()}>
              Sync
            </Button>
          )}
        </View>
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    margin: 16,
    borderRadius: 8,
  },
});
export default NotesScreen;
