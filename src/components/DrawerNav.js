import React, { Component } from 'react';

/*
Si desean ampliar sus conocimientos Drawer Navigation:
https://reactnative.dev/docs/navigation#usage
*/
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Register from '../screens/Register';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import CreatePost from '../screens/CreatePost';

//Aquí importo la configuración del auth que me ofrece firebase
import { auth } from '../firebase/config';
//-------------------------------------------------------------

const Drawer = createDrawerNavigator();

class DrawerNav extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false,     //Esto me determina si el usuario está o no logueado
            user: '',
            error: ''       //Con esto controlo si hay algún error en el registro o en el login del usuario
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user) {
                this.setState({
                    isLoggedIn: true,
                    user: user.email
                })
            }else{
                this.setState({
                    isLoggedIn: false
                })
            }
        })
    }
    //Este método lo cree para lograr registar al usuario
    register(username,email, password){
        //Aquí hago uso del método que me ofrece firebase, para grabar los datos del usuario
        auth.createUserWithEmailAndPassword(email, password)
        .then( user => {
            console.log(username)
            user.user.updateProfile({
                displayName: username
            })
            this.setState({
                isLoggedIn: true,
                user: user.user.email,
                error: ''
            })
        })
        .catch( error => {
            this.setState({
                isLoggedIn: false,
                error: "Registro no completado"
            })
        })
    }

    //Este es el método por el cual controlo el login del usuario
    login(email, password){
        //Este es un método que me ofrece el auth de firebase, para ver si un usuario está registrado en la base de datos
        auth.signInWithEmailAndPassword(email, password)
        .then( response => {
            this.setState({
                isLoggedIn: true,
                user: response.user.email,
                error: ''
            })
        })
        .catch( error => {
            this.setState({
                isLoggedIn: false,
                error: "Credenciales inválidas"
            })
        })
    }

    //Este método lo cree para lograr saccar al usuario de la apliacación, el famoso Logout de cualquier aplicación 
    signOut(){
        auth.signOut()
        .then(response => {
            this.setState({
                isLoggedIn: false,    //Con este estado controlo si el usuario está no logueado 
                user: ''    //Con este estado lo que hago es borrar los datos del usuario para que no aparezca nada en la pantalla
            });
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        return(
            <NavigationContainer>
                <Drawer.Navigator>
                    {/*Aquí con la condición muestro unas opcioneu otras*/}
                    {
                        this.state.isLoggedIn ? 
                            <React.Fragment>
                                <Drawer.Screen name="Inicio">
                                    {() => <Home />}
                                </Drawer.Screen>

                                <Drawer.Screen name="Perfil">
                                    {() => <Profile user={this.state.user} signOut={() => this.signOut()}  />}
                                </Drawer.Screen>
                                <Drawer.Screen name="Crear Post">
                                    {(drawerProps) => <CreatePost drawerProps={drawerProps} /> }
                                </Drawer.Screen>
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <Drawer.Screen name="Inicio sesión">
                                    {() => <Login login={(email, pass) => this.login(email, pass)} error={this.state.error} />} 
                                </Drawer.Screen>
                                <Drawer.Screen name="Registro">
                                    {() => <Register register={(username, email, pass) => this.register(username,email, pass)} error={this.state.error} /> }
                                </Drawer.Screen>
                                
                            </React.Fragment>
                    }
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}
export default DrawerNav;
