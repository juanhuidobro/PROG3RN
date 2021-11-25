//Aquí muestro los posteos y controlo los Like
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from "../firebase/config";
import firebase from "firebase";


class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
           likes: 0,
           liked: false,
        }
    }
    //Likear y deslikear 
    componentDidMount(){
        if(this.props.doc.data.likes){
            let likes = this.props.doc.data.likes.length;
            this.setState({
                likes: likes,
            })
            if (this.props.doc.data.likes.includes(auth.currentUser.email)) {
                this.setState({
                    liked: true,
                })  
            }
        } 
    } 
    //Con este método lo cree para Likear los Post  
    like(){        
        let thisDoc = db.collection('posts').doc(this.props.doc.id);

        thisDoc.update(
            { likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)}
        )
        .then(
            this.setState({
                liked:true,
                likes: this.state.likes + 1,
            },
            console.log('likeado ok'))
            )
        .catch(e => console.log(e))
    }
    //Con este método logro Deslikear los Post 
    unLike(){
        let thisDoc = db.collection('posts').doc(this.props.doc.id);

        thisDoc.update(
            { likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)}
        )
        .then(
            this.setState({
                liked:false,
                likes: this.state.likes - 1,
            },
            console.log('Deslikeado ok'))
            )
        .catch(error => console.log('Upss error encontrado '+error))
    }

    render(){  
        return(
            <View style={styles.container}>
              
                <Text>Posteo creado por: {this.props.doc.data.username}</Text>
                <Text>Título:  {this.props.doc.data.title}</Text>
                <Text>Descripción:  {this.props.doc.data.description}</Text>
                <View>
                    { this.state.liked === true ?
                        <TouchableOpacity  style={styles.quitarLike} onPress={()=>this.unLike()}>
                            <Text style={styles.texto} >Quitar like</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity  style={styles.meGusta}  onPress={()=>this.like()}>
                            <Text style={styles.texto} >Me gusta</Text>
                        </TouchableOpacity>
                    }
                    <Text>likes: {this.state.likes}</Text>
                </View>
                

            </View>
        )
    }
}
//Generando los estilos para el componente
const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        shadowColor: '#ccc',
        shadowOffset:{
            width: 0,
            height: 0
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        borderRadius: 5,   
    },
    quitarLike: {
      backgroundColor: 'tomato',
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: 'center',
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'blue'
  },
  meGusta: {
    backgroundColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'blue'
  },
  texto:{
    color: 'white'
  }
})

export default Post;