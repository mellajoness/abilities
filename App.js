/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler'
import React from 'react';
import { StatusBar, View, SafeAreaView, Platform,BackHandler, Alert  } from 'react-native';
import { DARK_PRIMARY_COLOR, PRIMARY_COLOR } from './src/shared/colors';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Page from './src/routes.js';

// import OneSignal from "react-native-onesignal";
// import {NetworkProvider} from "./src/components/General/NetworkProvider";
// import {applyMiddleware, createStore} from "redux";
// import Thunk from 'redux-thunk';
// import {Provider} from 'react-redux';

// import reducers from './src/store/reducers';

const theme = {
    ...DefaultTheme,  
    colors: {
        ...DefaultTheme.colors,
        primary: PRIMARY_COLOR
    }
};

// const store = createStore(reducers, {}, applyMiddleware(Thunk));

export default class App extends React.Component {

    constructor(properties) {
        super(properties);
        // OneSignal.init("21ece760-341b-454b-9242-f4375ab58b1c");
        // OneSignal.addEventListener('received', this.onReceived);
    }

    backAction = () => {
        Alert.alert("Alert!", "Are you sure you want to exit the app", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };



    statusBarIOS() {
        if (Platform.OS === 'ios') {
            return <View style={{ backgroundColor: PRIMARY_COLOR, height: 22 }} />
        }

        return null
    }



    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          this.backAction
        );
      }
    
      componentWillUnmount() {
        this.backHandler.remove();
      }

    //   session = async () =>{
    //       let x=await GET_PHONE()
    //       if(x===''){
    //       return <SignInScreen />
    //       }
    //       else{
    //         return <Page /> 
    //       }
    //   }

    render() {
        return (
            // <Provider store={store}>
                // <PaperProvider theme={theme}>
                    <View style={{ flex: 1 }}>
                        {this.statusBarIOS()}

                        <SafeAreaView style={{ flex: 1 }}>
                            <StatusBar backgroundColor='green' barStyle={'light-content'} />
                            {/* <NetworkProvider> */}
                                   <Page />   
                                 
                            {/* </NetworkProvider> */}
                             {/* {this.session()}  */}
                        </SafeAreaView>
                    </View>
                // {/* </PaperProvider> */}
            // </Provider>
        );
    }
}

console.disableYellowBox = true;