import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import * as firebase from 'firebase';
import '@firebase/firestore';
import Constants from "expo-constants";

import * as SQLite from 'expo-sqlite';
import database from './Database3';

import {Card} from 'react-native-shadow-cards';



export default class Items3 extends React.Component {
  state = {
    items: [],
    email: '',
    message:'',
    time:'',
    Date:''
  };
  onFocusFunction=async()=>{
    this.setState({email:await AsyncStorage.getItem('@email')})
    this.update();
  }

  componentDidMount() {
    this.onFocusFunction();
    let date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    
    this.setState({time:firebase.firestore.FieldValue.serverTimestamp()})
    this.setState({Date:date + '/' + month + '/' + year})
    // this.setState({time:hours+min+sec})
    
  }

  get_text_success=async(arr)=>{
     
     
     
     this.setState({ items: arr })
     
  }

  get_text_fail=async(error)=>{
      // console.log(error);
  }
 
  


  update() {
    database.readCompleted(this.state.email,this.state.Date,this.get_text_success,this.get_text_fail);
    
  }

  render() {
    //const { done: doneHeading } = this.props;
    const { items } = this.state;
    const heading = "Todo";

    if (items === null || items.length === 0) {
      return (
      
      <View style={{flex: 6,alignItems: 'center',justifyContent: 'center' ,alignContent:'center',marginTop:"50%"}}>
      <Image style={{ width: 200, height: 152.77, }} source={{ uri: 'https://sv1.picz.in.th/images/2020/01/22/R2bmVk.png' }}/>
      <Text style={{ color: '#666666' , marginTop:10, textAlign:'center' }}>Don't have any completed task! #TodoblackZero{'\n'}Enjoy your night.</Text>
      </View>
     );
    }
    console.log("Print items ")
    console.log(items)
    return (

        <View style={{flex:1,alignItems:'center' ,flexDirection:'column',justifyContent: 'center',backgroundColor:"#transparent",alignContent:'center', marginTop:'8%'}}>
        {items.map(({ Date,id, message,time,PriImg,Des,Color,Priority}) => (
         

        <Card style={{ flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', borderRadius: 20, marginTop: 12,padding:8}} >
        {/*    
           ใส่ปุ่มบริเวณนี้       
                  */}
         
          
          <TouchableOpacity
            key={id}
            onPress={() =>{ this.props.onPressTodo(id)
              AsyncStorage.setItem('@TaskPriority',Priority)}}
            style={{
              backgroundColor: 'transparent', 
              borderColor: '#DADADA',
              //   borderWidth: 1,
              padding: 8,
              borderRadius: 10
              
            }}
          >   
             <Image style={{marginLeft:"5%",marginTop:"3%",width:25,height:25,tintColor:Color}} source={{uri:'https://sv1.picz.in.th/images/2020/02/26/xCLwtn.png'}}/>
          
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: "1%" ,flexDirection:"column"}}>
          <Text style={{ color:"#C4C4C4", textDecorationLine:'line-through', fontStyle:'italic', fontSize:16}} 
          
          onPress={() => { this.props.onPressTodo2(id) 
            AsyncStorage.setItem('@TaskID',id)
            AsyncStorage.setItem('@Message',message) 
            AsyncStorage.setItem('@Des',Des) 
            AsyncStorage.setItem('@TaskPriority',Priority)
                 }}
          >{message}</Text>
          <Text  style={{ color: "#C4C4C4", fontSize:12, textDecorationLine:'line-through', fontStyle:'italic' }}>Date: {Date}</Text>
          </View>
           
         
          </Card>
          
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  flexRow: {
    flexDirection: "row"
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16
  },
  sectionContainer: {
    marginBottom: 16,
    padding:16,
    margin:16,
    marginHorizontal: 16
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8
  }
});
