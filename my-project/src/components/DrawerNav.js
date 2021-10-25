import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import login from '../screens/login';
import register from '../screens/register';

const Drawer = createDrawerNavigator();

export default class DrawerNav extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
<NavigationContainer>
     <Drawer.Navigator>
        <Drawer.Screen name="Home" component={()=><Home />} />
        <Drawer.Screen name="Login" component={()=><Login />} />
        <Drawer.Screen name="Register" component={()=><Register />} />
     </Drawer.Navigator>
   </NavigationContainer>

        )
    }
    
}