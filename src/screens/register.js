import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

//Aquí importo el auth que me da Firebase
import auth from '../firebase/config';
//---------------------------------------

class Register extends Component{
    //Aquí es donde recibo los el email, el nombre del usuario y el password del usuario que se va a registrar
    constructor(props){
        super(props);
        this.state = {
            username: '',    //Estos esados reesentam los datos a pedir
            email : '',      //en el formulario   
            password: ''
            
        }
    }
    

    //Para grabar los datos del usuario en la base de datos no relacional firebase, sólo debemos utilizar 
    render(){
        return(
            <View style= {styles.container}>
                <Text style={styles.titulo}>Registro de usuarios</Text>
                <TextInput
                    style ={styles.input}
                    placeholder = 'Introduzca su nombre'
                    keyboardType = 'default'
                    onChangeText = { (text) => this.setState({username: text})} 
                />
                <TextInput
                    style ={styles.input}
                    placeholder = 'Introduzca su email'
                    keyboardType = 'email-address'
                    onChangeText = { (text) => this.setState({email: text})} 
                />
                <TextInput
                    style ={styles.input}
                    placeholder = 'Introduzca su password'
                    keyboardType = 'default'
                    secureTextEntry = {true}
                    onChangeText = { (text) => this.setState({password: text})} 
                />
                
                <TouchableOpacity style = {styles.boton} onPress={() => this.props.register(this.state.username, this.state.email, this.state.password )}>
                    <Text style={styles.enviar}>Registrarme</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 250,
        marginTop: 20
    },
    titulo:{
        fontFamily: 'arial',
        textAlign: 'center',
        color: 'red',
        fontSize: '2rem'
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderRadius: 6,
        marginVertical:10
    },
    boton: {
        backgroundColor: 'green',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'blue'
    },
    enviar:{
        color: 'white'
    }
})

export default Register;
