import React from 'react';
import { StyleSheet, Text, View, Keyboard, Alert, StatusBar, TextInput } from 'react-native';
import { Form, Item, Input, InputGroup, Icon, Button, Content, Container } from 'native-base';

import styles from '../styles/Styles';

export default class Register extends React.Component{
    state = {
        email: '',
        username: '',
        password: ''
    }

    handlePressRegister() {
        Alert.alert('Button pressed', 'User registered ' + this.state.email + ' ' + this.state.username + ' ' + this.state.password);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Icon name='bug' style={styles.logo} />
                    <InputGroup>
                        <Icon name='mail' />
                        <Input placeholder='Email' onChangeText={(email) => this.setState({ email })} />
                    </InputGroup>
                    <InputGroup>
                        <Icon name='ios-person' />
                        <Input placeholder='Username' onChangeText={(username) => this.setState({ username })} />
                    </InputGroup>
                    <InputGroup>
                        <Icon name='ios-unlock' />
                        <Input placeholder='Password' secureTextEntry={true} onChangeText={(password) => this.setState({ password })} />
                    </InputGroup>
                </View>
                <View style={styles.buttonView}>
                    <Button rounded large title='Login' onPress={this.handlePressRegister.bind(this)} style={styles.button}>
                        <Text style={styles.whitetext}>Register</Text>
                    </Button>
                </View>
                <View style={styles.signUpFooter}>
                    <Text style={styles.whitetext}>Already have an account?
                        <Text style={styles.hyperlink} onPress={() => this.props.navigation.goBack()}> Sign in </Text>
                        now.</Text>
                </View>
            </View>
        )
    }
}