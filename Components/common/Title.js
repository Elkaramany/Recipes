import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {AllAdded, fetchData} from '../../actions';
import firebase from 'firebase';
import _ from 'lodash';
import Spinner from './Spinner';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Title extends React.Component{
    constructor(props){
        super(props);
        this.state={
            added: false,
            loaded: false,
            load: false,
        }
    }

    componentWillMount(){
        setTimeout(() =>{
            this.setState({loaded: true})
        }, 1500)
        this.functionFour();
        setTimeout(() =>{
            this.functionFive()
        }, 1500)
    }

    componentDidMount(){
        this.setState({load: true})
    }

    functionFour = () =>{
        this.props.fetchData();
    }

    functionFive = () =>{
        this.props.check.map((one) =>{
            if(one.id === this.props.title.id){
                this.setState({added: true})
            }
        })
    }

    functionsCombined = (recipe) =>{
        if(this.state.loaded){
        if(this.state.added === true){
            const {currentUser} = firebase.auth();
            this.props.check.map((two) =>{
                if(two.id === recipe.id){
                    firebase.database().ref(`/users/${currentUser.uid}/recipes/${two.uid}`).remove();
                    this.setState({added: false})
                }
            })
        }else{
        this.functionOne();
        this.functionTwo(recipe);
        }}else{

        }
    }

    functionOne = () =>{
        this.setState({added: true})
    }

    functionTwo = (recipe) =>{
        const {currentUser} = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/recipes`).push(recipe);
    }

    render(){
    if(this.state.load){
    return(
        <View style={styles.container}>
            <Icon 
            name={'keyboard-backspace'}
            size={30}
            color={'black'}
            onPress={() => this.props.navigation.navigate('Recipes')}
            />
            <Text style={styles.text}>{this.props.title.title}</Text>
            <Icon 
            name={this.state.loaded ? this.state.added ? 'heart' : 'heart-outline' : 'loading'}
            size={40}
            color={'tomato'}
            onPress={() => this.functionsCombined(this.props.title)}
            />
        </View>
    )}else{
        return <Spinner size={'large'} />
    }   
}
}

const mapStateToProps= ({Database}) =>{
    const check = _.map(Database, (val, uid)=>{
        return {...val, uid}
    })
    return {check}
}

export default withNavigation (connect (mapStateToProps, {AllAdded, fetchData}) (Title));

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    text:{
        color: '#309E48',
        fontSize: 35,
    }
})