import React, { Component } from "react";
import { Text, View,StatusBar ,TouchableOpacity,Image,Dimensions} from "react-native";
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Evillcons from 'react-native-vector-icons/dist/EvilIcons';
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native";
import {GET_SERVICE, POST_SERVICE} from "../shared/backend";
import AntDesign from "react-native-vector-icons/dist/AntDesign";
import { openDrawer } from 'react-navigation';
const NumberFormat = require('react-number-format');
export default class DashboardScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      dasboardData: [],
      phonemail:'',  
      loading: false,
      userData:''
    }
  }

  async componentDidMount(){
    this.state.phonemail= this.props.navigation.getParam('phonemail').phonemail
    console.log(' phone mail compdid mount',this.state.phonemail)
    await this.getUserData()
   
  }  

  async getUserData () {
      const endpoint = `/api/v1/Cooperators/Auth-Getsession?Identifier=${this.state.phonemail}`;
      console.log('endpoint',endpoint)
      try {
          const response = await GET_SERVICE(endpoint);
          console.log('userprof', response);

          if(response.status===200)
          {
            this.setState({userData: response.data})   
          }
          else
          {
              InteractionManager.runAfterInteractions(() => {
                  setTimeout(() => {
                      Alert.alert('Failed', response.data.message);
                  });
              });
          }
      } catch (e) {
          return e.response;
      }
  };



  render() {
    console.log('MY PROPS',this.props);
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
          <StatusBar backgroundColor="#480909" barStyle="light-content" />
          <View style={{height:250,backgroundColor:'#851616',borderBottomLeftRadius:35,borderBottomRightRadius:35 }}>
           <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,paddingTop:20,alignItems:'center'}} >
           <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}> 
             <Entypo name='menu' size={35} color='white' style={{}}/> 
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()} >
            <Image style={{height:40,width:40,borderRadius:40}}
                source={require('../assets/image.png')}
              /> 
            </TouchableOpacity>
            </View>

            <View style={{paddingHorizontal:20,justifyContent:'center',alignItems:'center',paddingTop:20}}>
               <Text style={{color:'white',fontSize:20}}>Current Balance</Text>
               <NumberFormat renderText={text => <Text style={{color:'#FFBC47',fontFamily:'Gilroy-Medium',fontSize:20,lineHeight:17,paddingTop:20}}>{text}</Text>} value='30000' displayType={'text'} thousandSeparator={true} prefix={'₦'} /> 


               <View style={{flexDirection:'row',marginBottom:10,marginRight:20,marginLeft:20,marginTop:20}}>
               <View style={{height:60,width:130,backgroundColor:'#853434',borderRadius:10,marginTop:0,paddingHorizontal:10,marginBottom:15,marginRight:20}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={{color:'white',paddingTop:2,fontSize:13}}>Inflow</Text>
                 <Evillcons name='arrow-down' size={22} color='#FFBC47' style={{paddingTop:5}}/> 
                </View>
                <NumberFormat renderText={text => <Text style={{color:'#FFBC47',fontFamily:'Gilroy-Medium',fontSize:15,lineHeight:17,paddingTop:10}}>{text}</Text>} value='30000' displayType={'text'} thousandSeparator={true} prefix={'₦'} /> 
               </View>     

               <View style={{height:60,width:130,backgroundColor:'#853434',borderRadius:10,marginTop:0,paddingHorizontal:10,marginBottom:15,marginRight:20}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={{color:'white',paddingTop:2,fontSize:13}}>Outflow</Text>
                 <Evillcons name='arrow-up' size={22} color='#FFBC47' style={{paddingTop:5}}/> 
                </View>
                <NumberFormat renderText={text => <Text style={{color:'#FFBC47',fontFamily:'Gilroy-Medium',fontSize:15,lineHeight:17,paddingTop:10}}>{text}</Text>} value='9000' displayType={'text'} thousandSeparator={true} prefix={'₦'} /> 
               </View>   
            </View>

            </View>
          </View>

         <ScrollView style={{marginTop:20}}>
          <LinearGradient colors={['#FFFFFF', '#E4E4E4','#E4E4E4', '#FFFFFF', '#FFFFFF']} style={{backgroundColor:'#851616',display:'flex',height:500}}>


          <TouchableOpacity style={{height:100,paddingHorizontal:20,backgroundColor:'white',marginHorizontal:20,borderRadius:15,justifyContent:'center'}}>
        
          <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
           <View style={{flexDirection:'row'}}>
           <View style={{justifyContent:'center',height:50,width:60,backgroundColor:'#EDB8B8',alignItems:'center',borderRadius:10}}>
           <Entypo name='wallet' size={25} color='#851616' style={{}}/> 
           </View>

           <View style={{paddingLeft:10}}>
              <Text style={{fontSize:17}}>Loan Module</Text>
              <Text style={{color:'#8B8B8B',fontSize:11,paddingTop:9}}>12,sept,2020</Text>
           </View>
          </View>         

           <NumberFormat renderText={text => <Text style={{color:'#3F3F3F',fontSize:15,lineHeight:17,paddingTop:10}}>{text}</Text>} value='9000' displayType={'text'} thousandSeparator={true} prefix={'- ₦'} /> 
             </View>
          </TouchableOpacity>

          

          <TouchableOpacity style={{height:100,paddingHorizontal:20,marginHorizontal:20,marginTop:20,borderRadius:15,borderWidth:1,borderColor:'#D7D7D7',backgroundColor:'#D7D7D7',justifyContent:'center'}}>
          <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
           <View style={{flexDirection:'row'}}>
          <View style={{justifyContent:'center',height:50,width:60,backgroundColor:'#C2C5BE',alignItems:'center',borderRadius:10}}>
           <AntDesign name='bank' size={25} color='#4B7A00' style={{}}/> 
           </View>

           <View style={{paddingLeft:10}}>
              <Text style={{fontSize:17}}>Azure Module</Text>
              <Text style={{color:'#8B8B8B',fontSize:11,paddingTop:9}}>12,sept,2020</Text>
           </View>
          </View>    

           <NumberFormat renderText={text => <Text style={{color:'#3F3F3F',fontSize:15,lineHeight:17,paddingTop:10}}>{text}</Text>} value='200' displayType={'text'} thousandSeparator={true} prefix={'+ ₦'} /> 
             </View>
          </TouchableOpacity>




          <TouchableOpacity style={{height:100,paddingHorizontal:20,marginHorizontal:20,marginTop:20,borderRadius:15,borderWidth:1,borderColor:'#F0F0F0',backgroundColor:'#F0F0F0',justifyContent:'center'}}>
          <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
           <View style={{flexDirection:'row'}}>
          <View style={{justifyContent:'center',height:50,width:60,backgroundColor:'#F2F1CB',alignItems:'center',borderRadius:10}}>
           <Entypo name='aircraft' size={25} color='#8F8C26' style={{}}/> 
           </View>

           <View style={{paddingLeft:10}}>
              <Text style={{fontSize:17}}>Bills & Travels</Text>
              <Text style={{color:'#8B8B8B',fontSize:11,paddingTop:9}}>6th,jan,2016</Text>
           </View>
          </View>    

           <NumberFormat renderText={text => <Text style={{color:'#3F3F3F',fontSize:15,lineHeight:17,paddingTop:10}}>{text}</Text>} value='6700' displayType={'text'} thousandSeparator={true} prefix={'+ ₦'} /> 
             </View>
          </TouchableOpacity>




          <TouchableOpacity style={{height:100,paddingHorizontal:20,marginHorizontal:20,marginTop:20,borderRadius:15,borderWidth:1,borderColor:'#F4F4F4',backgroundColor:'#F4F4F4',justifyContent:'center'}}>
          <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
           <View style={{flexDirection:'row'}}>
          <View style={{justifyContent:'center',height:50,width:60,backgroundColor:'#C5D8DE',alignItems:'center',borderRadius:10}}>
           <Entypo name='shopping-cart' size={25} color='#387C8E' style={{}}/> 
           </View>

           <View style={{paddingLeft:10}}>
              <Text style={{fontSize:17}}>Shopping & Purchases</Text>
              <Text style={{color:'#8B8B8B',fontSize:11,paddingTop:9}}>6th,jan,2016</Text>
           </View>
          </View>    

           <NumberFormat renderText={text => <Text style={{color:'#3F3F3F',fontSize:15,lineHeight:17,paddingTop:10}}>{text}</Text>} value='4900' displayType={'text'} thousandSeparator={true} prefix={'- ₦'} /> 
             </View>
          </TouchableOpacity>


          </LinearGradient>
          </ScrollView>
      </View>
    );
  }
}



