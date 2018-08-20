import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';


class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
           this.onLoginSuccess.bind(this);
        })
        .catch(() => {
            //create an account
            firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
        });
    }

    onLoginFail() {
        this.setState({ error: 'authentication failed', loading: false });
    }

    onLoginSuccess() {
        // clear out error message 
        // remove spinner 
        // clean out form 
        // reset state 
        this.setState({
             email: '',
             password: '', 
             error: '', // overkill
             loading: false }
        );
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        } 
        return (
            <Button whenPressed={this.onButtonPress.bind(this)}>
                Log in 
            </Button>
        );      
    }


    render() {
        return (
           <Card>
               <CardSection>
                   <Input
                    placeholder={'user@gmail.com'}
                    label={'Email'}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })} // shorthand {text: text}
                   />
               </CardSection>

               <CardSection>
                <Input
                    secureTextEntry
                    placeholder={'enter your password'}
                    label={'Password'}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })} // shorthand {text: text}
                />
               </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

               <CardSection>
                  {this.renderButton()}
               </CardSection>
           </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;
