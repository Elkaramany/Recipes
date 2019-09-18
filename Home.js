import React from 'react';
import {Text, View, StyleSheet, ImageBackground, TouchableOpacity, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {SocialIcon} from 'react-native-elements';
import { Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {FBLogin, Credential, TryLogin} from './actions';
import Recipes from './Components/Recipes';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            FB: null
        }
    }

    showErrorMessage(){
        if(this.props.errorMessage){
            return( 
            <View>
                <Text style={{color: '#309E48', fontSize: 18, fontWeight: '400'}}>
                    {this.props.errorMessage}
                </Text>
            </View>
            )
        }
    }

    async componentWillMount(){
        let token = await AsyncStorage.getItem('fb_token')
        if(token){
            this.setState({FB: token})
        }
    }
   
    render(){
        const {Credential, email, password, TryLogin, user} = this.props;
        if(user || this.state.FB){
            return this.props.navigation.navigate('Recipes')
        }
        else{
        return(
           <View>
           <ImageBackground 
           style={{width: '100%', height: '100%'}}
           imageStyle={{resizeMode: 'cover'}}
           source={{uri: 'https://wallpapershome.com/images/pages/ico_v/15925.jpg'}}
           >
           <View style={styles.container}>
               <View style={{justifyContent: 'flex-start'}}>
               <Input
                placeholder='Email'
                leftIcon={<Icon name={'email'} size={50} color={'#309E48'}/>}
                onChangeText={(text) => Credential({prop: 'email', value: text})}
                value={email}
                inputContainerStyle={styles.textInputContainer}
                inputStyle={styles.textInputStyle}
                placeholderTextColor={'#309E48'}
                />
                <Input
                placeholder='Password'
                leftIcon={<Icon name={'lock'} size={50} color={'#309E48'}/>}
                onChangeText={(text) => Credential({prop: 'password', value: text})}
                value={password}
                secureTextEntry
                inputStyle={styles.textInputStyle}
                inputContainerStyle={styles.textInputContainer}
                placeholderTextColor={'#309E48'}
                />
                <Button
                style={{flex: 1}}
                    icon={
                        <Icon
                        name={'login'}
                        size={50}
                        color={"#309E48"}
                        />
                    }
                    title={'Login'}
                    titleStyle={{color: '#309E48'}}
                    buttonStyle={{backgroundColor: 'transparent'}}
                    onPress={() => TryLogin({email, password})}
                />
               </View>
               <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textInputStyle}>Don't have an account? </Text>
                    <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SignUp')}
                    >
                    <Text style={[styles.textInputStyle, {color: '#3f2a14', fontSize: 20, fontWeight: '300'}]}>Sign Up
                    </Text>
                    </TouchableOpacity>
                </View>
               <View>
               <SocialIcon
                title='Log in With Facebook'
                button
                type='facebook'
                style={{padding: 10}}
                onPress={() => this.props.FBLogin()}
                />
                </View>
                {this.showErrorMessage()}
           </View>
           </ImageBackground>
           </View>
       )}
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputStyle:{
        fontSize: 18,
        color: '#309E48',
        height: 50,
    },
    textInputContainer:{
        marginBottom: 10,
        width: '100%'
    },
})

const mapStateToProps= ({ AuthReducer}) =>{
    return{
        user: AuthReducer.user,
        email: AuthReducer.email,
        password: AuthReducer.password,
        errorMessage: AuthReducer.errorMessage
    }
}

export default connect(mapStateToProps, {FBLogin, Credential, TryLogin}) (Home);