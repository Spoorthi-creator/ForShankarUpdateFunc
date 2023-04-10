import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  CheckBox,
} from 'react-native';
import db from '../config';
import AppHeader from '../components/AppHeader';
import firebase, { doc, setDoc } from 'firebase';
import DatePicker from 'react-native-datepicker';

import moment from 'moment';

export default class EnterDataDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mrn: '',
      date: null,
      name: '',
      age: '',
      gender: '',
      phoneNo: "",
      referredBy: "",
      BP:"",
      height:'',
      weight:'',
      bloodgroup:'',
      bpm:'',

    };
  }

  goBack = () => {
    this.props.navigation.navigate('EnterDataMeds');
  };
  handleUpdate = async () => {
    var { date, name} = this.state;
    const user = firebase.auth().currentUser;
    const email = user.email
    //alert(email)
    // alert(user)
    db.collection(email).doc(this.state.name).set({
    
      mrn: this.state.mrn,
      name: this.state.name,
      date: this.state.date,
      age: this.state.age,
      gender: this.state.gender,
      BP:this.state.BP,
      height:this.state.height,
      weight:this.state.weight,
      phoneNo: this.state.phoneNo,
      referredBy: this.state.referredBy,
      bloodgroup:this.state.bloodgroup,
      bpm:this.state.bpm,
     // userId:firebase.auth.currentUser.uid,

    
    name: this.state.name
    });
    this.props.navigation.navigate("EnterDataMeds", {
      details: this.state.name
    })
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <AppHeader />
        <ScrollView>
          <View style={styles.fillContainer}>
            <Text style={styles.text}>Name:</Text>
            <TextInput
              style={styles.inputBoxShort}
              onChangeText={(text) => {
                this.setState({ name: text });
              }}></TextInput>
          </View>




          <View style={styles.fillContainer}>
            <Text style={styles.text}>MRN:</Text>
            <TextInput
              style={styles.inputBoxShort}
              onChangeText={(text) => {
                this.setState({ mrn: text });
              }}></TextInput>
          </View>

       
   <View style={styles.fillContainer2}>
            <Text style={styles.text}>DoB</Text>
         

            <DatePicker
          showIcon={false}
          androidMode="spinner"
          style={{ width: 300 }}
          date={this.state.date}
          mode="date"
          placeholder="DD/MM/YYYY"
          format="DD-MM-YYYY"
          maxDate={moment().format('DD-MM-YYYY')}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput: {
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#002B5B',
            },
          }}
          onDateChange={(date) => {
            this.setState({ date: date });
          }}
        />
          </View>

        

          <View style={styles.fillContainer}>
            <Text style={styles.text}>Age:</Text>
            <TextInput
              style={styles.inputBoxLong}
              onChangeText={(text) => {
                this.setState({ age: text });
              }}></TextInput>
          </View>

         

          <View style={styles.fillContainer}>
            <Text style={styles.text}>Gender:</Text>
            <TextInput
              style={styles.inputBoxLong}
              onChangeText={(text) => {
                this.setState({ gender: text });
              }}></TextInput>
          </View>

          <View style={styles.fillContainer}>
            <Text style={styles.text}>BP:</Text>
            <TextInput
              style={styles.inputBoxLong}
              onChangeText={(text) => {
                this.setState({ BP: text });
              }}></TextInput>
          </View>

          <View style={styles.fillContainer}>
            <Text style={styles.text}>Height:</Text>
            <TextInput
              style={styles.inputBoxLong}
              onChangeText={(text) => {
                this.setState({ height: text });
              }}></TextInput>
          </View>

          <View style={styles.fillContainer}>
            <Text style={styles.text}>Weight:</Text>
            <TextInput
              style={styles.inputBoxLong}
              onChangeText={(text) => {
                this.setState({ weight: text });
              }}></TextInput>
          </View>

          <View style={styles.fillContainer}>
            <Text style={styles.text}>Blood group:</Text>
            <TextInput
              style={styles.inputBoxLong}
              onChangeText={(text) => {
                this.setState({ bloodgroup: text });
              }}></TextInput>
          </View>

          <View style={styles.fillContainer2}>
            <Text style={styles.text}>Phone No:</Text>
            <TextInput
              style={styles.inputBoxShort}
              onChangeText={(text) => {
                this.setState({ phoneNo: text });
              }}></TextInput>
          </View>

          <View style={styles.fillContainer2}>
            <Text style={styles.text}>Ref By:</Text>
            <TextInput
              style={styles.inputBoxShort}
              onChangeText={(text) => {
                this.setState({ referredBy: text });
              }}></TextInput>
          </View>

        
        </ScrollView>
        
          <View>
          <TouchableOpacity 
          style={styles.saveButton}
          onPressIn = {()=> this.handleUpdate()}
          onPress= {()=> this.goBack()}
          >
            <Text style={styles.text2}>Next</Text>
          </TouchableOpacity>
        </View>

       
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fillContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    margin: 20,
    borderWidth: 4,
    borderColor: "#256D85"
  },
  saveButton: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 67,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#002B5B',
    marginTop: 10,
  },
  text: {
    color: '#256D85',
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 0,
    borderRadius: 0,
  },
  inputBoxShort: {
    width: '50%',
    alignSelf: 'center',
    height: 30,
    textAlign: 'center',
    borderWidth: 4,
    marginLeft: 20,
    borderColor: "#8FE3CF",
  },
  inputBoxLong: {
    width: '40%',
    alignSelf: 'center',
    height: 30,
    textAlign: 'center',
    borderWidth: 4,
    marginLeft: 20,
    borderColor: "#8FE3CF",
  },
  text2: {
    color: 'white',
    padding: 20,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 0,
    borderRadius: 0,
  },
  fillContainer2: {
    flexDirection: 'row',
    padding: 0,
    alignItems: 'center',
    margin: 20,
    borderWidth: 4,
    borderColor: "#256D85"
  },
});
