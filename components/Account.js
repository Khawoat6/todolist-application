import React, { Component } from 'react';
import { Container, Header, Title, Button, Icon, Content, InputGroup, Input } from 'native-base';
import { StyleSheet, Text, View,TouchableOpacity,Image, Alert, TextInput, ScrollView ,AsyncStorage} from 'react-native';
import Constants from "expo-constants";
import Dialog from "react-native-dialog";
import database from './Database';

export default class Account extends React.Component {
  state = {
    email: '',
    name:'',
    last:'',
    uri: 'https://sv1.picz.in.th/images/2020/01/23/RuEI4z.png',
    dialogVisible: false,
    newName:''
  };
onFocusFunction=async() =>{
   
  
    const name_store=await AsyncStorage.getItem('@name');
    const last_store=await AsyncStorage.getItem('@last');
    const email_store=await AsyncStorage.getItem('@email');
    const uri_store = await AsyncStorage.getItem('@uri');
    this.setState({name:name_store})
    this.setState({last:last_store})
    this.setState({email:email_store})
    if (uri_store == null) {
      this.setState({ uri: "https://sv1.picz.in.th/images/2020/01/23/RuEI4z.png" })
      this.setState({ name: name_store })
      this.setState({ last: last_store })
    }
    else {
      this.setState({ name: name_store })
      this.setState({ last: last_store })
      this.setState({ uri: uri_store })
    }
  } 



componentDidMount(){

     this.onFocusFunction();
    
   
  }

  onPressBack(){
    this.props.navigation.navigate('Setting')
 }
 onPressAvatar(){
  this.props.navigation.navigate('Avatar')
}
 async onPressLogin(){
  await AsyncStorage.removeItem('@name');
  await AsyncStorage.removeItem('@last');
  await AsyncStorage.removeItem('@email');
  await AsyncStorage.removeItem('@uri');
  this.props.navigation.navigate('Login')

}
  Reset_restore=async()=>{
    await AsyncStorage.removeItem('@name');
    await AsyncStorage.removeItem('@last');
    await AsyncStorage.removeItem('@email');
    await AsyncStorage.removeItem('@uri');
    this.props.navigation.navigate('Login')

  }
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
  handleAdd=async()=>{
    await database.updateName(this.state.email,this.state.newName,async()=>{await AsyncStorage.setItem('@name',this.state.newName)
    await this.setState({name:this.state.newName})
    await this.setState({ dialogVisible: false });
  },this.up_F)
  }
  up_S(){

  }
  up_F(){

  }

  render() {
    return (
        <Container>
          <Header >
              <View style = { styles.MainContainer1}>
                <Button transparent onPress={()=>this.onPressBack()}>
                    <Icon name='ios-arrow-back' style={{color:'#CCCCCC'}} />
                </Button>
              </View>
              <View style = { styles.MainContainer2 }>
                <Title>Account Details</Title>
              </View>
              <View style={{flex: 1, alignItems: 'center',justifyContent: 'center', left: 15}}>
                {/* <Image style={{width: 20, height: 20}}
                source={{uri: 'https://sv1.picz.in.th/images/2020/01/22/RCoeNt.png' }}
              /> */}
              </View>
            </Header>

        <View style={{flex:1,flexDirection:'column',backgroundColor:'#F6F6F6'}} >

          <TouchableOpacity style={{flex:0.08,flexDirection:'row',marginTop:20,backgroundColor:'#ffffff', alignItems:'center',borderBottomColor: '#F6F6F6',borderBottomWidth: 1,}} onPress={()=>this.onPressAvatar()} >
            <Text style={{flex:1, fontSize:20,marginLeft:30}}>Avatar</Text>
            <Image style={{ marginLeft: 30, marginRight: '3%', width: 30, height: 30, borderRadius: 800 }} source={{ uri: this.state.uri }} />
            <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/23/RuAgpJ.png" }} style={styles.photo4} />
          </TouchableOpacity>


          <TouchableOpacity style={{flex:0.08,flexDirection:'row',backgroundColor:'#ffffff',alignItems:'center',borderBottomColor: '#F6F6F6',borderBottomWidth: 1,}} onPress={this.showDialog} >
            
            <View style={{flex:1 ,flexDirection:'row'}}>
              <Text style={{flex:1, fontSize:20,marginLeft:30}}>Username</Text>
            <Text style={{flex:1, fontSize:20,textAlign:'center', color:"#C4C4C4",}}>{this.state.name} </Text>
            {/* <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/23/RuAgpJ.png" }} style={styles.photo4} /> */}
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity style={{flex:0.08,flexDirection:'row',backgroundColor:'#ffffff',alignItems:'center'}} >
            <Text style={{flex:1, fontSize:20,marginLeft:30}}>Username</Text>
            <View style={{flex:1,flexDirection:'row',marginLeft:'40%', alignItems:'center', justifyContent: 'flex-end',}}>
              {/*
                    จัดlayout name

                    
                    */}
            {/* <Text style={{flex:1, fontSize:15,marginRight:0, color:"#C4C4C4"}}>{this.state.name}</Text>
            </View>
            <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/23/RuAgpJ.png" }} style={styles.photo4} />
          </TouchableOpacity> */} 

          <TouchableOpacity style={{flex:0.08,flexDirection:'row',backgroundColor:'#ffffff',alignItems:'center',borderBottomColor: '#F6F6F6',borderBottomWidth: 1,}} >
            
            <View style={{flex:1 ,flexDirection:'row'}}>
              <Text style={{flex:1, fontSize:20,marginLeft:30}}>Account</Text>
            <Text style={{flex:1.5, fontSize:20, textAlign:'center',color:"#C4C4C4",}}>{this.state.email}</Text>
            {/* <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/23/RuAgpJ.png" }} style={styles.photo4} /> */}
            </View>
          </TouchableOpacity>
          
          {/* <TouchableOpacity style={{flex:0.08,flexDirection:'row',backgroundColor:'#ffffff',alignItems:'center', borderBottomColor: '#F6F6F6',borderBottomWidth: 1,}} >
            <Text style={{flex:1, fontSize:20,marginLeft:30}}>Change Password</Text>
            <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/23/RuAgpJ.png" }} style={styles.photo4} />
          </TouchableOpacity> */}

          <TouchableOpacity style={{flex:0.08,flexDirection:'row',marginTop:17,backgroundColor:'#ffffff', alignItems:'center', justifyContent: 'center', borderBottomColor: '#F6F6F6',borderBottomWidth: 2,}}  
          onPress={()=>this.onPressLogin()}>
            <Text style={{fontSize:20, color:'#5B3E96'}}>Log Out</Text>
          </TouchableOpacity>

            <Text style={{fontSize:15,marginTop:15, color:"#666666",textAlign:'center'}}>Logged in as: {this.state.email}</Text>

        </View>
        <View>
                <Dialog.Container visible={this.state.dialogVisible} >

                  <Dialog.Title>Change username ?</Dialog.Title>
                  <Dialog.Description>please fill your new username</Dialog.Description>
                  <Dialog.Input onChangeText={newName => this.setState({newName})} maxLength={35} color="#000000"/>
                  
                  <Dialog.Button label="Cancel" color="#6F41E9" bold="10" onPress={this.handleCancel} />
                  <Dialog.Button label="Change"  color="#6F41E9" bold="10" onPress={this.handleAdd} />
                  
                </Dialog.Container>
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

}, photo3: {
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

  },Text2:{
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
    // marginLeft: 5,
  },
    
  MainContainer2:{
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 5
  },
  photo4: {
    height: 13,
      width: 13,
      marginRight:'7%',
      // alignItems:'center',
      justifyContent:'center',

  
  
  },



});
