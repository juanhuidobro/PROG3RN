import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,FloatList, Image, ActivityIndicator } from 'react-native';
import {Camera} from 'expo-camera';
import { storage } from '../firebase/config';   //Aquí importo el storage de Firebase

class MyCamera extends Component{
    constructor(props){
        super(props);
        this.state = {
            foto: '',
            permisos : false    //Con este estado controlo el otorgamiento del permiso a la camara para tomar fotos, lo inicializo en falso, a la espera de la decisión del usuario
        }
        this.camara;    //Es como capturar la camara, parecido al document.querySelector(), no se coloca dentro del render, el render se vuelve a ejecutar y termina en un bucle infinito
    }
    //Aquí al montar el componente verifico si tengo o no permisos para acceder a la cámara
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=>{
            this.setState({
                permisos : true
            })
        })
        .catch(()=>{
            this.setState({
                permisos: false
            })
        })
    }
    
    //Aquí hago la función para sacar la foto desde la cámara
    sacarFoto(){
        //console.log('Sacar la foto');
        this.camara.takePictureAsync()
        .then((photo)=>{
            //console.log(photo)   //Aquí logramos ver que hay varias propiedades entre ella la uri, la cual es la que debemos guardar. Es una dirección del cache del celular o del navegador
            this.setState({
                foto : photo.uri
            })
            
        })
    }
    //Este es el método para rechazar la foto tomada
    rechazar(){
        this.setState({
            foto : ''   //De esta forma el estado lo blanqueo y así se ve como que borro la foto tomada
        })
    }
    //Este es el método que controla la aceptación de la foto tomada y la misma la subo al storage que me ofrece Firebase
    aceptar(){
        fetch(this.state.foto)
        .then((respuesta)=>{
            return respuesta.blob()  //Esto es como lo que haciamos en programación 2 respuesta.json()
        })
        .then((imagen)=>{
            const storageRef = storage.ref(`camara/${Date.now()} `) //Aquí creo la carpeta donde voy a guardar la foto
            storageRef.put(imagen)   //Con este método guardo la imagen en el storage de Firebase
            .then(()=>{
                //console.log('Se subio la foto')
                storageRef.getDownloadURL()
                .then((url) =>{
                    //console.log(url)
                    this.props.subirFoto(url)
                })
            })
        })
    }

    render(){
        //Aquí controlo si tengo o no el permiso para acceder a la cámara y tomar fotos
        if(this.state.permisos === false){
            return <Text style={styles.mensaje}>No tiene el permiso para tomar fotos</Text>
        }
        return(
            <React.Fragment>
                {/*Aquí muestro la previsualización de la foto tomada*/}
                {
                    this.state.foto ?
                    <React.Fragment>
                        {/*Aquí muestro la imagen, la cual tomo la URI que está en el estado que trajo la promesa*/}
                        <Image  source= {{uri: this.state.foto}} style={styles.vistaPrevia}   />        
                        {/*Aquí controlo si deseo o no rechazar la foto tomada*/}
                        <TouchableOpacity onPress={() => this.rechazar()}>
                            <Text style={styles.btnRechazar}>Rechazar</Text>
                        </TouchableOpacity>
                        {/*Aquí controlo si deseo aceptar la foto tomada*/}
                        <TouchableOpacity onPress={() => this.aceptar()}>
                            <Text style={styles.btnAceptar}>Aceptar</Text>
                        </TouchableOpacity>                        
                    </React.Fragment> 
                    :   
                    <React.Fragment>
                        <Camera 
                            style = { styles.camara}   //Aplicando los estilos a la cámara
                            type = {Camera.Constants.front}   //Seleccionando la cámara front - back
                            ref = {reference => this.camara = reference} //A la variable camara se le referencia el componente, es como un document.querySelector()
                        />
                        <TouchableOpacity onPress= { () => this.sacarFoto()}>
                            <Text style={styles.btn}>Sacar Foto</Text>
                        </TouchableOpacity>
                    </React.Fragment>    
                }
                
            </React.Fragment>
        )
    }

}
const styles = StyleSheet.create({
    camara : {
        flex: 1,
        width: '100%'
    },
    btn: {
        backgroundColor: 'tomato',
        padding: '10',
        color: 'white'
    },
    vistaPrevia:{
        flex:6,        //Esto se lo coloque para que me ocupe 1/8 de la pantalla - Sumo:  Flex 6 + flex 1
        width: '100%'
    },
    btnRechazar:{
        flex: 1,     //Este ocuparía 1/7 de la pantalla
        width: '100%',
        backgroundColor: 'teal',
        color: 'white'
    },
    btnAceptar:{
        flex: 1,     //Este ocuparía 1/7 de la pantalla
        width: '100%',
        backgroundColor: 'tomato',
        color: 'white'
    },
    mensaje:{
        backgroundColor: 'tomato',
        color: 'white'
    }

})
export default MyCamera;