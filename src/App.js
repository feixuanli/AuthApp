import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';//destrucure
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyAmgj5p3mI4qX8HkbKAUv2mOE4sgZVJhiw',
            authDomain: 'auth-71ecc.firebaseapp.com',
            databaseURL: 'https://auth-71ecc.firebaseio.com',
            projectId: 'auth-71ecc',
            storageBucket: 'auth-71ecc.appspot.com',
            messagingSenderId: '127285889767'
          });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Button whenPressed={() => { firebase.auth().signOut(); }}>
                        Log out
                    </Button>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />;
        }
    }

    render() {
        return ( 
            <View>
                <Header headerText={'Authentication'} />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
