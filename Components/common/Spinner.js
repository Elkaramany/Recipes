import React from 'react';
import {View, ActivityIndicator} from 'react-native';

function Spinner ({size}){
    return(
        <View
        style={{flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        }}
        >
            <ActivityIndicator
            size={size}
            />
        </View>
    );
}

export default Spinner