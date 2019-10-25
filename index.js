/**
 * @format
 */

// import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import React, { Component } from 'react';
import SignUp from "./screen/Signup";
import LoginScreen from "./screen/Login";
import {
    AppRegistry, Dimensions, Text, View,StyleSheet
} from 'react-native';
import { Header, Container, Body, Title, Tabs, Tab } from 'native-base';
const { height, width } = Dimensions.get('window');
const firstStr = 'TechnoHomes';

class App extends Component {
    constructor() {
        super();
        this.state = {
            headerTitle: 'TechnoHomes',
            headerTitleName: ''
        };
    }
    getResponse(result){
        this.setState({headerTitleName: result});
    }
    render() {
        return (

            <Container style={styles.container}>
                <Header hasTabs style={{height:height/5,backgroundColor: '#fff',        flexDirection: 'column',}}>
                            <Text style={styles.welcomeName} >{this.state.headerTitleName}</Text>
                    <Text style={styles.welcome}>{this.state.headerTitle}</Text>
                </Header>
                <Tabs
                    style={{paddingTop:3}}
                    tabBarUnderlineStyle={{
                        backgroundColor: "#b9b9b9",
                        height: 5,
                    }}
                >
                    <Tab
                        heading="Log In"
                        tabStyle={styles.tabStyle}
                        activeTabStyle={styles.activeTabStyle}
                        activeTextStyle={styles.activeTextStyle}
                    >
                             <LoginScreen  num={2} callback={this.getResponse.bind(this)}/>
                     </Tab>
                    <Tab
                        heading="Sign Up"
                        tabStyle={styles.tabStyle}
                        activeTabStyle={styles.activeTabStyle}
                        activeTextStyle={styles.activeTextStyle}
                    >
                        <SignUp callback={this.getResponse.bind(this)}/>

                    </Tab>
                </Tabs>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#ff997f',
    },
    welcome: {
        fontSize: GLOBAL.totalSize(2.61),
        textAlign: 'center',
        fontWeight:'bold',
        textAlignVertical:'center',
        margin: 10,
        color: '#FF7F3D',
        // marginLeft: 'auto',
        // marginRight: -20


    },
    welcomeName: {
        fontSize: GLOBAL.totalSize(2),
        textAlign: 'right',
        fontWeight:'bold',
        textAlignVertical:'top',
        margin: 10,
        color: '#FF7F3D',
        marginLeft: 'auto',
        marginTop: -25
    },
    tabStyle : {
        backgroundColor: 'white',
        justifyContent: 'center',
        // width: 120,
        height: 50,
    },
    activeTabStyle: {
        backgroundColor: '#eef0ee',
        height: 50,
    },
    textStyle: {
        // color: 'white',
        color: "#f01a16"
    },
    activeTextStyle: {
        // color: 'white',
        color: '#696966'
    },
    tabBarUnderlineStyle: {
        backgroundColor: '#f01a16',
        height: 2
    }
});

AppRegistry.registerComponent(appName, () => App);