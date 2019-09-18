export default (state={}, action)=> {
    if(action.type === 'facebook_login_success'){
        return {token: action.payload}
    }else if(action.type === 'facebook_login_fail'){
        return {errorFBMessage: action.payload}
    }return state
}