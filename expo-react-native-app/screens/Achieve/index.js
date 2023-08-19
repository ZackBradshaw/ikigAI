
import React, { useState, useEffect,useReducer } from 'react';
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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Card from './card'

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
  const [quoteX, setQuoteX] = useState('');
  const [exchange, setExchange] = useState(null);
  const [isFocusExchange, setIsFocusExchange] = useState(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [tasks,setTasks] = useState([{ id:1,type: 'mission',value:'Test1' }, { id:2,type: 'profession',value:'Test2' }, {id:3, type: 'vocation',value:'Test5' }, { id:4,type: 'passion',value:'Test4' }]);
  useEffect(() => {
    const timeout = setTimeout(function () {
      setColor('#FFF')
    }, 4000)
    setQuoteX(Quote.getRandomQuote({ author: false }))
    return () => {
      clearTimeout(timeout);
    }
  }, []);

  const remove = (id)=>{
    let tempTasks = tasks;
    for (let index = 0; index < tempTasks.length; index++) {
      const element = tempTasks[index];
      if(element.id === id){
        tempTasks.splice(index,1);
      } 
    }
    console.log(tempTasks)
    setTasks(tempTasks);
    forceUpdate();
  }

  
  const data = [
    { label: 'Misson', value: 'mission' },
    { label: 'Profession', value: 'pprofession' },
    { label: 'Vocation', value: 'vocation' },
    { label: 'Passion', value: 'passion' },
  ];

  const renderLabel = () => {
    if (exchange || isFocusExchange) {
      return (
        <Text style={[styles.label, isFocusExchange && { color: '#FBAE3C' }]}>
          Exchange
        </Text>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Bg style={styles.bg} />
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <View style={[styles.card, { marginBottom: 0 }]}>
          <View style={styles.cardHeader}>
            <View style={{ marginRight: 4 }}>
              <Logo style={{ height: 40, width: 40 }} />
            </View>
            <TypeWriter
              textArray={["ikigAI"]}
              speed={100}
              delay={0}

              textStyle={styles.cardHeaderText}
              cursorStyle={[stylesx.typeWriterCursorText, { color: color }]}
            />


          </View>
          <View style={{ padding: 12 }}>
            <TypeWriter
              textArray={["Hello Xxx. Xxx, " + quoteX + " Complete daily tasks to achieve your ikigai."]}
              speed={20}
              delay={0}
              textStyle={styles.cardHeaderText}
              cursorStyle={stylesx.typeWriterCursorText}
            />
            {/* <Text style={styles.cardHeaderText}>Hello Xxx. Xxx there is no turning back you need to achieve your goals. A small stone today a big one tomorrow.</Text>                 */}
          </View>
        </View>
        <View style={[styles.card, { marginBottom: -6,zIndex:2,elevation:2 }]}>     
          <View style={{ padding: 12,flexDirection:'row' }}>
            <View style={{flexGrow:1,marginRight:8}}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => {
                                     
                                    }}>
                                        <View style={[styles.button, { flexDirection:'row',borderRadius: 8, backgroundColor: '#191518', padding: 12, justifyContent: 'center', alignItems: 'center' }]}>
                                            <Text style={{ color: 'white' }}>
                                                Add
                                            </Text>
                                            <View style={{marginLeft:4}}>
                                            <AntDesign name="plus" size={20} color="white" />
                                </View>

                                        </View>
                                    </TouchableOpacity>
                                    </View>
                                    <View style={{flexGrow:1,minWidth:80}}>
                                    <View style={{
            backgroundColor: '#001220',borderRadius:8,paddingLeft:8,paddingRight:8,
            flex: 1,justifyContent:'center'
          }}>
            {/* {renderLabel()} */}
                                    <Dropdown
              style={[styles.dropdown, isFocusExchange && { borderColor: '#FBAE3C' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              containerStyle={{
                
                
              }}
              data={data}
              iconColor={`#FFF`}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocusExchange ? 'Category' : '...'}
              value={exchange}
              onFocus={() => setIsFocusExchange(true)}
              onBlur={() => setIsFocusExchange(false)}
              onChange={item => {
                setExchange(item.value);
                setIsFocusExchange(false);
              }}
              renderLeftIcon={() => (
                <IconMaterialIcons style={styles.icon} name="attach-money" size={20} color={isFocusExchange ? '#FBAE3C' : '#FBAE3C'} />
              )}
            />
            </View>
            </View>
        </View>
        </View>
        <ScrollView style={{zIndex:0,elevation:1}}>
     
          {tasks.map((task, i) => <View key={i}>
            <Card index={i} id={task.id} type={task.type} task={task.value} remove={remove} />
          </View>)}
          <View style={{ height: 290, flex: 1 }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}


