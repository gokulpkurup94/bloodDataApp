/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import * as firebase from 'firebase';


import Icon from 'react-native-vector-icons/Ionicons';

import DefaultNavigation from "./src/screens/DefaultNavigation";


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    // var app = firebase.initializeApp(firebaseConfig);
  //   if (!firebase.apps.length) {
  //     firebase.initializeApp(firebaseConfig);
  // }
    
    // this.itemsRef.push({ title: text })

  }
  render() {
    return (
      <View style={{ flex:1, width:"100%"}}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <DefaultNavigation />
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
