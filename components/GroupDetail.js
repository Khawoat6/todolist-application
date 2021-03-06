import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-shadow-cards';
import { Container, Header, Title, Button, Icon, Content, InputGroup, Input, Thumbnail} from 'native-base';
import Items_GroupNew from './Items_GroupNew'
// import Items_Group from './Items_Group'
import database2 from './Database2'
import Constants from "expo-constants";
import ActionButton from 'react-native-action-button';
import * as firebase from 'firebase';
import '@firebase/firestore';
import database from './Database';
// import { Block, Button, Card, Icon, Input, NavBar, Text } from 'galio-framework';
// import { Avatar } from 'monalisa-ui';
import { Avatar } from 'react-native-elements';
import CalendarStrip from 'react-native-calendar-strip';
import Dialog from "react-native-dialog";
import Items_Members from './Items_Members'
import * as ImagePicker from 'expo-image-picker';
import Items_comple from './Items_comple'



export default class GroupDetail extends React.Component {

  state = {
    des:'',
    email: '',
    message:'',
    time:'',
    Date:'',
    Priority:'',
    name: '',
    last: '',
    uri: "https://sv1.picz.in.th/images/2020/01/23/RuEI4z.png",
    group:'',
    dialogVisible: false,
    Alltask:'',
    ToCompletedTask:'',
    CompletedTask:'',
    groupUri:'',
    dialogVisible2: false,
    uploaduri:'',
    dialogVisible3: false, 
    dialogVisible4:false,
    dialogVisible5:false,
    tmp:'0',
    dialogtext:'wanna change your group image ?',
    picker:true,
    comple:false,
    TextTmp:"All Tasks"
 
  };
  pickImage = async () => {
    // await this.setState({ dialogVisible3: false });

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);
    if (!result.cancelled) {
      await this.setState({ dialogVisible3: false });
      await this.setState({ groupUri: result.uri });
   
      //  await this.setState({ dialogVisible4: true });
      // this.handleCancel()
    }
    console.log(this.state.groupUri) 


  };

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
  showDialog4 = () => {
    this.setState({ dialogVisible4: true });
    console.log(this.state.dialogVisible4)
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
    this.setState({ dialogVisible2: false });
    this.setState({ dialogVisible3: false });
     this.setState({ dialogVisible5: false });
    this.setState({ dialogVisible4: false });

  };
  upload_fail = async (error) => {
    Alert.alert(error);

  }
  uploading_status = async () => {
    // this.setState({ txtButton: progress });
  }
  delete_Complete=async ()=>{
    let id = await AsyncStorage.getItem('@TaskID')
    await database.updateStatus(id,this.state.group,this.deleteSuccess,this.deleteFail)
    // await database.deleteTask(this.state.email,id,this.deleteSuccess,this.deleteFail);
    // await database.CountTask(this.state.group,count=>{this.setState({ Alltask: count })},this.countFail)
    await database.CountToComplete(this.state.group,count=>{this.setState({ ToCompletedTask: count })},this.countFail)
    await database.CountComplete(this.state.group,count=>{this.setState({ CompletedTask: count })},this.countFail)
    //this.onPressTrack();
    await this.setState({ dialogVisible2: false });
    this.Task.update();
    
    
  }
  async deleteSuccess(){
    
  this.Task.update();
  console.log("del success")
  }
  deleteFail(){
    this.Task.update();
  console.log("del fail")
  }
  showDialog2 = () => {
    // this.setState({TaskMessage:AsyncStorage.getItem('@Message')})
    this.setState({ dialogVisible2: true });
  };
  
  handleCancel2 = () => {
    this.setState({ dialogVisible2: false });
  };
  
    
  handleAdd = async() => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    
    if( this.state.message.trim() == ""){
      Alert.alert("Your task can't be empty")
    }
    else{
    this.setState({ dialogVisible: false });
    Message={
      message:this.state.message, 
      user:this.state.email,
      time:this.state.time,
      status:'1',
      uri:this.state.uri,
      id:'',
      Des:''
    }
    await database.addGroupMessage(this.state.group,Message,this.addMessage_Success,this.addMessage_Fail)
    await database.CountTask(this.state.group,count=>{this.setState({ Alltask: count })},this.countFail)
    await database.CountToComplete(this.state.group,count=>{this.setState({ ToCompletedTask: count })},this.countFail)
   
    this.Task.update();
    }
  };
  async addMessage_Success(id){
    //await database.updateID(id,this.state.group,this.update_Success,this.update_Fail)
    
    // this.Task.update();
    console.log("Success")
  }
  addMessage_Fail(){
    // this.Task.update();
    console.log("Fail")
  }
  update_Success(){

    console.log("Success")
  }
  update_Fail(error){
    console.log(error)
  }

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


async readcount(){
  await database.CountTask(this.state.group,count=>{this.setState({ Alltask: count })},this.countFail)
  await database.CountToComplete(this.state.group,count=>{this.setState({ ToCompletedTask: count })},this.countFail)
  await database.CountComplete(this.state.group,count=>{this.setState({ CompletedTask: count })},this.countFail)
}
onFocusFunction=async()=>{
  this.setState({email:await AsyncStorage.getItem('@email')})
  this.setState({group:await AsyncStorage.getItem('@group')})
  this.setState({uri:await AsyncStorage.getItem('@uri')});
  let count1='';
  let count2='';
  let count3='';
  await database.CountTask(this.state.group,count=>{count1=count},this.countFail)
  await database.CountToComplete(this.state.group,count=>{count2=count},this.countFail)
  await database.CountComplete(this.state.group,count=>{count3=count},this.countFail)
  this.setState({ Alltask: count1 })
  this.setState({ ToCompletedTask: count2 })
  this.setState({ CompletedTask: count3 })
  await database.readGroupDetail(this.state.group,data=>{
    this.setState({des:data.des})
    this.setState({groupUri:data.uri})
  },this.readGroupDetail_Fail)
  this.Task.update();
}

// update (){
//   this.todo.update();

// };
countSuccess(count){
  this.setState({ Alltask: count });
}
countFail(){

}
upload_success = async (uri) => {
  this.setState({ uploaduri: uri });
  // url=await this.createURL()
  // await database.addImage(this.state.id,url,this.add_success,this.add_fail)
  // this.setState({txtButton:"Success"});
  

  this.addURL()


}
add_success = async (error) => {

  
  
}
add_fail = async (error) => {
  // Alert.alert("Add Avatar Fail");

}
addURL = async () => {

  await database.addImageGroup(this.state.group, this.state.uploaduri, this.add_success, this.add_fail)
  await database.readImgGroup(this.state.group,this.state.email,this.update_S,this.update_F)
  this.setState({ txtButton: "Success" });
  await this.setState({tmp:'0'})
  await this.setState({dialogtext:'wanna change your group image ?'})
  await this.setState({ dialogVisible3: false });

}
update_S(){
  // this.props.navigation.navigate('Group')
}
update_F(){
  console.log("Fail")
}
componentDidMount(){

  
  let date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  this.onFocusFunction();
  
  // this.setState({time:hours+":"+min+":"+sec})
  // console.log(this.state.time)
  this.setState({time:firebase.firestore.FieldValue.serverTimestamp()})
  // month=String(month)
  // var len=month.length()
  // if(len==1){
  //   month=String('0')+String(month)
  //   console.log(month)
  // }
  month=month.toString()
  console.log(typeof(month))
  console.log(month.length)
  if (month.length==1){
    month=String('0')+String(month)
  }

  console.log(month)
  if(date.length==1){
    date=String('0')+String(date)
  }


}
readGroupDetail_Fail(){

}
async readGroupDetail_Su(){

  this.setState({des:await AsyncStorage.getItem('@GroupDes')})
  this.setState({uri:await AsyncStorage.getItem('@GroupIMG')})
  console.log(this.state.des)
    // this.setState({des:data.des})
    // this.setState({uri:data.uri})

  
}

onChangeText = message => this.setState({ message });



 update(){
     this.Task.update();
};

onPressBack(){
    this.props.navigation.navigate('Main1')
}

onPressGroup(){
    this.props.navigation.navigate('Group')
}

onPressEdit(){
    this.props.navigation.navigate('Edit')
}
async onPressLeaveGroup(){
  await database.LeaveGroup(this.state.group,this.state.email,(()=>{this.props.navigation.navigate('Group')}),this.leave_F)
}

leave_F(){
  console.log("leaveFail")
}

async DeleteTask(){
  let id = await AsyncStorage.getItem('@TaskID')
  await database.deleteGrouptask(id,this.state.group,(()=>{ this.taslcomple.update();}),this.del_F)
}

del_S(){
  this.taslcomple.update();
}
del_F(){

}


  render() {
    return (
      <Container>
        <Header>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', right: 10}}>
            <Button transparent onPress={() => this.onPressGroup()}>
              <Icon name='ios-arrow-back' style={{ color: '#DBDBDB' }} />
            </Button>
          </View>
          <View style={{flex: 4, justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
            <Title>{this.state.group}</Title>
          </View>
          <TouchableOpacity onPress={()=>this.onPressLeaveGroup()}>
            <View  style={{flex: 1, alignItems: 'center',justifyContent: 'center', marginRight:'8%'}}>

              <Image style={{width: 20, height: 20}}source={{uri: 'https://sv1.picz.in.th/images/2020/03/18/Qc7eXQ.png' }}/>
            </View>
          </TouchableOpacity>
        </Header>


        <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={{ flex:1}}>

            {/* <CalendarStrip 
                // highlightColor={'white'}
                style={{height:'14%', paddingTop: '3%'}} 
                calendarHeaderStyle={{color: 'white'}} 
                // calendarColor={'rgba(75,21,184,2)'}
                calendarColor={'black'}
                dateNumberStyle={{color: '#CCCCCC'}} // 13
                dateNameStyle={{color: '#CCCCCC'}} // FRI
                highlightDateNumberStyle={{color: 'rgba(75,21,184,2)'}}
                highlightDateNameStyle={{color: 'white'}}
                disabledDateNameStyle={{color: 'grey'}}
                disabledDateNumberStyle={{color: 'grey'}}
                iconContainer={{flex: 0.2}}
                // calendarAnimation={{type: 'sequence', duration: 30}}
                // daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
                // selection={'border'}
                // selectionAnimation={{duration: 300, borderWidth: 1}}
                // updateWeek={false}
                // datesWhitelist={datesWhitelist}
                // datesBlacklist={datesBlacklist}
                // iconLeft={require('./images/icons8-chevron-left-90.png')}
                // iconLeft={require('./images/icons8-chevron-right-90.png')}
                // showDayNumber={{}}
                // markedDatesStyle={{borderWidth: 1}}
                // datesWhitelist={this.props.datesWhiteList}
                // customDatesStyles={this.state.selectedDateMM.format("YYYYMMDD")==moment().format("YYYYMMDD")?[]:customDatesStyles}
                // onDateSelected={(day) =>  {this._selectDate.bind(this)(day)}}
                // onWeekChanged={(day) =>  {this._weekChanged.bind(this)(day)}}
                /> */}


          <View>
              <LinearGradient colors={['#000000', '#FFFFFF']}>
                <View style={{height:110,}}></View>
                    <TouchableOpacity style={{  alignSelf:'center',position: 'absolute'}} onPress={()=>{this.setState({dialogVisible3:true})}} >
                  <Image style={styles.avatar} source={{uri:this.state.groupUri}}/>
                  </TouchableOpacity>
                  <View style={styles.body}>
                    <View style={styles.bodyContent}>
                      <Text style={styles.name}>{this.state.group}</Text>
                      <Text style={styles.description}>{this.state.des}</Text>
                      {/* <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis</Text> */}
                    </View>
                </View>
              </LinearGradient> 
          </View>


          <View style={{ flex: 1, marginTop: '3%', backgroundColor: "#transparent", alignItems: 'center', }}>



              <Card style={{ flex:0.2, flexDirection: 'row',justifyContent:'center',alignItems:'center' }} >
                
                <View style={{ flexDirection: 'row',justifyContent: 'center' }}>
                <TouchableOpacity  style={{ alignItems: 'center', justifyContent: 'center' ,alignContent:'center'}} onPress={() => {
                  this.setState({TextTmp:'All Tasks'})
                  this.setState({picker:true})
              this.setState({comple:false})}}>
                    <View style={{flex:1,  flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
                      <Text style={styles.Text2}>{this.state.Alltask}</Text>
                          <View style={{ alignItems: 'center' }}>
                            <Text style={styles.under}>All Tasks</Text>
                          </View>
                    </View>
                    </TouchableOpacity>

                  <View style={{ alignItems: 'center', justifyContent: 'center' ,alignContent:'center'}} >
                    <Text style={styles.TTT} >|</Text>
                  </View>
                  
                  <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' ,alignContent:'center'}} onPress={() => {
                    this.setState({TextTmp:'All Tasks'})
                    this.setState({picker:true})
                this.setState({comple:false})}}>
                  <View style={{flex:1.3,  flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                      <Text style={styles.Text2} >{this.state.ToCompletedTask}</Text>
                      
                      <View style={{ alignItems: 'center' }}>
                        <Text style={styles.under}>Tasks to be Completed</Text>
                      </View>
                  </View>
                  </TouchableOpacity>

                  <View style={{ alignItems: 'center', justifyContent: 'center' ,alignContent:'center',}} >
                    <Text style={styles.TTT}>|</Text>
                  </View>

                  <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' ,alignContent:'center'}} onPress={() => {
                    
                    this.setState({TextTmp:'Completed Tasks'})
                    this.setState({picker:false}) 
                  this.setState({comple:true})}}>
                  <View style={{ flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                      <Text style={styles.Text2} >{this.state.CompletedTask}</Text>
                      <View style={{ alignItems: 'center' }}>
                       
                        <Text style={styles.under}>Completed  Tasks</Text>
                        
                      </View>
                  </View>
                  </TouchableOpacity>

                </View>
              </Card>

              <View>
                <Dialog.Container visible={this.state.dialogVisible} >

                  <Dialog.Title>Add Task</Dialog.Title>
                  <Dialog.Description>Add a new task for this group</Dialog.Description>
                  <Dialog.Input onChangeText={message => this.setState({message})} maxLength={35} color="#000000"/>
                  <Dialog.Button label="Cancel" color="#6F41E9" bold="10" onPress={this.handleCancel} />
                  <Dialog.Button label="Add"  color="#6F41E9" bold="10" onPress={this.handleAdd} />
                  
                </Dialog.Container>
              </View>

              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', marginTop: '2%', }}>
                  <View style={{flex:7,flexDirection:'column',justifyContent:'center' ,alignContent:'center',backgroundColor:'transparent',marginTop:"5%"}}>

                      <Text style={{color:'#666666',fontSize:18,fontWeight:'bold', textAlight:'left', marginLeft:'7%'}}>{this.state.TextTmp}</Text>

                      <View style={{flex:7,flexDirection:'column',justifyContent:'center' ,alignContent:'center',backgroundColor:'transparent', marginBottom:'2%'}}>
                          <ScrollView style={{backgroundColor: "transparent", padding:20, flex: 1, marginTop: 10,}}>
                          {this.renderPicker()}
                          {this.Completed()}     

                          </ScrollView>
                      </View>
                  </View>
              </View>
          
              {/* <Card style={{ flex:0.13, flexDirection: 'row',alignItems:'center',  }} >

              <Text style={{color:'#666666',fontSize:18,fontWeight:'bold', textAlight:'left', marginLeft:'7%'}}>Members</Text>
              <ScrollView horizontal={true} > */}
              <Items_Members 
                ref={imgGroup=>(this.imgGroup =imgGroup)}

              />
                    
                {/* </ScrollView>

              </Card> */}
              
              {/* <Card style={{ flex:0.13, flexDirection: 'row',alignItems:'center',  }} >

                <Text style={{color:'#666666',fontSize:18,fontWeight:'bold', textAlight:'left', marginLeft:'7%'}}>Members</Text>
                <View style={{ flexDirection: 'row',justifyContent: 'center', }}>
                  <Avatar rounded containerStyle={{marginLeft:'5%'}} source={{uri:'https://sv1.picz.in.th/images/2020/03/13/QBSTJR.png',}}/>
                  <Avatar rounded containerStyle={{marginLeft:'3%'}} source={{uri:'https://sv1.picz.in.th/images/2020/03/13/QBSwh0.png',}}/>
                  <Avatar rounded containerStyle={{marginLeft:'3%'}} source={{uri:'https://sv1.picz.in.th/images/2020/03/13/QBSOEN.png',}}/>
                </View>

              </Card> */}


              <ActionButton buttonColor="rgba(75,21,184,2)" position="right">

                <ActionButton.Item buttonColor='#000000' title="New Task" onPress={this.showDialog}>
                  <Icon name="md-create" style={{color:'white'}} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#ffffff' title="Home" onPress={() =>  this.props.navigation.navigate('Main1')}>
                  <Icon name="md-home" style={{color:'black'}} />
                </ActionButton.Item>

              </ActionButton>
              <View>
                <Dialog.Container visible={this.state.dialogVisible2} >

                  <Dialog.Title>done already?</Dialog.Title>
                 
                  
                  <Dialog.Button label="Cancel" color="#6F41E9" bold="10" onPress={this.handleCancel} />
                  <Dialog.Button label="Done"  color="#6F41E9" bold="10" onPress={this.delete_Complete} />
                  
                </Dialog.Container>
              </View>

              <View>
                <Dialog.Container visible={this.state.dialogVisible3} >

                  <Dialog.Title>{this.state.dialogtext}</Dialog.Title>
                 
                  
                  <Dialog.Button label="No" color="#6F41E9" bold="10" onPress={this.handleCancel} />
                  <Dialog.Button label="Yes"  color="#6F41E9" bold="10" onPress={async ()=>{
                    if(this.state.tmp =='0')
                    {
                   let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: false,
                    aspect: [4, 3],
                    quality: 1
                  });
                  // await this.setState({dialogVisible3:false})
                  console.log(result);
                  if (!result.cancelled) {
                    
                    await this.setState({ groupUri: result.uri })
                    // this.handleCancel()
                   this.setState({dialogtext:'upload this image ?'})
                   this.setState({tmp:'1'})

                   console.log("123")
                    
                  
                  
                  }
                }
                else{
                  console.log("upload")
                  await database.uploadImageGroup(this.state.group, this.state.groupUri, this.upload_success, this.upload_fail, this.uploading_status);
                }
              
              }} />
                  
                </Dialog.Container>
              </View>

              <View>
                <Dialog.Container visible={this.state.dialogVisible4} >

                  <Dialog.Title>upload this image ?</Dialog.Title>
                 
                  
                  <Dialog.Button label="No" color="#6F41E9" bold="10" onPress={this.handleCancel} />
                  <Dialog.Button label="Yes"  color="#6F41E9" bold="10" onPress={this.uploaduri} />
                  
                </Dialog.Container>
              </View>

              <View>
                <Dialog.Container visible={this.state.dialogVisible5} >

                  <Dialog.Title>Delete this task ?</Dialog.Title>
                 
                  
                  <Dialog.Button label="No" color="#6F41E9" bold="10" onPress={this.handleCancel} />
                  <Dialog.Button label="Yes"  color="#6F41E9" bold="10" onPress={async()=>{
                      let id = await AsyncStorage.getItem('@TaskID')
                      await database.deleteGrouptask(id,this.state.group,(async ()=>{ this.taslcomple.update();
                      
                      await database.CountTask(this.state.group,count=>{this.setState({ Alltask: count })},this.countFail)  
                      await database.CountComplete(this.state.group,count=>{this.setState({ CompletedTask: count })},this.countFail)
                      this.setState({dialogVisible5:false})
                    }),this.del_F)
                  }} />
                  
                </Dialog.Container>
              </View>

          </View>          
         
        </LinearGradient>

      </Container>

    );
  }
  renderPicker() {
    if (this.state.picker) {
      return (
        
    
        <Items_GroupNew
        ref={Task => (this.Task = Task)}
        onPressTodo={()=>{this.setState({ dialogVisible2: true })}}
        onPressTodo2={() => this.props.navigation.navigate('EditGroupTask', { name: 'EditGroupTask' })} />
      );
    }
    
  }
  Completed() {
    if (this.state.comple) {
      return (
       
        <Items_comple
        ref={taslcomple => (this.taslcomple = taslcomple)}
        onPressTodo={()=>{this.setState({ dialogVisible5: true })}}
        onPressTodo2={() => this.props.navigation.navigate('EditGroupTask', { name: 'EditGroupTask' })} />
      );
    }
    
  }
}
const styles = StyleSheet.create({
  container: {
    // alignItems: 'flex-start',
    // flex: 1,
    // flexDirection: 'row',
    // marginRight: 16,
    // marginTop: 5,
    // marginBottom: 5,
    // backgroundColor: 'transparent',
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
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    // marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:20
  },
  body:{
    // marginTop:10,
  },
  bodyContent: {
    alignItems: 'center',
    padding:5,
  },
  name:{
    fontSize:25,
    color: "#696969",
    fontWeight: "600",
    color:'#000000'
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:8,
    textAlign: 'center'
  },

});
