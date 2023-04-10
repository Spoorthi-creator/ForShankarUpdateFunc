import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import EnterDataDetails from './EnterDataDetails';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ViewDetails from './ViewDetails';
export default class ViewData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPatients: [],
      lastVisiblePatient: null,
      searchText: '',
    };
  }
  componentDidMount = async () => {
    this.getPatients();
  };
  goBack = () => {
    this.props.navigation.navigate('EnterDataDetails');
  };

  logout = () => {

    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.props.navigation.navigate('Flashscreen');
      alert("Logged out!")
    }).catch((error) => {
      alert("Something went wrong! Please try again")
    });

  };
  // getPatients = () => {
  //   db.collection('patients')
  //     .limit(10)
  //     .get()
  //     .then((snapshot) => {
  //       snapshot.docs.map((doc) => {
  //         this.setState({
  //           allPatients: [...this.state.allPatients, doc.data()],
  //           lastVisiblePatient: doc,
  //         });
  //       });
  //     });
  // };

    getPatients = () => {

    const user = firebase.auth().currentUser;

    const email = user.email;

    db.collection(email).onSnapshot((snapshot) => {
      var allC = [];
      snapshot.docs.map((doc) => {
        var culture = doc.data();
      //  culture['cultureId'] = doc.id;

        allC.push(culture);
      });
      console.log(allC);
      this.setState({ allPatients: allC });
     
    });
   
    // db.collection(email)
    //   .limit(10)
    //   .get()
    //   .then((snapshot) => {
    //     snapshot.docs.map((doc) => {
    //       this.setState({
    //         allPatients: [...this.state.allPatients, doc.data()],
    //         lastVisiblePatient: doc,
    //       });
    //     });
    //   });
    //   console.log(allPatients);
  };

  handleSearch = async (text) => {
    var enteredText = text.toUpperCase().split('');
    const user = firebase.auth().currentUser;

    const email = user.email;
    // text = text.toUpperCase();
    this.setState({
      allPatients: [],
    });
    if (!text) {
      this.getPatients();
    }
    console.log(text);
    db.collection(email)
      .where('name', '==', text)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          this.setState({
            allPatients: [...this.state.allPatients, doc.data()],
            lastVisiblePatient: doc,
          });
        });
      });
  };

  // fetchMorePatients = async (text) => {
  //   var enteredText = text.toUpperCase().split('');
  //   text = text.toUpperCase();
  //   const { lastVisiblePatient, allPatients } = this.state;
  //   const user = firebase.auth().currentUser;

  //   const email = user.email;
  //   const query = await db
  //     .collection(email)
  //     .where('name', '==', text)
  //     .startAfter(lastVisiblePatient)
  //     .limit(10)
  //     .get();
  //   query.docs.map((doc) => {
  //     this.setState({
  //       allPatients: [...this.state.allPatients, doc.data()],
  //       lastVisiblePatient: doc,
  //     });
  //   });
  // };

  renderItem = ({ item,i }) => {
    return (
    //<ViewDetails details={viewDetails} navigation={this.props.navigation} />
      <View style={{ borderWidth: 1 }}>
        <View style={{ zIndex: 0 }}>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('ViewDetails', {
              patientDetails: item,
            });}}>
            <ListItem key={i} bottomDivider>
              <Icon type={'antdesign'} name={'book'} size={40} />
              <ListItem.Content>
                <ListItem.Title style={styles.title}>
                  {item.name}
                </ListItem.Title>
                <View style={styles.lowerLeftContaiiner}>
                  <View style={styles.transactionContainer}>
                    <Icon
                      type={'ionicon'}
                      name={
                        item.transaction_type === 'issue'
                          ? 'checkmark-circle-outline'
                          : 'arrow-redo-circle-outline'
                      }
                      color={
                        item.transaction_type === 'issue'
                          ? '#78D304'
                          : '#0364F4'
                      }
                    />
                  </View>
                </View>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        </View>
      </View>
    )
  };

  render() {
    const { searchText, allPatients } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <View style={styles.textinputContainer}>
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({ searchText: text })}
              placeholder={'Type here'}
              placeholderTextColor={'#FFFFFF'}
              onSubmitEditing={() => this.handleSearch(searchText)}
            />
            <TouchableOpacity
              style={styles.scanbutton}
              onPress={() => this.handleSearch(searchText)}>
              <Text style={styles.scanbuttonText}>Search</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={()=>this.logout()}>
            <Ionicons name={'arrow-back-circle'} size={100} color={'black'} />
          </TouchableOpacity>


          </View>
        </View>
        <View style={styles.lowerContainer}>
         
          <FlatList
            data={allPatients}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
           // onEndReached={() => this.fetchMorePatients(searchText)}
            onEndReachedThreshold={0.7}
            ListHeaderComponent={() => (!allPatients.length? 
              <Text style={styles.emptyMessageStyle}>No Records at the moment.Click on the '+' icon to add.</Text>  
              : null)
            }
          
          />
        </View>
        <View
          style={{
            zIndex: 1,
            alignSelf: 'flex-end',
            bottom: 0,
            position: 'absolute',
          }}>
          <TouchableOpacity onPress={()=>this.goBack()}>
            <Ionicons name={'arrow-back-circle'} size={100} color={'#256D85'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B4865',
    zIndex: 0,
  },
  upperContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#256D85',
    borderColor: '#8FE3CF',
  },
  textinput: {
    width: '57%',
    height: 50,
    padding: 10,
    borderColor: '#8FE3CF',
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: '#2B4865',
   // fontFamily: 'Rajdhani_600SemiBold',
    color: '#8FE3CF',
  },
  scanbutton: {
    width: 100,
    height: 50,
    backgroundColor: '#256D85',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanbuttonText: {
    fontSize: 24,
    color: 'white',
   // fontFamily: 'Rajdhani_600SemiBold',
  },
  lowerContainer: {
    flex: 0.8,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
   // fontFamily: 'Rajdhani_600SemiBold',
  },
  subtitle: {
    fontSize: 16,
   // fontFamily: 'Rajdhani_600SemiBold',
  },
  lowerLeftContaiiner: {
    alignSelf: 'flex-end',
    marginTop: -40,
  },
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
  },
  transactionText: {
    fontSize: 20,

   // fontFamily: 'Rajdhani_600SemiBold',
  },
  date: {
    fontSize: 12,
  //  fontFamily: 'Rajdhani_600SemiBold',
    paddingTop: 5,
  },
  emptyMessageStyle: {
    textAlign: 'center',
    marginTop: '50%', 
  }
});
