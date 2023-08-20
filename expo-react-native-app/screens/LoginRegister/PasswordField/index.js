import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { KeyboardAweareScrollView, KeyboardAvoidingView, StyleSheet, ScrollView, Text, View, StatusBar, Dimensions, Appearance, BackgroundImage, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles';

function PasswordInput({
    setPassword, password
}) {
    const [passwordx, setPasswordx] = useState(password);
    const [see,setSee] = useState(false);
    return (
        <>
            <View style={styles.inputWrapper}>
            <TouchableOpacity style={styles.wrapperPassword} onPress={(e)=>{
                setSee(!see)
            }}>
                <View>
                    {!see?
                <Icon name="eye-with-line" size={24} color="#191518" />:
                <Icon name="eye" size={24} color="#191518" />}
                </View>
            
                </TouchableOpacity>
                <TextInput
                    value={passwordx}
                    placeholder="**********"
                    secureTextEntry={!see}
                    style={styles.input}
                    onChangeText={(e)=>{
                        setPasswordx(e)
                        setPassword(e);
                    }}
                />
            </View>
        </>
    )
}


export default PasswordInput;