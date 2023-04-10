import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class AppHeaderMedications extends React.Component{
  render(){
    return(
      <View style= {styles.textContainer}>
        <Text style={styles.text}>Medications</Text>
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
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});