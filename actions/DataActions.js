import firebase from 'firebase';

export const receiveData = (data) =>{
    return{
        type: 'receive_data',
        payload: data
    }
}

export const fetchData = () => {
    return (dispatch)=>{
        const {currentUser} = firebase.auth(); 
        firebase.database().ref(`/users/${currentUser.uid}/recipes`)
        .on('value', snapshot =>{
            dispatch({type: 'fetch_data_success', payload: snapshot.val()})
        })
    }
}