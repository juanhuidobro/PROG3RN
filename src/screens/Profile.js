import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Profile(props){
    return(
        <View style={styles.container}>
            <Text>Perfil del usuario</Text>
            
            <Text>{props.user}</Text>

            <TouchableOpacity  style={styles.boton}
                onPress={() => props.signOut()}
            >
                <Text>Cerrar sesión</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    }
})