
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


type Props = {};


export default class FloatingInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      isFocused: false,
      isShowPassword: false,
      isPortrait: Dimensions.get('window').height > Dimensions.get('window').width ? false: true
   };
  }

  onLayout(e) {
    this.setState( {isPortrait: Dimensions.get('window').height > Dimensions.get('window').width ? false: true})
  }
  
    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => { 
      console.log(this.props.value);
      this.setState({ 
        isFocused : this.props.value == '' ? false : true 
      });
    }
  
    render() {
      const { label, ...props } = this.props;
      const { isFocused } = this.state;
      const { isPortrait } = this.state;
      const labelStyle = {
       
        fontSize: !isFocused ? 17 : 17,
        //color: !isFocused ? '#D3D3D3' : '#D3D3D3',
        color: !isPortrait ? '#D3D3D3' : '#936366'
      };
      const viewStyle = {
        position: 'absolute',
        left: 0,
        top: !isFocused ? 20 : 0,
        alignItems: 'center',
        justifyContent:'center',
        width:'100%' 
      }
     
      return (
        <View style = {{paddingVertical: 20, width:'100%', justifyContent: 'center', }}>
         <View style = {viewStyle}>
            <Text onLayout = {this.onLayout.bind(this)} style = {labelStyle}>
              {label}
            </Text>
          </View>
          <View style = {{borderBottomWidth: 1/2, borderColor: '#A3A5A8', backgroundColor:'rgba(0,0,0,0)'}}>
            <View style = {{flexDirection:'row', backgroundColor:'rgba(0,0,0,0)', marginBottom: 25 }}>
              <View style = {{flex:2, justifyContent: 'center',alignItems:'center'}}>
                <Icon name = {this.props.leftIcon} size = {30} color = '#D3D3D3' />
              </View>
              <View style = {{flex:8}}>
                <TextInput
                  {...this.props}
                  style = {{ height: 46, fontSize: 20, color: '#FFFFFF',textAlign: 'center'}}
                  onFocus = {this.handleFocus}
                  onBlur = {this.handleBlur}
                  underlineColorAndroid = 'transparent'
                  secureTextEntry = {this.props.rightIcon ? !this.state.isShowPassword : false}
                  
                />
              </View>
              <TouchableOpacity style = {{flex:2, justifyContent: 'center',alignItems:'center'}} onPress = {()=> this.setState({isShowPassword: !this.state.isShowPassword})}>
                {this.props.rightIcon ? 
                  <Icon name = {this.state.isShowPassword ? 'ios-eye-off' : this.props.rightIcon} size = {30} color = '#D3D3D3' /> : null}
              </TouchableOpacity>
            </View>
          </View>
          
          
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
  
});
