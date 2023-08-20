
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Appearance, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';


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

export default function Card({ index, type, id, task,remove }) {
    const [done, setDone] = useState(false);
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState('');

    useEffect(function () {
        setValue(task);
    }, [])

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={() => {
            setEdit(false)
            // setDone(!done)
        }}>
            <View style={index !== 0 ? [styles.cardTask, { marginTop: 8 }] : [styles.cardTask, { marginTop: 16}]}>
                <View style={{ position: 'absolute', right: 0, }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={(e) => {
                        setEdit(!edit)
                    }}>
                        <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                            {edit ? <AntDesign name="checkcircleo" size={20} color="grey" /> : <Feather name="edit-3" size={20} color="grey" />}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ position: 'absolute', right: 0, bottom: 0, }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={(e) => {
                        remove(id)
                    }}>
                        <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesome name="trash-o" size={20} color="grey" />
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

