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

import { StackNavigator } from 'react-navigation';
// import Icon from 'react-native-vector-icons/Ionicons';
import FormComponent from '../components/FormComponent';
import FormButton from '../components/FormButton';
type Props = {};

export default class AddNewScreen extends Component<Props> {
    static navigationOptions = {
        title:"Add New" ,
        headerStyle: {
            shadowColor: 'transparent',
            backgroundColor: '#63E7BD',
            elevation: 0,
            shadowOpacity: 0,
            marginTop: StatusBar.currentHeight
          }
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
        const { navigation } = this.props;
        const item = navigation.getParam('data', {});
        return (
            <ImageBackground 
                source = {require('../assets/images/bg2.jpg')} 
                style = {{width: '100%', }}
            >
                <StatusBar
                    backgroundColor = '#63E7BD'
                    translucent
                    barStyle = 'dark-content'
                />
                <View style = {styles.container}>
                    <ScrollView contentContainerStyle={{width:Dimensions.get('window').width}}>
                        <View style = {{width: '100%'}}>
                            <FormComponent person={item} navigateToHome={()=>this.props.navigation.goBack()} navigateToView={()=>this.props.navigation.goBack()}/>
                        </View>
                    </ScrollView>
                    
                </View>
            </ImageBackground>
            
        );
    }
}
const styles = StyleSheet.create({
    container: {
        
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    
});