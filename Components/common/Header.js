import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import firebase from 'firebase';

const WIDTH = Dimensions.get('window').width;

function Header (props){
    const {currentUser} = firebase.auth();
    return(
        <View style={styles.HeaderContainer}>
            <Text style={[styles.TextStyle, props.style]}>
                {props.HeaderText}
            </Text>
            <Text
            onPress={() => firebase.database().ref(`/users/${currentUser.uid}/recipes`).remove()} 
            style={[styles.TextStyle, {marginLeft: 0, marginRight: WIDTH * 0.04, color: 'tomato'}]}>
                Clear All
            </Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    HeaderContainer:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
    },
    TextStyle:{
        marginLeft: WIDTH * 0.1,
        fontSize: 45,
        color: '#309E48',
        fontWeight: '300',
    }
})