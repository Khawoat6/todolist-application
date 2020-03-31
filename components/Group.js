import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image,AsyncStorage} from "react-native";
import Constants from "expo-constants";
import { Container, Header, Title, Button, Icon, Content, InputGroup, Input } from 'native-base';
// import ActionButton from 'react-native-action-button';
import DialogInput from 'react-native-dialog-input';
import Dialog from "react-native-dialog";
import Items_Group from './Items_Group'
import database from './Database';
export default class Group extends Component {
  state = {
    dialogVisible: false,
    email:'',
  };
  
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
 
  handleDelete = async() => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    
    console.log(this.state.email)
    // await database.addGroupAccount(Name,this.state.Group,this.join_success,this.join_fail)
    await database.joinGroup(Name,this.state.Group,(()=>{this.group.update();}),this.join_fail)
   
    console.log("READIMG")
    console.log(this.state.Group)
    this.group.update();
    this.setState({ dialogVisible: false });
    
  };

  async join_success(){
    this.group.update();
   console.log("Success")
   
  //  await database.readImgGroup(this.state.group,this.state.email,this.update_S,this.update_F)
  }

  update_S() {
  this.update();
  console.log("Success")
  }

  update_F(){
  console.log("Fail")
  }

  // async join_success(array){
  //   array.forEach(name=>{
  //     console.log(name)
  //     // await database.addGroupUser(Name,this.state.Group,this.addGroupUser_S,this.addGroupUser_F) 
  //   })
    
  // }
  // addGroupUser_S(){
  //   console.log("Success")
  // }
  // addGroupUser_F(){
  //   console.log("Fail")
  // }
  join_fail(){
    console.log("Fail")
  }

  onPressBack(){
    this.props.navigation.navigate('Main1')
  }

  onPressGroupDetail(){
    this.props.navigation.navigate('GroupDetail')
  }

  onPressCreateNewGroup() {
    this.props.navigation.navigate('CreateNewGroup')
  }

  onFocusFunction = async () => {
    const email_store = await AsyncStorage.getItem('@email');
    this.setState({uri:await AsyncStorage.getItem('@uri')});

    this.setState({ email: email_store })
    Name={
    email:this.state.email,
    uri:this.state.uri
  }

  this.update();

}

async update(){
  await this.group.update();
}

 componentDidMount(){
  this.onFocusFunction();

  // console.log(Name.email)
 }
 onPressMore(id){
  AsyncStorage.setItem('@group',id);
  this.props.navigation.navigate('GroupDetail', { name: 'GroupDetail' })
 }


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
                  <Title>Group</Title>
                </View>

                <TouchableOpacity onPress={this.showDialog}>
                  <View  style={{flex: 1, alignItems: 'center',justifyContent: 'center',}}>
                    <Image style={{width: 20, height: 20}}source={{uri: 'https://sv1.picz.in.th/images/2020/02/28/xnGRq2.png' }}/>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={()=>this.onPressCreateNewGroup()}>
                  <View  style={{flex: 1, alignItems: 'center',justifyContent: 'center', marginRight:'8%'}}>
                    <Image style={{width: 20, height: 20}}source={{uri: 'https://sv1.picz.in.th/images/2020/01/26/RHjrif.png' }}/>
                  </View>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={()=>this.onPressGroupDetail()}>
                  <View  style={{flex: 1, alignItems: 'center',justifyContent: 'center'}}>
                    <Image style={{width: 20, height: 20}}source={{uri: 'https://sv1.picz.in.th/images/2020/01/26/RHjrif.png' }}/>
                  </View>
                </TouchableOpacity> */}

              </Header>


            <View style={{flex:1,flexDirection:'column',backgroundColor:'#F6F6F6'}} >
              
                <Text style={{fontSize:25 , color:'#666666', marginLeft:'5%',marginTop:'10%', fontWeight:'bold'}}>My Group</Text>
          
                <View style={{flex:1,flexDirection:'column',justifyContent:'center' ,alignContent:'center',backgroundColor:'transparent'}}>
                    <ScrollView style={{flex:1,flexDirection:'column',backgroundColor:'#transparent',marginTop:"5%"}}>
                        
                          <Items_Group
                                ref={group => (this.group = group)}
                                 onPressTodo={(id)=>{
                                    AsyncStorage.setItem('@group',id);
                                   this.props.navigation.navigate('GroupDetail', { name: 'GroupDetail' })}}
                              // onPressTodo2={() => this.props.navigation.navigate('timer', { name: 'timer' })}
                              // onPressTodo3={() => this.props.navigation.navigate('Edit', { name: 'Edit' })}
                                />

                    </ScrollView>
                  </View>

                  <View>
                      <Dialog.Container visible={this.state.dialogVisible} >

                        <Dialog.Title>Join Group</Dialog.Title>
                        <Dialog.Description>Enter the group code</Dialog.Description>
                        <Dialog.Input    onChangeText={Group => this.setState({Group})} maxLength={15} color ="#000000"/>
                        <Dialog.Button label="Cancel" color="#6F41E9" bold="10" onPress={this.handleCancel} />
                        <Dialog.Button label="Join"  color="#6F41E9" onPress={this.handleDelete} />
                        
                      </Dialog.Container>
                  </View>


                  {/* <View style={{flex:0.08,flexDirection: 'row',justifyContent:'center', alignItems:'center', marginLeft:'10%'}}>
                    <View style={{flex:4,}}>
                    <Text style={{fontSize:20 , color:'#666666',  fontWeight:'bold'}}>More Group</Text>
                    </View>

                  <TouchableOpacity>
                    <View style={{flex:2,justifyContent:'center', flexDirection:'row', alignItems:'center'}}>
                      <Image style={{width:20,height:20}} source={{uri:'https://sv1.picz.in.th/images/2020/01/26/RHllzZ.png'}}/>
                      <Text style={{fontSize:12 , color:'#CCCCCC',  fontWeight:'bold', marginRight:'10%', marginLeft:'10%'}}>Refresh</Text>
                    </View>
                  </TouchableOpacity>
                  
                  </View> */}
                  

                  {/* <View style={{flex:0.125,flexDirection:'row',backgroundColor:'#ffffff', alignItems:'center', borderBottomColor: '#F6F6F6',borderBottomWidth: 1,}} >
                    <Image style={{marginLeft:'10%', marginRight:'5%' ,width:30,height:30}} source={{uri:'https://sv1.picz.in.th/images/2020/01/26/RHl31W.png'}}/>
                        <View style={{flex:1, flexDirection: 'column'}} >
                          <Text style={{fontSize:18,color:'#171D33',marginLeft:2,marginEnd:3,alignItems:'center',justifyContent:'center', }}>Dek 64</Text>
                          <Text style={{fontSize:12,marginTop:3,color:'#C4C4C4'}}>มาเข้ากลุ่มเด็กแอด 64 กันเถอะ</Text>
                        </View>
                        <TouchableOpacity style={{marginRight:'8%'}}>
                          <View  style={{flexDirection:'row-reverse',backgroundColor:'#ffffff',justifyContent: 'center',borderRadius:10, borderWidth:1,borderColor:'#F0ECFC', width:70, backgroundColor:'#F0ECFC'}}>
                            <Text style={{fontSize:16,margin:'3%',color:'#6F41E9', justifyContent:'center'}}>Join</Text>
                          </View>
                        </TouchableOpacity>
                    </View> */}
              </View>

        </Container>

    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //     alignItems:'flex-start',
  //     flex: 1,
  //     flexDirection: 'row',
  //     marginRight:16,
  //     marginTop: 5,
  //     marginBottom: 5,
  //     paddingTop: Constants.statusBarHeight
  // },

  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  title: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  container_text: {
    flex: 1,
    flexDirection: 'column',
    borderRadius:10,
    paddingLeft:5,
    justifyContent: 'center',
    backgroundColor:'#1F9BF1',
  },
  description: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#FFFFFF',
  },
  photo2: {
    height: 30,
    width: 30,
    marginRight:5,
    marginLeft:5,
    marginTop:5,
    borderWidth:1,
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  photo3: {
    height: 25,
    width: 25,
    marginRight:5,
    marginLeft:5,
    marginTop:5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  photo: {
    height: 45,
    width: 45,
    marginRight:5,
    marginLeft:5,
    marginTop:5,
    borderWidth:10,
    borderRadius: 50,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  Text:{
    color:"#000000",
    fontSize: 15,
    marginTop:5,
    marginLeft : 2,
    marginEnd : 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  Text2:{
    color:"#5B3E96",
    fontSize: 17,
    marginTop:5,
    marginLeft : 2,
    marginEnd : 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  MainContainer1:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainContainer2:{
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo4: {
    height: 18,
    width: 18,
    marginRight:20,
    flexDirection: 'row-reverse',
    alignItems:'center'
  },



});
