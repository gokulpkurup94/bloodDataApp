import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
type Props = {};
export default class FormTextInput extends Component<Props> {
  render() {
    return ( 
      <View style = {styles.container}>
        <View style = {styles.wrapper}>
          <View style = {styles.iconWrapper}>
            <Icon {...this.props} color = 'white' style = {styles.icon} />
          </View>
          <View style = {styles.inputWrapper}>
            <TextInput placeholderTextColor = '#FFFFFF' style = {styles.input} {...this.props} underlineColorAndroid = 'transparent'/>
          </View>
          
        </View>
         
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  wrapper: {
    flexDirection: 'row',
    
  },
  input: {
    width: '100%',
    color: 'white',

  },
  inputWrapper: {
    flex: 9,
    borderColor: 'transparent',
    borderBottomColor: 'white',
    borderWidth: 2,
  },
  iconWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

});