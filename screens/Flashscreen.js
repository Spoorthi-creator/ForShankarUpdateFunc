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
  Modal,
  Button,
  FlatList,
} from 'react-native';

export default class FlashScreen extends React.Component {
    render(){
        return(
                <View>
                <Image
                    source={require("../assets/wave.png")}
                    style={styles.waveImage}
                ></Image>
                <Image
                    source={require("../assets/Doctor.png")}
                    style={styles.doctorImage}
                ></Image>
                <View
                 style={styles.textContainer}
                >
                    <Text
                    style={styles.patientText}
                    >
                        Patient
                    </Text>
                    <Text
                    style={styles.registrationText}
                    >
                        Registration
                    </Text>
                </View>
                <View
                style={styles.button}
                >
                    <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('Register')
                      }}
                    >
                        <Text
                        style={styles.buttonText}
                        >
                            Lets Start!
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    waveImage: {
        width: "200%",
        height: "150%",
        resizeMode: "contain",
        postion: "absolute",
        zindex: 0,
        marginBottom: -300,
        // display: "none"
    },
    doctorImage: {
        width: "120%",
        height: "120%",
        resizeMode: "contain",
        bottom: 0,
        zindex: 1,
        position: "absolute",
        marginBottom: -145,
        // display: "none"
    },
    patientText:{
        color: 'black',
        paddingRight: 20,
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        zindex: 2,
        bottom: -70,
        position: "absolute",
        marginBottom: 850,
        resizeMode: "contain",
    },
    registrationText:{
        color: '#19969d',
        marginLeft: 130,
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        zindex: 3,
        bottom: 780,
        position: "absolute",
        resizeMode: "contain",
        
    },
    button:{
        backgroundColor: '#19969d',
        borderRadius: 50,
        width: 250,
        zindex: 4,
        bottom: 730,
        marginLeft: 10
      },
    buttonText:{
        color: 'white',
        padding: 20,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        zindex: 4,
      },
      textContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: 0,
        marginLeft: 20,
        // bottom: 0,
        // position: "absolute",
        // marginBottom: 850,
        // resizeMode: "contain",
      }
})