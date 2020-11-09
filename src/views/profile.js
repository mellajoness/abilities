import React, { Component } from 'react'
import {
    Dimensions,
    FlatList,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
    ScrollView,
    Text,
    Modal,
    Alert,
    InteractionManager,
    SafeAreaView
} from 'react-native';
import Entypo from 'react-native-vector-icons/dist/Entypo';
// import PhotoUpload from 'react-native-photo-upload';
// import {GET_SERVICE} from "../shared/Backend";
// import {GET_FIRST_NAME} from "../shared/Storage";

export default class ProfileScreen extends Component {

    state = {
        modalVisible: false,
        profileData: {},
        name:''
    }

      async componentDidMount()
      {
        //   await this.profile();

        //   this.props.navigation.addListener('didFocus', async () => {
        //       await this.profile();
        //   });
      }

    async profile() {
      this.setState({loading: true});
        const first_name = await GET_FIRST_NAME();
        const endpoint = '/v1/user/details/view?username=' + first_name;
        this.setState({loading: false});
        console.log(endpoint)
        try { 
            const response = await GET_SERVICE(endpoint);
            console.log('profile', response);

            if(response.data.code === null)  
            {
                this.setState({profileData: response.data.data})  
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
            
    
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
            <StatusBar backgroundColor="#480909" barStyle="light-content" />
            <View style={{height:Dimensions.get('screen').height/3,backgroundColor:'#851616',borderBottomLeftRadius:35,borderBottomRightRadius:35 }}>
             <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,paddingTop:20,alignItems:'center'}} >
             <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}> 
               <Entypo name='menu' size={35} color='white' style={{}}/> 
              </TouchableOpacity>
  
              <TouchableOpacity onPress={() => this.props.navigation.navigate('')} >
              <Image style={{height:40,width:40,borderRadius:40}}
                  source={require('../assets/image.png')}
                /> 
              </TouchableOpacity>
              </View> 
              </View>

              <View style={{flex:1,alignItems:'center'}}>
              <Image source={require('../assets/image.png')} style={{width:90, height: 90,borderRadius:90,borderWidth:0, bottom: 50}} />
              </View>

              {/* <PhotoUpload
   onPhotoSelect={avatar => {
     if (avatar) {
       console.log('Image base64 string: ', avatar)
     }
   }}
 >
   <Image
     style={{
       paddingVertical: 30,
       width: 150,
       height: 150,
       borderRadius: 75
     }}
     resizeMode='cover'
     source={{
       uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
     }}
   />
 </PhotoUpload> */}
  
              </View>
           
       
  
        );
      }
    
         
     
    }

