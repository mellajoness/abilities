import React, {Component} from 'react';
import 'react-native-gesture-handler'
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerView } from 'react-navigation-drawer'
import DashboardScreen from './views/dashboard'
import DrawerComponent from "./shared/drawer";

const DashboardRoute = createStackNavigator({
     Dashboard:DashboardScreen,                
}, {    
    initialRouteName:'Dashboard', 
    headerMode: 'none'
});


const DrawerRoute = createDrawerNavigator({
    Dashboard: DashboardRoute,  
  },
  {
    initialRouteName: 'Dashboard',
    contentComponent: DrawerComponent,
    navigationOptions: {
        gestureDirection: 'inverted'
    }}
  );
   
export default createAppContainer(DrawerRoute);