import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebaseSDK from '../../../config/firebase-config';

class Chat extends React.Component {
  
  state = {
    messages: []
  };

  get user() {
    return {
      id: firebaseSDK.uid,
      _id: firebaseSDK.uid
    };
  }
  
  render() {
    return <GiftedChat 
      messages={this.state.messages}
      onSend={message =>
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message)
        }))}
      user={this.user}
    />;
  }

  componentDidMount() {
    // firebaseSDK.refOn(message =>
    //   this.setState(previousState => ({
    //     messages: GiftedChat.append(previousState.messages, message)
    //   }))
    // );
  }
  componentWillUnmount() {
    // firebaseSDK.refOff();
  }
};

export default Chat;