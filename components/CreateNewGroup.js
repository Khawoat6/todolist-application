import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image,AsyncStorage} from "react-native";
import Constants from "expo-constants";
import { Container, Header, Title, Button, Icon, Content, InputGroup, Input } from 'native-base';
// import ActionButton from 'react-native-action-button';
import * as ImagePicker from 'expo-image-picker';
import database from './Database'



export default class CreateNewGroup extends Component {


  state = {
    imageuri: 'https://sv1.picz.in.th/images/2020/02/26/xuP1s9.png',
    uploaduri: 'https://sv1.picz.in.th/images/2020/02/26/xuP1s9.png',
    uri:'',
    txtButton: '',
    id: '',
    progress: 0,
    indeterminate: true,
    text: null,
    email:'',
    group:'',
    des:'',
    btn:false
  };
  

  componentDidMount() {

    this.animate();
    this.onFocusFunction();

  }

  animate() {
    let progress = 0;
    this.setState({ progress });
    setTimeout(() => {
      this.setState({ indeterminate: false });
      setInterval(() => {
        progress += Math.random() / 5;
        if (progress > 1) {
          progress = 1;
        }
        this.setState({ progress });
      }, 500);
    }, 1500);
  }



  onFocusFunction = async () => {
    const email_store = await AsyncStorage.getItem('@email');
    this.setState({uri:await AsyncStorage.getItem('@uri')});
    this.setState({ email: email_store })
    this.setState({id:email_store})
    Name={
      email:this.state.email,
      uri:this.state.uri
    }
  

  }
  async addGroup_success(){
    
  console.log("success")
  
    
    // User={
    //   Email:this.state.email
    // }
    // await database.createGroupUser(User,this.state.group,this.add_CreateGroupUserSuccess,this.add_CreateGroupUserFail)
    // await database.createGroupUser(this.state.email,this.state.group,this.add_CreateGroupUserSuccess,this.add_CreateGroupUserFail)
  }
  
  // async createUser(){
  //     User={
  //     email:this.state.email
  //   }
  //   await database.createGroupUser(User,this.state.group,this.add_CreateGroupUserSuccess,this.add_CreateGroupUserFail)
  // }
  addGroup_fail(){
    this.setState({btn:false})
    console.log("fail")
  }
  add_CreateGroupUserSuccess(){
    // this.onPressBack()
    console.log("success")

  }
  add_CreateGroupUserFail(){
    console.log("fail")
  }

  onPressOK =async () => {

    if( this.state.group.trim() == ""){
      Alert.alert("your group name cannot be empty")
    }
    else{
     this.setState({btn:true})
      AdminGroup={
      AdminGroup: this.state.email,
      uri:'',
      des:this.state.des,
      id:this.state.group

    }

    
    
    await database.createGroup(AdminGroup,Name,this.state.group,(async()=>{await database.uploadImageGroup(this.state.group, this.state.imageuri, this.upload_success, this.upload_fail, this.uploading_status);}),(()=>{this.setState({btn:false})}))
    
    
    
    // console.log(this.state.imageuri)
  }

  };

  upload_success = async (uri) => {
    this.setState({ uploaduri: uri });
    // url=await this.createURL()
    // await database.addImage(this.state.id,url,this.add_success,this.add_fail)
    // this.setState({txtButton:"Success"});
    

    this.addURL()

  }
  addURL = async () => {

    await database.addImageGroup(this.state.group, this.state.uploaduri, this.add_success, this.add_fail)
    await database.readImgGroup(this.state.group,this.state.email,this.update_S,this.update_F)
    this.setState({ txtButton: "Success" });
  }
  update_S(){
    this.props.navigation.navigate('Group')
  }
  update_F(){
    console.log("Fail")
  }
  add_success = async (error) => {

  
    Alert.alert("Create group Success");
    this.props.navigation.navigate('Group')
  }
  add_fail = async (error) => {
    Alert.alert("Add Avatar Fail");

  }

  upload_fail = async (error) => {
    Alert.alert(error);

  }

  uploading_status = async (progress) => {
    this.setState({ txtButton: progress });
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ imageuri: result.uri });
    }

  };




  onPressBack(){
    this.props.navigation.navigate('Group')
 }
 onChangeText = group => this.setState({ group });
 onChangeDes = des => this.setState({des});

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
                  <Title>Create New Group</Title>
                </View>
                <TouchableOpacity   onPress={()=>this.onPressOK()} disabled={this.state.btn}>
                  <View  style={{flex: 1, alignItems: 'center',justifyContent: 'center', marginRight:'8%'}}>
                    {/* <Image style={{width: 20, height: 20}}source={{uri: 'https://sv1.picz.in.th/images/2020/01/26/RHjrif.png' }}/> */}
                    <Text style={{ fontSize: 15, color: '#4B15B8', textAlign: 'center' , fontWeight:"bold"}} >DONE</Text>
                  </View>
                </TouchableOpacity>
              </Header>



          <View style={{flex:1,flexDirection:'column',backgroundColor:'#F6F6F6', }} >

            <View  style={{flex:0.2,marginTop:'7%',backgroundColor:'#ffffff',justifyContent: 'center',flexDirection:'row'}}>
              <View style={{ alignItems: 'center'}}>
                <TouchableOpacity onPress={this.pickImage}>
                  <Image style={styles.imgStyles} source={{ uri: this.state.imageuri }} />
                </TouchableOpacity>
              </View>
              <TextInput ref={input => { this.textInput = input }}  style={styles.txtIn2} maxLength={15} placeholder="Group Name" onChangeText={this.onChangeText} />
            </View>

            <View  style={{flex:0.3,marginTop:'7%',backgroundColor:'#ffffff'}}>
              <TextInput style={styles.txtIn3} placeholder="Description..." onChangeText={this.onChangeDes} />
            </View>

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
  txtIn2: {
    justifyContent:'center',
    backgroundColor: 'transparent',
    flex:5,
    fontSize:24,
  },

  txtIn3: {
    backgroundColor: 'transparent',
    fontSize:22,
    flex:1,
    margin:13,
    
  },

  imgStyles: {
    width: 75,
    height: 75,
    alignItems: 'center',
    margin: '10%',
    flex:1,
    borderRadius:90
    // backgroundColor:'black',
    // margin:20,
    // padding:10,
    

  },


});
