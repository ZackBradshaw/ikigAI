
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Appearance, ScrollView, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { getLocales, getCalendars } from 'expo-localization';
import SegmentedControl, { Segment } from "@hadnet/react-native-segmented-control";
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-element-dropdown';
import styles from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import Bg from './bg'
import Logo from './logo'
import TypeWriter from '@sucho/react-native-typewriter';
import { SafeAreaView } from 'react-native-safe-area-context';
import Quote from './inspirational-quotes-master/lib'

const BACKGROUND = '#263238'
const WHITE = 'black'
const PINK = '#b02127'

const stylesx = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: BACKGROUND,
    justifyContent: 'center',
  },
  typeWriterText: {
    color: WHITE,
    fontSize: 24,
  },
  typeWriterCursorText: {
    color: '#ffff',
    fontSize: 18,
  },
})


export default function Achieve() {
  const [color, setColor] = useState('#b02127'); // Get the first
  const [quoteX,setQuoteX] = useState('')
    useEffect(()=>{
      const timeout = setTimeout(function(){
        setColor('#FFF')
      },4000)
      setQuoteX(Quote.getRandomQuote({ author: false }))
      return ()=>{
        clearTimeout(timeout);
      }
    },[])

  return (
    <SafeAreaView style={styles.container}>
 <Bg style={styles.bg} />
 <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
 <View style={[styles.card]}>
 <View style={styles.cardHeader}>
                                <View style={{marginRight:4}}>
                               <Logo style={{height:40,width:40}}/>
                                </View>
                                <TypeWriter
        textArray={["ikigAI"]}
        speed={100}
        delay={0}
        
        textStyle={styles.cardHeaderText}
        cursorStyle={[stylesx.typeWriterCursorText,{color:color}]}
      />


                            </View>
                            <View style={{padding:12}}>
                            <TypeWriter
        textArray={["Hello Xxx. Xxx, "+quoteX+" Complete daily tasks to achieve your ikigai."]}
        speed={20}
        delay={0}
        textStyle={styles.cardHeaderText}
        cursorStyle={stylesx.typeWriterCursorText}
      />
                            {/* <Text style={styles.cardHeaderText}>Hello Xxx. Xxx there is no turning back you need to achieve your goals. A small stone today a big one tomorrow.</Text>                 */}
                            </View>
 </View>

 <View style={[styles.cardTask,{marginTop:0}]}>
    <View style={{padding:12}}>

    <View style={{padding:12}}>

     </View>
     </View>
 </View>
  <View style={[styles.cardTask]}>
    <View style={{padding:12}}>

    <View style={{padding:12}}>
      
     </View>
     </View>
 </View>
 </View>
     </SafeAreaView>
  );
}


