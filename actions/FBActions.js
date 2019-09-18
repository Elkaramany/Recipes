import {AsyncStorage} from 'react-native';
import * as Facebook from 'expo-facebook';

export const FBLogin = () =>{
    return async (dispatch) => {
        let token = await AsyncStorage.getItem('fb_token');
        if (token){
            dispatch({type: 'facebook_login_success', payload: token})
        }
        else {
            doFacebookLogin(dispatch);
        }
    }
}

const doFacebookLogin = async (dispatch) => {
    let {type, token} = await Facebook.logInWithReadPermissionsAsync('653922725095723', {
        permissions: ['public_profile']
    });
    if (type === 'cancel'){
        return dispatch({type: 'facebook_login_fail', payload: 'FB Login failed'})
    }
    else{
        await AsyncStorage.setItem('fb_token', token);
        dispatch({type: 'facebook_login_success', payload: token})
    }   
}