import * as React from 'react';
import { Text, View, StyleSheet ,TouchableOpacity,TextInput, Alert} from 'react-native';



import { LinearGradient } from 'expo-linear-gradient'
import database from './Database'


export default class Register extends React.Component {

  state = {
    email:'',
    password:'',
    name:'',
    last:'',
    uri:''
  };
  onPressBack=()=>{
    this.props.navigation.navigate('First')
  }
  onPressAddAccount = () => {
  
    if(this.state.name.length==0 || this.state.last ==0){
      Alert.alert("Please fill in your name or last name")
    }
    else if(this.state.email.length==0 ){
      Alert.alert("Please fill in your email")
    }
    else if(this.state.password.length <6){
      Alert.alert("Your password must be at least 6 characters")
    }
    else{
    account={
      name:this.state.name,
      last:this.state.last,
      email:this.state.email.toLowerCase(),
      // password:this.state.password,
      uri:''
    }

    //console.log(account);
    database.createAccount2(account,this.add_Account_success,this.add_Account_fail);
    }

  };

  add_Account_success=async(id)=>{
    account={
      name:this.state.name,
      last:this.state.last,
      email:this.state.email.toLowerCase(),
      password:this.state.password,
    }
    
    database.createAut(account,this.add_Aut_success,this.add_Aut_fail);
  }

  add_Account_fail=async()=>{
      console.log('Create Account fail (Password must be at least 6 characters)');
  }

  add_Aut_success=async()=>{
    this.props.navigation.navigate('Login')


  }

  add_Aut_fail=()=>{
    Alert.alert('Please Check your email and Password( must be at least 6 characters)');
  }

  onChangeTextEmail = email => this.setState({email});
  onChangeTextpassword = password => this.setState({password});
  onChangeTextname = name => this.setState({name});
  onChangeTextlast = last => this.setState({last});
  

  render() {
    return (
      <LinearGradient
       colors={['#FFFFFF', '#FFFFFF']}
       style={{flex: 1}}>


        <View style={{ flex: 1, marginTop: '10%' }}>
        
            <Text style={styles.txt1}>Register</Text>

            <View style={{ flex: 1, marginTop: 60 }}>
              <TextInput
                  style={styles.txtIn2}
                  placeholder="username"
                  maxLength={15}
                  onChangeText={this.onChangeTextname}
              />
              <Text style={styles.txt}> </Text>
              {/* <TextInput
                  style={styles.txtIn2}
                  placeholder="lastname"
                  maxLength={15}
                  onChangeText={this.onChangeTextlast}
              /> */}
              <Text style={styles.txt}> </Text>
              <TextInput
                  style={styles.txtIn2}
                  placeholder="email"
                  maxLength={25}
                  onChangeText={this.onChangeTextEmail}
              />
              <Text style={styles.txt}> </Text>
              <TextInput
                  style={styles.txtIn2}
                  placeholder="password"
                  maxLength={20}
                  secureTextEntry ={true}
                  onChangeText={this.onChangeTextpassword}
              />
              {/* <TouchableOpacity style={{backgroundColor:"#000000"}} onPress={() => this.onPressBack()}>
                <Text style={styles.txt2} > Home </Text>
              </TouchableOpacity>
                */}
              
            
             
            </View>

          
        </View>
        <View style={{flex: 1,marginTop:100}}>
            <TouchableOpacity
              style={styles.viewBtn}
              onPress={this.onPressAddAccount}>
              <Text style={styles.txt}>SIGNUP</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 13,color: 'black',margin: 5, paddingLeft:16, paddingRight:16,}}>By signing up, you agree to Photo’s<Text style={{fontSize: 13,color: 'black',margin: 5,textDecorationLine : 'underline'}}> Terms of Service </Text><Text style={{fontSize: 13,color: 'black',margin: 5}}>and</Text><Text style={{fontSize: 13,color: 'black',margin: 5,textDecorationLine : 'underline'}}> Privacy Policy.</Text></Text>
            <TouchableOpacity 	
            onPress={this.onPressBack} >	
              <Text style={{fontSize:17, color:'#000000',textAlign:'center',textDecorationLine:'underline',marginBottom:5,}}> back</Text>	
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
    marginTop:100,
    marginLeft:16,
    marginRight:16,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 50,
  },
  txt:{
    textAlign: 'center',
    fontSize:13,
    color:'#ffffff',
    fontWeight:'bold',
  },
  txt1:{

    fontSize: 40,
    color: '#000000',
    marginTop: 5,
    marginLeft : 16,
    marginEnd : 16,
    alignItems: 'center',
    justifyContent: 'center'
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

  txt3:{
    fontSize: 13,
    color: 'black',
    margin: 5,
    marginLeft : 10,
    marginEnd : 10,
  },
  login:{
    alignItems: 'center',
    padding:9,
    borderRadius: 10,
    borderColor:'black',
    borderWidth : 1,
    margin:10,
    marginTop:15,
    backgroundColor: '#000000'
  },
  inputemail:{
    alignItems: 'center',
    padding:9,
    borderColor:'#636D93',
    borderWidth : 2,
    margin:15,
    marginTop:10,
    backgroundColor: '#FFFFFF'
  },
  inputpassword:{
    alignItems: 'center',
    padding:9,
    borderColor:'#636D93',
    borderWidth : 2,
    margin:15,
    marginTop:5,
    backgroundColor: '#FFFFFF'
  },
    btn_login:{
    alignItems: 'center',
    width:160,
    height:50,
    backgroundColor: 'transparent',
    padding: 16,
    margin:16,
    borderRadius: 50,
    borderColor:'#000000',
    borderWidth : 1
},
viewBtn2: {
  height: 50,
  margin: 10,

},

});