import React, { Component } from 'react';
import { Container, Header, Title, Button, Icon, Content, InputGroup, Input } from 'native-base';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, TextInput, ScrollView, AsyncStorage,Linking} from 'react-native';
import Constants from "expo-constants";
// import Icon from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/FontAwesome';

export default class AccountLogin extends React.Component {
  state = {
    email: '',
    name: '',
    last: '',
    uri: 'https://sv1.picz.in.th/images/2020/01/23/RuEI4z.png'

  };
  onFocusFunction = async () => {

    // const value =await AsyncStorage.getItem('@email');
    // this.setState({email:value})
    // database.readdata(this.state.email,this.read_Account_success,this.read_Account_fail)
    // console.log("test")
    // console.log(this.state.email)
    const name_store = await AsyncStorage.getItem('@name');
    console.log(name_store)
    const last_store = await AsyncStorage.getItem('@last');
    const uri_store = await AsyncStorage.getItem('@uri');
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



  componentDidMount() {

    this.onFocusFunction();


  }

  onPressBack() {
    this.props.navigation.navigate('Main1')
  }
  onPressAccount() {
    this.props.navigation.navigate('Account')
  }
  onPressHelpAndFeedback() {
    this.props.navigation.navigate('HelpAndFeedback')
  }

  render() {
    return (
      <Container>
        <Header >
          <View style={styles.MainContainer1}>
            <Button transparent onPress={() => this.onPressBack()}>
              {/* <Icon name='close' style={{ color: '#CCCCCC' }} /> */}
              {/* <Icon name="ios-person" size={30} color="#4F8EF7" />; */}
              {/* <Icon name="rocket" size={30} color="#900" />; */}
            </Button>
          </View>
          <View style={styles.MainContainer2}>
            <Title>Settings</Title>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', left: 15 }}>
            {/* <Image style={{width: 20, height: 20}} source={{uri: 'https://sv1.picz.in.th/images/2020/01/22/RCoeNt.png' }} /> */}
            <TouchableOpacity onPress={() => this.onPressBack()}>
            <Text style={{ fontSize: 15, color: '#4B15B8', textAlign: 'center' , fontWeight:"bold", marginRight:'10%'}} >Done</Text>
          </TouchableOpacity>
          </View>
        </Header>

        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#F6F6F6' }} >
          <View style={{ flex: 0.12, flexDirection: 'row', marginTop: 17, backgroundColor: '#ffffff', alignItems: 'center' }} >
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.onPressAccount()}>
              <Image style={{ marginLeft: 30, marginRight: 10, width: 45, height: 45, borderRadius: 800 }} source={{ uri: this.state.uri }} />
              <View style={{ flexDirection: 'column' }} >
                <Text style={{ fontSize: 18, color: '#171D33', marginLeft: 2, marginEnd: 3, alignItems: 'center', justifyContent: 'center', fontWeight:"bold" }}>{this.state.name} </Text>
                <Text style={{ fontSize: 12, marginTop: 3, color: '#C4C4C4' }}> Synchonize whitin all devides.</Text>
              </View>
            </TouchableOpacity>
            {/* <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/23/RuAgpJ.png" }} style={styles.photo5} /> */}
          </View>

          <TouchableOpacity style={{ flex: 0.08, flexDirection: 'row', marginTop: 20, backgroundColor: '#ffffff', alignItems: 'center', borderBottomColor: '#F6F6F6',borderBottomWidth: 1, }} >
          <Image source={{ uri: "https://sv1.picz.in.th/images/2020/02/27/x6Qzlv.png" }} style={styles.photo3} />
            <Text style={{ flex: 1, fontSize: 20, marginLeft: 30}}>Project</Text>
            <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/23/RuAgpJ.png" }} style={styles.photo4} />
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 0.08, flexDirection: 'row', marginTop: 20, backgroundColor: '#ffffff', alignItems: 'center', borderBottomColor: '#F6F6F6',borderBottomWidth: 1,}} >
            <Image source={{ uri: "https://sv1.picz.in.th/images/2020/02/27/x6QD5u.png" }} style={styles.photo3} />
            <Text style={{ flex: 1, fontSize: 20, marginLeft: 30 }}>Usage Guidance</Text>
            <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/23/RuAgpJ.png" }} style={styles.photo4} />
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 0.08, flexDirection: 'row', backgroundColor: '#ffffff', alignItems: 'center', borderBottomColor: '#F6F6F6',borderBottomWidth: 1, }} onPress={() =>  this.props.navigation.navigate('HelpAndFeedback')}>
            <Image source={{ uri: "https://sv1.picz.in.th/images/2020/02/27/x6Q1t2.png" }} style={styles.photo3} />
            <Text style={{ flex: 1, fontSize: 20, marginLeft: 30 }} >Help & Feedback</Text>
            <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/23/RuAgpJ.png" }} style={styles.photo4} />
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 0.08, flexDirection: 'row', backgroundColor: '#ffffff', alignItems: 'center', borderBottomColor: '#F6F6F6',borderBottomWidth: 1, }} >
            <Image source={{ uri: "https://sv1.picz.in.th/images/2020/02/27/x6QtIW.png" }} style={styles.photo3} />
            <Text style={{ flex: 1, fontSize: 20, marginLeft: 30 }}>Rate Now</Text>
            <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/23/RuAgpJ.png" }} style={styles.photo4} />
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 0.08, flexDirection: 'row', backgroundColor: '#ffffff', alignItems: 'center', borderBottomColor: '#F6F6F6',borderBottomWidth: 1, }} >
            <Image source={{ uri: "https://sv1.picz.in.th/images/2020/02/27/x6Q9gn.png" }} style={styles.photo3} />
            <Text style={{ flex: 1, fontSize: 20, marginLeft: 30 }}>Tell Your Friends</Text>
            <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/23/RuAgpJ.png" }} style={styles.photo4} />
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 0.08, flexDirection: 'row', backgroundColor: '#ffffff', alignItems: 'center', borderBottomColor: '#F6F6F6',borderBottomWidth: 1, }} >
            <Image source={{ uri: "https://sv1.picz.in.th/images/2020/02/27/x6QrDk.png" }} style={styles.photo3} />
            <Text onPress={ ()=>{ Linking.openURL('https://khawoat6.github.io/todolist-landingpage.github.io/')}}   style={{ flex: 1, fontSize: 20, marginLeft: 30 }}>Official Website</Text>
            <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/23/RuAgpJ.png" }} style={styles.photo4} />
          </TouchableOpacity>
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
    borderRadius: 10,
    paddingLeft: 5,
    justifyContent: 'center',
    backgroundColor: '#1F9BF1',
  },
  description: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#FFFFFF',
  },
  photo2: {
    height: 30,
    width: 30,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 1,

    alignItems: 'center',
    justifyContent: 'center'

  }, photo3: {
    height: 25,
    width: 25,
    marginLeft: '7%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  photo: {
    height: 45,
    width: 45,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    borderWidth: 10,
    borderRadius: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  Text: {
    color: "#000000",
    fontSize: 15,
    marginTop: 5,
    marginLeft: 2,
    marginEnd: 2,
    alignItems: 'center',
    justifyContent: 'center'

  }, Text2: {
    color: "#5B3E96",
    fontSize: 17,
    marginTop: 5,
    marginLeft: 2,
    marginEnd: 2,
    alignItems: 'center',
    justifyContent: 'center'
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
  photo4: {
    height: 13,
    width: 13,
    marginRight: '7%',
    alignItems: 'center',
    justifyContent:'center',
  },

});
