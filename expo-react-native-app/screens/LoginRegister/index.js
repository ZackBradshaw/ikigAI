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
import { useIsFocused } from "@react-navigation/native";
function LoginScreen({navigation}) {
    const card = useRef(null);
    const isFocused = useIsFocused();
    const [forgotPass, setForgotPassword] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordInputRegister, setPasswordInputRegister] = useState('');
    const [passwordInputRegisterRepeat, setPasswordInputRegisterRepeat] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(function(){
        if(isFocused){
        setLoading(false);
        }
    },[isFocused])

    return (
        
        <KeyboardAvoidingView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
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
                                            setTimeout(function(){
                                                navigation.navigate('Survey');
                                            },500)
                                     
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
                                            />
                                        </View>
                                    </View>
                                    <View style={{ marginBottom: 16 }}>
                                        <Text style={styles.inputLabel}>Username</Text>
                                        <View style={styles.inputWrapper}>
                                            <TextInput
                                                placeholder="username"
                                                style={styles.input}
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
                                        card.current.flip()
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
                                                />
                                            </View>
                                        </View>
                                        <View style={{ paddingBottom: 8 }}>
                                            <TouchableOpacity activeOpacity={0.95} onPress={() => {
                                                // card.current.flip()
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
    

    );
}

export default LoginScreen;