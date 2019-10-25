import React, { Component } from "react";
import {View, Text, Image, Button, TextInput, TouchableOpacity, StyleSheet,NativeModules} from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import { SocialIcon } from 'react-native-elements'
import {Icon} from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as EmailValidator from "email-validator";
import {
  GoogleSignin,
  statusCodes,
} from 'react-native-google-signin';
import {LoginManager} from 'react-native-fbsdk';

// import {NativeModules} from 'react-native-twitter-signin'
const Constants = {
  //twitter Dev Parse keys
  TWITTER_COMSUMER_KEY: "eVcmPeHbNa5IuThWhsRE044m5",
  TWITTER_CONSUMER_SECRET: "4Oe1HNlbBnEXM7lR5hAJsTjPvj1es8Nuvci3QJQPV6vK3qyfc1",
  // google client_id
  GOOGLE_CLIENTID: "911792425689-vmqcdqf7hproineml4ouiks7vspnjj7l.apps.googleusercontent.com"
}

const { RNTwitterSignIn } = NativeModules

export default class Login extends Component {
    constructor(){

        super();

        this.state = {
            inputRef: null,
            email:'',
            password: '',
            userName:'',
            isLogedIn: false
        }
    }
    headerTitle(){
        let userName = this.state.email;
        if(this.state.userName === ''){
            userName = userName.split("@")[0];
        }else{
            userName = this.state.userName;
        }
        this.props.callback(userName);
    }
    async componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:Constants.GOOGLE_CLIENTID,
    });
    await this._getCurrentUserGoogle();
  }
  async _getCurrentUserGoogle() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
        this.setState({userName:userInfo.user.name});
        this.setState({ isLogedIn: true });
        this.headerTitle();
    } catch (error) {
      const errorMessage =
          error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
      this.setState({
        error: new Error(errorMessage),
      });
    }
  }
  _signInGoogle = async () => {
    if(this.state.isLogedIn){
      alert('you have already logged in');
      return;
    }
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
        this.setState({userName:userInfo.user.name});
        this.headerTitle();
      if(userInfo.idToken){
        this.setState({ userInfo: userInfo.user.email });
        this.setState({ isLogedIn: true});
          alert('You are loged in successfully with Google!');

      }
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  _signInTwitter =  async () => {
      if(this.state.isLogedIn){
          alert('you have already logged in');
          return;
      }else {
          RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
          RNTwitterSignIn.logIn()
              .then(loginData => {
                  console.log(loginData)
                  const { authToken, authTokenSecret } = loginData
                  if (authToken && authTokenSecret) {
                      this.setState({ isLogedIn: true});
                      this.setState({ email: loginData.email });
                      this.setState({ name: loginData.name });
                      this.headerTitle();
                      alert('You are loged in successfully with Twitter!');
                  }
              })
              .catch(error => {
                      console.log(error)
                  }
              )
      }
  }
  _signInFb = async () => {
      if(this.state.isLogedIn){
          alert('you have already logged in');
          return;
      }

      LoginManager.logInWithPermissions(['public_profile']).then(
          function (result) {
              if (result.isCancelled) {
                  alert('Login was cancelled');
              } else {
                  alert('You are loged in successfully with Facebook!');
                  this.setState({ isLogedIn: true });
                  this.setState({ email: result.email });
                  this.setState({ name: result.name });
                  this.headerTitle();
              }
          },
          function (error) {
              console.log('Login failed with error: ' + error);
          }
      );
  }

  btn_logIn =async()=>{
      if(this.state.isLogedIn === true){
          alert('you have already logged in');
          return;
      }
      const {email,password} = this.state;
    if(!EmailValidator.validate(email)){
      alert('\"' + email + "\" is not valid,please input correct email");
      return;
    }
    if(password === ''){
      alert("please input password");
      return;
    }
    alert('You are loged in!');
    this.setState({isLogedIn:true});
    this.headerTitle();

  };
  btn_logOut=async ()=>{
      if(this.state.isLogedIn === false){
          alert('You are not logged in');
          return;
      }else{
          try {
              await GoogleSignin.revokeAccess();
              await GoogleSignin.signOut();
              this.setState({ email: ''});
              this.setState({isLogedIn:false});
              alert('You have been logged out from Google.');
          } catch (error) {
              this.setState({
                  error,
              });
          }
          // try {
          //     await RNTwitterSignIn.logOut();
          //     alert('You have been logged out from facebook.');
          //     this.setState({ email: ''});
          //     this.setState({isLogedIn:false});
          //     return;
          // } catch (error) {
          //     this.setState({
          //         error,
          //     });
          // }
      }
    this.setState({ email: ''});
    this.setState({ userName: ''});
      this.headerTitle();
      alert('You are logged out');
      this.setState({isLogedIn:false});
  }

  _scrollToInput (reactNode: any) {
    this.scroll.scrollToFocusedInput(reactNode)
  }

  render() {
    const { navigation } = this.props;
    return (

        <KeyboardAwareScrollView>
        <View style={innerStyles.container}>
        <SocialIcon
            style={[innerStyles.button,{    backgroundColor: '#3B5999',}]}
            title='Log In With Facebook'
            button
            onPress={this._signInFb}
            type='facebook'
        />
        <SocialIcon
            style={[innerStyles.button,{    backgroundColor: '#CB4023',}]}
            title='Log In With Google'
            button
            onPress={this._signInGoogle}
            type='google-plus-official'
            rightIconContainerStyle={innerStyles.icon}
        />
        <SocialIcon
            style={[innerStyles.button,{    backgroundColor: '#5AA4EB',}]}
            title='Log In With twitter'
            button
            onPress={this._signInTwitter}
            type='twitter'
        />


        <View style={innerStyles.searchSection}>
          <Icon type={"FontAwesome5"} name={"user"} style={{color: '#a4a4a4', fontSize: GLOBAL.totalSize(2.61), marginLeft: width / 200, }} />
          <TextInput style={innerStyles.inputBox}
                     onChangeText={(email) => this.setState({email})}
                     underlineColorAndroid='rgba(0,0,0,0)'
                     placeholder="your@example.com"
                     placeholderTextColor = "#a0a0a0"
                     ref={(ref) => { this.state.inputRef = ref; }}
                     onSubmitEditing={()=> this.password.focus()}
                     _onFocus={(event: Event) => {
                       this._scrollToInput(ReactNative.findNodeHandle(event.target))
                     }}
          />
        </View>
        <View style={innerStyles.searchSection}>
          <Icon type={"FontAwesome5"} name={"lock"} style={{ color: '#a4a4a4', fontSize: GLOBAL.totalSize(2.61), marginLeft: width / 200,}}/>
          <TextInput style={innerStyles.inputBox}
                     onChangeText={(password) => this.setState({password})}
                     underlineColorAndroid='rgba(0,0,0,0)'
                     placeholder="your password"
                     secureTextEntry={true}
                     placeholderTextColor = "#a0a0a0"
                     ref={(input) => this.password = input}
                     _onFocus={(event: Event) => {
                       // `bind` the function if you're using ES6 classes
                       this._scrollToInput(ReactNative.findNodeHandle(event.target))
                     }}
          />
        </View>
        <TouchableOpacity style={[innerStyles.button, {marginTop:50}]}>
          <Text style={innerStyles.buttonText} onPress={this.btn_logIn}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[innerStyles.button, {marginTop:10}]}>
          <Text style={innerStyles.buttonText} onPress={this.btn_logOut}>LOG OUT</Text>
        </TouchableOpacity>
      </View>

        </KeyboardAwareScrollView>
    );
  }

  gotoLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Signup"
        })
      ]
    });

    this.props.navigation.dispatch(resetAction);
  };
}
const innerStyles = StyleSheet.create({
  container: {
    marginTop:50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    width: 260,
    paddingHorizontal: 16,
    fontSize: 20,
    color: '#002f6c',
  },
  icon:{
    marginRight:-110,
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 2,
    width: 300,
    height: 50,
    marginTop:3,
    backgroundColor: '#EA5323',
    marginVertical: 10,
  },
  buttonText: {
    marginTop:5,
    fontSize: 24,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  searchSection: {
    height:48,
    width:300,
    marginTop:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor:'#d4d4d4',
    borderWidth:1
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    width:280,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});