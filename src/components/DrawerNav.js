import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../screens/Home';
import Register from '../screens/Register';
import Login from '../screens/Login';

import { auth } from '../firebase/config'

const Drawer = createDrawerNavigator();
export default class DrawerNav extends Component{
    constructor(props){
    super(props);
    this.state = {
        isLoggedIn: false,
        user:'',
        error:'',
    }
}

login(email, password){
    auth.signInWithEmailAndPassword(email, password)
    .then( responsive => {
        this.setState({
            isLoggedIn: true,
            user: response.user.email,
            error: '' 
        })
    })
    .catch( error => {
        this.setState({
            IsLoggedIn: false,
            error: "email o password incorrecto"
        })
    })
}

register(email, password){
    auth.createUserWithEmailAndPassword(email, password)
    .then( responsive => {
        this.setState({
            isLoggedIn: true,
            user: response.user.email,
            error: '' 
        })
    })
    .catch( error => {
        this.setState({
            IsLoggedIn: false,
            error: "error en registracion"
        })
    })
}

componentDidMount(){
    auth.onAuthStateChanged((user) => {
        if(user) {
            this.setState({
                isLoggedIn: true,
            })
        }else{
            this.setState({
                isLoggedIn: false,
            })
        }
    })
}

    render(){
        return(
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name='Home' component={() => <Home/>} />
                    <Drawer.Screen name='Register' component={()=> <Register registrarse={(email, pass) => this.registrarse(email, pass)}/>} />
                    <Drawer.Screen  name='Login' component={() => <Login ingresar={(email, pass) => this.ingresar(email, pass)}/>}  />
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }

}


