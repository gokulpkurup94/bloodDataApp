import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';



type Props = {};
export default class DisplayItemComponent extends Component<Props> {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftView}>
          <Text style={styles.boldedText}>{this.props.person.name}</Text>
          <Text style={styles.phoneText}>{this.props.person.phoneNumber}</Text>
         
          <Text style={styles.normalText}>{this.props.person.address}</Text>
          <Text style={styles.normalText}>{this.props.person.district}</Text>
        </View>
        <View style={styles.rightView}>
          <View style={styles.rightTop}>
            <View style={styles.bloodGroup}>
              <Text  style={styles.boldedText}>{this.props.person.bloodGroup}</Text>
            </View>
            <View style={styles.bodyWeight}>
              <Text  style={styles.boldedText}>{this.props.person.weight}Kg</Text>
            </View>
          </View>
          <View style={styles.rightBottom}>
            <Text style={styles.normalText}>Gender : {this.props.person.gender}</Text>
            <Text style={styles.normalText}>D O B : {this.props.person.dob}</Text>
            <Text style={styles.normalText}>L D D : {this.props.person.lastDonationDate}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   
    marginVertical: 10,
    flex: 1,
    flexDirection: 'row',
    width:"100%",
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: 'red',
  },
  leftView:{
    flex:3,
    borderWidth: 1,
    borderColor: 'red',
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
    borderWidth: 1,
    borderColor: 'red',
  },
  bodyWeight:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  rightBottom:{
    flex:3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  boldedText:{
    fontSize: 25,
    fontWeight: 'bold',
   // color:'red'
  },
  phoneText:{
    fontSize: 20,
    fontWeight: 'bold',
   // color:'red'
  },
  normalText:{
    fontSize: 15,
    fontWeight: 'bold',
   // color:'red'
  },

 
});
