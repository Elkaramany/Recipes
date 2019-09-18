import _ from 'lodash';

export default (state=[], action)=>{
    if(action.type === 'cat'){
        return _.uniqBy([
            ...state, action.payload
        ], 'category')
    }return state
}