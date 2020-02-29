import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-shadow-cards';
import { Container, Header, Title, Button, Icon, Content, InputGroup, Input } from 'native-base';
import Items_someday from './Items_someday'
import database2 from './Database2'
import Constants from "expo-constants";
import ActionButton from 'react-native-action-button';
import * as firebase from 'firebase';
import '@firebase/firestore';
import database from './Database3';


export default class Someday extends React.Component {
  state = {
    email: '',
    message:'',
    time:'',
    Date:'',
    Priority:'',
    name: '',
    last: '',
    uri: "https://sv1.picz.in.th/images/2020/01/23/RuEI4z.png"

  };

//   onFocusFunction = async () => {

//     // const value =await AsyncStorage.getItem('@email');
//     // this.setState({email:value})
//     // database.readdata(this.state.email,this.read_Account_success,this.read_Account_fail)
//     // console.log("test")
//     // console.log(this.state.email)

//     const name_store = await AsyncStorage.getItem('@name');
//     console.log(name_store)
//     const last_store = await AsyncStorage.getItem('@last');
//     const uri_store = await AsyncStorage.getItem('@uri');
//     if (uri_store == null) {
//       this.setState({ uri: "https://sv1.picz.in.th/images/2020/01/23/RuEI4z.png" })
//       this.setState({ name: name_store })
//       this.setState({ last: last_store })
//     }
//     else {
//       this.setState({ name: name_store })
//       this.setState({ last: last_store })
//       this.setState({ uri: uri_store })
//     }
//   }


//   // read_Account_success=async(doc)=>{
//   //   this.setState({name:doc.name})
//   //   this.setState({email:doc.email})
//   //   this.setState({last:doc.last})
//   //   console.log(this.state.name);

//   //   await AsyncStorage.setItem('@name',this.state.name);
//   //   await AsyncStorage.setItem('@last',this.state.last);
//   // }

//   // read_Account_fail=async()=>{
//   //   console.log("error")


//   // }
//   componentDidMount() {

//     this.onFocusFunction();


//   }
//   onPressBack(){
//     this.props.navigation.navigate('Main1')
//  }


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
delete_Complete=async (id)=>{
await database.updateStatus(id,this.state.email,this.updateSuccess,this.updateFail)
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
            <Title>Someday</Title>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', left: 15 }}>
            <Image style={{ width: 20, height: 20 }}
              source={{ uri: 'https://sv1.picz.in.th/images/2020/01/22/RCoeNt.png' }}
            />
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
                  <Text style={styles.Text2}>6</Text>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={styles.under}>Tasks for Someday</Text>
                        </View>
                  </View>


                <View style={{ alignItems: 'center', justifyContent: 'center' ,alignContent:'center'}} >
                  <Text style={styles.TTT} >|</Text>
                </View>

                
                <View style={{flex:1,  flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={styles.Text2} >3</Text>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={styles.under}>Tasks to be Completed</Text>
                    </View>
                </View>


                <View style={{ alignItems: 'center', justifyContent: 'center' ,alignContent:'center',}} >
                  <Text style={styles.TTT}>|</Text>
                </View>


                <View style={{ flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={styles.Text2} >1</Text>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={styles.under}>Completed  Tasks</Text>
                    </View>

                </View>

              </View>
            </Card>









              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', marginTop: '2%', }}>
                  <View style={{flex:7,flexDirection:'column',justifyContent:'center' ,alignContent:'center',backgroundColor:'transparent',marginTop:"5%"}}>

                      <Text style={{color:'#666666',fontSize:18,fontWeight:'bold', textAlight:'left', marginLeft:'7%'}}>Someday</Text>

                      <View style={{flex:7,flexDirection:'column',justifyContent:'center' ,alignContent:'center',backgroundColor:'transparent'}}>
                          <ScrollView style={styles.listArea}>
                                
                                <Items_someday
                                    ref={todo => (this.todo = todo)}
                                    onPressTodo={this.delete_Complete}
                                    onPressTodo2={() => this.props.navigation.navigate('timer', { name: 'timer' })}
                                    onPressTodo3={() => this.props.navigation.navigate('Edit', { name: 'Edit' })}
                                      />

                          </ScrollView>
                      </View>


                      {/* <View style={{flex: 6,alignItems: 'center',justifyContent: 'center' }}>
                          <Image style={{ width: 200, height: 152.77, }} source={{ uri: 'https://sv1.picz.in.th/images/2020/01/22/R2bmVk.png' }}/>
                          <Text style={{ color: '#666666' , marginTop:10, textAlign:'center' }}>You’re all done for today! #TodoblackZero{'\n'}Enjoy your night.</Text>
                      </View> */}

                  </View>
              </View>

              <ActionButton buttonColor="rgba(75,21,184,2)" position="right">
                 <ActionButton.Item buttonColor='#000000' title="New Task" onPress={() =>  this.props.navigation.navigate('AddTask')}>
                  <Icon name="md-create" style={{color:'white'}} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#CCCCCC' title="Group" onPress={() => {}}>
                  <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#ffffff' title="All Tasks" onPress={() => {}}>
                  <Icon name="md-done-all" style={styles.actionButtonIcon} />
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
