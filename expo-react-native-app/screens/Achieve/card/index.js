
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
                bg: '#F6FFF8',
                color: '#00BA69'
            }
            break;
        case "vocation":
            return {
                bg: '#FFF8F5',
                color: '#E2445C'
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

export default function Card({ index, type }) {
    const [done, setDone] = useState(false);
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState('Testing Testing Testing TestingTesting Testing Testing Testing Testing Testing Testing Testing TestingTesting Testing Testing Testing Testing Testin');

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={() => {
            console.log('pressed')
            setDone(!done)
        }}>
            <View style={index !== 0 ? [styles.cardTask] : [styles.cardTask, { marginTop: 8 }]}>
                <View style={{ position: 'absolute', right: 0, }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={(e) => {
                        setEdit(!edit)
                    }}>
                        <View style={{ height: 60, width: 60, justifyContent: 'center', alignItems: 'center' }}>
                            <Feather name="edit-3" size={20} color="grey" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ position: 'absolute', right: 0, bottom: 0, }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <View style={{ height:60, width: 60, justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesome name="trash-o" size={20} color="grey" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 12, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox
                            style={{ margin: 0, marginRight: 8 }}
                            value={done}
                            onValueChange={setDone}
                            color={done ? calculateColor(type).color : undefined}
                        />
                        <View style={{ padding: 6, backgroundColor: calculateColor(type).bg, alignSelf: "flex-start", borderRadius: 8 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: calculateColor(type).color, }}>
                                {Capitalize(type)}
                            </Text>
                        </View>
                    </View>
                    <View style={{ padding: 6, paddingRight: 20 }}>
                        {!edit ? <Text style={done ? { textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 16 } : { fontSize: 16 }}>
                            {value}
                        </Text> : <TextInput
                            style={{
                                width: '90%',
                                borderColor: 'gray',
                                borderWidth: 0,
                                padding: 2,
                            }}
                            multiline
                            onChangeText={text => setValue(value)}
                            value={value}
                        />}
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

