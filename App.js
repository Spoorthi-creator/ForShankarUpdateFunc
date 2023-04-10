import  React, { Component } from 'react';
import StackNavigator from './navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';

//import CreateReport from "./screens/CreateReport"
import firebase from "firebase";
import { firebaseConfig } from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);
export default class App extends Component {
  
  render() {
    return (
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    );
  }
}
