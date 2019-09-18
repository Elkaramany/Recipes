import React from 'react';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import {Provider} from 'react-redux';
import Home from './Home';
import Constants from 'expo-constants';
import {createStore, compose, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import reducers from './reducers';
import {PersistGate} from 'redux-persist/lib/integration/react';
import firebase from 'firebase';

import Recipes from './Components/Recipes';
import SignUp from './Components/SignUp';
import RecipeDetail from './Components/RecipeDetail';
import Categories from './Components/Categories';
import Added from './Components/Added';
import StepMode from './Components/StepMode';

const RootTab = createBottomTabNavigator({
  Recipes: {screen: Recipes},
  Saved: {screen: Added}
},
{
tabBarOptions: {
  labelStyle: { fontSize: 18, marginTop: 5},
  tabStyle: {marginTop: 10}
},
});

const RootStack = createStackNavigator({
  Home: {screen: Home},
  SignUp: {screen: SignUp},
  RecipeDetail: {screen: RecipeDetail},
  Categories: {screen: Categories},
  StepMode: {screen: StepMode},
  RootTab: {screen: RootTab}
},
{
  defaultNavigationOptions:{
    header: null
  }
},
{ 
  initialRouteName: 'Home',
});

const AppContainer = createAppContainer(RootStack);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['AuthReducer']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, {},
  compose(
      applyMiddleware(ReduxThunk)) 
  );

export default class App extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    if(!firebase.apps.length){
      firebase.initializeApp({
        //firebase Creds
    }
  }

  render(){
  const persistor = persistStore(store);
  persistor.purge()
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </View>
    </Provider>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight
  },
});