import React, { Component } from "react";
import { StyleSheet,TextInput,AsyncStorage, Keyboard ,View, Text, TouchableOpacity, ActivityIndicator,TouchableHighlight,Dimensions } from "react-native";
import * as EmailValidator from 'email-validator';
import {Icon} from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { sendEmail } from './../send-email';
import DatePicker from 'react-native-datepicker';

const { height, width } = Dimensions.get('window');
GLOBAL.height = height;
GLOBAL.width = width;
GLOBAL.totalSize = num => (Math.sqrt((height * height) + (width * width)) * num) / 100;
GLOBAL.keyboardAvoidView = {
  style: { flex: 1 },
  resetScrollToCoords: { x: 0, y: 0 },
  contentContainerStyle: { backgroundColor: '#F5F5F5' },
  extraHeight: height / 10,
  keyboardOpeningTime: 0,
  enableOnAndroid: true,
  scrollEnabled: false,
};
export default class Signup extends Component {
  state = {
    firstName:'',
    lastName:'',
    birthday:'',
    email:'',
    password: '',
    confirmPassword: false
  };

  static navigationOptions = {
    tabBarLabel: 'Sign Up',
  };
  componentDidMount() {

  }
  saveData =async()=>{
    const {firstName,lastName,birthday,email,password,confirmPassword} = this.state;
      var userDetailJson = [];
    let loginDetails={
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };

    if(!EmailValidator.validate(email)){
      alert('\"' + email + "\" is not valid,please input correct email");
      this.setState({
        email: ''
      })
      return;
    }
    if(password === ""){
      alert("please input password");
      return;
    }
    if(password !== confirmPassword){
      alert("password and confirm password do not match.");
      return;
    }
    console.log('sdafdsaf',this.props.type);
    // if(this.props.type !== 'Signup')
    {
      AsyncStorage.setItem('loginDetails', JSON.stringify(loginDetails));
      Keyboard.dismiss();
      sendEmail(
          'technohomes.test@gmail.com',
          'Greeting!',
          'please visit this url.\n https://github.com/esutton/react-native-mail'
      ).then(() => {
        alert("please check your email");
      });
        userDetailJson.push(loginDetails);
console.log(userDetailJson);
// console.log(loginDetails);

        fetch("https://....", {
            method: "POST",
            headers: 'register',
            body:  JSON.stringify(userDetailJson)
        }).then(function(response){
            alert(state.firstName + ' is successfully registered');
                return response.json();
            })
            .then(function(userDetailJson){
                console.log(userDetailJson)
            });
        alert(state.firstName + ' is successfully registered');
        this.textInputFirst.clear()
        this.textInputLast.clear()
        this.textInputBOD.clear()
        this.textInputP.clear()
        this.textInputPC.clear()

    }
  };
  _scrollToInput (reactNode: any) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.scrollToFocusedInput(reactNode)
  }
  render() {
   return (
        <KeyboardAwareScrollView>

           <View style={innerStyles.container}>
            <View style={innerStyles.searchSection}>
                <TextInput style={innerStyles.inputBox}
                 onChangeText={(firstName) => this.setState({firstName})}
                 underlineColorAndroid='rgba(0,0,0,0)'
                 placeholder="First Name"
                 placeholderTextColor = "#a0a0a0"
                 _onFocus={(event: Event) => {
                   this._scrollToInput(ReactNative.findNodeHandle(event.target))
                 }}
                ref={input => { this.textInputFirst = input }}/>
            </View>
            <View style={innerStyles.searchSection}>
                <TextInput style={innerStyles.inputBox}
                         onChangeText={(lastName) => this.setState({lastName})}
                         underlineColorAndroid='rgba(0,0,0,0)'
                         placeholder="Last Name"
                         placeholderTextColor = "#a0a0a0"
                         _onFocus={(event: Event) => {
                           this._scrollToInput(ReactNative.findNodeHandle(event.target))
                         }}
                           ref={input => { this.textInputLast = input }}/>
            </View>
            <View style={innerStyles.birthday}>
                <DatePicker
                    style={{width: 300,
                        marginTop: 10,
                        height:45,
                        backgroundColor: '#fff',
                        borderColor:'#d4d4d4',
                        borderWidth:1

                    }}
                    date={this.state.birthday} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="Your Birthday"
                    format="YYYY-MM-DD"
                    minDate="01-01-1900"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            height: 0,
                            width: 0,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 0,
                            borderWidth:0
                        }
                    }}
                    onDateChange={(date) => {this.setState({birthday: date})}}
                ref={input => { this.textInputBOD = input }}/>

           </View>
            <View style={innerStyles.searchSection}>
                <Icon type={"FontAwesome5"}  name={"user"} style={{color: '#a4a4a4', fontSize: GLOBAL.totalSize(2.61), marginLeft: width / 200, }} />
                <TextInput style={innerStyles.inputBox}
                         onChangeText={(email) => this.setState({email})}
                         underlineColorAndroid='rgba(0,0,0,0)'
                         placeholder="your@example.com"
                         placeholderTextColor = "#a0a0a0"
                         _onFocus={(event: Event) => {
                           // `bind` the function if you're using ES6 classes
                           this._scrollToInput(ReactNative.findNodeHandle(event.target))
                         }}
                         // onSubmitEditing={()=> this.password.focus()}
                           ref={input => { this.textInputE = input }}/>

            </View>
            <View style={innerStyles.searchSection}>
                <Icon type={"FontAwesome5"} name={"lock"} style={{ color: '#a4a4a4', fontSize: GLOBAL.totalSize(2.61), marginLeft: width / 200,}}/>
                <TextInput style={innerStyles.inputBox}
                         onChangeText={(password) => this.setState({password})}
                         underlineColorAndroid='rgba(0,0,0,0)'
                         placeholder="your password"
                         _onFocus={(event: Event) => {
                           // `bind` the function if you're using ES6 classes
                           this._scrollToInput(ReactNative.findNodeHandle(event.target))
                         }}
                         secureTextEntry={true}
                         placeholderTextColor = "#a0a0a0"
                           ref={input => { this.textInputP = input }}/>
            </View>
            <View style={innerStyles.searchSection}>
                <Icon type={"FontAwesome5"} name={"lock"} style={{ color: '#a4a4a4', fontSize: GLOBAL.totalSize(2.61), marginLeft: width / 200,}}/>
                <TextInput style={innerStyles.inputBox}
                         onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                         underlineColorAndroid='rgba(0,0,0,0)'
                         placeholder="confirm password"
                         secureTextEntry={true}
                         placeholderTextColor = "#a0a0a0"
                         _onFocus={(event: Event) => {
                           // `bind` the function if you're using ES6 classes
                           this._scrollToInput(ReactNative.findNodeHandle(event.target))
                         }}
                           ref={input => { this.textInputPC = input }}/>
            </View>
            <View style={{flexDirection: 'row',marginTop:20}}>
                <TouchableOpacity style={innerStyles.regButton}>
                  <Text style={innerStyles.regbuttonText} onPress={this.saveData}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={innerStyles.regButton}>
                  <Text style={innerStyles.regbuttonText} onPress={this.saveData}>Cancel</Text>
                </TouchableOpacity>
            </View>

          </View>
        </KeyboardAwareScrollView>
    );
  }
}
const innerStyles = StyleSheet.create({
  container: {
    marginTop:50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  birthday: {
    flex: 1,
    height:45,
    width:300,
    alignItems: 'center',
    justifyContent:'center',
    padding:16
  },
  inputBox: {
    width: 260,
    height: 44,
    paddingHorizontal: 16,
    fontSize: 16,
    marginTop:10,
    color: '#002f6c',
  },
  icon:{
    marginRight:-110,
    justifyContent: 'space-between',
  },
  regButton: {
    borderRadius: 5,
    marginLeft: 20,
    width: 100,
    height: 40,
    marginTop:10,
    backgroundColor: '#EA5323',
    marginVertical: 10,
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
  regbuttonText: {
    marginTop:8,
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  searchSection: {
    height:45,
    width:300,
    // flex: 1,
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