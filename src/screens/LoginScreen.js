import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
    StatusBar
        } from 'react-native';
// import translations from '../i18n';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import FormTextInput from '../components/FormTextInput';
import FormButton from '../components/FormButton';
type Props = {};
import { getDetails } from "../config/firebase.service";


export default class LoginScreen extends Component<Props> {
    static navigationOptions = {
        header:null ,
      };

    constructor(props) {
        super(props)
        this.state = {
          isLandscape: Dimensions.get('window').height > Dimensions.get('window').width ? false: true
        }
        
    }

    onLayout(e) {
        this.setState( {isLandscape: Dimensions.get('window').height > Dimensions.get('window').width ? false: true})
    }

    render() {

        return (
            <View style = {styles.backgroundImage} >
                <StatusBar
                    backgroundColor = '#000000'
                    barStyle = 'light-content'
                />
                <ScrollView>
                    <View onLayout = {this.onLayout.bind(this)} style = {!this.state.isLandscape ? [styles.container,{height: Dimensions.get('window').height}] : [styles.landscapeContainer,{height: Dimensions.get('window').height}]}>
                            <View style = {styles.logo}>
                                <Icon name = 'md-chatbubbles' size = {100} color = 'white' />
                            </View>
                            <View  style = {!this.state.isLandscape ? styles.formContainer : styles.formContainerLandscape}>
                                <View style = {!this.state.isLandscape ? styles.form : styles.landscapeForm}>
                                    <View style = {styles.inputContainer}>
                                        <FormTextInput name = 'ios-person' size = {30} placeholder = 'email' />
                                        <FormTextInput name = 'ios-lock' size = {30} placeholder = 'password' secureTextEntry = {true} />
                                       
                                    </View>
                                    <View style = {styles.buttonContainer}>
                                        <FormButton 
                                            bgColor = '#FFFFFF' 
                                            textColor = '#000000'
                                            onPress ={() => this.props.navigation.navigate('Home')}
                                        >{'login'}</FormButton>
                                    </View>
                                </View>
                                <View style = {this.state.isLandscape ? {display: 'none'} : styles.landscapeFooter}>
                                    
                                </View>
                            </View>
                        </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    backgroundImage: {
        width:'100%',
        flex: 1,
        backgroundColor:'#FFFFFF'
    },
    formContainer: {
        flex:2,  
        width: '100%'
    },
    formContainerLandscape: {
        flex:2,  
        height: '100%'
    },
    passwordText: {
        width:'100%',
        paddingVertical: 5,
    },
    forget: {
        color:'white'
    },
    logo: {
        width:'100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ForgotPassword: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        paddingHorizontal: 25,
        width:'100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formButtonContainer: {
        flex:1, 
        marginVertical:10
    },
    formButtonContainerLandscape: {
        flex:1, 
        marginVertical:10, 
        paddingVertical: 5
    },
    footer: {
        width:'100%',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    inputContainer: {
        flex: 3,
        justifyContent: 'center', 
        width:'100%',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center', 
        width: '100%', 
        padding : 30
    },
    landscapeContainer: {
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    landscapeForm: {
        paddingHorizontal: 25,
        width:'100%',
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
    },
    landscapeFooter: {
        width:'100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});