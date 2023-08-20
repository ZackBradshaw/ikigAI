import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator,KeyboardAweareScrollView, KeyboardAvoidingView, StyleSheet, ScrollView, Text, View,  Dimensions, Appearance, BackgroundImage, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import TestLogo from "../../assets/bg.svg";
import Bg from './bg'
import Logo from './logo'
import styles from './styles';
import CardFlip from 'mmp-react-native-card-flip';
import PasswordInput from './PasswordField';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { useIsFocused } from "@react-navigation/native";
import { useProvider } from '../context/Provider';
import axios from 'axios';
const BASE_URL = 'https://ikig-ai.me/api';


function LoginScreen({navigation}) {
    const card = useRef(null);
    const isFocused = useIsFocused();
    const [forgotPass, setForgotPassword] = useState(false);
    const [passwordInput, setPasswordInput] = useState(null);
    const [passwordInputRegister, setPasswordInputRegister] = useState(null);
    const [passwordInputRegisterRepeat, setPasswordInputRegisterRepeat] = useState(null);
    const [email, setEmail] = useState(null);
    const [emailRegister, setEmailRegister] = useState(null);
    const [emailForgotPassword, setEmailForgotPassword] = useState(null);
    const [username,setUsername] = useState(null);
    const [loading, setLoading] = useState(false);
    const { token, saveToken, loadToken,setUserInfo } = useProvider();
    useEffect(()=>{
        loadToken();
    },[])

    const checkSurvey = async (token) => {
        try {
          const response = await axios.get(`${BASE_URL}/profile`, {
            headers:{
                'Authorization':`Bearer ${token}`
            }
          });
          console.log(response.data.user.survey_done)
          setUserInfo(response.data.user);
          if(response.data.user.survey_done){
            
            navigation.navigate('Main');
          }else {
            setLoading(true)
            setTimeout(function(){
            navigation.navigate('Survey');
        },1000)
          }
          //saveToken(response.data.credentials.access_token);

        } catch (error) {
            
        Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: error.response.data.errors.join('\n'),
            button: 'TRY AGAIN',
            });
        }
      };

    useEffect(()=>{
        if(token){
            checkSurvey(token)
        }
    },[token])

    useEffect(function(){
        if(isFocused){
        setLoading(false);
        }
    },[isFocused])

    const login = async () => {
        try {
          const response = await axios.post(`${BASE_URL}/login`, {
            email:email,
            password:passwordInput,
          });
          console.log(response.data.credentials)
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Login successful!',
            textBody: 'Welcome back, '+response.data.credentials.name+"!",
          });
          saveToken(response.data.credentials.access_token);

        } catch (error) {
            console.log(error.response.data.errors)
        Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: error.response.data.errors.join('\n'),
            button: 'TRY AGAIN',
            });
        }
      };

      const reset = async () => {
        try {
          const response = await axios.post(`${BASE_URL}/reset-password`, {
            email:emailForgotPassword,
          });
          console.log(response.data)
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Your password has been succesfully reset!',
            textBody: 'Please check your email to change your password to a new one!'
          });

        } catch (error) {
            console.log(error.response.data)

        Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: error.response.data.errors.join('\n'),
            button: 'TRY AGAIN',
            });
        }
      };

      const register = async () => {
        try {
            console.log(`${BASE_URL}/register`)
            console.log(emailRegister)
          const response = await axios.post(`${BASE_URL}/register`, {
            email:emailRegister,
            name:username,
            password: passwordInputRegister,
            password_confirmation: passwordInputRegisterRepeat
          });
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success!',
            textBody: response.data.message,
            button: 'Login',
            onPressButton: ()=>{
                Dialog.hide();
                card.current.flip();
            }
            });
          console.log(response.data.message); // Return the user data or token received from the server
        } catch (error) {
        //    console.log(error.response.data.errors)
        console.log(error)
           Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: error.response.data.errors.join('\n'),
            button: 'TRY AGAIN',
            });
        //    setErrors(error.response.data.errors)
        }
      };

    return (
        <AlertNotificationRoot>
        <KeyboardAvoidingView style={{ flex: 1 }} >
            <SafeAreaView style={{ flex: 1, height: '100%', backgroundColor: 'red', justifyContent: 'center' }}>
            
                <Bg style={styles.bg} />
                <CardFlip style={styles.cardWrapper} ref={card} >
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>

                        <View
                            style={[styles.card, { height: 420 }]}
                        >

                            <View style={styles.cardHeader}>
                                <View style={{marginRight:4}}>
                               <Logo style={{height:40,width:40}}/>
                                </View>
                                <Text style={styles.cardHeaderText}>ikigAI</Text>
                            </View>
                            <View style={{ flex: 1, padding: 24, paddingTop: 0, flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                                <View style={{}}>
                                    <View style={{ marginBottom: 16 }}>
                                        <Text style={styles.inputLabel}>E-mail</Text>
                                        <View style={styles.inputWrapper}>
                                            <TextInput
                                                placeholder="username@example.com"
                                                style={styles.input}
                                                value={email}
                                                onChangeText={setEmail}
                                        
                                            />
                                        </View>
                                    </View>
                                    <View style={{ marginBottom: 16 }}>
                                        <Text style={styles.inputLabel}>Password</Text>
                                        <PasswordInput setPassword={setPasswordInput} password={passwordInput}/>
                                    </View>
                                    <View style={{ marginBottom: 8 }}>
                                        <TouchableOpacity activeOpacity={0.95} onPress={() => {
                                            setLoading(true)
                                            //setTimeout(function(){
                                                login();
                                                
                                           // },500)
                                     
                                        }}>
                                            <View style={[styles.button, { flexDirection:'row',borderRadius: 8, backgroundColor: '#191518', padding: 12, justifyContent: 'center', alignItems: 'center' }]}>
                                            <View style={{marginRight:4}}> 
                                            {loading&&<ActivityIndicator size="small" color="#fff" />}
                                            </View>
                                                <Text style={{ color: 'white' }}>
                                                    LOGIN
                                                </Text>
                                                <View style={{marginLeft:4}}>
                                <IconMaterialIcons name="send" size={20} color="#fff" />
                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity activeOpacity={0.9} onPress={() => {
                                        card.current.flip()
                                    }}>
                                        <View style={[styles.button, { flexDirection:'row',borderRadius: 8, backgroundColor: '#191518', padding: 12, justifyContent: 'center', alignItems: 'center' }]}>
                                            <Text style={{ color: 'white' }}>
                                                REGISTER
                                            </Text>
                                            <View style={{marginLeft:4}}>
                                <IconMaterialIcons name="arrow-forward" size={20} color="#fff" />
                                </View>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={0.9} onPress={() => {
                                        setForgotPassword(true);
                                        card.current.flip()
                                    }}>
                                        <View style={{ paddingTop: 8, paddingBottom: 8, alignItems: 'center', width: '100%' }}>
                                            <Text>Forgot your password?</Text>

                                        </View>
                                    </TouchableOpacity>


                                </View>
                            </View>



                        </View>
                    </View>
                    {!forgotPass ?
                        <View
                            style={styles.cardRegister}
                        >
                            <View style={styles.cardHeader}>
                            <View style={{marginRight:4}}>
                            <Logo style={{height:40,width:40}}/>
                                </View>
                                <Text style={styles.cardHeaderText}>ikigAI</Text>
                            </View>
                            <View style={{ flex: 1, padding: 24, paddingTop: 0, flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                                <View style={{}}>
                                    <View style={{ marginBottom: 16 }}>
                                        <Text style={styles.inputLabel}>E-mail</Text>
                                        <View style={styles.inputWrapper}>
                                            <TextInput
                                                placeholder="username@example.com"
                                                style={styles.input}
                                                value={emailRegister}
                                                onChangeText={setEmailRegister}
                                            
                                           />
                                        </View>
                                    </View>
                                    <View style={{ marginBottom: 16 }}>
                                        <Text style={styles.inputLabel}>Username</Text>
                                        <View style={styles.inputWrapper}>
                                            <TextInput
                                                placeholder="username"
                                                style={styles.input}
                                                value={username}
                                                onChangeText={setUsername}
                                       
                                           />
                                        </View>
                                    </View>
                                    <View style={{ marginBottom: 16 }}>
                                        <Text style={styles.inputLabel}>Password</Text>
                                        {/* <View style={styles.inputWrapper}> */}
                                        <PasswordInput setPassword={setPasswordInputRegister} password={passwordInputRegister}/>
                                        {/* </View> */}
                                    </View>
                                    <View style={{ marginBottom: 16 }}>
                                        <Text style={styles.inputLabel}>Repeat Password</Text>
                                        
                                        <PasswordInput setPassword={setPasswordInputRegisterRepeat} password={passwordInputRegisterRepeat}/>
                                        
                                    </View>

                                    <TouchableOpacity activeOpacity={0.95} onPress={() => {
                                       // card.current.flip()
                                       register();
                                    }}>
                                        <View style={[styles.button, { flexDirection:'row',borderRadius: 8, backgroundColor: '#191518', padding: 12, justifyContent: 'center', alignItems: 'center' }]}>
                              
                                            <Text style={{ color: 'white' }}>
                                                REGISTER
                                            </Text>
                                            <View style={{marginLeft:4}}>
                                <IconMaterialIcons name="send" size={20} color="#fff" />
                                </View>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ marginTop: 8 }}>
                                        <TouchableOpacity activeOpacity={0.9} onPress={() => {
                                            card.current.flip()
                                        }}>
                                            <View style={[styles.button, { flexDirection:'row',borderRadius: 8, backgroundColor: '#191518', padding: 12, justifyContent: 'center', alignItems: 'center' }]}>
                                            <View style={{marginRight:4}}>
                                <IconMaterialIcons name="arrow-back" size={20} color="#fff" />
                                </View>
                                                <Text style={{ color: 'white' }}>
                                                    LOGIN
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>



                                </View>
                            </View>
                        </View> : <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>

                            <View
                                style={[styles.card, { maxHeight: 300 }]}
                            >

                                <View style={styles.cardHeader}>
                                <View style={{marginRight:4}}>
                                <Logo style={{height:40,width:40}}/>
                                </View>
                                    <Text style={styles.cardHeaderText}>ikigAI</Text>
                                </View>
                                <View style={{ flex: 1, padding: 24, paddingTop: 0, flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                                    <View style={{}}>
                                        <View style={{ marginBottom: 16 }}>
                                            <Text style={styles.inputLabel}>E-mail</Text>
                                            <View style={styles.inputWrapper}>
                                                <TextInput
                                                    placeholder="username@example.com"
                                                    style={styles.input}
                                                    value={emailForgotPassword}
                                                    onChangeText={setEmailForgotPassword}
                                              
                                              />
                                            </View>
                                        </View>
                                        <View style={{ paddingBottom: 8 }}>
                                            <TouchableOpacity activeOpacity={0.95} onPress={() => {
                                                // card.current.flip()
                                                reset();
                                           }}>
                                                <View style={[styles.button, { flexDirection:'row',borderRadius: 8, backgroundColor: '#191518', padding: 12, justifyContent: 'center', alignItems: 'center' }]}>
                                                    <Text style={{ color: 'white' }}>
                                                        RESET PASSWORD
                                                    </Text>
                                                    <View style={{marginLeft:4}}>
                                <IconMaterialIcons name="send" size={20} color="#fff" />
                                </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity activeOpacity={0.95} onPress={() => {


                                            card.current.flip();
                                            setTimeout(() => { setForgotPassword(false); }, 1000)

                                        }}>
                                            <View style={[styles.button, { flexDirection:'row',borderRadius: 8, backgroundColor: '#191518', padding: 12, justifyContent: 'center', alignItems: 'center' }]}>
                                            <View style={{marginRight:4}}>
                                <IconMaterialIcons name="arrow-back" size={20} color="#fff" />
                                </View>
                                                <Text style={{ color: 'white' }}>
                                                    LOGIN
                                                </Text>
                                            </View>
                                        </TouchableOpacity>



                                    </View>
                                </View>

                            </View>
                        </View>}
                </CardFlip>
                
            </SafeAreaView>

        </KeyboardAvoidingView>
        </AlertNotificationRoot>
    

    );
}

export default LoginScreen;