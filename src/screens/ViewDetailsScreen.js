import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Picker,
  TouchableOpacity,
  CheckBox,
  Alert,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  ScrollView,
  StatusBar
  
} from 'react-native';

import XLSX from 'xlsx';
import RNFetchBlob from 'react-native-fetch-blob';
import FormButton from '../components/FormButton';

const { writeFile, createFile, dirs:{ DocumentDir, DownloadDir } } = RNFetchBlob.fs;
const DDP = DownloadDir + "/";
const input = res => res.map(x => String.fromCharCode(x)).join("");
const output = str => str.split("").map(x => x.charCodeAt(0));


import Icon from 'react-native-vector-icons/Ionicons';
import DisplayItemComponent from "../components/DisplayItemComponent";
import FabButtonComponent from "../components/FabButtonComponent";

import { getDetails, removeValue } from "../config/firebase.service";

type Props = {};
export default class ViewDetailsScreen extends Component<Props> {
  static navigationOptions = {
    title:"View Details" ,
    headerStyle: {
      shadowColor: 'transparent',
      backgroundColor: '#63E7BD',
      elevation: 0,
      shadowOpacity: 0,
      marginTop: StatusBar.currentHeight
    }
    

  };
  constructor(props) {
    super(props);
      this.state={
        isLandscape:'',
        bloodGroups:{ap:false,an:false,bp:false,bn:false,op:false,on:false,abp:false,abn:false},
        filteredData:[],
        data:[], 
        loading:true, 
        filterItem: 'select', 
        filterValue: '',
        data1: [[1,2,3],[4,5,6]],};
        this.getData();
    
    // console.log(abc)
  }
  getData(){
    getDetails().subscribe((data1)=>{
      var data= [];
        for(d in data1){
          if(d){
            data.push(data1[d]);
          }
        }
        for(d in data){
            data[d].key=data[d].id;
        }
        console.log(data)
        // removeValue().subscribe((data)=> { console.log(data)})
        this.setState({data: data, filteredData: data, loading:false})
        // var abc= this.filterBy("Trivandrum",data,"district");
        // console.log("abc", abc)
        
    });
  }
  componentDidMount(){
    this.getData();
  }
  filterBy(key, arrayData, reference) {
    var filteredData;
    var flag =false;
    if(reference === "select") {
      // this.setState({filteredData: this.state.data});
      filteredData= this.state.data;
    }
    else{
      filteredData =  arrayData.filter(function(item) {
        return item[reference] === key;
      });
    }
      var filteredDataByBloodGroup= [];

      if(this.state.bloodGroups.ap){
        filteredDataByBloodGroup =  filteredDataByBloodGroup.concat(filteredData.filter(function(item) {
          return item.bloodGroup === 'A+';
        }));
        flag =true;
      }
      if(this.state.bloodGroups.an){
        filteredDataByBloodGroup =  filteredDataByBloodGroup.concat(filteredData.filter(function(item) {
          return item.bloodGroup === 'A-';
        }));
        flag =true;
      }
      if(this.state.bloodGroups.bp){
        filteredDataByBloodGroup =  filteredDataByBloodGroup.concat(filteredData.filter(function(item) {
          return item.bloodGroup === 'B+';
        }));
        flag =true;
      }
      if(this.state.bloodGroups.bn){
        filteredDataByBloodGroup =  filteredDataByBloodGroup.concat(filteredData.filter(function(item) {
          return item.bloodGroup === 'B-';
        }));
        flag =true;
      }
      if(this.state.bloodGroups.op){
        filteredDataByBloodGroup =  filteredDataByBloodGroup.concat(filteredData.filter(function(item) {
          return item.bloodGroup === 'O+';
        }));
        flag =true;
      }
      if(this.state.bloodGroups.on){
        filteredDataByBloodGroup =  filteredDataByBloodGroup.concat(filteredData.filter(function(item) {
          return item.bloodGroup === 'O-';
        }));
        flag =true;
      }
      if(this.state.bloodGroups.abp){
        filteredDataByBloodGroup =  filteredDataByBloodGroup.concat(filteredData.filter(function(item) {
          return item.bloodGroup === 'AB+';
        }));
        flag =true;
      }
      if(this.state.bloodGroups.abn){
        filteredDataByBloodGroup =  filteredDataByBloodGroup.concat(filteredData.filter(function(item) {
          return item.bloodGroup === 'AB-';
        }));
        flag =true;
      }
      if(flag === false){
        this.setState({filteredData: filteredData})
      }
      else{
        this.setState({filteredData: filteredDataByBloodGroup})
      }

      
    
    
  }
  findLayout = ()=>{
    if(Dimensions.get('window').height>Dimensions.get('window').width){
      this.setState({isLandscape:false})
    }
    else{
      this.setState({isLandscape:true})
    }
    console.log("view",this.state.isLandscape)
  }
  exportData = () => {
    Alert.alert(
      'Export',
      'Export to exel',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => {
          console.log("hii");
          this.setState({loading: true});
          /* convert AOA back to worksheet */
          const ws = XLSX.utils.json_to_sheet(this.state.filteredData);
          console.log("hii1")
          /* build new workbook */
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
          console.log("hii2")

          /* write file */
          const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
          console.log("hii3")
          const file = DDP + "filteredData.xlsx";
          console.log(DDP);
          // createFile(file, [102, 111, 111], 'ascii');
          writeFile(file, output(wbout), 'ascii').then((res) =>{
            this.setState({loading: false})
              Alert.alert("exportFile success", "Exported to " + file);
          }).catch((err) => { Alert.alert("exportFile Error", "Error " + err.message); });
        }},
      ],
      { cancelable: false }
    )
      
  }

  render() {
    console.log(this.state.bloodGroups)
    return (
      <View style={styles.container} onLayout={()=>this.findLayout()}>
      <StatusBar
          backgroundColor = '#63E7BD'
          translucent
          barStyle = 'dark-content'
        />
        <View style = {!this.state.isLandscape ? {height:180}: {height:100}} >
          <ImageBackground style={ styles.imgBackground } 
                 resizeMode='cover' 
                 source={require('../assets/images/bg2.jpg')}>
            <View style={this.state.isLandscape?{flexDirection:'row',flex:1}:{flexDirection:'column',flex:1}}>
              <View style={this.state.isLandscape?{flex:8}:{flex:4}}>
                <View style={styles.header}>
                  <View style={{flex:1}}>
                    <Picker
                      selectedValue={this.state.filterItem}
                      style={{ height: 50, width: "100%" }}
                      onValueChange={(itemValue, itemIndex) => this.setState({filterItem: itemValue, filterValue:'', filteredData: this.state.data})}>
                      <Picker.Item label="Select" value="select" />
                      <Picker.Item label="Phone No" value="phoneNumber" />
                      <Picker.Item label="District" value="district" />
                      <Picker.Item label="Gender" value="gender" />
                    </Picker>
                  </View>
                  <View style={{flex:1}}>
                    <TextInput underlineColorAndroid='transparent' value={this.state.filterValue} onChangeText={(value)=> this.setState({filterValue: value})} placeholder='Enter Value'/>
                  </View>
                </View>
                <View style={!this.state.isLandscape ? {flex:1, width: '100%'}:{flexDirection: 'row', width: '100%'}}>
                  <View style={!this.state.isLandscape?styles.bloodGroup:[styles.bloodGroup, {width:'50%'}]}>
                    <View style={styles.bloodGroupItem}>
                      <CheckBox color = '#FFFFFF' value={this.state.bloodGroups.ap} onValueChange={(val)=> this.setState({bloodGroups:{...this.state.bloodGroups,ap:!this.state.bloodGroups.ap}})}/>
                      <Text>A+</Text>
                    </View>
                    <View style={styles.bloodGroupItem}>
                      <CheckBox value={this.state.bloodGroups.bp} onValueChange={(val)=> this.setState({bloodGroups:{...this.state.bloodGroups, bp:!this.state.bloodGroups.bp}})}/>
                      <Text>B+</Text>
                    </View>
                    <View style={styles.bloodGroupItem}>
                      <CheckBox value={this.state.bloodGroups.op} onValueChange={(val)=> this.setState({bloodGroups:{...this.state.bloodGroups, op:!this.state.bloodGroups.op}})}/>
                      <Text>O+</Text>
                    </View>
                    <View style={styles.bloodGroupItem}>
                      <CheckBox value={this.state.bloodGroups.abp} onValueChange={(val)=> this.setState({bloodGroups:{...this.state.bloodGroups, abp:!this.state.bloodGroups.abp}})}/>
                      <Text>AB+</Text>
                    </View>
                  </View>
                  <View  style={!this.state.isLandscape?styles.bloodGroup:[styles.bloodGroup, {width:'50%'}]}>
                    <View style={styles.bloodGroupItem}>
                      <CheckBox value={this.state.bloodGroups.an} onValueChange={(val)=> this.setState({bloodGroups:{...this.state.bloodGroups, an:!this.state.bloodGroups.an}})}/>
                      <Text>A-</Text>
                    </View>
                    <View style={styles.bloodGroupItem}>
                      <CheckBox value={this.state.bloodGroups.bn} onValueChange={(val)=> this.setState({bloodGroups:{...this.state.bloodGroups, bn:!this.state.bloodGroups.bn}})}/>
                      <Text>B-</Text>
                    </View>                  
                    <View style={styles.bloodGroupItem}>
                      <CheckBox value={this.state.bloodGroups.on} onValueChange={(val)=> this.setState({bloodGroups:{...this.state.bloodGroups, on:!this.state.bloodGroups.on}})}/>
                      <Text>O-</Text>
                    </View>                  
                    <View style={styles.bloodGroupItem}>
                      <CheckBox value={this.state.bloodGroups.abn} onValueChange={(val)=> this.setState({bloodGroups:{...this.state.bloodGroups, abn:!this.state.bloodGroups.abn}})}/>
                      <Text>AB-</Text>
                    </View>
                  </View>
                </View>
                
              </View>
              <View  style={!this.state.isLandscape?{flex:1}:{flex:1}}>
                <View style = {styles.buttonContainer}>
                  <FormButton 
                    bgColor = '#FF2851' 
                    textColor = '#ffffff'
                    onPress={()=> {
                    console.log(this.state.filterValue,this.state.filterItem)
                    this.filterBy(this.state.filterValue,this.state.data,this.state.filterItem)}}
                  >{'SEARCH'}</FormButton>
                </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={{flex:9}}>
        {!this.state.loading ?
          <FlatList
              style={{width:"100%"}}
              showsVerticalScrollIndicator={true}
              data={this.state.filteredData}
              renderItem={({item}) => <DisplayItemComponent person={item} 
              deleteOnPress={()=>{
                this.setState({loading:true})
                removeValue(item.id).subscribe(()=>{alert('Deleted')
                  this.setState({loading:false})});
                this.getData()}} 
              editOnPress={()=>this.props.navigation.navigate('AddNew', {data: item})} />}
              indicatorStyle='black'
              keyExtractor={(item, index) => index}
            />: 
          <ActivityIndicator size="large" color="#0000ff" />}
      </View>
      <View style={styles.fabButton}>
        <FabButtonComponent color='#FFFFFF' bgColor='#1EA0F2' iconName='ios-print' onPress={()=>this.exportData()}/>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:"100%",
    flex: 1,
    height:Dimensions.get('window').height,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
 
  imgBackground: {
    width: '100%',
    height: '100%',
   
},
  header: {
    flexDirection: 'row',
    width:'100%',
    backgroundColor: 'rgba(255,255,255,0.6)'
  },
  bloodGroup: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    paddingBottom: 10,
    paddingTop: 5,
  },
  bloodGroupItem: {
    flex:2,
    flexDirection: 'row',
    alignItems: 'center',
   justifyContent: 'center',
    paddingLeft: 5,
  },
  fabButton: {
    position: 'absolute',
    right: 10,
    bottom:10
  },
  buttonContainer:{
   
    flex:1
  
  }
});
