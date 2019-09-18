import React from 'react';
import {View, Text, StyleSheet, Image, FlatList, ScrollView, Dimensions, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {fetchData} from '../actions';
import _ from 'lodash';
import Header from './common/Header';
import Spinner from './common/Spinner';
import {Card} from 'react-native-elements';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

class Added extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loaded: false
        }
    }

    componentWillMount(){
        this.props.fetchData();
    }

    componentDidMount(){
        setTimeout(() =>{
            this.setState({loaded: true})
        }, 1500);
    }

    static navigationOptions = {
        header: null,
        tabBarIcon:({tintColor}) =>{
            return <Icon name={'heart-multiple'} size={30} color={tintColor} />
        },
    }

    renderItem = ({item}) =>{
        return(
            <View style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('RecipeDetail', {
                item
            })}>
            <Card title={item.title}
            containerStyle={styles.containerCard}
            titleStyle={{fontSize: 40, color: 'tomato'}}
            >
                <View style={{flex: 1}}>
                <View>
                <Image
                    style={{width: '100%', height: 400, borderRadius: 5}}
                    resizeMode={"cover"}
                    source={{ uri: item.img }}
                />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                <Text style={styles.name}>Cook time: {item.cookTime} mins</Text>
                <Text style={styles.name}>serves: {item.servings} people</Text>
                </View>
                </View>
            </Card>
            </TouchableWithoutFeedback>
            </View>
        )
    }

    render(){
        if(this.state.loaded){
        return (
            <ScrollView style={{backgroundColor: '#DCDCDC', flex: 1}}>
            <View style={{flex: 1}}>
            <View>
            <FlatList
            ListHeaderComponent={<Header HeaderText={'Saved'} style={{color: '#0080ff'}}/>}
            data={this.props.data.reverse()}
            renderItem={({item}) => this.renderItem({item})}
            keyExtractor={recipe => recipe.id}
            />
            </View>
            <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Recipes')}>
                <View>
                <Text style={styles.textEnd}>Press here to view more recipes</Text>
                </View>
            </TouchableOpacity>
            </View>
            </View>
            </ScrollView>
        )}
        else{
            return <Spinner size={'large'} />
        }
    }
}

const styles = StyleSheet.create({
    textEnd:{
        color: 'tomato',
        fontSize: 35,
        margin: 15,
        justifyContent: 'center',
        textAlign: 'center'
    },innerContainer:{
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'flex-start', 
        backgroundColor: '#FFF', 
        margin: 12
    },name:{
        fontSize: 24,
        color: '#309E48'
    },
    containerCard:{
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
    }
})

const mapStateToProps = ({Database}) =>{
    const data = _.map(Database, (val, uid) =>{
        return {...val, uid}
    })
    return {data}
}

export default connect (mapStateToProps, {fetchData}) (Added);