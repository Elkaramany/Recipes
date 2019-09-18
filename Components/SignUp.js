import React from 'react';
import {View, Text, StyleSheet, ImageBackground, KeyboardAvoidingView} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Header from './common/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createAccount, Credential} from '../actions';
import {connect} from 'react-redux';
import isEmail from 'validator/lib/isEmail';

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            missMatch: '',
            InvalidEmail: '',
            InvalidPassword: '',
        }
    }

    functionsCombined = () =>{
        const {email, password, createAccount, confirm} = this.props 
        if(confirm !== password){
            this.setState({missMatch: 'Passwords do not match'})
        }
        else if(this.state.InvalidEmail === 'Incorrect email'){
            this.setState({missMatch: 'The email entered is incorrect'})
        }
        else if(this.state.InvalidPassword === 'Incorrect password'){
            this.setState({missMatch: 'Password must be 7 to 14 characters which contain only characters, numeric digits, underscore and the first character must be a letter'})
        }
        else{
            this.functionOne({email, password, createAccount});
            this.functionTwo();
        }
    }

    functionOne = ({email, password, createAccount}) =>{
        createAccount({email, password})
    }

    functionTwo(){
        this.props.navigation.navigate('Home');
    }

    validateEmail = (text) =>{
        if(isEmail(text) === false){
        this.setState({InvalidEmail:'Incorrect email'});
        this.props.Credential({prop: 'email', value: text})
        }
        else {
            this.setState({InvalidEmail: 'Valid email'})
            this.props.Credential({prop: 'email', value: text})
        }
    }

    validatePassword = (text) =>{
        const formula=  /^[A-Za-z]\w{7,14}$/;
        if(!text.match(formula)){
            this.setState({InvalidPassword: 'Incorrect password'})
            this.props.Credential({prop: 'password', value: text})
        }else{
            this.setState({InvalidPassword: 'Valid password'})
            this.props.Credential({prop: 'password', value: text})
        }
    }

    showMissMatch = () =>{
        if(this.state.missMatch){
            return <Text>Passwords do not match!</Text>
        }
    }


    render(){
        const {email, password, Credential, confirm} = this.props 
        return(
            <ImageBackground
            style={{flex: 1}}
            imageStyle={{resizeMode: 'cover'}}
            source={{uri: 'https://www.tokkoro.com/picsup/1085567-banana.jpg'}}>
            <KeyboardAvoidingView style={styles.container}>
                <Header HeaderText={'Sign Up'} />
                <View style={styles.fieldContainer}>
                <Input
                placeholder='Email'
                leftIcon={<Icon name={'email'} size={50} color={'#309E48'}/>}
                inputContainerStyle={styles.textInputContainer}
                inputStyle={styles.textInputStyle}
                onChangeText={(text) => this.validateEmail(text)}
                value={email}
                placeholderTextColor={'#309E48'}
                />
                <Input
                placeholder='password'
                leftIcon={<Icon name={'lock'} size={50} color={'#309E48'}/>}
                secureTextEntry
                inputStyle={styles.textInputStyle}
                inputContainerStyle={styles.textInputContainer}
                onChangeText={(text) => this.validatePassword(text)}
                value={password}
                placeholderTextColor={'#309E48'}
                />
                <Input
                placeholder='confirm password'
                leftIcon={<Icon name={'lock'} size={50} color={'#309E48'}/>}
                secureTextEntry
                inputStyle={styles.textInputStyle}
                inputContainerStyle={styles.textInputContainer}
                value={confirm}
                onChangeText={(text) => Credential({prop: 'confirm', value: text})}
                placeholderTextColor={'#309E48'}
                />
                <Button
                    icon={
                        <Icon
                        name={'account-plus'}
                        size={50}
                        color={"#309E48"}
                        />
                    }
                    title={'Sign Up'}
                    titleStyle={{color: '#309E48'}}
                    buttonStyle={styles.Login}
                    onPress={() => this.functionsCombined()}
                />
                <Text style={[styles.Login, {color: '#309E48'}]}>{this.state.missMatch}</Text>
            </View>
            {this.showMissMatch()}
            </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent'
    },
    fieldContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputStyle:{
        fontSize: 16,
        color: '#309E48',
        height: 50
    },
    textInputContainer:{
        marginBottom: 10
    },
    Login:{
        backgroundColor: 'transparent',
    },
})

const mapStateToProps = ({AuthReducer}) =>{
    return{
        email: AuthReducer.email,
        password: AuthReducer.password,
        createError: AuthReducer.createError,
        user: AuthReducer.user,
        confirm: AuthReducer.confirm
    }
} 

export default connect(mapStateToProps, {createAccount, Credential})(SignUp);