import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity

} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class FabButtonComponent extends Component {

    render() {
        return(
            <View style={styles.container}>
            <TouchableOpacity style={styles.wrapper} onPress={this.props.onPress}>
                <View style={[styles.wrapper,{backgroundColor:this.props.bgColor}]}>
                     
                        <View  style={{}}>
                            <Icon name={this.props.iconName} size={35} color={this.props.color} />
                        </View>
                    
                </View>
                </TouchableOpacity>
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        height:60,
        width:60,
        borderRadius:30
    },
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height:60,
        width:60,
        borderRadius:30
    }
});
// props={color,bgColor,iconName,onPress}
