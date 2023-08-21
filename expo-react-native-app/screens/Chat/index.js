import React, { useState, useEffect,useRef,useReducer } from 'react';

import {
  Button,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput, Text, View, Dimensions, TouchableOpacity,ActivityIndicator
} from 'react-native';
import Bg from './bg';
import Logo from './logo';
import styles from './styles';
import { useKeyboardVisible } from '../../hooks/keyboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Box from './box';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { useProvider } from '../context/Provider';
import axios from 'axios';
const BASE_URL = 'https://ikig-ai.me/api';


export default function Chat() {
  const visible = useKeyboardVisible();
  const [value,setValue] = useState('');
  const [loading,setLoading] = useState(true);
  const scroll = useRef(null);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [messages,setMessages] = useState([
    {type:'system',value:"I'm searching for our previous conversation..."},]);
  const { token, saveToken, loadToken, setUserInfo } = useProvider();
  useEffect(function(){
if(token){
  getHistory(token)
}
  },[token])
    
  const getHistory = async (token) => {
  
     let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL}/chat`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    axios.request(config)
        .then((response) => {
            console.log(response.data);
           
            let History = response.data.messages;
            let tempMessages = [];
            for (let index = 0; index < History.length; index++) {
              const element = History[index];
              tempMessages.push({
                value:element.message,
                type:'user'
              })
              tempMessages.push({
                value:element.response,
                type:'system'
              })
            }
            setMessages(tempMessages);
            setTimeout(function(){
              scroll.current.scrollToEnd();
            },200)
           // scroll.current.scrollToEnd();
            setLoading(false);
            // Toast.show({
            //     type: ALERT_TYPE.SUCCESS,
            //     title: 'Success',
            //     textBody: 'Goal was edited with success!'
            //   });
        })
        .catch((error) => {
            console.log(error);
            // Dialog.show({
            //     type: ALERT_TYPE.DANGER,
            //     title: 'Error',
            //     textBody: error.response.data.errors.join('\n'),
            //     button: 'TRY AGAIN',
            //     });
        });
  

};

const sendMessage = async (token,message) => {
  
  let config = {
     method: 'post',
     maxBodyLength: Infinity,
     url: `${BASE_URL}/chat`,
     data:{
      message:message
     },
     headers: {
         'Authorization': `Bearer ${token}`
     }
 };

 axios.request(config)
     .then((response) => {
         console.log(response.data);
         let tempMessages = messages;
         tempMessages.push({
          value:response.data.response,
          type:'system'
        })
         setMessages(tempMessages);
         forceUpdate();
             
         scroll.current.scrollToEnd();
         setLoading(false);
        // setMessages(tempMessages);
         // Toast.show({
         //     type: ALERT_TYPE.SUCCESS,
         //     title: 'Success',
         //     textBody: 'Goal was edited with success!'
         //   });
     })
     .catch((error) => {
         console.log(error);
         // Dialog.show({
         //     type: ALERT_TYPE.DANGER,
         //     title: 'Error',
         //     textBody: error.response.data.errors.join('\n'),
         //     button: 'TRY AGAIN',
         //     });
     });


};

  return (
    <SafeAreaView style={stylesx.container}>
      <KeyboardAvoidingView  style={[stylesx.container, {
        justifyContent: 'flex-start',
        alignItems: 'center'
      }]}>
        <Bg style={[styles.bg]} />
        <View style={[styles.card, { marginTop: 24, flex: 1, maxHeight: Dimensions.get("window").height - 120, width: Dimensions.get("window").width - 32, justifyContent: 'space-between', alignItems: 'center' }]}>
          <View style={{ flex: 1 }}>
            <View style={[styles.cardHeader, { width: Dimensions.get('window').width - 32,marginBottom:1 }]}>
              <View style={{ marginRight: 4 }}>
                <Logo style={{ height: 40, width: 40 }} />
              </View>
              <Text style={styles.cardHeaderText}>ikigAI</Text>
            </View>
            <ScrollView ref={scroll} tyle={stylesx.scrollView} contentContainerStyle={{
              flexGrow:1,
              justifyContent: 'flex-end'
            }}>

              {messages.map((message,i)=>
              <View key={i}><Box text={message.value} type={message.type}/></View>
              )}
              
        
            </ScrollView>
          </View>
          <View style={{
            
            borderRadius: 8,
            borderColor: '#E0E0E0',
            borderWidth: 1,
            padding: 4,
            paddingRight: 20,
            margin: 8,
            position: 'relative',
            maxHeight: 100,
            width: Dimensions.get('window').width - 32 - 16,
            justifyContent: "center",
          }}>

            <TouchableOpacity disabled={loading} style={{ width: 50, height: 50, position: 'absolute', right: 0, top: 40, backgroundColor: 'white', zIndex: 10, elevation: 2, justifyContent: 'center', alignItems: 'center', shadowColor: "#fff" }} activeOpacity={0.90} onPress={() => {
              setValue('');
              setLoading(true);
          let tempMessages = messages;
             tempMessages.push({
              value:value,
              type:'user'
            })
          
             setMessages(tempMessages);
             sendMessage(token,value);
             forceUpdate();
             
             scroll.current.scrollToEnd();
            }}>
              <View >
                <View style={[styles.button, { height: 40, width: 40, flexDirection: 'row', borderRadius: 20, backgroundColor: '#191518', padding: 8, justifyContent: 'center', alignItems: 'center', zIndex: 1, elevation: 2 }]}>
                {loading?<ActivityIndicator size="small" color="#b02127"/>:<View style={{ transform: 'translateX(2px)' }}>
                    <IconMaterialIcons name="send" size={20} color="#fff" />
                  </View>}
                </View>
              </View>


            </TouchableOpacity>
            <TextInput value={value} onChangeText={(text) => {
                setValue(text);
            }} multiline numberOfLines={4} style={[stylesx.input, { marginBottom: visible ? 0 : 0, zIndex: -1, elevation: 0, position: 'relative', shadowColor: "transparent",paddingRight:30 }]} placeholder="Get help with your goals." />

          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const stylesx = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,

  },
  input: {
    padding: 10,
    textAlignVertical: 'top',


  },
});