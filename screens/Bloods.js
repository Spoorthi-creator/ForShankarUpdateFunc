import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Header, Icon,Avatar } from 'react-native-elements';

import * as ImagePicker from "expo-image-picker";
const {height,width}=Dimensions.get('window')
import firebase from "firebase";
import { Dimensions } from 'react-native';

export default class Bloods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        userId: firebase.auth().currentUser.email,
       
        image: "https://dummyimage.com/400x400/000000/0011ff.png&text=Photo",
      
    };
  }

  componentDidMount() {
    this.fetchImage();
   
    console.log(this.state.name);
  }

  uploadImage = async (uri) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("user_profiles/" + this.state.userId);

    return ref.put(blob).then((response) => {
      this.fetchImage();
    });
  };

  fetchImage = (x) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("user_profiles/" + this.state.userId);

    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({
          image: "https://dummyimage.com/1000x800/208ec9/ffffff.png&text=Photo",
        });
        alert("No Image Found");
      });
  };
  selectPicture = async () => {
    const { canceled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!canceled) {
      this.uploadImage(uri);
    }
  };

  render() {
    return (
        <ScrollView
        style={{
          flex: 1,
        
        }}
      >
        <View style={{alignSelf:'center',height:height-100,width:width-10,alignContent:'center',alignItems:'center',marginTop:50 }}>
            <Text>Blood Report</Text>
          <Avatar
            containerStyle={{
              alignSelf: "center",
             // margin: "10%",
             // marginBottom: "1%",
             // marginTop: "20%",
              width: width-10,
              height: height-200,
            }}
            rounded
            source={{ uri: this.state.image }}
            size="xlarge"
            onPress={() => {
              this.selectPicture();
            }}
          />
          </View>
          </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  
});