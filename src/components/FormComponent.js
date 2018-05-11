import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Picker,
  DatePickerAndroid,
  Alert,
  ActivityIndicator
} from 'react-native';
import DatePicker from 'react-native-datepicker'

import FormTextInput from './FormTextInput';
import FormButton from './FormButton';
import { putDetails, getDetails } from "../config/firebase.service";
type Props = {};
export default class FormComponent extends Component<Props> {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            id:this.props.person.id,
            name:this.props.person.name,
            gender:this.props.person.gender?this.props.person.gender:"male",
            phoneNumber:this.props.person.phoneNumber,
            bloodGroup:this.props.person.bloodGroup?this.props.person.bloodGroup:"A+",
            dob:this.props.person.dob,
            weight:this.props.person.weight,
            district:this.props.person.district,
            address:this.props.person.address,
            lastDonationDate:this.props.person.lastDonationDate?this.props.person.lastDonationDate:""
        }
    }
  render() {
    return (
        <View style = {styles.wrapper}>
        {this.state.loading ? <ActivityIndicator size="large" color="#0000ff" /> :
        <View style = {styles.wrapper}>
                <View style = {styles.iconWrapper}>
                    <FormTextInput name = 'ios-person' size = {30} placeholder = 'Name' value={this.state.name} onChangeText={(name) => {this.setState({name: name})}} />
                </View>
                <View style = {styles.iconWrapper}>
                    <FormTextInput name = 'ios-call' size = {30} placeholder = 'Phone No' value={this.state.phoneNumber}  onChangeText={(phoneNumber) => {this.setState({phoneNumber: phoneNumber})}}/>
                </View>
                <View style = {styles.pickerWrapper}>
                    <View style={{ height: 50,flex: 1,  marginHorizontal:3 }}>
                        <Text style={{color:'#FFFFFF'}}>Gender</Text>
                        <View style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1,}}>
                            <Picker
                                selectedValue={this.state.gender}
                                style={{ height: 30, color: '#FFFFFF' }}
                                onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}
                                >
                                <Picker.Item label="Male" value="male" />
                                <Picker.Item label="Female" value="female" />
                            </Picker>
                        </View>
                        
                    </View>
                    <View style={{ height: 50,flex: 1,  marginHorizontal:3 }}>
                        <Text style={{color:'#FFFFFF'}}>Blood Group</Text>
                        <View style={{flex: 1, borderColor: '#FFFFFF', borderWidth: 1,}}>
                            <Picker
                                selectedValue={this.state.bloodGroup}
                                style={{ height: 30, color: '#FFFFFF' }}
                                value={this.state.bloodGroup}
                                onValueChange={(itemValue, itemIndex) => this.setState({bloodGroup: itemValue})}
                                >
                                <Picker.Item label="A+" value="A+" />
                                <Picker.Item label="A-" value="A-" />
                                <Picker.Item label="B+" value="B+" />
                                <Picker.Item label="B-" value="B-" />
                                <Picker.Item label="AB+" value="AB+" />
                                <Picker.Item label="AB-" value="AB-" />
                                <Picker.Item label="O+" value="O+" />
                                <Picker.Item label="O-" value="O-" />
                            </Picker>
                        </View>
                        
                    </View>
                </View>
                <View style = {styles.iconWrapper}>
                    <Text style={{color:'#FFFFFF',  paddingTop: 10,  paddingBottom:2}}>Date of Birth</Text>
                    <DatePicker
                        date={this.state.dob}
                        style={{width: "100%",}}
                        mode="date"
                        placeholder="Date of Birth"
                        format="YYYY-MM-DD"
                        minDate="1950-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({dob: date})}}
                    />
                </View>
                <View style = {styles.iconWrapper}>
                    <FormTextInput name = 'ios-body' size = {30} placeholder = 'Weight' value={this.state.weight} onChangeText={(weight) => {this.setState({weight: weight})}}/>
                </View>
                <View style = {styles.iconWrapper}>
                    <FormTextInput name = 'ios-pin' size = {30} placeholder = 'District 'value={this.state.district}  onChangeText={(district) => {this.setState({district: district})}}/>
                </View>
                <View style = {styles.iconWrapper}>
                    <FormTextInput name = 'ios-pin-outline' size = {30} placeholder = 'Address' value={this.state.address}  onChangeText={(address) => {this.setState({address: address})}}/>
                </View>
                <View style = {styles.iconWrapper}>
                    <Text style={{color:'#FFFFFF',  paddingTop: 10, paddingBottom:2}}>Last Date of Donation</Text>
                    <DatePicker
                            date={this.state.lastDonationDate}
                            style={{width: "100%",}}
                            mode="date"
                            placeholder="Last Blood Donated Date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {this.setState({lastDonationDate: date})}}
                        />
                </View>
                
                <View style = {styles.buttonWrapper}>
                    <FormButton 
                        bgColor = '#42FF33' 
                        textColor = '#000000'
                        onPress ={() => {
                            this.setState({loading: true})
                            getDetails().subscribe((data)=>{
                                console.log("inn",data);
                                var index=0;
                                for(let d in data){
                                    index=data[d].id
                                }
                                index=index+1;
                                console.log(index)
                                this.setState({id: index})
                                putDetails(this.state).subscribe((data)=> {
                                    this.setState({loading: false})
                                    Alert.alert(
                                    'Saved ',
                                    'Sucessfully',
                                    [
                                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                                    ],
                                    { cancelable: false }
                                  )})
                            })
                            
                        }}
                    >{'Save'}</FormButton>
                </View>
                <View style = {styles.buttonWrapper}>
                    <FormButton 
                        bgColor = '#FA0E1C' 
                        textColor = '#000000'
                        onPress ={() => this.setState({name:"", phoneNumber:"",gender:"Male",bloodGroup:"A+",dob:"",weight:"",district:"",address:"",lastDonationDate:"" })}
                    >{'Clear'}</FormButton>
                </View>
        </View> }
        </View>
    );
  }
}

const styles = StyleSheet.create({
    wrapper: {
        height: Dimensions.get('window').height,
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconWrapper: {
        width:'80%',
    },
    pickerWrapper: {
        marginTop: 15,
        width:'80%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonWrapper: {
        marginVertical:20,
        width:'80%',
        height:30,

    }
});