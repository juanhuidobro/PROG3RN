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