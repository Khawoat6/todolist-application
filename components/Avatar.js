import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, AsyncStorage } from "react-native";
import Constants from "expo-constants";
import { Container, Header, Title, Button, Icon, Content, InputGroup, Input } from 'native-base';
// import ActionButton from 'react-native-action-button';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';

import database from './Database'
export default class Avatar extends Component {
  state = {
    imageuri: 'https://sv1.picz.in.th/images/2019/08/22/ZRRyeW.png',
    uploaduri: 'https://sv1.picz.in.th/images/2019/08/22/ZRRyeW.png',
    txtButton: '',
    id: '',
    progress: 0,
    indeterminate: true,
    button_State:false
  };

  componentDidMount() {

    this.onFocusFunction();


  }

 



  onFocusFunction = async () => {
    const email_store = await AsyncStorage.getItem('@email');

    this.setState({ id: email_store })

  }


  onPressOK = async() => {
    this.setState({button_State:true})
    if(this.state.imageuri != 'https://sv1.picz.in.th/images/2019/08/22/ZRRyeW.png'){
      await database.uploadImage(this.state.id, this.state.imageuri, this.upload_success, this.upload_fail, this.uploading_status);
      console.log(this.state.imageuri)}
       else{
      Alert.alert("Please add Avatar");
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

    database.addImage(this.state.id, this.state.uploaduri, this.add_success, this.add_fail)
    this.setState({ txtButton: "Success" });
  }
  add_success = async (error) => {

    await AsyncStorage.setItem('@uri', this.state.uploaduri);
    this.setState({button_State:false})
    Alert.alert("Add Avatar Success");
    this.props.navigation.navigate('Account')
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
      quality: 1
    });

    console.log(result);
    if (!result.cancelled) {
      this.setState({ imageuri: result.uri });
    }
    console.log(this.state.imageuri)


  };
  onPressBack() {
    this.props.navigation.navigate('Account')
  }
  render() {
    return (


      <LinearGradient
        colors={['#000000', '#000000']}
        style={{
          flex: 1,
          // position: 'absolute',
          // left: 0,
          // right: 0,
          // top: 0,
          // height: 500,
        }}
      >

        <Header >
          <View style={styles.MainContainer1}>
            <Button transparent onPress={() => this.onPressBack()}>
              <Icon name='ios-arrow-back' style={{ color: '#DBDBDB' }} />
            </Button>
          </View>
          <View style={styles.MainContainer2}>
            <Title>Avatar</Title>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', left: 15 }}>
            {/* <Image style={{width: 20, height: 20}} source={{uri: 'https://sv1.picz.in.th/images/2020/01/22/RCoeNt.png' }} /> */}
            <TouchableOpacity
            
            onPress={this.onPressOK} disabled={this.state.button_State}>
            <Text style={{ fontSize: 15, color: '#4B15B8', textAlign: 'center' , fontWeight:"bold", marginRight:'10%'}} >Done</Text>
          </TouchableOpacity>
          </View>
        </Header>

        <View style={{ alignItems: 'center', }}>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={this.pickImage}>
              <Image
                style={styles.imgStyles}
                source={{ uri: this.state.imageuri }}
                 />
            </TouchableOpacity>
          </View>

          {/* <Progress.Bar
          style={styles.progress}
          progress={this.state.progress}
          indeterminate={this.state.indeterminate}
        /> */}

          {/* <TouchableOpacity
            style={styles.touchableUser}
            onPress={this.onPressOK}>
            <Text style={{ fontSize: 20, color: '#ffffff', textAlign: 'center' }}>{this.state.txtButton}</Text>
          </TouchableOpacity> */}
        </View>



      </LinearGradient>
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
    height: 50,
    backgroundColor: 'transparent',
    padding: 5,
    margin: 5,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
    fontSize: 20,
  },
  buttonText: {
    alignItems: 'center',
    height: 50,
    backgroundColor: '#86A8E7',
    padding: 10,
    margin: 5,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
    fontSize: 30,
    color: '#ffffff'
  },
  touchableUser: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
    margin: 5,
    marginTop: 2,
  },
  btn: {
    alignItems: 'center',
    height: 50,
    backgroundColor: '#86A8E7',
    padding: 10,
    margin: 10,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1
  },
  txt: {
    textAlign: 'center',
    fontSize: 50
  },
  touchableUser: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
    margin: 5,
  },
  imgStyles: {
    width: 250,
    height: 250,
    alignItems: 'center',
    // resizeMode: 'stretch',
    margin: '10%',
    borderRadius:180,
  },

  txtIn2: {
    alignItems: 'center',
    width: 350,
    height: 55,
    backgroundColor: 'transparent',
    padding: 16,
    marginLeft: 16,
    marginRight: 16,
    borderColor: '#5B3E96',
    borderWidth: 2.2,
    borderRadius: 55,

  },

  btn_register: {
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#000000',
    padding: 16,
    marginRight: 16,
    borderRadius: 50,
    borderColor: '#000000',
    borderWidth: 1
  },

  MainContainer1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  MainContainer2: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Text2: {
    color: "#5B3E96",
    fontSize: 17,
    marginTop: 5,
    marginLeft: 2,
    marginEnd: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },

  photo3: {
    height: 25,
    width: 25,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center'


  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progress: {
    margin: 10,
  },

});
