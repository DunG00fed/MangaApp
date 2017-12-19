import React from 'react';
import { StyleSheet, Text, View, Keyboard, Alert, StatusBar, TextInput } from 'react-native';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { Form, Item, Input, InputGroup, Icon, Button, Content, Container } from 'native-base';
import styles from '../styles/Styles';

export default class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }

    handlePressSignIn() {
        Alert.alert('Button pressed', 'User sign in ' + this.state.username + ' ' + this.state.password);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Icon name='bug' style={styles.logo} />
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
                    <Button rounded large title='Login' onPress={this.handlePressSignIn.bind(this)} style={styles.button}>
                        <Text style={styles.whitetext}>Login</Text>
                    </Button>
                </View>
                <View style={styles.signUpFooter}>
                    <Text style={styles.whitetext}>Don't have an account?
                        <Text style={styles.hyperlink} onPress={() => this.props.navigation.navigate("Register")}> Sign up </Text>
                        now.</Text>
                </View>
            </View>
        )
    }
}
