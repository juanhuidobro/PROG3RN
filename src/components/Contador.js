import React, {Component} from "react";
import {Text,TouchableOpacity,View,StyleSheet} from 'react-native';
 
class Contador extends Component{
constructor(){
    super();
    this.state ={
        valor: 0,
    }
}
aumentar(){
    this.setState({
        valor: this.state.valor + 1
    })
}
render(){
    return(
        <View>
            <Text>Cantidad de Clicks: {this.state.valor}</Text>
            <TouchableOpacity  style={styles.botonContar}   onPress = {() => this.aumentar()} >
             <Text  style={styles.texto}  >Click aquí para contar</Text>   
            </TouchableOpacity>
        </View>
    )
}}
//Creando los estilos
const styles = StyleSheet.create({
    botonContar: {
        backgroundColor: 'lighblue',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'red'
    },
    texto:{
        color: 'white'
    }
})

export default Contador;
