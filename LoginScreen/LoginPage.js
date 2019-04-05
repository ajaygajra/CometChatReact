import React, { Component } from 'react';
import { View, Text,Button,TextInput} from 'react-native';
import { CometChat } from '@cometchat-pro/chat';
import { APP_CONFIG } from '../app.config';


export default class LoginPage extends Component {
static navigationOptions = {
    title: 'Welcome',
};
constructor(props){  
  super(props);     
}

render(){
  return (
    <View>   
         <TextInput ref={this.uid}
          style={{height: 40}}
          placeholder="Enter Your UID" 
          ref={refUid=>{this.uid=refUid}}          
                    
          onChangeText={(uid) => this.setState({uid})}
        />
      <Button
            title="Go to Jane's profile"
            onPress={() => {
              console.log(this.state.uid);
              // CometChat.getLoggedinUser(user=>{
              //   console.log("aasfasfasfasf")
              // },error=>{
              //   console.log(error);
                   CometChat.login(this.state.uid, APP_CONFIG.API_KEY).then(loginUser => {
                     console.log("LoggenIn user", loginUser);
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
                     
                    //  this.props.navigation.navigate("SignUp");
                   }, error => {
                     console.log(error);
                   })
              // });
              console.log(this.state.uid);
           
            }}
      />        
    </View>
  )
}

}


