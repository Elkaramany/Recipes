const INITIAL_STATE={
    email: '',
    password: '',
    user: null,
    errorMessage: '',
}

export default (state={INITIAL_STATE}, action)=>{
    if(action.type === 'Credential_In'){
        return{...state, [action.payload.prop] : action.payload.value}
    }else if (action.type === 'login_success'){
        return {...state, ...INITIAL_STATE, user: action.payload}
    }else if(action.type === 'login_failed'){
        return{...state, ...INITIAL_STATE, errorMessage: 'Email or password is incorrect'}
    }else if(action.type === 'create_account_success'){
        return {...state, ...INITIAL_STATE, errorMessage: 'Account created successfully, Please log in'}
    }else if (action.type === 'create_account_fail'){
        return {...state, ...INITIAL_STATE, errorMessage: 'Failed to create account with those credentials'}
    }
    return state
}