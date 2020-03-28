import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image,AppRegistry,AsyncStorage} from "react-native";
import Constants from "expo-constants";
import { Container, Header, Title, Button, Icon, Content, InputGroup, Input } from 'native-base';
// import ActionButton from 'react-native-action-button';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import PropTypes from "prop-types";
import Items2 from './Items2'
import Items3 from './Items3'
import * as firebase from 'firebase';
import '@firebase/firestore';
import database from './Database3';
import { Card } from 'react-native-shadow-cards';
import { LinearGradient } from 'expo-linear-gradient';

import Dialog from "react-native-dialog";

export default class Completed extends Component {

 state = {
  email: '',
  message:'',
  time:'',
  Date:'',
  Priority:'',
  dialogVisible:false
}

onFocusFunction=async()=>{
  this.setState({email:await AsyncStorage.getItem('@email')})
  this.update()
}
// update (){
//   this.todo.update();

// };

componentDidMount(){

  this.onFocusFunction();
  let date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  // this.setState({time:hours+":"+min+":"+sec})
  // console.log(this.state.time)
  this.setState({time:firebase.firestore.FieldValue.serverTimestamp()})
  this.setState({Date:date + '/' + month + '/' + year})
  

 
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
  let id = await AsyncStorage.getItem('@TaskID')
  this.setState({ dialogVisible: false });
await database.deleteTask(this.state.email,id,this.deleteSuccess,this.deleteFail);
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
  await this.Completed.update();

};



onPressBack(){
  this.props.navigation.navigate('Main1')
}

onPressEdit(){
this.props.navigation.navigate('Edit')


}

handleCancel = () => {
  this.setState({ dialogVisible: false });
};




    render() {
        return (
            <Container>
            <Header >
              <View style = { styles.MainContainer1}>
                <Button transparent onPress={()=>this.onPressBack()}>
                    <Icon name='ios-arrow-back' style={{color:'#DBDBDB'}} />
                </Button>
              </View>
              <View style = { styles.MainContainer2 }>
                <Title>Completed</Title>
              </View>
              <View style={{flex: 1, alignItems: 'center',justifyContent: 'center', left: 15}}>
                {/* <TouchableOpacity>
                  <Image style={{width: 20, height: 20}}source={{uri: 'https://sv1.picz.in.th/images/2020/02/24/xsbgt2.png' }}/>
                </TouchableOpacity> */}
              </View>
            </Header>

            
                {/* <CalendarStrip 
                style={{height:'20%', paddingTop: '5%', paddingBottom: 10,}} 
                calendarHeaderStyle={{color: 'grey'}} 
                calendarColor={'#white'}
                dateNumberStyle={{color: 'grey'}}
                dateNameStyle={{color: 'grey'}}
                highlightDateNumberStyle={{color: 'black'}}
                highlightDateNameStyle={{color: 'black'}}
                disabledDateNameStyle={{color: 'grey'}}
                disabledDateNumberStyle={{color: 'grey'}}
                // datesWhitelist={datesWhitelist}
                // datesBlacklist={datesBlacklist}
                // iconLeft={require('./img/left-arrow.png')}
                // iconRight={require('./img/right-arrow.png')}
                iconContainer={{flex: 0.2}}
                // showDayNumber={{}}
                markedDatesStyle={{}}
                /> */}
<LinearGradient colors={['#000000', '#FFFFFF']}
style={{flex:1}} >


<ScrollView style={styles.listArea}>
                        
                        <Items3
                            ref={Completed => (this.Completed = Completed)}
                            onPressTodo={async ()=>{ this.setState({message:await AsyncStorage.getItem('@Message')})
                                    
                            this.setState({ dialogVisible: true });}}
                            onPressTodo2={() => this.props.navigation.navigate('Edit_Completed', { name: 'Edit_Completed' })}
                            
                              />
                        
                </ScrollView>
                <View>
                <Dialog.Container visible={this.state.dialogVisible} >

                  <Dialog.Title>Delete this task?</Dialog.Title>
                  
                  
                  <Dialog.Button label="Cancel" color="#6F41E9" bold="10" onPress={this.handleCancel} />
                  <Dialog.Button label="Done"  color="#6F41E9" bold="10" onPress={this.delete_Complete} />
                  
                </Dialog.Container>
              </View>



</LinearGradient>
             
                  




            </Container>
        );
    }
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },

  container1: {
    backgroundColor: "#fff",
    flex: 1,

    // paddingTop: Constants.statusBarHeight
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
    paddingTop: '2%'
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
