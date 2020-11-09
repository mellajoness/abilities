import React, { Component } from 'react';
import {Text,View,Image,ImageBackground ,TouchableOpacity,StatusBar,Alert,ScrollView,TextInput,InteractionManager,ToastAndroid} from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';
import {CustomLoader} from "../shared/activityindicator"
import {POST_SERVICE} from "../shared/backend";
import NetInfo from "@react-native-community/netinfo";
import LinearGradient from "react-native-linear-gradient";
import CodeInput from 'react-native-code-input';
import {SAVE_COOP_ID, SAVE_FULL_NAME, SAVE_FIRST_NAME,SAVE_EMAIL,SAVE_PHONE, GET_PHONE, SAVE_LAST_NAME} from "../shared/storage";

export default class OtpScreen extends Component {
  state = {  
    loading: false,
  }; 

    componentDidMount(){
        // let xx= this.props.navigation.getParam('data').cooperatorScheme_Code_PhoneNumber
        // console.log('item data compdid mount',xx)
       }

  _onFinishCheckingCode1 = async (code) => {
    this.setState({loading: true});
    const body = {
      phone_CooperatorScheme_Code:this.props.navigation.getParam('data').cooperatorScheme_Code_PhoneNumber,
      otpCode:code 
  };
    console.log('my otp',code)
    console.log('my body',body)
    const endpoint = '/api/v1/Cooperators/Validate-OTP';
    console.log('endpoint',endpoint)
    try {
        const response = await POST_SERVICE(body, endpoint);
        console.log('signin Response', response);
        this.setState({loading: false});

        if(response.data.code === '00')
        {
          await this.saveUserDetail(response)
        }
        else  
        {
         InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
             Alert.alert('OTP Error', response.data.message);
             });
            });
        }
    } catch (e) {
       this.setState({loading: false});
        InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
                 Alert.alert('Otp Error', "Error occurred while trying to valodate Otp. Try again later.");
            });
        }
        );
        return e.response;
    }}

    
    async saveUserDetail(resp){
      this.props.navigation.navigate('Password');
      await SAVE_COOP_ID(resp.data.data.cooperatorScheme_Code);
      await SAVE_PHONE(resp.data.data.phoneNumber);
    }

  
  render() {
    return (
        <View style={{flex:1,backgroundColor:'white'}}>
        <StatusBar backgroundColor="#480909" barStyle="light-content" />
       <ScrollView>
        <LinearGradient colors={['#851616','#B5311F', '#F51F1F' ]} style={{height:200,backgroundColor:'#851616',borderBottomLeftRadius:90,display:'flex',}}>
        <View style={{alignItems:'center',display:'flex',flex:1,justifyContent:'center'}}>
               <Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>LOGO</Text>
               </View>
               <Text style={{textAlign:'right',color:'white',paddingRight:20,fontSize:17,paddingBottom:20}}>OTP</Text>
        </LinearGradient>
    

   <View style={{flex:1}}>
         <View style={{marginHorizontal:20, alignItems:'center', backgroundColor: 'white', marginTop: 20,}}>
     <Text style={{fontSize:15}}>Kindly enter the OTP sent to your device</Text>
    
    <CodeInput
      ref="codeInputRef2"
      secureTextEntry
      activeColor='#B5311F'
      inactiveColor='#F51F1F'
      codeLength={6}
      autoFocus={false}
      inputPosition='center'
      size={40}
      onFulfill={(code) => this._onFinishCheckingCode1(code)}
      containerStyle={{ marginTop: 30 }}
      codeInputStyle={{ borderWidth: 1.5 }}
    />


        </View>  
      <TouchableOpacity  onPress= {() => this.props.navigation.navigate('SignIn')}>
        <Text style={{textAlign:'center',paddingTop:50,fontSize:18,color:'#480909'}}>Resend Otp</Text>
        </TouchableOpacity>
         <CustomLoader visible={this.state.loading}/> 
      </View>

      
      </ScrollView> 
      </View>

    );
  }
}

