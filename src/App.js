import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';//destrucure

class App extends Component {
    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyAmgj5p3mI4qX8HkbKAUv2mOE4sgZVJhiw',
            authDomain: 'auth-71ecc.firebaseapp.com',
            databaseURL: 'https://auth-71ecc.firebaseio.com',
            projectId: 'auth-71ecc',
            storageBucket: 'auth-71ecc.appspot.com',
            messagingSenderId: '127285889767'
          });
    }

    render() {
        return ( 
            <View>
                <Header headerText={'Authentication'} />
                <Text>An App</Text>
            </View>
        );
    }
}

export default App;
