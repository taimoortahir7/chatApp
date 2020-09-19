import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'react-native-firebase';
import {buttonColor} from '../../../assets/colors';

const Chat = ({ route }) => {
  
  const { userID, contactID, name, phone } = route.params;
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getMessages();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={buttonColor} />
      </View>
    );
  }

  const onSend = (message) => {
    setMessages(GiftedChat.append(messages, message));
    console.log('message: ', message);
    // createChatThread(message);
  }

  const getMessages = () => {
    setIsLoading(true);
    firebase.database().ref('chats').on('value', function(snapshot) {
      if(snapshot.val()) {
        setIsLoading(false);
        snapshot.forEach(async function(snap) {

          if (snap.key.includes(userID) && snap.key.includes(contactID)) {

            console.log('both IDs includes !!');

            firebase.database().ref(`chats/${userID}${contactID}`).on('value', function(snapshot) {
              if(snapshot.val()) {
                let array = [];
        
                snapshot.forEach(function(snap) {
                  var item = snap.val();
                  item.key = snap.key;
        
                  array.push(item);
                });
                setMessages(array);
              }
            });
          }
        });
      } else {
        setIsLoading(false);
      }
    });
  };

  const createChatThread = (message) => {
    const messageID = message[0]?._id;
    const postData = {
      text: message[0]?.text,
      receiverID: contactID,
      senderID: userID,
      timestamp: message[0]?.createdAt
    };
    firebase.database().ref(`chats/${userID}${contactID}/${messageID}`).set(postData).then(function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('chat sent successfully!');
      }
    });
  }
  
  return (
    <GiftedChat 
      messages={messages}
      isTyping={true}
      placeholder="Write"
      onSend={message => onSend(message)}
      user={{
        _id: userID,
        name: name,
        phone: phone
      }}
    />
  )
  
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    // alignItems: 'center'
  }
});

export default Chat;