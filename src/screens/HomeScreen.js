
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
 ScrollView,
 Alert
 
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { signOut } from "../config/firebase.service";

type Props = {};
export default class HomeScreen extends Component<Props> {
  static navigationOptions = {
    header: null
   };
 constructor(props){
  super(props);
  this.state = {
   isPortrait: Dimensions.get('window').height > Dimensions.get('window').width ? true: false
  };
 }
 onLayout(e) {
  this.setState( {isPortrait: Dimensions.get('window').height > Dimensions.get('window').width ? true: false})
 }
 signOut1(){
  console.log('signOut');
  signOut().then(()=>this.props.navigation.goBack()).catch(()=>console.log("erro"))
 }
 render() {
  return (
   <ImageBackground
    source = {require('../assets/images/bg2.jpg')}
    style = {{width: '100%', height: Dimensions.get('window').height}}
   >
    {/* <StatusBar
     backgroundColor = 'transparent'
     translucent
     barStyle = 'dark-content'
    /> */}
    <View  onLayout = {this.onLayout.bind(this)} style = {this.state.isPortrait ? [styles.container,{height: Dimensions.get('window').height}] : [styles.landscapeContainer,{height: Dimensions.get('window').height-StatusBar.currentHeight}]}>
      <View style={{flex:1 ,justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../assets/images/logo1.png')} style={{width:350,height:175}} resizeMode='contain'/>
      </View>
      <View style={this.state.isPortrait ? {flexDirection:'row',flex:1}:{flex:1}}>      
        {/* <View> */}
          <View style = {[styles.logoContainer]}>
            <TouchableOpacity style = {styles.touchButton} onPress={()=>this.props.navigation.navigate('AddNew')}>
             
              <MaterialCommunityIcons name="account-plus" size={50} color="#ffffff" />
              {/* <Image source={require('../assets/images/addpeople.png')} style={styles.imageLogo} resizeMode='center'/> */}
              <Text  style={{color:'#ffffff', fontWeight:'bold',fontSize: 15}}>Add People</Text>
            </TouchableOpacity>
          </View>
          <View style = {[styles.logoContainer]}>
            <TouchableOpacity style = {styles.touchButton} onPress={()=>this.props.navigation.navigate('View')}>
              {/* <Icon name = 'ios-create' size = {150} color='#ffffff' /> */}
              <MaterialCommunityIcons name="account-search" size={50} color="#ffffff" />
              <Text style={{color:'#ffffff', fontWeight:'bold',fontSize: 15}}>View People</Text>
            </TouchableOpacity>
          </View>
        {/* </View> */}
      </View>
     </View>
     <View style = {styles.buttonWrapper}>
        <TouchableOpacity onPress={()=> Alert.alert(
                                            'Sign Out',
                                            'Are you sure to logout?',
                                            [
                                              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                              {text: 'OK', onPress: ()=>this.signOut1()}])} >
          <MaterialCommunityIcons name="power" size={30} color="#ffffff" />
       </TouchableOpacity>
      </View>
   </ImageBackground>
   
  );
 }
}
const styles = StyleSheet.create({
 container: {
  backgroundColor: 'rgba(0,0,0,0.2)',
  width:'100%',
  justifyContent: 'center',
  alignItems: 'center',
  
 },
 imageLogo:{
  tintColor: '#ffffff',
  width:150,
  height:150
 },
 landscapeContainer: {
  width:'100%',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  
 },
 touchButton:{
  height:130,
  width:130,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 65,

 },
 logoContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
 
 },
 logo: {
  width: 20,
  height: 20
 },
 InputContainer: {
  flex: 2,
  justifyContent: 'center',
  alignItems: 'center',
 },
 buttonWrapper: {
  position:'absolute',
  width:50,
  height:50,
  marginTop: 25,
  right: 15,
  borderRadius:25,
  backgroundColor:'rgba(0,0,0,0.6)',
  justifyContent: 'center',
  alignItems: 'center',
}
});
