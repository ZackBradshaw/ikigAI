import * as React from 'react';

import {
  Button,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput, Text, View, Dimensions, TouchableOpacity
} from 'react-native';
import Bg from './bg';
import Logo from './logo';
import styles from './styles';
import { useKeyboardVisible } from '../../hooks/keyboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Box from './box';
export default function KeyboardAnimation() {
  const visible = useKeyboardVisible();

  return (
    <SafeAreaView style={stylesx.container}>
      <KeyboardAvoidingView style={[stylesx.container, {
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
            <ScrollView style={stylesx.scrollView} contentContainerStyle={{
              flexGrow:1,
              justifyContent: 'flex-end'
            }}>

              {[
                {type:'system',value:"Hello there I'm ikegai guru and here to help."},
                {type:'user',value:"Hello there I'm ikegai guru and here to help."},
                {type:'system',value:"Hello there I'm ikegai guru and here to help."},
                {type:'user',value:"Hello there I'm ikegai guru and here to help."},
                {type:'system',value:"Hello there I'm ikegai guru and here to help."},
                {type:'user',value:"Hello there I'm ikegai guru and here to help."},
                {type:'system',value:"# Testing a lot of text djaskbfkjasfjaskfjbaskjsfbjkfbaskjbfkasjbfjfkbaskj\n test\n```nfsjbfkjsahsajk sfhaskjhfkjashfkjsjkjsajkhfhjksahfkjas ```"},
                {type:'user',value:"Hello there I'm ikegai guru and here to help."},
                {type:'system',value:"Hello there I'm ikegai guru and here to help."},
                {type:'user',value:"Hello there I'm ikegai guru and here to help."},
                {type:'system',value:"Hello there I'm ikegai guru and here to help."},
              ].map((message,i)=>
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

            <TouchableOpacity style={{ width: 50, height: 50, position: 'absolute', right: 0, top: 40, backgroundColor: 'white', zIndex: 10, elevation: 2, justifyContent: 'center', alignItems: 'center', shadowColor: "#fff" }} activeOpacity={0.90} onPress={() => {

              console.log('1  ')
              console.log('safasfass')
            }}>
              <View >
                <View style={[styles.button, { height: 40, width: 40, flexDirection: 'row', borderRadius: 20, backgroundColor: '#191518', padding: 8, justifyContent: 'center', alignItems: 'center', zIndex: 1, elevation: 2 }]}>
                  <View style={{ transform: 'translateX(2px)' }}>
                    <IconMaterialIcons name="send" size={20} color="#fff" />
                  </View>
                </View>
              </View>


            </TouchableOpacity>
            <TextInput multiline numberOfLines={4} style={[stylesx.input, { marginBottom: visible ? 0 : 0, zIndex: -1, elevation: 0, position: 'relative', shadowColor: "transparent", }]} placeholder="Tap here" />

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