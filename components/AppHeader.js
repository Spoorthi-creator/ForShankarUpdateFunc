import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class AppHeader extends React.Component{
  render(){
    return(
      <View style= {styles.textContainer}>
        <Text style={styles.text}>Patient Registration App</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer:{
    backgroundColor: '#002B5B',
  },
  text:{
    color: 'white',
    padding: 20,
    fontSize: 29,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});