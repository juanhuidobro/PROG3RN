import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password: ''
        }
    }
    render(){
        return(
            <View style= {styles.container}>
            <Text style={styles.titulo}>Iniciar session</Text>
            <TextInput
                style ={styles.input}
                placeholder = 'email'
                keyboardType = 'email-address'
                onChangeText = { (text) => this.setState({email: text})} 
            />
            <TextInput
                style ={styles.input}
                placeholder = 'password'
                keyboardType = 'default'
                secureTextEntry = {true}
                onChangeText = { (text) => this.setState({password: text})} 
            />
            <TouchableOpacity style = {styles.boton} onPress={() => this.props.login(this.state.email, this.state.password)}>
                <Text style={styles.enviar}>Ingresar</Text>
            </TouchableOpacity>
        </View>
        )
    }  
}
const styles = StyleSheet.create({
})
export default Login;