import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Communications from 'react-native-communications';



type Props = {};
export default class DisplayItemComponent extends Component<Props> {
  constructor(props) {
    super(props);
    this.state={
      itemPressed:false
    }
    
  }
  onItemPress(){
    this.setState({itemPressed: !this.state.itemPressed})
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View  style={styles.cardList}>
          <View style={{flex:4, paddingLeft: 15}}>
            <TouchableOpacity onPress={()=>{this.onItemPress()}}>
              <Text style={styles.boldedText}>{this.props.person.name}</Text>
              <Text style={styles.normalText}>{this.props.person.district}</Text>
            </TouchableOpacity>
          
          </View>
          <View style={styles.bloodGroup}>
            <Text  style={styles.boldedText}>{this.props.person.bloodGroup}</Text>
          </View>
          <View style={styles.callButton}>
            <TouchableOpacity onPress={()=> Alert.alert(
                                            'Call  '+ this.props.person.name,
                                            'Are you sure to Call?',
                                            [
                                              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                              {text: 'OK', onPress: () => Communications.phonecall(this.props.person.phoneNumber, true)}])}
                                            > 
              <Icon name = 'md-call' size = {35} color='#44DD65' />
            </TouchableOpacity>
          </View>

        </View>
        {
          this.state.itemPressed ?
          <View style={styles.openComponent}>
            <View style={{flexDirection:'row'}}>
              <View style={{flex:4, alignItems:'flex-start'}}>
                <Text style={styles.normalText}>Mob : {this.props.person.phoneNumber}</Text>
              </View>
              <View style={{flex:2, alignItems:'center'}}>
                <Text style={styles.normalText}>{this.props.person.gender}</Text>
              </View>
              <View style={{flex:2, alignItems:'flex-end'}}>
                <Text  style={styles.normalText}>{this.props.person.weight} Kg</Text>
              </View>
            </View>
             
             <Text style={styles.normalText}>Address : {this.props.person.address}</Text>
            <View style={{flexDirection:'row'}}>
              <View style={{flex:9}}>
              <Text style={styles.normalText}>Date of Birth : {this.props.person.dob}</Text>
              <Text style={styles.normalText}>Last Donated on : {this.props.person.lastDonationDate}</Text>

              </View>
              <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                <TouchableOpacity onPress={()=> Alert.alert(
                                            'Edit',
                                            'Are you sure to edit?',
                                            [
                                              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                              {text: 'OK', onPress: () => {}}])}
                                            >
                <Icon name = 'ios-create' size = {35} color='#0048FF' />
              </TouchableOpacity>
              </View>
              <View style={{flex:2, alignItems:'flex-end', justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>  Alert.alert(
                                            'Delete',
                                            'Are you sure to delete?',
                                            [
                                              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                              {text: 'OK', onPress: () => {}}])}
                                            >
                <Icon name = 'md-trash' size = {35} color='#F00' />
              </TouchableOpacity>
              </View>
              
              <View>

              </View>
            </View>
             
          </View>
          :null

        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   
    marginVertical: 5,
    flex:1,
    borderBottomWidth: 1,
    borderBottomColor: '#FF696B',
   // borderWidth: 2,
   // borderColor: 'red',
  },
  cardList:{
    flex: 1,
    flexDirection: 'row',
    width:"100%",
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingBottom: 5,
  },

  leftView:{
    flex:3,
   // borderWidth: 1,
   // borderColor: 'red',
    paddingVertical: 10,
    paddingLeft: 15,
  },
  rightView:{
    flex:2,
  
  },
  rightTop:{
    flex:2,
    flexDirection: 'row',
  },
  bloodGroup:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
   // borderWidth: 1,
   // borderColor: 'red',
  },
  bodyWeight:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
   // borderWidth: 1,
   // borderColor: 'red',
  },
  rightBottom:{
    flex:3,
    justifyContent: 'center',
    alignItems: 'center',
   // borderWidth: 1,
   // borderColor: 'red',
  },
  boldedText:{
    fontSize: 20,
    fontWeight: 'bold',
    color:'#000000'
  },
  phoneText:{
    fontSize: 20,
    fontWeight: 'bold',
   // color:'red'
  },
  normalText:{
    fontSize: 15,
    fontWeight: 'bold',
    color:'#000000'
  },
  callButton:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openComponent:{
    padding:15,
    backgroundColor:'#d3d3d3' 
  }
  
 
});
