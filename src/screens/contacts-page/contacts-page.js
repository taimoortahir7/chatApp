import React, { useEffect, useState, useRef } from "react";
import firebase from 'react-native-firebase';
import { View, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Image, Text, TextInput } from "react-native";
import ContactsItem from "../contacts-item-page/contacts-item-page";
import SearchView from './../../shared/search-view/search-view';
import {buttonColor, linkColor, primaryColor} from '../../../assets/colors';

const Contacts = ({ route, navigation }) => {

  const { userID } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState(null);

  const getContacts = () => {
    setIsLoading(true);
    firebase
    .database()
    .ref('users')
    .on('value', function(snapshot) {
        if (snapshot.val()) {
          let array = [];

          setIsLoading(false);
          snapshot.forEach(function(snap) {
            var item = snap.val();
            item.key = snap.key;

            array.push(item);
            array = array.filter(item => item.key !== userID);
          });
          setContacts(array);
        } else {
          setIsLoading(false);
        }
    });
  };

  useEffect(() => {
    getContacts();
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
      {/* <SearchView /> */}
      <View style={styles.centered}>
        {
          (contacts) && (
            <FlatList
              data={contacts}
              keyExtractor={(item) => item.key}
              renderItem={(itemData) => {
                console.log('itemData: ', itemData);
                return <TouchableOpacity onPress={() => navigation.navigate('Chat', {
                  userID: userID,
                  contactID: itemData.item?.key,
                  name: itemData.item?.name,
                  phone: itemData.item?.phoneNumber
                })}>
                  <ContactsItem
                    name={itemData.item?.name}
                    phone={itemData.item?.phoneNumber}
                    about={itemData.item?.about}
                    contactID={itemData.item?.key}
                  />
                </TouchableOpacity>
              }}
            />
          )
        }
        {
          (!contacts) && (
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
    // justifyContent: "center",
    // alignItems: "center",
    // width: '100%'
  },
  safeArea: {
    flex: 1,
    backgroundColor: primaryColor
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

export default Contacts;
