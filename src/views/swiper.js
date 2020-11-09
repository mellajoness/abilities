import React, { Component } from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity,StatusBar} from 'react-native'
import Swiper from 'react-native-swiper'
import { GET_COOP_ID,} from '../shared/storage'
import {COLORS} from '../shared/colors';
export default class SwiperScreen extends Component {

 async componentDidMount() {
  //  this.navUser().done();   
  }  

navUser=async ()=>{
  let coopID=await GET_COOP_ID()
  console.log('swiper COOP ID',coopID)
  if(coopID ===''){
    this.props.navigation.navigate('Password');
  }
  else{
    this.props.navigation.navigate('Swiper');
  }
}





  render() {
    return (    
        <View style={{flex:1,alignItems:'center'}}>
         <StatusBar backgroundColor={COLORS.STATUS_BAR_COLOR}  barStyle="light-content" />  
        <Swiper style={styles.wrapper} showsButtons={false} 
          //  bounces={true}
           autoplay={true}
           autoplayTimeout={7}
           activeDot={<View style={{backgroundColor:COLORS.STATUS_BAR_COLOR, width: 10, height: 10, borderRadius: 5, marginLeft: 5, marginRight:5}} />}>

        <View style={styles.slide1}>

      
          <Image  
          style={{ resizeMode: 'contain',   
          height: 150}}
          source={require('../assets/winners_one.png')}
          />  
          <Text style={styles.text}>Your Fast App</Text>
          <Text style={{color:COLORS.STATUS_BAR_COLOR,fontSize:15,paddingTop:20,textAlign:'center'}}>We can take you to yout nearest goal within the shortest possible time</Text>
          <TouchableOpacity onPress= {() => this.props.navigation.navigate('SignIn')} style={{height:50, width:100,borderRadius:3,borderWidth:1,borderColor:'#851616',justifyContent:'center',width:'100%',alignItems:'center',marginTop:70}}>
              <Text style={{fontSize:18,color:COLORS.PRIMARY_COLOR}}>Get Started</Text>
          </TouchableOpacity> 
        </View>


  <View style={styles.slide1}> 
          <Image  
          style={{ resizeMode: 'contain',
          height: 150}}
          source={require('../assets/winner_two.png')}
          />  
        <Text style={styles.text}>Get To Clients</Text>
          <Text style={{color:COLORS.PRIMARY_COLOR,fontSize:15,paddingTop:20,textAlign:'center'}}>From the comfort of your home ,do what you want on the go</Text>
          <TouchableOpacity onPress= {() => this.props.navigation.navigate('SignIn')} style={{height:50, width:100,borderRadius:3,borderWidth:1,borderColor:'#851616',justifyContent:'center',width:'100%',alignItems:'center',marginTop:70}}>
              <Text style={{fontSize:18,color:COLORS.PRIMARY_COLOR}}>Get Started</Text>
          </TouchableOpacity> 
        </View> 


        <View style={styles.slide1}> 
           <Image   
          style={{ resizeMode: 'contain',
          height: 150}}
          source={require('../assets/winner_three.png')}
          />  
          <Text style={styles.text}>One Click Away</Text>
          <Text style={{color:COLORS.PRIMARY_COLOR,fontSize:15,paddingTop:20,textAlign:'center'}}>We deliver services to you,sure place to trust for your business </Text>
          <TouchableOpacity onPress= {() => this.props.navigation.navigate('SignIn')} style={{height:50, width:100,borderRadius:3,borderWidth:1,borderColor:'#851616',justifyContent:'center',width:'100%',alignItems:'center',marginTop:70}}>
              <Text style={{fontSize:18,color:COLORS.PRIMARY_COLOR}}>Get Started</Text>
          </TouchableOpacity> 
        </View> 
        
      </Swiper>
      </View>  
    )  
    
  }
}

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
      flex: 1,
      // paddingTop:50,
      paddingHorizontal:40, 
      alignItems: 'center',
      alignContent:'center',
      backgroundColor: 'white',
      justifyContent:'center',

    },
   
    text: {
      color: '#851616',
      fontSize:25,
      fontWeight: 'bold',
      paddingTop:40
    }
  })
  

