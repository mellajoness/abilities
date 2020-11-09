import React, {Component} from 'react';
import {View, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView,Text} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import Entypo from 'react-native-vector-icons/dist/Entypo';
export default class Drawer extends Component {
    _navigate(pageName) { 
        this.props.navigation.navigate(pageName);
        this.props.navigation.closeDrawer();
    }
    render() {

        return (
            <LinearGradient colors={[ '#F51F1F', '#851616']} style={{flex:1}} >
                <ScrollView>
                   <View style={{alignItems:'center',paddingHorizontal:20,paddingTop:50}}>
                     <Image source={require('../assets/image.png')} style={{width:90, height:90,borderRadius:90}} />
                    </View>
                </ScrollView>

                <LinearGradient   colors={['#F51F1F', '#851616']} >
                <TouchableOpacity  onPress={() => this.props.navigation.navigate('Swiper')}>
                  <View style={{ paddingHorizontal:20,justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:50 }}>
                     <Text style={{color:'white',fontSize:16}}>LOG OUT</Text>
                     <Entypo name='log-out' size={22} color='white' style={{}}/> 
                  </View>
                  </TouchableOpacity>
                </LinearGradient>
            </LinearGradient>
        )
}}