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
import FormComponent from '../components/FormComponent';
import FormButton from '../components/FormButton';
type Props = {};

export default class AddNewScreen extends Component<Props> {
    static navigationOptions = {
        title:"Add New" ,
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
                <ScrollView contentContainerStyle={{width:Dimensions.get('window').width}}>
                <FormComponent person={{}} />
                
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
    
});