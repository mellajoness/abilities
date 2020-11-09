import React, { Component } from 'react';
import {Text,View,Image,ImageBackground ,TouchableOpacity,StatusBar,Alert,ScrollView,TextInput,InteractionManager,ToastAndroid} from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';
import {CustomLoader} from "../shared/activityindicator"
import {POST_SERVICE} from "../shared/backend";
import NetInfo from "@react-native-community/netinfo";
import LinearGradient from "react-native-linear-gradient";
// import { FloatingLabelInput } from 'react-native-floating-label-input';
import {SAVE_WALLET_ID, SAVE_COOP_ID, SAVE_FIRST_NAME,SAVE_EMAIL,SAVE_PHONE, GET_PHONE, SAVE_LAST_NAME} from "../shared/storage";
export default class RegisterScreen extends Component {
    state = {
        fullName: "",
        homeAddress: "",
        phoneNumber: "",
        email: "",
        loading: false,
        iconName:'eye',
        birthday:''
      
    };

  async componentDidMount(){
       
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
   
        if(this.state.fullName ==''){
            Alert.alert('Alert','Fullname cannot be empty')
         }
        else if(this.state.homeAddress == ''){
            Alert.alert('Alert','Address cannot be empty')
          } 
        else if(this.state.phoneNumber == ''){
            Alert.alert('Alert','Phone number cannot be empty')
          } 
          else if(this.state.email == ''){
            Alert.alert('Alert','Email cannot be empty')
          } 
        
       else{
       this.setState({loading: true});
        const body = {
            fullName:this.state.fullName,
            homeAddress:this.state.homeAddress,
            phoneNumber:this.state.phoneNumber,
            email:this.state.email,
           
        };
        console.log('my  body',body)
        const endpoint = '/api/v1/Cooperators/SelfEnroll';
  
        try {
            const response = await POST_SERVICE(body, endpoint);
            console.log('signin Response', response);
            this.setState({loading: false});

            if(response.data.code === '00')
            {
              await this.saveUserDetail(response);
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
      this.props.navigation.navigate('SuccessRegister');
      await SAVE_EMAIL(resp.data.data.email);
      await SAVE_PHONE(resp.data.data.phoneNumber);
      await SAVE_WALLET_ID(resp.data.data.walletId);
      await SAVE_COOP_ID(resp.data.data.cooperatorCode);
      
    }


    render(){
        return (
           
            <View style={{flex:1,backgroundColor:'white',justifyContent:'center'}}>
              <StatusBar backgroundColor="#480909" barStyle="light-content" />
             <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
   
          <View style={{alignItems:'center'}}>
              <Image  
                 style={{ resizeMode: 'contain', height: 200, width:'100%'}}
                 source={require('../assets/join.png')}
              /> 
           </View>



      
         <View style={{flex:1}}>
               <View style={{paddingHorizontal:20, alignItems:'center', backgroundColor: 'white', marginTop:10,}}>
                 <Text style={{color:'#7C7B7B',fontSize:20,}}>Registration Form</Text>
                  <View style={{paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems:'center', }}>
                  <TextInput style={{flex:1,height: 50,color:'gray',paddingLeft:20,backgroundColor:'white',borderRadius:5,borderColor:'#E5E5E5',borderWidth:0 , 
                        shadowOffset: { width: 0, height: 19 },
                        shadowOpacity: 0.25,
                        shadowRadius: 4.84,  
                        elevation: 4}}
  
                            onChangeText={(fullName) => this.setState({fullName})}
                            placeholder='Fullname'
                            placeholderTextColor='gray'/>
                  </View>  

                  <View style={{paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems:'center', }}>
                  <TextInput style={{flex:1,height: 50,color:'gray',paddingLeft:20,backgroundColor:'white',borderRadius:5,borderColor:'#E5E5E5',borderWidth:0 , 
                          shadowOffset: { width: 0, height: 19 },
                          shadowOpacity: 0.25,
                          shadowRadius: 4.84,  
                          elevation: 4}}
 
                            onChangeText={(homeAddress) => this.setState({homeAddress})}
                            placeholder='Home Address'
                            placeholderTextColor='gray'/>
                  </View>  

                  
                  <View style={{paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems:'center', }}>
                  <TextInput style={{flex:1,height: 50,color:'gray',paddingLeft:20,backgroundColor:'white',borderRadius:5,borderColor:'#E5E5E5',borderWidth:0 , 
                        shadowOffset: { width: 0, height: 19 },
                        shadowOpacity: 0.25,
                        shadowRadius: 4.84,  
                        elevation: 4}}
                            onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                            placeholder='Phone Number'
                            placeholderTextColor='gray'/>
                  </View> 

                  
                  <View style={{paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems:'center', }}>
                  <TextInput style={{flex:1,height: 50,color:'gray',paddingLeft:20,backgroundColor:'white',borderRadius:5,borderColor:'#E5E5E5',borderWidth:0 , 
                         shadowOffset: { width: 0, height: 19 },
                         shadowOpacity: 0.25,
                         shadowRadius: 4.84,  
                         elevation: 4}}
                            onChangeText={(email) => this.setState({email})}
                            placeholder='Email'
                            placeholderTextColor='gray'/>
                  </View> 
      
                 
      

                  <TouchableOpacity onPress={this.login} style={{backgroundColor:'#B5311F',height:50,borderRadius:5,justifyContent:'center',marginTop:25,width:'100%',marginBottom:20}}>
                      <View style={{flexDirection:'row',justifyContent:'center',}}>
                        <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Register</Text>
                       </View>
                  </TouchableOpacity>

              </View>  
      
             <CustomLoader visible={this.state.loading}/> 
            </View>
      
            
            </ScrollView> 
            </View>


           
           
        );
    }
}
