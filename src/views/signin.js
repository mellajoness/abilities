import React, { Component } from 'react';
import {Text,View,Image,ImageBackground ,TouchableOpacity,StatusBar,Alert,ScrollView,TextInput,InteractionManager,ToastAndroid} from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';
import {CustomLoader} from "../shared/activityindicator"
import {POST_SERVICE} from "../shared/backend";
import NetInfo from "@react-native-community/netinfo";  
import LinearGradient from "react-native-linear-gradient";
import {SAVE_SESSION_ID, SAVE_FULL_NAME, SAVE_FIRST_NAME,SAVE_EMAIL,SAVE_PHONE, GET_PHONE, SAVE_LAST_NAME} from "../shared/storage";
import { Dimensions } from 'react-native';
export default class SignInScreen extends Component {
    state = {
        cooperatorScheme_Code_PhoneNumber:'',
        password:'6afcefbf',  
        secureTextEntry:true,
        loading: false,
        secureTextEntry:true,
        iconName:'eye',
        // isConnected:true
    };

  async componentDidMount(){
        await SAVE_SESSION_ID('')  
    }

    showPassword = () => {
        let iconName=(this.state.secureTextEntry ?  'eye-off':'eye')
          this.setState({
              secureTextEntry:!this.state.secureTextEntry,
              iconName:iconName
          });
      };
        

    login = async () => {
        const unsubscribe = NetInfo.addEventListener(state => {
         console.log("Connection type", state.type);
         console.log("Is connected?", state.isConnected);
          });
          // Unsubscribe
          unsubscribe();
        NetInfo.fetch().then(state => {
        
        if (!state.isConnected) {
            Alert.alert('Network Error',"Check internet connections !");
           } 
           })   
   
        if(this.state.cooperatorScheme_Code_PhoneNumber ==''){
            Alert.alert('Alert','Cooperator_ID/Phone number cannot be empty')
         }

        
       else{
       this.setState({loading: true});
        const body = {
            cooperatorScheme_Code_PhoneNumber:this.state.cooperatorScheme_Code_PhoneNumber  
        };
        console.log('my  body',body)
        const endpoint = '/api/v1/Cooperators/Verify-Cooperator';
        console.log('endpoint',endpoint)
        try {
            const response = await POST_SERVICE(body, endpoint);
            console.log('signin Response', response);
            this.setState({loading: false});

            if(response.data.code === '00')
            {
                this.props.navigation.navigate('Otp',{
                    data:{
                      cooperatorScheme_Code_PhoneNumber:body.cooperatorScheme_Code_PhoneNumber,
                    }}
                    )
            }
            else if(response.data.code === '02'){
                this.props.navigation.navigate('Register');
            }
            else  
            {
             InteractionManager.runAfterInteractions(() => {
                setTimeout(() => {
                 Alert.alert('Login Error', response.data.message);
                 });
                });
            }
        } catch (e) {
           this.setState({loading: false});
            InteractionManager.runAfterInteractions(() => {
                setTimeout(() => {
                     Alert.alert('Login Error', "Error occurred while trying to login. Try again later.");
                });
            }
            );
            return e.response;
        }}
    };

    async saveUserDetail(resp){
      this.props.navigation.navigate('Otp');
    //   await SAVE_EMAIL(resp.data.data.emailAddress);
    //   await SAVE_PHONE(resp.data.data.phoneNumber);
    //   await SAVE_SESSION_ID(resp.data.data.sessionKey);
    //   await SAVE_FIRST_NAME(resp.data.data.firstName);
    //   await SAVE_LAST_NAME(resp.data.data.lastName);
    //   await SAVE_FULL_NAME(`${resp.data.data.firstName} ${resp.data.data.lastName}`)
     
    }


    render(){
        return (
            
            <View style={{flex:1,backgroundColor:'white'}}>
                 <StatusBar backgroundColor="#480909" barStyle="light-content" />
                <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <Image  
                   style={{ resizeMode: 'contain', height:250, width:'100%'}}
                   source={require('../assets/login.png')}
                 /> 

       <View style={{paddingHorizontal:20, alignItems:'center', }}>
                   <View style={{paddingTop:0,flexDirection:'row',justifyContent:'center',alignItems:'center', }}>
                       <TextInput style={{flex:1,height: 50,color:'gray',paddingLeft:20,backgroundColor:'white',borderRadius:5,borderColor:'#E5E5E5',borderWidth:0 , 
                       shadowOffset: { width: 0, height: 19 },
                     shadowOpacity: 0.25,
                     shadowRadius: 4.84,  
                     elevation: 4}}
                            onChangeText={(cooperatorScheme_Code_PhoneNumber) => this.setState({cooperatorScheme_Code_PhoneNumber })}
                           placeholder='Phone Number/ Cooperator_ID'
                           keyboardType='email-address'
                          placeholderTextColor='#707070'/>
               </View>    

               <TouchableOpacity  onPress={this.login} style={{backgroundColor:'#B5311F',height:50,borderRadius:5,justifyContent:'center',marginTop:25,width:Dimensions.get('screen').width-40}}
                         >
                         <View style={{flexDirection:'row',justifyContent:'center',}}>
                         <Text style={{color:'white',fontSize:18}}>Activate</Text>
                      </View>
                </TouchableOpacity>

               <TouchableOpacity onPress= {() => this.props.navigation.navigate('Password')} style={{backgroundColor:'white',height:50,borderRadius:5,justifyContent:'center',marginTop:25,width:Dimensions.get('screen').width-40,borderWidth:1,borderColor:'#851616'}}
                  >
                          <View style={{flexDirection:'row',justifyContent:'center',}}>
                           <Text style={{color:'#851616',fontSize:18}}>Already a member</Text>  
                          </View>
                </TouchableOpacity>
                </View>
               </ScrollView>
               <CustomLoader visible={this.state.loading}/> 
            </View>
            
            </View>
           
        );
    }
}
