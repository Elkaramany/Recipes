import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';

import Title from './common/Title'

class RecipeDetail extends React.Component{
    constructor(props){
        super(props);
    }

    mapIngredients = (recipe) =>{
        return recipe.ingredients.map((one)=> {
            return( 
            <Card key={one.id}>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                <Text style={styles.ingredientStyle}>{one.ing}</Text>
            </View>
            </Card>
            )
        })
    }

    mapDirections = (recipe) =>{
        return recipe.directions.map((one)=> {
            return(
            <Card key={one.id}>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                <Text style={[styles.ingredientStyle, {color: 'tomato'}]}>{one.dir}</Text>
            </View>
            </Card> 
            )
        })
    }

    render(){
        const recipe = this.props.navigation.state.params.item;
        return(
            <ScrollView style={{backgroundColor: '#DCDCDC'}}>
            <Card title={<Title title={recipe} />}
            containerStyle={styles.ingredientsContainer}
            >
                <View>
                <View>
                <Image
                    style={{width: '100%', height: 400, borderRadius: 5}}
                    resizeMode={"cover"}
                    source={{ uri: recipe.img }}
                />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                <Text style={styles.name}>Total cook time: {recipe.cookTime} mins</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('StepMode', {
                    recipe
                })}>
                    <Text style={[styles.name, {color: 'tomato'}]}>
                        Step by Step mode
                    </Text>
                </TouchableOpacity>
                </View>
                </View>
                </Card>
                <Card>
                <Text style={{fontSize: 23, marginTop: 10}}>Ingredients for {recipe.servings} people:</Text>
                </Card>
                {this.mapIngredients(recipe)}
                <Card>
                <Text style={{fontSize: 23, marginTop: 10}}>Preparation: </Text>
                </Card>
                {this.mapDirections(recipe)}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    ingredientsContainer:{
        flex: 1,
    },
    ingredientStyle:{
        fontSize: 20,
        color: '#309E48'
    },
    name:{
        fontSize: 23,
        color: '#309E48',
        margin: 10
    },
})


export default RecipeDetail;