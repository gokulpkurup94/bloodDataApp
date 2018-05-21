
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  StatusBar,
  ScrollView
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import  FloatingInput  from "../components/FloatingInput";
import  FormButton  from "../components/AuthenticationFormButton";




type Props = {};
export default class LoginScreen extends Component<Props> {

    static navigationOptions = {
        title:"Add New" ,
        header: null
      };
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password:'',
      isPortrait: Dimensions.get('window').height > Dimensions.get('window').width ? false: true
    };
  }
  onLayout(e) {
    this.setState( {isPortrait: Dimensions.get('window').height > Dimensions.get('window').width ? false: true})
  }

  handleTextChangeEmail = (newText) => {
   
    this.setState({ email: newText });
  }
  handleTextChangePassword = (newText) => {
   
    this.setState({ password: newText });
  }


  render() {
    console.log(Dimensions.get('window').height);
    return (
      <ImageBackground
        source = {require('../assets/images/bg2.jpg')}
        style = {{width: '100%', height: Dimensions.get('window').height}}
      >
        <StatusBar
          backgroundColor = 'transparent'
          translucent
          barStyle = 'dark-content'
        />
        <ScrollView>
          <View onLayout = {this.onLayout.bind(this)} style = {!this.state.isPortrait ? [styles.container,{height: Dimensions.get('window').height}] : [styles.landscapeContainer,{height: Dimensions.get('window').height}]}>
            <View style = {styles.logoContainer}>
              <Image 
                style = {styles.logo}
                source = {require('../assets/images/logo1.png')}
                resizeMode = 'contain'
              />
            </View>
            <View style = {styles.InputContainer}>
              <FloatingInput
                label = "Email"
                value = {this.state.email}
                onChangeText = {(value)=>this.handleTextChangeEmail(value)}
                leftIcon = 'ios-person'
                
              />
              <FloatingInput 
                label = "Password"
                value = {this.state.password}
                onChangeText = {(value)=>this.handleTextChangePassword(value)}
                secureTextEntry = {true}
                leftIcon = 'ios-lock'
                rightIcon = 'ios-eye'
                
              />
              <View style = {{width: '80%'}}>
                <FormButton 
                  isLogin buttonText = 'Login' 
                  buttontextColor = '#FFFFFF' 
                  buttonColor = '#EF696B'
                  onPress ={() => this.props.navigation.navigate('Home')}/>              
              </View>
              <View style = {{flexDirection: 'row', paddingVertical: 20}}>
                <Text style = {{color: '#73C7B5'}}>Don't have an account?</Text>
                <TouchableOpacity>
                    <Text style = {{color: '#73C7B5', fontWeight: '600'}}> Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        
      </ImageBackground>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width:'100%',
   
  },
  landscapeContainer: {
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 120
  },
  InputContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});
