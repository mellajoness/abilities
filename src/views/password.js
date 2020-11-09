import React, { Component } from 'react';
import {Text,View,Image,ImageBackground ,TouchableOpacity,StatusBar,Alert,ScrollView,TextInput,InteractionManager,ToastAndroid} from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';
import {CustomLoader} from "../shared/activityindicator"
import {POST_SERVICE} from "../shared/backend";
import NetInfo from "@react-native-community/netinfo";
import LinearGradient from "react-native-linear-gradient";
import {SAVE_SESSION_ID, SAVE_FULL_NAME, SAVE_FIRST_NAME,SAVE_EMAIL,SAVE_PHONE, GET_PHONE, SAVE_LAST_NAME} from "../shared/storage";
export default class PasswordScreen extends Component {
    state = {
       
        password:'',
        secureTextEntry:true,
        loading: false,
        secureTextEntry:true,
        iconName:'eye',
        phonemail:''
        // isConnected:true
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
        

      login2 = async () => {
        this.props.navigation.navigate('Dashboard')
      }

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
           if(this.state.phonemail == ''){
            Alert.alert('Alert','Phone Number or Cooperative_ID cannot be empty')
          } 
   
        else if(this.state.password == ''){
            Alert.alert('Alert','Password cannot be empty')
          } 
        
       else{
       this.setState({loading: true});
        const body = {
            phonemail: this.state.phonemail,
            password: this.state.password,
        };
        console.log('my  body',body)
        const endpoint = '/api/v1/Cooperators/Auth-Login';
  
        try {
            const response = await POST_SERVICE(body, endpoint);
            console.log('signin Response', response);
            this.setState({loading: false});

            if(response.data.code === '00')
            {
              this.props.navigation.navigate('Landing',{
                phonemail:{
                 phonemail:body.phonemail
                }
              });
               
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
     
    //   await SAVE_EMAIL(resp.data.data.emailAddress);
    //   await SAVE_PHONE(resp.data.data.phoneNumber);
      //  await SAVE_SESSION_ID(resp.data.code);
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
                 style={{ resizeMode: 'contain', height:200, width:'100%'}}
                 source={require('../assets/facesimile.png')}
              /> 

          
      
   
               <View style={{paddingHorizontal:20, alignItems:'center', backgroundColor: 'white',}}>
               
               <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center', }}>
                       <TextInput style={{flex:1,height: 50,color:'gray',paddingLeft:20,backgroundColor:'white',borderRadius:5,borderColor:'#E5E5E5',borderWidth:0 , 
                       shadowOffset: { width: 0, height: 19 },
                     shadowOpacity: 0.25,
                     shadowRadius: 4.84,  
                     elevation: 4}}
                            onChangeText={(phonemail) => this.setState({phonemail })}
                            placeholder='Phone Number/ Cooperator_ID'
                            keyboardType='email-address'
                            placeholderTextColor='#707070'/>
                  </View>  

                 <View style={{paddingTop:20,flexDirection:'row',justifyContent:'center',alignItems:'center', }}>
                       <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',backgroundColor:'white',paddingRight:20,paddingLeft:15,borderRadius:5,
                        shadowOffset: { width: 0, height: 19 },
                        shadowOpacity: 0.25,
                        shadowRadius: 4.84,  
                        elevation: 4
                    }}>
                       <TextInput style={{flex:1,height: 50,color:'black',backgroundColor:'white',}}
                              onChangeText={(password) => this.setState({password})}
                              placeholder='Password' 
                              placeholderTextColor='gray' 
                              secureTextEntry={this.state.secureTextEntry}/>
      
                          <TouchableOpacity onPress={this.showPassword}>
                         <Feather name={this.state.iconName} size={25} color='gray' style={{}}/> 
                          </TouchableOpacity>
                        </View>
                    </View>
       
      
                  
                      
                        <TouchableOpacity  onPress={this.login2} style={{backgroundColor:'#B5311F',height:50,borderRadius:5,justifyContent:'center',marginTop:25,width:'100%'}}
                          >
                          <View style={{flexDirection:'row',justifyContent:'center',}}>
                           <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Login</Text>
                          </View>
                  </TouchableOpacity>

              </View>
      
               <CustomLoader visible={this.state.loading}/>
            
      
            
            </ScrollView> 
            </View>
</View>

           
           
        );
    }
}
