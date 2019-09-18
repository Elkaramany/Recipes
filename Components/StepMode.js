import React from 'react';
import {View, Text, StyleSheet, ScrollView, 
    Dimensions, TouchableOpacity, PanResponder,
    Animated, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class StepMode extends React.Component{
    constructor(props){
        super(props);
    }

    showSteps = (recipe) =>{
        return recipe.directions.map((val, index) =>{
            return(
                <ScrollView style={{flex: 1}}>
                <View style={{width: WIDTH}}>
                    <Text style={{color: '#309E48', fontSize: 25, margin: 15}}>step {index + 1} of {recipe.directions.length}</Text>
                    <Text style={styles.name}>{val.dir}</Text>
                    {this.lastSlide(recipe, index)}
                </View>
                </ScrollView>
            )
        })
    }

    lastSlide = (recipe, index) =>{
        if(recipe.directions.length === index + 1 ){
            return <Text style={[styles.name, {color: '#309E48'}]}>And of course ENJOY!!</Text>
        }
    }


    render(){
        const recipe = this.props.navigation.state.params.recipe;
        return(
            <View style={{flex: 1, backgroundColor: '#DCDCDC'}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Icon 
            name={'keyboard-backspace'}
            size={50}
            color={'black'}
            onPress={() => this.props.navigation.goBack()}
            />
            <Text style={[styles.name, {color: '#004c4c', fontSize: 30}]}>View ingredients</Text>
            </View>
            <View style={{flex: 15}}>
            <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
            horizontal
            pagingEnabled
            >
            {this.showSteps(recipe)}
            </ScrollView>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    name:{
        fontSize: 45,
        color: 'tomato',
        margin: 10
    },
})

export default StepMode;