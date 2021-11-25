import React, {Component} from "react";
//Para profundizar sobre estos componentes:
/*
https://reactnative.dev/docs/view
https://reactnative.dev/docs/text
https://reactnative.dev/docs/textinput
https://reactnative.dev/docs/touchableopacity
https://reactnative.dev/docs/stylesheet
https://reactnative.dev/docs/image
*/
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password: ''
        }
    }
    //Esto lo puse en comentarios, ya que era una prueba para verificar si los datos estaban siendo enviados, si desea verificarlo que los comantarios y en el touchable opacity, disponga el uso del evento  onPress = {this.enviar() }
    //enviar(){
    //    console.log(`El email que se coloco es: ${this.state.email} `);
    //}
    //enviar(){
    //    console.log(`El email que se coloco es: ${this.state.email} `);
    //}
    render(){
        return(
            <View style= {styles.container}>
                <Text style={styles.titulo}>Inicio de session</Text>
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
                <TouchableOpacity style = {styles.boton} onPress={() => this.props.login(this.state.email, this.state.password)}>
                    <Text style={styles.enviar}>Ingresar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
//Aquí es donde genero los distintos estilos a utilizar
const styles = StyleSheet.create({
    container: {
        height: 250,
        marginTop: 20
    },
    titulo:{
        fontFamily: 'arial',
        textAlign: 'center',
        color: 'tomato',
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

export default Login;
