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
        IsLoggedIn: false,
        user:'',
        error:'',
    }
}

componentDidMount(){
    auth.onAuthStateChanged((user) => {
        if(user) {
            this.setState({
                IsLoggedIn: true,
            })
        }else{
            this.setState({
                IsLoggedIn: false,
            })
        }
    })
}

class DrawerNav extends Component{
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
export default DrawerNav;

