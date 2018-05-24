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
            <Icon {...this.props} color = '#EF696B' style = {styles.icon} />
          </View>
          <View style = {styles.textWrapper}>
            <Text style = {{color: '#EF696B'}} >{this.props.label} </Text>
          </View>
          <View style = {styles.inputWrapper}>
            <TextInput placeholderTextColor = '#363F3E' style = {styles.input} {...this.props} underlineColorAndroid = 'transparent'/>
          </View>
          
        </View>
         
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    
    // backgroundColor: 'rgba(0,0,0,.2)',

  },
  wrapper: {
    flexDirection: 'row',
    
  },
  input: {
    width: '100%',
    color: '#363F3E',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  inputWrapper: {
    flex: 5,
    borderColor: 'transparent',
    borderWidth: 1/2,
    borderRadius: 5,
    shadowColor: '#EF696B',
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 10},
    elevation: 5
  },
  iconWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  }

});