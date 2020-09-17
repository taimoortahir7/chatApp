import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'react-native-firebase';

const Chat = ({ route }) => {
  
  const { userID, contactID, name, phone } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  const onSend = (message) => {
    setMessages(GiftedChat.append(messages, message));
    console.log('message: ', message);
    // createChatThread(message);
  }

  const getMessages = () => {
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

export default Chat;