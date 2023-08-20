
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable,ActivityIndicator, Dimensions, Appearance, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import axios from 'axios';
import { useProvider } from '../../context/Provider';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
const BASE_URL = 'https://ikig-ai.me/api';

const calculateColor = (type) => {
    switch (type) {
        case "mission":
            return {
                bg: '#FFFAEA',
                color: '#F48C00'
            }
            break;
        case "passion":
            return {

                bg: '#FFF8F5',
                color: '#E2445C'
            }
            break;
        case "vocation":
            return {
                bg: '#F6FFF8',
                color: '#00BA69'
            }
            break;
        case "profession":
            return {
                bg: '#F5F6FF',
                color: '#4353FF'

            }
            break;
        default:
            return {}
            break;
    }
}
const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Card({ index, type, idx, task,remove }) {
    const [done, setDone] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(null);
    const [value, setValue] = useState('');
    const { token, saveToken, loadToken, setUserInfo } = useProvider();
    useEffect(() => {
        loadToken();
    }, [])

    useEffect(function () {
       

        setId(idx)
        setValue(task);
    }, [])

    const changeValue = async (token) => {
        setLoading(true);
         let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/update-ikigai`,
            data:{
                value:value,
                category:type
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        Toast.show({
            type: ALERT_TYPE.WARNING,
            title: 'Processing...',
            textBody: `Due to ${type} beinng edited we regenerate the goals and tasks!`
          });

        console.log(config)
        setTimeout(function(){
            axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response));
                
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: `${Capitalize(type)} was edited with success!`
                  });
                  setLoading(false)
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
        },100)
   
     
    };

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={() => {
            setEdit(false)
            // setDone(!done)
        }}>
            <View style={index !== 0 ? [styles.cardTask, { marginTop: 8 }] : [styles.cardTask, { marginTop: 16}]}>
                <View style={{ position: 'absolute', right: 0, }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={(e) => {
                        setEdit(!edit)
                        if(edit){
                            changeValue(token) 
                        }
                    }}>
                        <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                            {edit ? <AntDesign name="checkcircleo" size={20} color="grey" /> :
                            <>{loading?<ActivityIndicator size="small" color="#b02127"/>: <Feather name="edit-3" size={20} color="grey" />}</>}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 12, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                        <View style={{ overflow: 'hidden',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.20,
                                shadowRadius: 1.41,
                                elevation: 1,padding: 6, backgroundColor: calculateColor(type).bg, alignSelf: "flex-start", borderRadius: 8 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: calculateColor(type).color, }}>
                                {Capitalize(type)}
                            </Text>
                        </View>
                    </View>
                    <View >
                        {!edit ? <View style={[{ overflow: "hidden", padding: 6, marginRight: 30, borderRadius: 8, paddingLeft: 8 }, edit ? { backgroundColor: '#EFEFEF' }
                            : {}]}><Text style={done ? { textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 14 } : { fontSize: 14 }}>
                                {value}
                            </Text></View> : <View style={[{
                                overflow: 'hidden',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.20,
                                shadowRadius: 1.41,
                                elevation: 1, overflow: "hidden", padding: 6, marginRight: 30, borderRadius: 8, paddingLeft: 8
                            }, edit ? { backgroundColor: '#EFEFEF' }
                                : {}]}><TextInput
                                theme={{ roundness: 8 }}
                                outlineStyle={{ overflow: "hidden", borderRadius: 8 }}
                                style={{
                                    overflow: "hidden",
                                    borderRadius: 8
                                }}
                                multiline
                                onChangeText={text => { setValue(text); }}
                                value={value}
                            /></View>}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}


const stylesx = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkbox: {
        width: 64,
        height: 64
    }
})

