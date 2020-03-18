import React, { Component } from 'react';
import {  StyleSheet, Text, View, TouchableOpacity, Image,  } from "react-native";
import Constants from "expo-constants";
import { Container, Header, Title, Button, Icon, } from 'native-base';
// import ActionButton from 'react-native-action-button';
import '@firebase/firestore';
// Edit_DueDate
// Edit_Note
// Edit_PomodoroNumber
// Edit_Reminder
// Edit_Repeat

export default class AddColor extends Component {




onPressBack(){
  this.props.navigation.navigate("AddTask");
  
}

    render() {
        return (
            <Container>
            <Header >
              <View style = { styles.MainContainer1}>
              {/* <Button transparent  onPress={() => this.props.navigation.goBack()}> */}
                <Button transparent  onPress={()=>this.onPressBack()}>
                    <Icon name='ios-arrow-back' style={{color:'#DBDBDB'}} />
                </Button>
              </View>
              <View style = { styles.MainContainer2 }>
                <Title>AddColor</Title>
              </View>
            
              <View style={{flex: 1, alignItems: 'center',justifyContent: 'center', left: 10}} >  
              </View>
            </Header>
            {/* <ActionButton buttonColor="rgba(75,21,184,2)" position="center"></ActionButton> */}
            {/* left ???????????????????? ?????????????*/}




        <View style={{flex:1,flexDirection:'column',backgroundColor:'#F6F6F6'}} >
          <View style={{flex:1,flexDirection:'row'}}>
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#ffffff',marginLeft:15,marginTop:30,marginRight:15,marginBottom:30,justifyContent:'center',alignItems:'center' }}  onPress={()=>this.onPressBack()} >
              <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <Image style={{height:20,width:20}} source={{uri:'https://sv1.picz.in.th/images/2020/03/03/xGZtY1.png'}}/>
            <Text style={{color:'#D4D4D4'}} >High Priority</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#ffffff',marginLeft:15,marginTop:30,marginRight:15,marginBottom:30,justifyContent:'center',alignItems:'center' }} onPress={()=>this.onPressBack()}>
              <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <Image style={{height:20,width:20}} source={{uri:'https://sv1.picz.in.th/images/2020/03/03/xGZwiy.png'}}/>
            <Text style={{color:'#D4D4D4'}}>Medium Priority</Text>
            </View>
            </TouchableOpacity>
            </View>
            <View style={{flex:1,flexDirection:'row'}}>
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#ffffff',marginLeft:15,marginTop:30,marginRight:15,marginBottom:30,justifyContent:'center',alignItems:'center' }} onPress={()=>this.onPressBack()}>
              <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <Image style={{height:20,width:20}} source={{uri:'https://sv1.picz.in.th/images/2020/03/03/xGZsEe.png'}}/>
            <Text style={{color:'#D4D4D4'}}>Low Priority</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#ffffff',marginLeft:15,marginTop:30,marginRight:15,marginBottom:30,justifyContent:'center',alignItems:'center' }} onPress={()=>this.onPressBack()}>
              <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <Image style={{height:20,width:20}} source={{uri:'https://sv1.picz.in.th/images/2020/03/03/xGZBDS.png'}}/>
            <Text style={{color:'#D4D4D4'}}>No Priority</Text>
            </View>
            </TouchableOpacity>
          </View>
            </View>


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
    },
      
    MainContainer2:{
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
    },


});
