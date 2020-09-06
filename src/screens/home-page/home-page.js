import React, { useEffect, useState, useRef } from "react";
import firebase from 'react-native-firebase';
import { View, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Image, Text, TextInput } from "react-native";
import ThreadItem from "../thread-item-page/thread-item-page";
import SearchView from './../../shared/search-view/search-view';

import {buttonColor, linkColor} from '../../assets/colors';

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState();

  const getChatThreads = () => {
    firebase
    .database()
    .ref('chats')
    .on('value', function(snapshot) {
        if (snapshot.val()) {
            setChats(snapshot.val());
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
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          console.log('itemData: ', itemData);
          return <TouchableOpacity onPress={() => navigation.navigate('Tasks', {
            projectID: itemData.item.id,
            projectName: itemData.item.title,
            addTask: addTask(itemData.item.id)
          })}>
            <ThreadItem
              title={itemData.item.title}
              category={itemData.item.category}
              tasks={itemData.item.tasks}
            />
          </TouchableOpacity>
        }}
      />
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
  }
});

export default Home;
