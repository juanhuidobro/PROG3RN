import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MyCamera from "../components/MyCamera";
import { auth, db } from '../firebase/config';

 class crearPost extends Component {
    constructor(props) {
        super(props);
            this.state = {
               foto: '',
               comentario: '',
               mostrarCamara: true,
               descripcion: '',
            }
    }

agregarPost(){
    db.collection('posteos').add({
        owner: auth.currentUser.displayName,
        descripcion: this.state.descripcion,
        createdAt: Date.now(),
        photo: this.state.foto
    }).then(()=>{
        console.log('creado')
        this.setState({
            descripcion: '',
            titulo: '',
            mostrarCamara: true,

        })
        this.props.drawerProps.navigation.navigate('Home')
    })
}

    subirFoto(foto){
        this.setState({
            foto: foto,
            mostrarCamara: false,
        })
    }
    