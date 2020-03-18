import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput, Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import * as firebase from 'firebase';
import '@firebase/firestore';
import Constants from "expo-constants";

import * as SQLite from 'expo-sqlite';
import database from './Database';

import { Card } from 'react-native-shadow-cards';
// import Tomorrow from "./Tomorrow";
import TouchableScale from 'react-native-touchable-scale';
// import LinearGradient from 'react-native-linear-gradient';
import { Avatar } from 'react-native-elements';

export default class Items_Members extends React.Component {
  state = {
    items: [],
    email: '',
     group: '',
  };

  onFocusFunction = async () => {
    this.setState({ email: await AsyncStorage.getItem('@email') })
    this.setState({ group: await AsyncStorage.getItem('@group') })
    this.update();
  }

  componentDidMount() {
    this.onFocusFunction();
  }

  get_text_success = async (arr) => {
    this.setState({ items: arr })
    console.log(this.state.items)
  }

  get_text_fail = async () => {
    // console.log(error);
  }

  update() {
    // console.log(this.state.email)
    database.readIMGUserGroup(this.state.group, this.get_text_success, this.get_text_fail);
    
  }
  // onPressGroupDetail() {
  //   this.props.navigation.navigate('GroupDetail')
  // }

  onPressRegister(){
    this.props.navigation.navigate('Register')
  }

  render() {
    
    const { items } = this.state;
    const heading = "group";

    if (items === null || items.length === 0) {
      return null;
    }
     console.log(this.state.items)
   
    return (
      
        <Card style={{ flex:0.15, flexDirection: 'row',alignItems:'center',  }} >

        <Text style={{color:'#666666',fontSize:18,fontWeight:'bold', textAlight:'left', marginLeft:'7%'}}>Members</Text>
        {/* <ScrollView horizontal={true} > */}
        
          {items.map (({id, email,uri,admin}) => (
            
            <Avatar rounded containerStyle={{marginLeft:'5%'}} source={{uri:uri}}/>
           
            
           

          ))}
          {/* </ScrollView> */}

              </Card>
          

      

      // <View style={{flex:0.125,flexDirection:'row',backgroundColor:'#ffffff', alignItems:'center', borderBottomColor: '#F6F6F6',borderBottomWidth: 1,}} >
      // <Image style={{marginLeft:'10%', marginRight:'5%' ,width:30,height:30}} source={{uri:'https://sv1.picz.in.th/images/2020/01/26/RHl31W.png'}}/>
      //     <View style={{flex:1, flexDirection: 'column'}} >
      //       <Text style={{fontSize:18,color:'#171D33',marginLeft:2,marginEnd:3,alignItems:'center',justifyContent:'center', }}>Dek 64</Text>
      //       <Text style={{fontSize:12,marginTop:3,color:'#C4C4C4'}}>มาเข้ากลุ่มเด็กแอด 64 กันเถอะ</Text>
      //     </View>
      //     <TouchableOpacity style={{marginRight:'8%'}}>
      //       <View  style={{flexDirection:'row-reverse',backgroundColor:'#ffffff',justifyContent: 'center',borderRadius:10, borderWidth:1,borderColor:'#F0ECFC', width:70, backgroundColor:'#F0ECFC'}}>
      //         <Text style={{fontSize:16,margin:'3%',color:'#6F41E9', justifyContent:'center'}}>Join</Text>
      //       </View>
      //     </TouchableOpacity>
      // </View>
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
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8
  },
});
