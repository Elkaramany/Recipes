import firebase from 'firebase';

export const Credential = ({prop, value}) =>{
    return{
        type: 'Credential_In',
        payload: {prop,value}
    }
}
export const TryLogin = ({email, password}) =>{
return(dispatch)=>{
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user)=>{
        dispatch({type: 'login_success', payload: user})
    }).catch(()=>{
        dispatch({type: 'login_failed'})
    })
}
}

export const createAccount = ({email, password}) =>{
    return(dispatch)=>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{
            dispatch({type: 'create_account_success'})
        }).catch(()=>{
            dispatch({type: 'create_account_fail'})
        })
    }
}