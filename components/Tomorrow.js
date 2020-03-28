import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image,AsyncStorage} from "react-native";
import Constants from "expo-constants";
import { Container, Header, Title, Button, Icon, Content, InputGroup, Input } from 'native-base';
import ActionButton from 'react-native-action-button';
import Items_Tomorrow from './Items_Tomorrow'
import * as firebase from 'firebase';
import '@firebase/firestore';
import database from './Database3';

import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-shadow-cards';
import Dialog from "react-native-dialog";


export default class Tomorrow extends React.Component {

  state = {
    email: '',
    message:'',
    time:'',
    Date:'',
    Priority:'',
    name: '',
    last: '',
    uri: "https://sv1.picz.in.th/images/2020/01/23/RuEI4z.png",
    Tomorrow: '',
    Alltask:'',
    ToCompletedTask:'',
    CompletedTask:'',
    TaskMessage:'',
    TaskID:'',
    dialogVisible: false,
    Color:''

  };



  onFocusFunction=async()=>{
    this.setState({email:await AsyncStorage.getItem('@email')})
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
    let tmp1=''
    let tmp2=''
    let tmp3=''
    this.setState({ Tomorrow: TomorrowYear + '-' + TomorrowMonth + '-' + TomorrowDate })
    await database.CountTask(this.state.email,this.state.Tomorrow,count=>{tmp1=count},this.countFail)
    await database.CountToComplete(this.state.email,this.state.Tomorrow,count=>{tmp2=count},this.countFail)
    await database.CountComplete(this.state.email,this.state.Tomorrow,count=>{tmp3=count},this.countFail)
    this.setState({ Alltask: await tmp1 })
    this.setState({ ToCompletedTask:await tmp2 })
    this.setState({ CompletedTask:await tmp3 })
    await this.update()
  }
  // update (){
  //   this.todo.update();

  // };

  componentDidMount(){

    this.onFocusFunction();
    
    
  
   
 }
 countFail(){

}


  onChangeText = message => this.setState({ message });

  onPressAdd = async() => {
    await this.addText();
    this.setState({ text:null});

    this.textInput.clear() 
  };
  addText=async()=>{
    
    Message={
      message:this.state.message,
      time: this.state.time,
      Date:this.state.Date,
      status:'1',
      
      id:''
    }
    console.log(this.state.email)
   await  database.addMessageToday(this.state.email,Message,this.addMessageSuccess,this.addMessageFail)

  }
addMessageSuccess=async(id)=>{
  
  console.log("Successsssssssss");
  await database.updateID(id,this.state.email,this.updateSuccess,this.updateFail)
  this.update();
  // await database.readMessage(this.state.email,this.state.Date,this.readMessageSuccess,this.readMessageFail)

  
}
addMessageFail=async()=>{

  console.log("addMessageFail");
}
async updateSuccess(){
  
  console.log("updateID");
  await this.update();
}
updateFail(){
  console.log("FailUpdate");
}
delete_Complete=async ()=>{

  this.setState({Priority:await AsyncStorage.getItem('@TaskPriority')})
  switch (this.state.Priority){
    case '3':
     
      await this.setState({Color:'#dc143c'})
      break;
    case '2' :
      await this.setState({Color:'#daa520'})
      break;
    case '1':
      await this.setState({Color:'#3cb371'})
      break;
    case '0':
      await  this.setState({Color:'#666666'})
      break;
  }
  let id = await AsyncStorage.getItem('@TaskID')
  this.setState({ dialogVisible: false });
  let tmp2=''
  let tmp3=''
  await database.updateStatus(id,this.state.email,this.state.Color,(async()=>{
    // await database.CountTask(this.state.email,this.state.Date,count=>{this.setState({ Alltask: count })},this.countFail)
    await database.CountToComplete(this.state.email,this.state.Tomorrow,count=>{tmp2=count },this.countFail)
    await database.CountComplete(this.state.email,this.state.Tomorrow,count=>{tmp3=count },this.countFail)
    this.setState({ ToCompletedTask: tmp2 })
    this.setState({ CompletedTask: tmp3 })
  console.log("updateID");
  this.todo.update()
  }),this.updateFail)
  // await database.deleteTask(this.state.email,id,this.deleteSuccess,this.deleteFail);
  //this.onPressTrack();
  await this.update();
  
  
}
deleteSuccess(){
  
  console.log("del success")
}
deleteFail(){
  console.log("del fail")
}
    

  readMessageSuccess=async(doc)=>{
    console.log("message :" +doc.message);
  
  }
  readMessageFail=async()=>{
    console.log("read F");
  }
 async update(){
    await this.todo.update();

  };


  

  onPressBack(){
    this.props.navigation.navigate('Main1')
 }
 onPressEdit(){
  this.props.navigation.navigate('Edit')
 

}
showDialog = () => {
  // this.setState({TaskMessage:AsyncStorage.getItem('@Message')})
  this.setState({ dialogVisible: true });
};

handleCancel = () => {
  this.setState({ dialogVisible: false });
};




render() {
  return (
    <Container>
      <Header>
        <View style={styles.MainContainer1}>
          <Button transparent onPress={() => this.onPressBack()}>
            <Icon name='ios-arrow-back' style={{ color: '#DBDBDB' }} />
          </Button>
        </View>
        <View style={styles.MainContainer2}>
          <Title>Tomorrow</Title>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', left: 15 }}>
          {/* <Image style={{ width: 20, height: 20 }}
            source={{ uri: 'https://sv1.picz.in.th/images/2020/01/22/RCoeNt.png' }}
          /> */}
        </View>
      </Header>



      <LinearGradient
        colors={['#FFFFFF', '#FFFFFF']}
        style={{
          flex: 1,
          // position: 'absolute',
          // left: 0,
          // right: 0,
          // top: 0,
          // height: 500,
        }}>


        {/* <View style={{flex:1,backgroundColor:"#000000"}}></View> */}
        {/*           
            <View style={{flex: 1, flexDirection: 'row', alignSelf:'center', marginTop:16, }}>
              <View>
                <TextInput
                ref={input => { this.textInput = input }} 
                style={styles.txtIn2}
                placeholder="insert item"
                onChangeText={this.onChangeText}
                />
              </View>
          </View> */}

        <View style={{ flex: 1, marginTop: '5%', backgroundColor: "#transparent", alignItems: 'center', }}>

          <Card style={{ flex:0.12, flexDirection: 'row',justifyContent:'center',alignItems:'center' }} >

            <View style={{ flexDirection: 'row',justifyContent: 'center' }}>

              <View style={{flex:1,  flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
                <Text style={styles.Text2}>{this.state.Alltask}</Text>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={styles.under}>Tasks for Tomorrow</Text>
                      </View>
                </View>


              <View style={{ alignItems: 'center', justifyContent: 'center' ,alignContent:'center'}} >
                <Text style={styles.TTT} >|</Text>
              </View>

              
              <View style={{flex:1.3,  flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                  <Text style={styles.Text2} >{this.state.ToCompletedTask}</Text>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={styles.under}>Tasks to be Completed</Text>
                  </View>
              </View>


              <View style={{ alignItems: 'center', justifyContent: 'center' ,alignContent:'center',}} >
                <Text style={styles.TTT}>|</Text>
              </View>


              <View style={{ flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                  <Text style={styles.Text2} >{this.state.CompletedTask}</Text>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={styles.under}>Completed  Tasks</Text>
                  </View>
              </View>

            </View>
          </Card>








          
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', marginTop: '2%', }}>
                <View style={{flex:7,flexDirection:'column',justifyContent:'center' ,alignContent:'center',backgroundColor:'transparent',marginTop:"5%"}}>

                    <Text style={{color:'#666666',fontSize:18,fontWeight:'bold', textAlight:'left', marginLeft:'7%'}}>Tomorrow</Text>

                    <View style={{flex:7,flexDirection:'column',justifyContent:'center' ,alignContent:'center',backgroundColor:'transparent'}}>
                        <ScrollView style={styles.listArea}>
                              
                              <Items_Tomorrow
                                  ref={todo => (this.todo = todo)}
                                  onPressTodo={async ()=>{ this.setState({message:await AsyncStorage.getItem('@Message')})
                                  this.setState({ dialogVisible: true });}}
                                  onPressTodo2={() => this.props.navigation.navigate('Edit_Tomorrow', { name: 'Edit_Tomorrow' })}
                                  
                                    />

                        </ScrollView>
                    </View>

                </View>
            </View>
            <View>
                <Dialog.Container visible={this.state.dialogVisible} >

                  <Dialog.Title>done already?</Dialog.Title>
                  <Dialog.Description fontSize="30">{this.state.message}</Dialog.Description>
                  
                  <Dialog.Button label="Cancel" color="#6F41E9" bold="10" onPress={this.handleCancel} />
                  <Dialog.Button label="Done"  color="#6F41E9" bold="10" onPress={this.delete_Complete} />
                  
                </Dialog.Container>
              </View>

            <ActionButton buttonColor="rgba(75,21,184,2)" position="right">
                 <ActionButton.Item buttonColor='#000000' title="New Task" onPress={() =>  this.props.navigation.navigate('AddTask')}>
                  <Icon name="md-create" style={{color:'white'}} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#CCCCCC' title="Group" onPress={() =>  this.props.navigation.navigate('Group')}>
                  <Icon name="md-people" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#ffffff' title="New Note" onPress={() =>  this.props.navigation.navigate('AddNote')}>
                  <Icon name="md-save" style={styles.actionButtonIcon} />
                </ActionButton.Item>
              </ActionButton>
        </View>
        
       
      </LinearGradient>
    </Container>


  );
}
}
const styles = StyleSheet.create({
container: {
  alignItems: 'flex-start',
  flex: 1,
  flexDirection: 'row',
  marginRight: 16,
  marginTop: 5,
  marginBottom: 5,
  backgroundColor: 'transparent',
},
title: {
  fontSize: 16,
  color: '#FFFFFF',
},
container_text: {
  flex: 1,
  flexDirection: 'column',
  borderRadius: 10,
  paddingLeft: 5,
  justifyContent: 'center',
  backgroundColor: '#1F9BF1',
},

Text: {
  color: "#5B3E96",
  fontSize: 17,
  marginTop: 5,
  marginLeft: 2,
  marginEnd: 2,
  alignItems: 'center',
  justifyContent: 'center'
},

Text2: {
  color: "#5B3E96",
  fontSize: 22,
  alignItems: 'center',
  justifyContent: 'center'
}, 

TTT: {
  color: "#666666",
  fontSize: 25,
  // marginTop: 5,
  // marginLeft: 2,
  // marginEnd: 2,
  alignItems: 'center',
  justifyContent: 'center'
},
under: {
  color: "#666666",
  fontSize: 11,
  marginTop: 5,

  marginEnd: 2,
  alignItems: 'center',

}, 
Icon: {
  height: 25,
  width: 25,
  marginRight: 5,
  marginLeft: 5,
  // marginTop:5,


  alignItems: 'center',
  justifyContent: 'center'

}, 

MainContainer1: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  right: 10
}, 

MainContainer2: {
  flex: 4,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 5
},

listArea: {
  backgroundColor: "transparent",
  padding:20,
  flex: 1,
  marginTop: 16,
},
});
