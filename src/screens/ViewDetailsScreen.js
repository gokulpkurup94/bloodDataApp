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
  ActivityIndicator
} from 'react-native';

import XLSX from 'xlsx';
import RNFetchBlob from 'react-native-fetch-blob';
const { writeFile, createFile, dirs:{ DocumentDir, DownloadDir } } = RNFetchBlob.fs;
const DDP = DownloadDir + "/";
const input = res => res.map(x => String.fromCharCode(x)).join("");
const output = str => str.split("").map(x => x.charCodeAt(0));


import Icon from 'react-native-vector-icons/Ionicons';
import DisplayItemComponent from "../components/DisplayItemComponent";
import FabButtonComponent from "../components/FabButtonComponent";

import { getDetails } from "../config/firebase.service";

type Props = {};
export default class ViewDetailsScreen extends Component<Props> {
  static navigationOptions = {
    title:"View Details" ,
  };
  constructor(props) {
    super(props);
      this.state={
        bloodGroups:{ap:false,an:false,bp:false,bn:false,op:false,on:false,abp:false,abn:false},
        filteredData:[],
        data:[], 
        loading:true, 
        filterItem: 'select', 
        filterValue: '',
        data1: [[1,2,3],[4,5,6]],};
    getDetails().subscribe((data)=>{
        for(d in data){
            data[d].key=data[d].id;
        }
        console.log(data)
        this.setState({data: data, filteredData: data, loading:false})
        // var abc= this.filterBy("Trivandrum",data,"district");
        // console.log("abc", abc)
        
    });
    // console.log(abc)
  }
  componentDidMount(){
    console.log("mounted")
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
      <View style={styles.container}>
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
                  <View style={{width:40, alignItems:'flex-end', justifyContent:'center', padding:5}}>
                    <TouchableOpacity onPress={()=> {
                      console.log(this.state.filterValue,this.state.filterItem)
                      this.filterBy(this.state.filterValue,this.state.data,this.state.filterItem)}}>
                      <Icon name="ios-search" size={30}/>
                    </TouchableOpacity>
                    
                  </View>
                </View>
                <View style={styles.bloodGroup}>
                  <View style={styles.bloodGroupItem}>
                    <Text>A+</Text>
                    <CheckBox value={this.state.bloodGroups.ap} onValueChange={(val)=> this.setState({bloodGroups:{...this.state.bloodGroups,ap:!this.state.bloodGroups.ap}})}/>
                  </View>
                  <View style={styles.bloodGroupItem}>
                    <Text>A-</Text>
                    <CheckBox value={this.state.bloodGroups.an} onValueChange={(val)=> this.setState({bloodGroups:{...this.state.bloodGroups, an:!this.state.bloodGroups.an}})}/>
                  </View>
                  <View style={styles.bloodGroupItem}>
                    <Text>B+</Text>
                    <CheckBox value={this.state.bloodGroups.bp} onValueChange={(val)=> this.setState({bloodGroups:{...this.state.bloodGroups, bp:!this.state.bloodGroups.bp}})}/>
                  </View>
                  <View style={styles.bloodGroupItem}>
                    <Text>B-</Text>
                    <CheckBox value={this.state.bloodGroups.bn} onValueChange={(val)=> this.setState({bloodGroups:{...this.state.bloodGroups, bn:!this.state.bloodGroups.bn}})}/>
                  </View>
                </View>
                <View style={styles.bloodGroup}>
                  <View style={styles.bloodGroupItem}>
                    <Text>O+</Text>
                    <CheckBox value={this.state.bloodGroups.op} onValueChange={(val)=> this.setState({bloodGroups:{...this.state.bloodGroups, op:!this.state.bloodGroups.op}})}/>
                  </View>
                  <View style={styles.bloodGroupItem}>
                    <Text>O-</Text>
                    <CheckBox value={this.state.bloodGroups.on} onValueChange={(val)=> this.setState({bloodGroups:{...this.state.bloodGroups, on:!this.state.bloodGroups.on}})}/>
                  </View>
                  <View style={styles.bloodGroupItem}>
                    <Text>AB+</Text>
                    <CheckBox value={this.state.bloodGroups.abp} onValueChange={(val)=> this.setState({bloodGroups:{...this.state.bloodGroups, abp:!this.state.bloodGroups.abp}})}/>
                  </View>
                  <View style={styles.bloodGroupItem}>
                    <Text>AB-</Text>
                    <CheckBox value={this.state.bloodGroups.abn} onValueChange={(val)=> this.setState({bloodGroups:{...this.state.bloodGroups, abn:!this.state.bloodGroups.abn}})}/>
                  </View>

                </View>

                {!this.state.loading ?<FlatList
                    style={{width:"100%"}}
                    showsVerticalScrollIndicator={true}
                    data={this.state.filteredData}
                    renderItem={({item}) => <DisplayItemComponent person={item} />}
                    indicatorStyle='black'
                    keyExtractor={(item, index) => index}
                    />: <ActivityIndicator size="large" color="#0000ff" />}
                <View style={styles.fabButton}>
                  <FabButtonComponent color='red' bgColor='green' iconName='ios-pin' onPress={()=>this.exportData()}/>
                </View>
                    

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      width:"100%",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    width:'100%',
    borderBottomColor: 'red',
    borderBottomWidth: 2,
  },
  bloodGroup: {
    flexDirection: 'row',
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  bloodGroupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  fabButton: {
    position: 'absolute',
    right: 10,
    bottom:10
  }
});
