import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-shadow-cards';
import { AsyncStorage } from 'react-native';
import { Container, Header, Title, Button, Icon } from 'native-base';
import database from './Database'
import ActionButton from 'react-native-action-button';
export default class main extends React.Component {
  state = {
    email: '',
    name: '',
    last: '',
    uri: "https://sv1.picz.in.th/images/2020/01/23/RuEI4z.png",
    pwd:''

  };
  onPressToday() {
    this.props.navigation.navigate('Today')
  }
  onPressTomorrow() {
    this.props.navigation.navigate('Tomorrow')
  }
  onPressUpcoming() {
    this.props.navigation.navigate('Upcoming')
  }
  onPressSomeday() {
    this.props.navigation.navigate('Someday')
  }
  onPressCompleted() {
    this.props.navigation.navigate('Completed')
  }
  onPressNote() {
    this.props.navigation.navigate('Note')
  }
  onPressSetting() {
    this.props.navigation.navigate('Setting')
  }
  onPressForest() {
    this.props.navigation.navigate('Forest')
  }

  onPressReport() {
    this.props.navigation.navigate('Report')
  }
  onPressRank() {
    this.props.navigation.navigate('Ranking')
  }
  onPressGroup() {
    this.props.navigation.navigate('Group')
  }
  onFocusFunction = async () => {

     const value =await AsyncStorage.getItem('@email');
     this.setState({email:value})
     const value2 =await AsyncStorage.getItem('@pwd');
     this.setState({pwd:value2})
     console.log(this.state.email)
     console.log(this.state.pwd)
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
  // read_Account_success=async(doc)=>{
  //   this.setState({name:doc.name})
  //   this.setState({email:doc.email})
  //   this.setState({last:doc.last})
  //   console.log(this.state.name);

  //   await AsyncStorage.setItem('@name',this.state.name);
  //   await AsyncStorage.setItem('@last',this.state.last);
  // }

  // read_Account_fail=async()=>{
  //   console.log("error")


  // }
  componentDidMount() {

    this.onFocusFunction();


  }

  render() {
    return (




      <LinearGradient
        colors={['#FFFFFF', '#FFFFFF']}
        style={{
          flex: 1,
          // position: 'absolute',
          // left: 0,
          // right: 0,
          // top: 0,
          // height: 500,
        }}
      >

        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.1, marginTop: 40, flexDirection: 'row', backgroundColor: "transparent" }}>

            <View style={{ flex: 0.2, marginTop: 10, marginLeft: 15, alignItems: 'center', justifyContent: 'center', height: 50, width: 50 }}>
              <TouchableOpacity onPress={() => this.onPressSetting()}>
                <Image style={{marginLeft:10, marginRight:10 ,marginTop:8 ,width:50,height:50,borderRadius:800,}} source={{uri:this.state.uri}} onPress={() => this.onPressSetting()}/>
                
              </TouchableOpacity>
              


            </View>


            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
              <View style={{ flexDirection: 'column' }} >
                <Text style={{ fontSize: 18, color: '#171D33', marginTop: 15, marginLeft: 2, marginEnd: 3, alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', }}>{this.state.name}</Text>
                {/* <Text style={{ fontSize: 18, color: '#171D33', marginTop: "1%", marginLeft: 2, marginEnd: 3, alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', }}>{this.state.last}</Text> */}

              </View>
              {/* <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
               <TouchableOpacity onPress={() =>this.onPressForest()}>
                  <Image source={{uri:"https://sv1.picz.in.th/images/2020/01/26/RHlNYQ.png"}} style={styles.Icon}></Image>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() =>this.onPressForest()}>
                  <Image source={{uri:"https://sv1.picz.in.th/images/2020/01/22/R2iDFz.png"}} style={styles.Icon}></Image>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() =>this.onPressRank()}>
                  <Image source={{uri:"https://sv1.picz.in.th/images/2020/01/26/RHjmSI.png"}} style={styles.Icon2}></Image>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => { Alert.alert("GO TO To here");}}>
                  <Image source={{uri:"https://sv1.picz.in.th/images/2020/01/22/R2UkuS.png"}} style={styles.Icon}></Image>
                  </TouchableOpacity>
               </View>
               */}

              <View style={{ flex: 1, backgroundColor: "transparent", flexDirection: 'row-reverse' }}>


                <View style={{ marginTop: 10, marginRight: 10, alignContent: "flex-end", justifyContent: 'center', flexDirection: 'row' }}>
                  {/*
                    จัดให้ชื่ออยู่ติดกับรูป 


                    */}




                  <TouchableOpacity onPress={() => this.onPressGroup()}>
                    <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/26/RHlNYQ.png" }} style={styles.Icon}></Image>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.onPressReport()}>
                    <Image source={{ uri: "https://sv1.picz.in.th/images/2020/02/27/x6uk3u.png" }} style={styles.Icon}></Image>
                  </TouchableOpacity>

                  {/* <TouchableOpacity onPress={() => this.onPressRank()}>
                    <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/26/RHjmSI.png" }} style={styles.Icon2}></Image>
                  </TouchableOpacity> */}
                  {/* 
                  <TouchableOpacity onPress={() => { Alert.alert("GO TO To here");}}>
                  <Image source={{uri:"https://sv1.picz.in.th/images/2020/01/22/R2UkuS.png"}} style={styles.Icon}></Image>
                  </TouchableOpacity> */}
                </View>

                {/* <View style={{marginTop:10, alignContent:"flex-start",justifyContent:'center',flexDirection:'row'}}>
                <Text style={styles.Text3}>{this.state.name} </Text> 
                <Text style={styles.Text3}>{this.state.last} </Text>
           
                </View> */}
              </View>
            </View>
            {/* <View style={{flex:1,backgroundColor:"#000000"}}></View> */}

          </View>

          <View style={{ flex: 1, marginTop: 30, marginLeft: 10, backgroundColor: "#transparent", alignContent: 'center' }}>
            {/* <Card style={{padding: 10, margin: 10}}>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Changes you make will automatically reload.</Text>
            <Text>Shake your phone to open the developer menu.</Text>
          </Card> */}


            <TouchableOpacity onPress={() => this.onPressToday()}>
              <Card style={{ padding: 15, margin: 10, flexDirection: 'row' }} >

                <View style={{ flex: 0.1, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/22/R21DSe.png" }} style={styles.photo3} />
                </View>
                <View style={{ marginLeft: 15, alignItems: 'center', justifyContent: 'center' }} >
                  <Text style={styles.Text} onPress={() => this.onPressToday()}>Today</Text>
                </View>
              </Card>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => this.onPressTomorrow()}>
              <Card style={{ padding: 15, margin: 10, flexDirection: 'row' }}>
                <View style={{ flex: 0.1, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/22/R2KdRq.png" }} style={styles.photo3} />
                </View>
                <View style={{ marginLeft: 15, alignItems: 'center', justifyContent: 'center' }} >
                  <Text style={styles.Text} onPress={() => this.onPressTomorrow()}>Tomorrow </Text>
                </View>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.onPressUpcoming()}>
              <Card style={{ padding: 15, margin: 10, flexDirection: 'row' }}>
                <View style={{ flex: 0.1, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/23/RuUyak.png" }} style={styles.photo3} />
                </View>
                <View style={{ marginLeft: 15, alignItems: 'center', justifyContent: 'center' }} >
                  <Text style={styles.Text} >Upcoming </Text>
                </View>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.onPressSomeday()}>
              <Card style={{ padding: 17, margin: 10, flexDirection: 'row' }}>
                <View style={{ flex: 0.1, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/22/R2KqnW.png" }} style={styles.photo4} />
                </View>
                <View style={{ marginLeft: 15, alignItems: 'center', justifyContent: 'center' }} >
                  <Text style={styles.Text} >Someday</Text>
                </View>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.onPressCompleted()}>
              <Card style={{ padding: 15, margin: 10, flexDirection: 'row' }}>
                <View style={{ flex: 0.1, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/23/Ruq7KQ.png" }} style={styles.photo5} />
                </View>
                <View style={{ marginLeft: 15, alignItems: 'center', justifyContent: 'center' }} >
                  <Text style={styles.Text} >Completed</Text>
                </View>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.onPressNote()}>
              <Card style={{ padding: 18, margin: 10, flexDirection: 'row' }}>
                <View style={{ flex: 0.1, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={{ uri: "https://sv1.picz.in.th/images/2020/01/23/Ruqkxy.png" }} style={styles.photo2} />
                </View>
                <View style={{ marginLeft: 15, alignItems: 'center', justifyContent: 'center' }} >
                  <Text style={styles.Text} >Note</Text>
                </View>
              </Card>
            </TouchableOpacity>

            {/* <TouchableOpacity style={{flex:0.5,backgroundColor:'#AAAAAA'}}>
            <Text
              style={styles.txt2}
              onPress={() => this.onPressRegister()}>
              Register
            </Text>
          </TouchableOpacity> */}

          </View>

          <ActionButton buttonColor="rgba(75,21,184,2)" position="right">
                 <ActionButton.Item buttonColor='#000000' title="New Task" onPress={() =>  this.props.navigation.navigate('AddTask')}>
                  <Icon name="md-create" style={{color:'white'}} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#CCCCCC' title="Group" onPress={() =>  this.props.navigation.navigate('Group')}>
                  <Icon name="md-people" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#ffffff' title="New Note" onPress={() =>  this.props.navigation.navigate('AddNote')}>
                  <Icon name="md-save" style={styles.actionButtonIcon} />
                </ActionButton.Item>
              </ActionButton>

        </View>
      </LinearGradient>


    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    marginRight: 16,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'transparent',
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
    height: 15,
    width: 15,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,


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
  photo4: {
    height: 18,
    width: 18,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,


    alignItems: 'center',
    justifyContent: 'center'

  },
  photo5: {
    height: 22,
    width: 22,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,


    alignItems: 'center',
    justifyContent: 'center'

  },




  photo: {
    height: 50,
    width: 50,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    borderRadius: 800,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  Text: {
    color: "#000000",
    fontSize: 17,
    marginTop: 5,
    marginLeft: 2,
    marginEnd: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewBtn2: {
    height: 50,
    marginLeft: 10,
    marginTop: 10,

  },
  Icon: {
    height: 25,
    width: 25,
    marginRight: 5,
    marginLeft: 5,
    // marginTop:5,


    alignItems: 'center',
    justifyContent: 'center'

  }, Text3: {
    fontWeight: 'bold',
    color: "#000000",
    fontSize: 17,
    marginTop: 5,
    marginLeft: 2,
    marginEnd: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  Icon2: {
    height: 20,
    width: 20,
    marginTop:'1%',
    marginRight: '5%',
    marginLeft: '5%',
    // marginTop:5,


    alignItems: 'center',
    justifyContent: 'center'

  },
});
