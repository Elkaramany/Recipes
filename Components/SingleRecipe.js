import React from 'react';
import {View, Text, Image, StyleSheet, TouchableWithoutFeedback, Platform} from 'react-native';
import {Card} from 'react-native-elements';
import {withNavigation} from 'react-navigation';


class SingleRecipe extends React.Component{
    render(){
        const recipe = this.props.item;
        return(
            <View style={{flex:1, backgroundColor: '#DCDCDC'}}>
            <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate('RecipeDetail',{
                item: recipe
            })}
            >
            <Card 
            title={recipe.title}
            titleStyle={styles.title}
            containerStyle={styles.container}
            >
                <View style={{flex: 1}}>
                <View>
                <Image
                    style={{width: '100%', height: 400, borderRadius: 5}}
                    resizeMode={"cover"}
                    source={{ uri: recipe.img }}
                />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                <Text style={styles.name}>Cook time: {recipe.cookTime} mins</Text>
                <Text style={styles.name}>serves: {recipe.servings} people</Text>
                </View>
                </View>
            </Card>
            </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    name:{
        fontSize: 18,
        color: '#309E48'
    },
    container:{
        flex: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderRadius: 5,
    },
    title:{
        fontSize: 40, 
        color: 'tomato',
    }
})

export default withNavigation (SingleRecipe);