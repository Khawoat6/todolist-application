import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image,DatePickerIOS} from "react-native";
import Constants from "expo-constants";
import { Container, Header, Title, Button, Icon, Content, InputGroup, Input } from 'native-base';
// import ActionButton from 'react-native-action-button';

import DatePicker from 'react-native-datepicker'

// Edit_DueDate
// Edit_Note
// Edit_PomodoroNumber
// Edit_Reminder
// Edit_Repeat

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {chosenDate: new Date()};

    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }
  // constructor(props){
  //   super(props)
  //     this.state = {chosenDate: new Date()};

  //       this.setDate = this.setDate.bind(this);
  // }

  onPressBack(){
    this.props.navigation.navigate("Main1");
    // this.props.navigation.goBack();
 }
 onPressEdit_DueDate(){
  this.props.navigation.navigate("Edit_DueDate");
  // this.props.navigation.goBack();
}
onPressEdit_Note(){
  this.props.navigation.navigate("Edit_Note");
  // this.props.navigation.goBack();
}
onPressEdit_PomodoroNumber(){
  this.props.navigation.navigate("Edit_PomodoroNumber");
  // this.props.navigation.goBack();
}
onPressEdit_Reminder(){
  this.props.navigation.navigate("Edit_Reminder")
  // this.props.navigation.goBack();
}
onPressEdit_Repeat(){
  this.props.navigation.navigate("Edit_Repeat");
  // this.props.navigation.goBack();
}
    render() {
        return (
            <Container>
            <Header >
              <View style = { styles.MainContainer1}>
              {/* <Button transparent  onPress={() => this.props.navigation.goBack()}> */}
                <Button transparent  onPress={()=>this.onPressBack()}>
                    <Icon name='ios-arrow-back' style={{color:'#DBDBDB'}} />
                </Button>
              </View>
              <View style = { styles.MainContainer2 }>
                <Title>Edit</Title>
              </View>
              
              <View style={{flex: 1, alignItems: 'center',justifyContent: 'center', left: 15}}>
                <Image style={{width: 20, height: 20}}source={{uri: 'https://sv1.picz.in.th/images/2020/01/24/RrBuNt.png' }}/>
              </View>
            </Header>
            {/* <ActionButton buttonColor="rgba(75,21,184,2)" position="center"></ActionButton> */}






        <View style={{flex:1,flexDirection:'column',backgroundColor:'#F6F6F6'}} >


          <TouchableOpacity  style={{flex:0.08,flexDirection:'row',marginTop:20,backgroundColor:'#ffffff', alignItems:'center'}} >
                <Image style={{marginLeft:30, marginRight:10 ,width:25,height:25}} source={{uri:'https://sv1.picz.in.th/images/2020/01/24/Rr9eWe.png'}}/>
                  <View style={{flexDirection: 'column'}} >
                    <Text style={{fontSize:20,fontWeight:'bold' ,color:'#171D33',marginLeft:10,marginEnd:3,alignItems:'center',justifyContent:'center'}}>Get a Haircut</Text>
                  </View>
                  <Text style={{fontSize:16 , color:'#D4D4D4', marginLeft:140}}></Text>
                  <Image style={{marginLeft:30, marginRight:10 ,width:15,height:15}} source={{uri:'https://sv1.picz.in.th/images/2020/01/24/RrTgsz.png'}}/>
          </TouchableOpacity>


            <TouchableOpacity  style={{flex:0.08,flexDirection:'row',marginTop:20,backgroundColor:'#ffffff', alignItems:'center'}} onPress={() => this.setState({ picker: !this.state.picker })}>
                <Image style={{marginLeft:25, marginRight:10 ,width:30,height:30}} source={{uri:'https://sv1.picz.in.th/images/2020/01/24/Rr3Loy.png'}}/>
                  <View style={{flexDirection: 'column'}} >
                    <Text style={{fontSize:18,color:'#171D33',marginLeft:10,marginEnd:3,alignItems:'center',justifyContent:'center'}}>Due Date</Text>
                    
                  </View>
        <Text style={{fontSize:16 , color:'#D4D4D4', marginLeft:192}}>None</Text>
            </TouchableOpacity>
            {this.renderPicker()}
       

            <TouchableOpacity  style={{flex:0.08,flexDirection:'row',backgroundColor:'#ffffff', alignItems:'center'}} onPress={()=>this.onPressEdit_Reminder()}>
                <Image style={{marginLeft:25, marginRight:10 ,width:25,height:25}} source={{uri:'https://sv1.picz.in.th/images/2020/01/24/Rr3eJD.png'}}/>
                  <View style={{flexDirection: 'column'}} >
                    <Text style={{fontSize:18,color:'#171D33',marginLeft:10,marginEnd:3,alignItems:'center',justifyContent:'center'}}>Reminder</Text>
                  </View>
                  <Text style={{fontSize:16 , color:'#D4D4D4', marginLeft:192}}>None</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={{flex:0.08,flexDirection:'row',backgroundColor:'#ffffff', alignItems:'center'}} onPress={()=>this.onPressEdit_Repeat()}>
                <Image style={{marginLeft:25, marginRight:10 ,width:25,height:25}} source={{uri:'https://sv1.picz.in.th/images/2020/01/24/Rr3F5J.png'}}/>
                  <View style={{flexDirection: 'column'}} >
                    <Text style={{fontSize:18,color:'#171D33',marginLeft:10,marginEnd:3,alignItems:'center',justifyContent:'center'}}>Repeat</Text>
                  </View>
                  <Text style={{fontSize:16 , color:'#D4D4D4', marginLeft:210}}>None</Text>
            </TouchableOpacity>


            <TouchableOpacity  style={{flex:0.08,flexDirection:'row',marginTop:20,backgroundColor:'#ffffff',alignItems:'center'}}onPress={()=>this.onPressEdit_Note()}>
                  <Text style={{fontSize:18 , color:'#D4D4D4', marginLeft:25, }}>Add a note...</Text>
            </TouchableOpacity>

        </View>





            </Container>
        );
    }

    renderPicker() {
      if (this.state.picker) {
        return (
          <DatePicker
            style={{ width: '100%' }}
            ref={picker => {
              this.datePicker = picker;
            }}
            date={this.state.date}
            mode="date"
            placeholder="Select Date"
            format="DD/MM/YYYY"
            // minDate="2016-05-01"
            // maxDate="2020-12-12"
            confirmBtnText="OK"
            cancelBtnText="Cancel"
            onDateChange={date => {
              this.setState({ date: date });
            }}
          />
        );
      }
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
    backgroundColor: "transparent",
    flex: 1,
    // paddingTop: 16
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8
  },
  nameInput: {
        alignItems: 'center',
        height:50,
        backgroundColor: 'transparent',
        padding: 5,
        margin:5,
        borderRadius: 50,
        borderColor:'white',
        borderWidth : 1,
        fontSize:20,
    },
    buttonText: {
        alignItems: 'center',
        height:50,
        backgroundColor: '#86A8E7',
        padding: 10,
        margin:5,
        borderRadius: 50,
        borderColor:'white',
        borderWidth : 1,
        fontSize:30,
        color:'#ffffff'
    },
    touchableUser:{
      alignItems: 'center',
      padding:10,
      borderRadius: 50,
      borderColor:'white',
      borderWidth : 1,
      margin:5,
      marginTop:2,
    },
    btn:{
      alignItems: 'center',
      height:50,
      backgroundColor: '#86A8E7',
      padding: 10,
      margin:10,
      borderRadius: 50,
      borderColor:'white',
      borderWidth : 1
    },
    txt:{
      textAlign: 'center',
      fontSize:50
    },

    txtIn2: {
      alignItems: 'center',
      width:350,
      height:55,
      backgroundColor: 'transparent',
      padding: 16,
      marginLeft:16,
      marginRight:16,
      borderColor: '#5B3E96',
      borderWidth: 2.2,
      borderRadius: 55,

    },

    btn_register:{
      alignItems: 'center',
      width:50,
      height:50,
      backgroundColor: '#000000',
      padding: 16,
      marginRight:16,
      borderRadius: 50,
      borderColor:'#000000',
      borderWidth : 1
    },

    MainContainer1:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      right: 10  
    },
      
    MainContainer2:{
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5
    },


});
