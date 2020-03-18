import React, { Component } from 'react';
import { StyleSheet, Text, View, PickerIOS, TouchableOpacity, Alert } from 'react-native';
import ActionButton from 'react-native-action-button';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.Hours  = ["00","01","02","03","04","05", "06","07","08","09","10","11","12","13","14","15","16","17","18","19","20",
                    "21","22","23"];

    this.Minute  = ["00","01","02","03","04","05", "06","07","08","09","10","11","12","13","14","15","16","17","18","19","20",
                    "21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40",
                    "41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"];
    this.state = {
      timer: null,
      hours_Counter: '00',
      minutes_Counter: '00',
      seconds_Counter: '00',
      colorButton: '#0A2A12',
      startDisable: false,
      nameButton: 'start'
    }
  }
  onPressBack(){
    this.props.navigation.navigate('Tomorrow')
 }
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  onButtonStart = () => {
    if ((this.state.nameButton) == 'stop') {
      clearInterval(this.state.timer);
    }
    if ((this.state.nameButton) == 'start') {
      if (Number(this.state.hours_Counter) == 0 && Number(this.state.minutes_Counter) == 0 && Number(this.state.seconds_Counter) == 0){
        this.setState({
          timer: null,
          hours_Counter: '00',
          minutes_Counter: '00',
          seconds_Counter: '00',
        });
        clearInterval(this.state.timer);
        Alert.alert('Please set time');
      }else{
        this.setState({nameButton : 'stop'})
        let timer = setInterval(() => {

          var num = (Number(this.state.seconds_Counter) - 1).toString(),
              count = this.state.minutes_Counter,
              hour = this.state.hours_Counter;

          if (Number(this.state.minutes_Counter) == 0 &&  (Number(this.state.seconds_Counter) == 0)){
            hour = (Number(this.state.hours_Counter) - 1).toString();
            this.setState({ minutes_Counter: '60' });
          }

          if (Number(this.state.seconds_Counter) == 0) {
            count = (Number(this.state.minutes_Counter) - 1).toString();
            num = '59';
          }

          if (Number(this.state.hours_Counter) == 0 && Number(this.state.minutes_Counter) == 0 && Number(this.state.seconds_Counter) == 1){
            clearInterval(this.state.timer);
            Alert.alert('Time out');
            this.setState({nameButton : 'start'})
          }

          this.setState({
            hours_Counter: hour.length == 1 ? '0' + hour : hour,
            minutes_Counter: count.length == 1 ? '0' + count : count,
            seconds_Counter: num.length == 1 ? '0' + num : num
          });
        }, 1000);

        this.setState({ timer });

      }
    }
    else {
      this.setState({nameButton : 'start'})
    }

  }

  onButtonClear = () => {
    clearInterval(this.state.timer);
    this.setState({nameButton : 'start'})
    this.setState({
      timer: null,
      hours_Counter: '00',
      minutes_Counter: '00',
      seconds_Counter: '00',
    });
  }


  getDataHours = () =>{
    return( this.Hours.map( (x,i) => {
          return( <PickerIOS.Item label={x} key={i} value={x} color="white" />)} ));
  }
  getDataMinute = () =>{
    return( this.Minute.map( (x,i) => {
          return( <PickerIOS.Item label={x} key={i} value={x} color="white" />)} ));
  }
  render(){
    //let PickerIOSItem = PickerIOS.Item
    return (

      <View style={styles.container}>
        <Text style={{color: '#FFFFFF', fontSize: 30, fontWeight: '800'}}> Coundown Timer </Text>
        <Text style={styles.counterText}>{this.state.hours_Counter} : {this.state.minutes_Counter} : {this.state.seconds_Counter}</Text>
        { this.state.nameButton === 'stop' ? null
 
        :
        <View style={{ display: 'flex', flexDirection: "row", marginLeft:50, marginRight:50}}>

          <View style={{ flex: 1, flexDirection: 'row',alignItems: 'center', marginBottom: 20}}>
            <PickerIOS
              style={{ flex: 1 }} selectedValue={ this.state.hours_Counter }
              onValueChange={(itemValue, itemIndex) => this.setState({ hours_Counter: itemValue})}>
              { this.getDataHours() }
            </PickerIOS>
            <Text style={{color: '#b5b5b5'}}>hour</Text>
          </View>

          <View style={{ flex: 1, flexDirection: 'row',alignItems: 'center', color: '#FFFFFF', marginBottom: 20 }}>
          <PickerIOS
              style={{ flex: 1 }} selectedValue={ this.state.minutes_Counter }
              onValueChange={(itemValue, itemIndex) => this.setState({ minutes_Counter: itemValue})}>
              { this.getDataMinute() }
            </PickerIOS>
            <Text style={{color: '#b5b5b5'}}>min</Text>
          </View>

          <View style={{ flex: 1, flexDirection: 'row',alignItems: 'center', color: '#FFFFFF', marginBottom: 20 }}>
          <PickerIOS
              style={{ flex: 1 }} selectedValue={ this.state.seconds_Counter }
              onValueChange={(itemValue, itemIndex) => this.setState({ seconds_Counter: itemValue})}>
              { this.getDataMinute() }
            </PickerIOS>
            <Text style={{color: '#b5b5b5'}}>sec</Text>
          </View>

        </View>
        }

        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>

          <View style={{alignItems: 'flex-start', marginLeft: 80}}>
          { this.state.nameButton === 'stop' ?
            <TouchableOpacity style={styles.circle7} disabled={true}>
              <TouchableOpacity style={styles.circle8} disabled={true}>
                <TouchableOpacity style={styles.circle9}
                  onPress={this.onButtonStart}
                  activeOpacity={0.6}
                  disabled={this.state.startDisable}>
                  <Text style={styles.LabelRed}>{this.state.nameButton}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </TouchableOpacity>

          :
            <TouchableOpacity style={styles.circle1} disabled={true}>
              <TouchableOpacity style={styles.circle2} disabled={true}>
                <TouchableOpacity style={styles.circle3}
                  onPress={this.onButtonStart}
                  activeOpacity={0.6}
                  disabled={this.state.startDisable}>
                  <Text style={styles.LabelGreen}>{this.state.nameButton}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </TouchableOpacity>
          }
          { this.state.nameButton === 'start' ?
          <Text style={{fontSize:15,color:'#FFFFFF',alignItems: 'flex-end', textAlign:'center',left:80}} onPress={() => this.onPressBack()}> Back  </Text>
          : null }
          </View>

          <View style={{alignItems: 'flex-end', marginRight: 80}}>
            <TouchableOpacity style={styles.circle4} disabled={true}>
              <TouchableOpacity style={styles.circle5} disabled={true}>
                <TouchableOpacity style={styles.circle6}
                  onPress={this.onButtonClear}
                  activeOpacity={0.6}
                  disabled={this.state.startDisable}>
                  <Text style={{ color:'#8B8A8F', textAlign:'center', fontSize: 17 }}> cancel </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

        </View>
      </View> // Contrainer

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: 'center',
    justifyContent: 'center',
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonStart: {
    width: '80%',
    paddingTop:8,
    paddingBottom:10,
    borderRadius:10,
    marginTop: 15,

    display: 'flex',
    backgroundColor: '#2AC062',
    //shadowColor: '#2AC062',
    //shadowOpacity: 0.2,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,

  },
  buttonStop: {
    width: '80%',
    paddingTop:8,
    paddingBottom:8,
    borderRadius:10,
    marginTop: 15,

    display: 'flex',
    backgroundColor: '#2AC062',
    //shadowColor: '#C1272D',
    //shadowOpacity: 0.2,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,

  },
  LabelGreen:{
      color:'#0aad41',
      textAlign:'center',
      fontSize: 17
  },
  LabelRed:{
    color:'#c78f3c',
    textAlign:'center',
    fontSize: 17
},
  counterText:{
    fontSize: 50,
    marginTop: 15,
    color: '#FFFFFF'
  },
  circle1:{
    padding: 5,
    height: 90,
    width: 90,
    marginTop: 40,
    marginBottom: 40,
    borderRadius:400,
    backgroundColor: '#0A2A12',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle2:{
    padding: 5,
    height: 86,
    width: 86,
    marginTop: 40,
    marginBottom: 40,
    borderRadius:400,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle3:{
    padding: 5,
    height: 82,
    width: 82,
    marginTop: 40,
    marginBottom: 40,
    borderRadius:400,
    backgroundColor: '#0A2A12',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle4:{
    padding: 5,
    height: 90,
    width: 90,
    marginTop: 40,
    marginBottom: 40,
    borderRadius:400,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle5:{
    padding: 5,
    height: 86,
    width: 86,
    marginTop: 40,
    marginBottom: 40,
    borderRadius:400,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle6:{
    padding: 5,
    height: 82,
    width: 82,
    marginTop: 40,
    marginBottom: 40,
    borderRadius:400,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle7:{
    padding: 5,
    height: 90,
    width: 90,
    marginTop: 40,
    marginBottom: 40,
    borderRadius:400,
    backgroundColor: '#332000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle8:{
    padding: 5,
    height: 86,
    width: 86,
    marginTop: 40,
    marginBottom: 40,
    borderRadius:400,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle9:{
    padding: 5,
    height: 82,
    width: 82,
    marginTop: 40,
    marginBottom: 40,
    borderRadius:400,
    backgroundColor: '#332000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});