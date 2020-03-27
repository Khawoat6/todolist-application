import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput, Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import * as firebase from 'firebase';
import '@firebase/firestore';
import Constants from "expo-constants";

import * as SQLite from 'expo-sqlite';
import database from './Database3';

import { Card } from 'react-native-shadow-cards';
import Tomorrow from "./Tomorrow";



export default class Items2 extends React.Component {
  state = {
    items: [],
    email: '',
    message: '',
    time: '',
    Date: '',
    Tomorrow: ''
  };
  onFocusFunction = async () => {
    this.setState({ email: await AsyncStorage.getItem('@email') })
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
    var today = new Date()
    var tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    month = month.toString()
    date=date.toString()
    console.log(typeof (month))
    console.log(month.length)
    if (month.length == 1) {
      month = String('0') + String(month)
    }
    console.log(month)
    if (date.length == 1) {
      date = String('0') + String(date)
    }
    this.setState({ Tomorrow: tomorrow })
    console.log("tomorrow: " + tomorrow)
    this.setState({ time: firebase.firestore.FieldValue.serverTimestamp() })
    this.setState({ Date: year + '-' + month + '-' + date })
    // this.setState({time:hours+min+sec})
    var TomorrowDate = tomorrow.toString().slice(8, 10)
    var TomorrowMonth = tomorrow.toString().slice(4, 7)
    var TomorrowYear = tomorrow.toString().slice(11, 15)
    switch (TomorrowMonth) {
      case "Jan":
        TomorrowMonth="01"
        break;
      case "Feb":
        TomorrowMonth="02"
        break;
      case "Mar":
        TomorrowMonth="03"
        break;
      case "Apr":
        TomorrowMonth="04"
        break;
      case "May":
        TomorrowMonth="05"
        break;
      case "Jun":
        TomorrowMonth="06"
        break;
      case "Jul":
        TomorrowMonth="07"
        break;
      case "Aug":
        TomorrowMonth="08"
        break;
      case "Sep":
        TomorrowMonth="09"
        break;
      case "Oct":
        TomorrowMonth="10"
        break;
      case "Nov":
        TomorrowMonth="11"
        break;
      case "Dec":
        TomorrowMonth="12"
        break;
      


    }
    this.setState({ Tomorrow: TomorrowYear + '-' + TomorrowMonth + '-' + TomorrowDate })
    
  }

  get_text_success = async (arr) => {



    this.setState({ items: arr })

  }

  get_text_fail = async (error) => {
    // console.log(error);
  }




  update() {
    database.readMessage(this.state.email, this.state.Date, this.get_text_success, this.get_text_fail);

  }

  render() {
    //const { done: doneHeading } = this.props;
    const { items } = this.state;
    const heading = "Todo";

    if (items === null || items.length === 0) {
      return (<View style={{flex: 6,alignItems: 'center',justifyContent: 'center', marginTop:'10%' }}>
      <Image style={{ width: 200, height: 152.77, }} source={{ uri: 'https://sv1.picz.in.th/images/2020/01/22/R2bmVk.png' }}/>
      <Text style={{ color: '#666666' , marginTop:10, textAlign:'center' }}>You’re all done for today! #TodoblackZero{'\n'}Enjoy your night.</Text>
  </View> );
    }
    console.log("Print items ")
    console.log(items)
    return (

      <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'center', backgroundColor: "#transparent", alignContent: 'center' }}>
        {items.map(({ Date, id, message, time ,PriImg,Des,Priority}) => (


          <Card style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', borderRadius: 20, marginTop: 12,padding:8 }} >
            {/*    
           ใส่ปุ่มบริเวณนี้       
                  */}


            <TouchableOpacity
              key={id}
              onPress={() => this.props.onPressTodo(id)}
              style={{
                backgroundColor: 'transparent',
                borderColor: '#DADADA',
                //   borderWidth: 1,
                padding: 8,
                borderRadius: 10

              }}
            >
              <Image style={{ marginLeft: "5%", width: 25, height: 25 }} source={{ uri: PriImg}} />
              
            </TouchableOpacity>
            
            <View style={{ flex: 1, marginLeft: "1%" ,flexDirection:"column"}}>
              <Text style={{ color: "#000", fontSize:16}} onPress={() => { this.props.onPressTodo2(id) 
                                                      AsyncStorage.setItem('@TaskID',id)
                                                      AsyncStorage.setItem('@Message',message) 
                                                      AsyncStorage.setItem('@Des',Des)
                                                      AsyncStorage.setItem('@TaskPriority',Priority)
              }}>{message}</Text>
              <Text  style={{ color: "#4B15B8", fontSize:12 }} >Date: {Date}</Text>
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
    padding: 16,
    margin: 16,
    marginHorizontal: 16
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8
  }
});
