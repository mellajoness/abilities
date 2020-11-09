import React, {Component} from 'react';
import 'react-native-gesture-handler'
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SwiperScreen from './views/swiper'
import SignInScreen from './views/signin'
import OtpScreen from './views/otp';
import PasswordScreen from './views/password'
import RegisterScreen from './views/register'
import SuccessRegisterScreen from './views/successregister'
import DrawerRoute from "./drawerroute";
import DashboardScreen from './views/dashboard'
import ProfileScreen from './views/profile'
const LandingRoute = createStackNavigator({
     Swiper: SwiperScreen,
     SignIn: SignInScreen,
     Otp:OtpScreen,
     Password:PasswordScreen,
     Register:RegisterScreen,
     SuccessRegister:SuccessRegisterScreen,
     Dashboard:DashboardScreen,
     Profile:ProfileScreen ,             


}, {    
    initialRouteName:'Swiper', 
    headerMode: 'none'
});


const MainRoute = createSwitchNavigator({
    LandingRoute: LandingRoute,
    Drawer: DrawerRoute,
   
}, {
    initialRouteName: 'LandingRoute'
});

   
export default  createAppContainer(MainRoute);