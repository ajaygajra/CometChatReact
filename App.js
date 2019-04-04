/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, WebView, Button} from 'react-native';
import {CometChat} from '@cometchat-pro/chat';
import {decode,encode}from 'base-64';

if (!global.btoa) global.btoa = encode;
if (!global.atob)global.atob = decode;

this.DOMParser = require('xmldom').DOMParser;

  

const AppId = '1089f54cd9e81d',
  USER_NAME = 'jstestuser1', ApiKey = '2eec670353db7ec021b0bdf0ccc75c0a21b1774c'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

CometChat.init(AppId).then(()=>{
  this.document = new this.DOMParser().parseFromString("<?xml version='1.0'?>", 'text/xml');
  CometChat.login(USER_NAME, ApiKey);
})


export default class App extends Component {
  constructor(props){
    super(props);
    
    this.myref = React.createRef();
    this.state = {
      uri: ''
    }
    this.makeCall=this.makeCall.bind(this);            
  }

makeCall(){
  let receiverID = "superhero1";
  let callType = CometChat.CALL_TYPE.VIDEO;
  let receiverType = CometChat.RECEIVER_TYPE.USER;

  let call = new CometChat.Call(receiverID, callType, receiverType);

  CometChat.initiateCall(call).then(
    outGoingCall => {
      console.log("Call initiated successfully:", outGoingCall);
      CometChat.startCall(outGoingCall.getSessionId(), this.webview, new CometChat.OngoingCallListener({
        onUserJoined: user => {
          /* Notification received here if another user joins the call. */
          console.log("User joined call:", user);
          /* this method can be use to display message or perform any actions if someone joining the call */
        },
        onUserLeft: user => {
          /* Notification received here if another user left the call. */
          console.log("User left call:", user);
          /* this method can be use to display message or perform any actions if someone leaving the call */
        },
        onCallEnded: call => {
          /* Notification received here if current ongoing call is ended. */
          console.log("Call ended:", call);
          /* hiding/closing the call screen can be done here. */
        }
      }),this)
    },
    error => {
      console.log("Call initialization failed with exception:", error);
    }
  );
}


  render() {
    return (
      <View style={styles.container}  style={{ flex: 1 }}>      
        <WebView {...CometChat.createCallView(this)} javaScriptEnabled={true} prop1={CometChat.makeCall} source={{ uri: this.state.uri }} ref={r => this.webview = r}></WebView><Button  style={{flex:1}} title="clickMe" onPress={() => { console.log(this.webview.props.prop1, this.webview.props.prop1(this,"https://cometchat.com")) }}></Button>
        <View>
          <Text>Helloworld</Text>
        </View>
<Button  style={{flex:1}} title="start call" onPress={this.makeCall}></Button>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
