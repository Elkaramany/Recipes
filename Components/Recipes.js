import React from 'react';
import { ScrollView, FlatList, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {AllCategories, fetchData} from '../actions';
import SingleRecipe from './SingleRecipe';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Categories from './Categories';
import Spinner from './common/Spinner';

class Recipes extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data: [],
            search: '',
            load: false,
        }
    }

    static navigationOptions = {
        header: null,
        tabBarIcon:({tintColor}) =>{
            return <Icon name={'food'} size={30} color={tintColor} />
        },
    }

    componentWillMount(){
        this.props.DataReducer.map((category)=> {
            this.props.AllCategories(category);
        });
    }

    componentDidMount(){
        setTimeout(() =>{
            this.setState({load: true})
        }, 500)
    }
    
    renderItem = ({item}) =>{
        return (<View style={{flex: 1}}><SingleRecipe item={item} key={item.id}/></View>)
    }

    functionsCombined = (text) =>{
        const newData = this.props.DataReducer.filter(item => {      
        const itemData = `${item.title.toLowerCase()}`;
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;    
        });
        this.setState({ data: newData, search: text });
        if(text === ''){
            this.setState({data: [], search: ''})
        }
    }

    showSearched = () =>{
        if(this.state.data.length > 0){
            return(
            <FlatList 
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={recipe => recipe.id}
            />
            )
        }
        else{
            if(this.state.search === ''){
            return (
            <ScrollView>
                <Categories />
            </ScrollView>
            )}else{
                return(
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 25}}>No items match you search</Text>
                        <ScrollView>
                            <Categories />
                        </ScrollView>
                    </View>
                )
            }
        }
    }

    render(){
        if(this.state.load){
        return(
        <View style={{flex: 1}}>
            <SearchBar
            lightTheme round
            placeholder={'What are you looking for?'}
            onChangeText={(text) => this.functionsCombined(text)}
            onClear={() => this.setState({data: []})}
            value={this.state.search}
            containerStyle={{backgroundColor: '#DCDCDC'}}
            autoCorrect={false}
            autoCapitalize={'none'}
            />
            {this.showSearched()}
        </View>
        )}else{
            return <Spinner size={'large'} />
        }
    }
}

const mapStateToProps = ({DataReducer}) =>{
    return {DataReducer}
}

export default connect(mapStateToProps, {AllCategories, fetchData}) (Recipes);