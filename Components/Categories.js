import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableWithoutFeedback, Platform} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import * as Font from 'expo-font';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width

class Categories extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loaded: false
        }
    }

    async componentDidMount(){
        await Font.loadAsync({
            'Pacifico-Regular': require('../assets/fonts/Pacifico-Regular.ttf')
        });
        this.setState({loaded: true})
    }

    render(){
        return this.props.CategoryReducer.map((cat) =>{
            return(
                <View key={cat.id} style={styles.container}>
                    <Text style={[styles.catStyle, {fontFamily: this.state.loaded ? 'Pacifico-Regular' : Platform.OS === 'android' ? 'Roboto' : 'San-Francisco'}]}>
                        {cat.category}
                    </Text>
                    <ScrollView
                    horizontal
                    style={{flex: 1, width: '100%'}}
                    >
                        {this.props.DataReducer.map((recipe)=>{
                            if(recipe.category === cat.category){
                                return(
                                    <TouchableWithoutFeedback
                                    key={recipe.id}
                                    onPress={() => this.props.navigation.navigate('RecipeDetail',{
                                        item: recipe
                                    })}
                                    >
                                    <View style={{flex: 1, margin: 10}}>
                                    <Text style={styles.catTitle}>
                                        {recipe.title}
                                    </Text>
                                    <Image 
                                    source={{uri: recipe.img}}
                                    style={{width: 400, height: 270, borderRadius: 5}}
                                    />
                                    </View>
                                    </TouchableWithoutFeedback>
                                )
                            }
                        }) }
                    </ScrollView>
                </View>
            )
        })
    }
}

const styles = StyleSheet.create({
    container:{
        height: HEIGHT / 3,
        backgroundColor: '#DCDCDC',
        borderBottomColor: '#778899',
        borderBottomWidth: 3,
    },
    catStyle:{
        marginLeft: 15,
        fontSize: 40,
        color: '#309E48',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    catTitle:{
        fontSize: 28,
        color: 'tomato',
        alignSelf: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = ({CategoryReducer, DataReducer}) =>{
    return {CategoryReducer, DataReducer}
}

export default withNavigation (connect (mapStateToProps)(Categories));