import React, { Component } from 'react';
import {
  View,
  Text,  
  TextInput,
  StyleSheet, Image, Button, TouchableOpacity
} from 'react-native';
import { CometChat } from '@cometchat-pro/chat';
import { APP_CONFIG } from '../app.config';


export default class LoginPage extends Component {
static navigationOptions = {
    title: 'CometChat Pro',
};
constructor(props){  
  super(props);     
    CometChat.getLoggedinUser().then(user => {
      console.log('here');
      this.props.navigation.navigate("SignUp");
    }, error => {
      this.props.navigation.navigate("Login");
    });
}

render(){
  
  const styles = StyleSheet.create({
    baseText: {
      fontFamily: 'Cochin',
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
     container: {
       width :'100%',
         alignItems: 'center',
       }, buttonContainer: {
         width: '30%',
         justifyContent: "center",
         alignItems: 'center',
         backgroundColor: '#54364D',
         padding: 10,
         borderRadius: 10,
       },
       buttonText: {
         fontWeight:'100',
          fontSize: 18,        
          height: 30,
          color:'#FFF',
         alignItems: "center",
         textAlignVertical: 'center',
       }
  });
  return (
    <View style={{}}>    
    
      <View style={{height:"50%"}}>
        <View  style={{flex:1,justifyContent: "center",alignItems: "center"}}> 
         < Image
         source = {
           require('../react-native/imgs/CometChatPrologo.png')
         }
         />
        </View>
      </View>
    

      
   <View style={{width:'100%',alignItems: "center"}}>   
       <Text style={{width:"60%",textAlign:'left'}}>
           UID
         </Text>  
      <TextInput ref={this.uid}
          style={{ height:50, width:'60%'}}
          placeholder="Enter Your UID" 
          ref={refUid=>{this.uid=refUid}}                              
          onChangeText={(uid) => this.setState({uid})}
       />      
   </View>
 <View style = {styles.container}>         
  
      < TouchableOpacity style = {
          styles.buttonContainer
      }
                  
            onPress={() => {              
              CometChat.getLoggedinUser().then(user=>{
                  console.log('here');
                   this.props.navigation.navigate("SignUp");
              },error=>{    
                // console.log(error);
                   CometChat.login(this.state.uid, APP_CONFIG.API_KEY).then(loginUser => {                
                    var limit = 30;
                    var usersRequest = new CometChat.UsersRequestBuilder().setLimit(limit).build();
                    usersRequest.fetchNext().then(
                      userList => {
                        /* userList will be the list of User class. */
                        console.log("User list received:", userList);
                        /* retrived list can be used to display contact list. */
                      },
                      error => {
                        console.log("User list fetching failed with error:", error);
                      }
                    );
                     
                     this.props.navigation.navigate("SignUp");
                   }, error => {
                     console.log(error);
                   })
              });
              console.log(this.state.uid);           
            }}
      >  
      
              < Text style = {styles.buttonText} > Login
            </Text>
      </TouchableOpacity>   
      </View>
    </View>
  )
  
}

}


