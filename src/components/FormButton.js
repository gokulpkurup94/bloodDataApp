import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {};
export default class FormButton extends Component<Props> {
  render() {
    return (
      <View style = {[styles.container,{backgroundColor: this.props.bgColor}]}>
         <TouchableOpacity {...this.props} style = {styles.button}><Text style = {[styles.text,{color: this.props.textColor}]}>{this.props.children}</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  button: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
      fontWeight: '500',
  }
});