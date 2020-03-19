import React from 'react';
import {StyleSheet,Text,View,Image,TextInput,Button,TouchableOpacity,Picker,Alert,AsyncStorage} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import database from './Database'
import * as Crypto from 'expo-crypto';
export default class Login2 extends React.Component {
  state = {
    email: '',
    password: '',
    name:'',
    last:'',
    uri:''
  };

  onPressOK = async() => {
    
    // var digest = await Crypto.digestStringAsync(
    //   Crypto.CryptoDigestAlgorithm.SHA256,
    //   this.state.password
    // );
    // digest=digest.slice(0,16)
    // console.log(digest)
    account={
      email:this.state.email.toLowerCase(),
      password:this.state.password,
    }
    database.login(account,this.login_success,this.login__fail);

  };

  onPressRegister(){
  this.props.navigation.navigate('Register')
  }

  login_success=async()=>{
   
    await database.readdata(this.state.email.toLowerCase(),this.read_Account_success,this.read_Account_fail)
    Alert.alert("Login Success");
  

  }
  read_Account_fail=async(error)=>{
    console.log("error")
  }
  read_Account_success=async(doc)=>{
    this.setState({name:doc.name})
    this.setState({email:doc.email})
    this.setState({last:doc.last})
    this.setState({uri:doc.uri})
    console.log(this.state.name); 
    await AsyncStorage.setItem('@email',this.state.email);
    await AsyncStorage.setItem('@name',doc.name);
    await AsyncStorage.setItem('@last',doc.last);
    await AsyncStorage.setItem('@uri',doc.uri);
    await AsyncStorage.setItem('@pwd',this.state.password)
    this.props.navigation.navigate('Main1')
  }

  login__fail=async(error)=>{
    Alert.alert("Wrong Password or Email");
  }



  _storeData = async () => {
    try {
      await AsyncStorage.setItem('@email',this.state.email);
      await AsyncStorage.setItem('@name',doc.name);
      await AsyncStorage.setItem('@last',doc.last);
      Alert.alert("Login Success");
      this.props.navigation.navigate('Main1')
    } catch (error) {
      // Error saving data
      console.log("save error")
    }
  };

  

  onChangeTextEmail = email => this.setState({email});
  onChangeTextPassword = password => this.setState({password});


  render() {
    return (
      <LinearGradient
        colors={['#FFFFFF', '#FFFFFF']}
        style={{ flex: 1 }}>


        <View style={{ flex: 1, marginTop: 50 }}>
          <View style={{ flex: 1, marginTop: 50 }}>
            <Text style={styles.txt1}>Login</Text>

            <View style={{ flex: 1, marginTop: 50 }}>
              <TextInput
                style={styles.txtIn2}
                placeholder="email"
                onChangeText={this.onChangeTextEmail}
              />
              <Text style={styles.txt}> </Text>
              <TextInput
                style={styles.txtIn2}
                placeholder="••••••••"
                secureTextEntry ={true}
                onChangeText={this.onChangeTextPassword}
              />
              <TouchableOpacity style={styles.viewBtn2}>
                <Text style={styles.txt2} onPress={() => this.onPressRegister()}> Register </Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>

        <View style={{flex: 1}} >
          <TouchableOpacity style={styles.viewBtn} onPress={this.onPressOK}>
            <Text  style={styles.txt}>

              LOG IN

            </Text>

          </TouchableOpacity>
        </View>

      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  txtIn2: {
    alignItems: 'center',
    // height: 50,
    backgroundColor: 'transparent',
    padding: 16,
    marginLeft:16,
    marginRight:16,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 50,
  },

  viewBtn: {
    // height: 50,
    backgroundColor: 'black',
    padding: 16,
    marginTop:16,
    marginLeft:16,
    marginRight:16,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 50,
  },

  viewBtn2: {
    height: 50,
    margin: 10,
  },

  txt:{
    textAlign: 'center',
    fontSize:13,
    color:'#ffffff',
    fontWeight:'bold',
  },
  txt2:{
    textAlign: 'right',
    fontSize: 13,
    color: 'black',
    margin: 5,
    marginLeft : 10,
    marginEnd : 10,
    textDecorationLine : 'underline'
  },
  txt1:{

    fontSize: 40,
    color: '#000000',
    margin: 5,
    marginLeft : 16,
    marginEnd : 16,
    alignItems: 'center',
    justifyContent: 'center'
  }
});