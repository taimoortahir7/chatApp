import React, { useEffect, useState, useRef } from "react";
import { View, SafeAreaView, ActivityIndicator, TouchableOpacity, StyleSheet, Image, Alert, Text, TextInput } from "react-native";
import {buttonColor, linkColor} from '../../../assets/colors';
import firebase from 'react-native-firebase';
import { useSelector } from "react-redux";

const Account = ({ route, navigation }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [phone, setPhone] = useState('');

  const userID = useSelector((state) => state.auth.userId);

  useEffect(() => {
    getUserAccount();
  }, []);

  const getUserAccount = () => {
      firebase.database().ref(`users/${userID}`).once('value', function(snapshot) {
          if (snapshot.val()) {
              console.log('snapshot value: ', snapshot.val());
          }
      });
  };

//   const dispatch = useDispatch();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={buttonColor} />
      </View>
    );
  }

  return (
    <SafeAreaView style={ [styles.safeArea] }>
        <Text style={styles.textInput}>FULL NAME</Text>
        <View style={styles.personalView}>
            <View style={{ alignItems: 'center' }}>
                <View style={{ marginLeft: 10 }}>
                <Text style={styles.nameText}>sdf</Text>
                </View>
            </View>
        </View>
        <Text style={styles.textInput}>EMAIL</Text>
        <View style={styles.personalView}>
            <View style={{ alignItems: 'center' }}>
                <View style={{ marginLeft: 10 }}>
                <Text style={styles.nameText}>sdf</Text>
                </View>
            </View>
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
  personalView: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      justifyContent: 'space-between',
      paddingVertical: 20,
      paddingHorizontal: 20,
      marginBottom: 20
    },
    headingDiv: {
        // borderBottomWidth: 1,
        // borderColor: '#E4E4E4',
        paddingVertical: 50,
        width: '100%',
        alignItems: 'center',
    },
  heading: {
    fontWeight: 'bold',
    fontSize: 34,
    lineHeight: 41,
    marginLeft: 16
  },
  nameText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 17,
    lineHeight: 22
  },
  textInput: { 
    fontWeight: 'normal',
    fontSize: 13,
    lineHeight: 22,
    color: '#989898',
    marginHorizontal: 30
  }
});

export default Account;
