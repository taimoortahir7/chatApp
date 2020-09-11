import React, { useEffect, useState, useRef } from "react";
import firebase from 'react-native-firebase';
import { View, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Image, Text, TextInput } from "react-native";
import ThreadItem from "../thread-item-page/thread-item-page";
import SearchView from './../../shared/search-view/search-view';
import { FAB } from 'react-native-paper';
import {buttonColor, linkColor} from '../../../assets/colors';

const Home = ({ route, navigation }) => {

  const { userID } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState();

  const getChatThreads = () => {
    setIsLoading(true);
    firebase
    .database()
    .ref('chats')
    .on('value', function(snapshot) {
        if (snapshot.val()) {
          setIsLoading(false);
          setChats(snapshot.val());
        } else {
          setIsLoading(false);
        }
    });
  };

  useEffect(() => {
    getChatThreads();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={buttonColor} />
      </View>
    );
  }

//   const addProject = (obj) => {
//     setIsLoading(true);
    
//   };

//   const searchFilterFunction = text => {    
//     return projects;
//   };

  return (
    <SafeAreaView style={ [styles.safeArea] }>
      <SearchView />
      <View style={styles.centered}>
        {/* {
          (chats) && (
            <FlatList
              data={chats}
              keyExtractor={(item) => item.id}
              renderItem={(itemData) => {
                console.log('itemData: ', itemData);
                return <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                  <ThreadItem
                    name={itemData.item.}
                    message={itemData.item.category}
                    time={itemData.item.tasks}
                  />
                </TouchableOpacity>
              }}
            />
          )
        } */}
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => console.log('Pressed')}
        />
        {
          (!chats) && (
            <Image source={require('./../../../assets/chat.png')}/>
          )
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1
  },
  addProject: {
    alignItems: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 34,
    lineHeight: 41,
    marginLeft: 16
  },
  listProjectsNo: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 22
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});

export default Home;
