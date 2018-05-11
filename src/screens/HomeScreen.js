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
// import Icon from 'react-native-vector-icons/Ionicons';
import FormTextInput from '../components/FormTextInput';
import FormButton from '../components/FormButton';
type Props = {};

export default class HomeScreen extends Component<Props> {
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
            <View style = {styles.container}>
                <View style = {styles.wrapper}>
                        <View style = {styles.iconWrapper}>
                            <FormButton 
                                bgColor = '#42FF33' 
                                textColor = '#000000'
                                onPress ={() => this.props.navigation.navigate('AddNew')}
                            >{'Add Details'}</FormButton>
                        </View>
                        <View style = {styles.iconWrapper}></View>
                        <View style = {styles.iconWrapper}>
                            <FormButton 
                                bgColor = '#3386FF' 
                                textColor = '#000000'
                                onPress ={() => this.props.navigation.navigate('View')}
                            >{'View Details'}</FormButton>
                        </View>
                    
                </View>
                
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    wrapper: {
    },
    iconWrapper: {
        height:100,
        width:200
    }
});