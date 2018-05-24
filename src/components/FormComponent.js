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
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/Ionicons';

import FormTextInput from './FormTextInput';
import FormButton from './FormButton';
import { putDetails, getDetails, editDetails } from "../config/firebase.service";
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
            dob:this.props.person.dob ? this.props.person.dob:"1990-01-01",
            weight:this.props.person.weight,
            district:this.props.person.district,
            address:this.props.person.address,
            lastDonationDate:this.props.person.lastDonationDate?this.props.person.lastDonationDate:""
        }
        Icon.getImageSource('ios-pin', 20, 'black').then(
            (source) => {this.timeIcon = source;
            console.log(this.timeIcon)}
          )
    }

    // hasNull(target) {
    //     for (var member in target) {
    //         if(member!=id){
    //             if (target[member] == null)
    //             return true;
    //         }
    //     }
    //     return false;
    // }
  render() {
    //   console.log(this.hasNull(this.state))
    console.log('state',this.state);
    return (
       
        <View style = {styles.wrapper}>
        {this.state.loading ? <ActivityIndicator size="large" color="#0000ff" /> :
            <View style = {styles.wrapper}>
                    <View style = {styles.iconWrapper}>
                        <FormTextInput name = 'ios-person' autoCapitalize = 'words' size = {30} label = 'Name' value={this.state.name} onChangeText={(name) => {this.setState({name: name})}} />
                    </View>
                    <View style = {styles.iconWrapper}>
                        <FormTextInput name = 'ios-call' maxLength = {10} keyboardType = 'numeric' size = {30} label = 'Phone No' value={this.state.phoneNumber}  onChangeText={(phoneNumber) => {this.setState({phoneNumber: phoneNumber})}}/>
                    </View>
                    <View style={styles.pickerComponentContainer}>
                        <View style = {styles.pickerIconContainer}>
                            <Icon name = 'ios-man' size = {30} color = '#EF696B' />
                        </View>
                        <View style = {styles.pickertextContainer}>
                            <Text style={{color:'#EF696B',}}>Gender</Text>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={this.state.gender}
                                style={{ color: '#363F3E', width: '100%', marginLeft: 8 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}
                                >
                                <Picker.Item label="Male" value="male" />
                                <Picker.Item label="Female" value="female" />
                            </Picker>
                        </View>
                    </View>


                    <View style={styles.pickerComponentContainer}>
                        <View style = {styles.pickerIconContainer}>
                            <Icon name = 'ios-water' size = {30} color = '#EF696B' />
                        </View>
                        <View style = {styles.pickertextContainer}>
                            <Text style={{color:'#EF696B',}}>Blood Group</Text>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={this.state.bloodGroup}
                                style={{color: '#363F3E', width: '100%', marginLeft: 8}}
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


                    <View style = {styles.pickerComponentContainer}>
                        <View style = {styles.pickerIconContainer}>
                            <Icon name = 'ios-calendar' size = {30} color = '#EF696B' />
                        </View>
                        <View style = {styles.pickertextContainer}>
                            <Text style={{color:'#EF696B',}}>Date of Birth</Text>
                        </View>
                        <View style={styles.pickerContainer}>
                            <DatePicker
                                date={this.state.dob}
                                mode="date"
                                style={{marginLeft: 8}}
                                format="YYYY-MM-DD"
                                minDate="1950-01-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles = {{
                                    dateIcon: {
                                        height: 0,
                                        width: 0
                                    },
                                    dateInput: {
                                        borderWidth: 0,
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        paddingLeft: 8,
                                    },
                                    dateText: {
                                        textAlign: 'center'
                                    }
                                    
                                }}
                                onDateChange={(date) => {this.setState({dob: date})}}
                            />
                        </View>
                    </View>


                    <View style = {styles.iconWrapper}>
                        <FormTextInput name = 'ios-body' maxLength = {3} size = {30} keyboardType = 'numeric' label = 'Weight' value={this.state.weight} onChangeText={(weight) => {this.setState({weight: weight})}}/>
                    </View>
                    <View style = {styles.iconWrapper}>
                        <FormTextInput name = 'ios-pin' size = {30} label = 'District 'value={this.state.district}  onChangeText={(district) => {this.setState({district: district})}}/>
                    </View>
                    <View style = {styles.iconWrapper}>
                        <FormTextInput name = 'ios-pin-outline' multiline = {true} size = {30} label = 'Address' value={this.state.address}  onChangeText={(address) => {this.setState({address: address})}}/>
                    </View>


                    <View style = {styles.pickerComponentContainer}>
                        <View style = {styles.pickerIconContainer}>
                            <Icon name = 'ios-calendar' size = {30} color = '#EF696B' />
                        </View>
                        <View style = {styles.pickertextContainer}>
                            <Text style={{color:'#EF696B',}}>Last Donation</Text>
                        </View>
                        <View style={styles.pickerContainer}>
                            <DatePicker
                                    date={this.state.lastDonationDate}
                                    style={{width: "100%",}}
                                    mode="date"
                                    style={{marginLeft: 8}}
                                    format="YYYY-MM-DD"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    default
                                    customStyles = {{
                                        dateIcon: {
                                            height: 0,
                                            width: 0
                                        },
                                        dateInput: {
                                            borderWidth: 0,
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            paddingLeft: 8,
                                        }
                                    }}
                                    onDateChange={(date) => {this.setState({lastDonationDate: date})}}
                                />
                        </View>
                    </View>
                    
                    <View style = {styles.buttonsContainer}>
                        {this.props.person.id ? <View style = {styles.buttonWrapper}>
                            <FormButton 
                                bgColor = '#00a302' 
                                textColor = '#000000'
                                onPress = {() => {
                                    this.setState({loading: true})
                                    editDetails(this.state).subscribe((data)=> {
                                            this.setState({loading: false})
                                            Alert.alert(
                                            'Update ',
                                            'Sucessfully',
                                            [
                                                {text: 'OK', onPress:this.props.navigateToView},
                                            ],
                                            { cancelable: false }
                                        )})
                                }}
                            >{'Update'}</FormButton>
                        </View> :
                        <View style = {styles.buttonWrapper}>
                            <FormButton 
                                bgColor = '#00a302' 
                                textColor = '#000000'
                                onPress = {() => {
                                    if(this.state.name !='' && this.state.gender !='' && this.state.phoneNumber !='' && this.state.bloodGroup !='' && this.state.dob !='' && this.state.weight !='' && this.state.district !='' && this.state.address !='' && this.state.lastDonationDate !=''){
                                        this.setState({loading: true})
                                        getDetails().subscribe((data1)=>{
                                            var data= [];
                                            for(d in data1){
                                            if(d){
                                                data.push(data1[d]);
                                            }
                                            }
                                            var index = 0;
                                            for(let d in data){
                                                index = data[d].id
                                            }
                                            index = index+1;
                                            console.log(index)
                                            this.setState({id: index})
                                            putDetails(this.state).subscribe((data)=> {
                                                this.setState({loading: false})
                                                Alert.alert(
                                                'Saved ',
                                                'Sucessfully',
                                                [
                                                    {text: 'OK', onPress:this.props.navigateToHome},
                                                ],
                                                { cancelable: false }
                                            )})
                                        })
                                    }
                                    else{
                                        alert("Fill all Fields");
                                    }
                                    
                                }}
                            >{'Save'}</FormButton>
                        </View>}
                        <View style = {{flex: 1}}>

                        </View>
                        <View style = {styles.buttonWrapper}>
                            <FormButton 
                                bgColor = '#EF696B' 
                                textColor = '#000000'
                                onPress ={() => this.setState({name:"", phoneNumber:"",gender:"Male",bloodGroup:"A+",dob:"1990-01-01",weight:"",district:"",address:"",lastDonationDate:"" })}
                            >{'Clear'}</FormButton>
                        </View>
                    </View>
            </View> }
        </View>
    );
  }
}

const styles = StyleSheet.create({
    wrapper: {
        // height: Dimensions.get('window').height,
        width:'95%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconWrapper: {
        width:'100%',
        
    },
    pickerWrapper: {
        marginTop: 15,
        width:'80%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonWrapper: {
        flex: 3,
        marginVertical:10,
        width:'40%',
        height:50,
        
    },
    pickerComponentContainer: {
        width: '100%', 
        height: 70, 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row' 
    },
    pickerIconContainer: {
        flex: 1,
        width: 30, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    pickertextContainer: {
        flex: 3,
        justifyContent: 'center', 
        alignItems: 'flex-start',
    },
    pickerContainer: {
        flex: 5, 
        borderColor: 'transparent',
        borderWidth: 1/2,
        borderRadius: 5,
        shadowColor: '#EF696B',
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 10},
        elevation: 5,
        backgroundColor: 'white'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});