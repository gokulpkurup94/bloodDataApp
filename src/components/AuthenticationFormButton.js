/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default class FormButton extends Component {
  render() {
    return (
      <View style={this.props.isLogin ?[styles.container, {borderRadius: 30}] :styles.container}>
        <TouchableOpacity style={this.props.isLogin ? [styles.container, {borderRadius: 30}] :styles.container} {...this.props}>
          <View style={this.props.isLogin ? [styles.container, {borderRadius: 30, backgroundColor: this.props.buttonColor}] :[styles.container,{backgroundColor: this.props.buttonColor}]}>
            <Text style={[styles.buttonText,{color: this.props.buttonTextColor}]}>{this.props.buttonText}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 45,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize:20,
    fontWeight: '100'
  },
});
