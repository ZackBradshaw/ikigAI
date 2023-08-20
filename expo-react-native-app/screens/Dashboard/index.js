
import React, { useState, useEffect, useReducer } from 'react';
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
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useKeyboardVisible } from '../../hooks/keyboard';
import Card from './card';
import Mission from './mission';

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
            return {
                bg: '#191518',
                color: 'white'
            }
            break;
    }
}

export default function Dashboard() {
    const visible = useKeyboardVisible();
    const [color, setColor] = useState('#b02127'); // Get the first
    const [quoteX, setQuoteX] = useState('');
    const [category, setCategory] = useState('mission');
    const [isFocusCategory, setIsFocusCategory] = useState(false);
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [tasks, setTasks] = useState([{ id: 1, type: 'mission', value: 'Test1' }, { id: 2, type: 'profession', value: 'Test2' }, { id: 3, type: 'vocation', value: 'Test5' }, { id: 4, type: 'passion', value: 'Test4' }]);
    const [missions,setMissions] = useState([{ id: 1, type: 'mission', value: 'Test1' }, { id: 2, type: 'profession', value: 'Test2' }, { id: 3, type: 'vocation', value: 'Test5' }, { id: 4, type: 'passion', value: 'Test4' }]);
    const [tabIndex,setTabIndex] = useState(0)

    const add = () => {
        let tempTasks = tasks;
        tempTasks.push({ type: category, value: '', id: null })
        setTasks(tempTasks);
        forceUpdate();
    }

    const remove = (id) => {
        let tempTasks = tasks;
        for (let index = 0; index < tempTasks.length; index++) {
            const element = tempTasks[index];
            if (element.id === id) {
                tempTasks.splice(index, 1);
            }
        }
        console.log(tempTasks)
        setTasks(tempTasks);
        forceUpdate();
    }

    const props = {
        activeStrokeWidth: 15,
        inActiveStrokeWidth: 15,
        inActiveStrokeOpacity: 1
    };

    const data = [
        { label: 'Misson', value: 'mission' },
        { label: 'Profession', value: 'profession' },
        { label: 'Vocation', value: 'vocation' },
        { label: 'Passion', value: 'passion' },
    ];

    const renderLabel = () => {
        if (category || isFocusCategory) {
            return (
                <Text style={[styles.label, isFocusCategory && { color: '#FBAE3C' }]}>
                    Category
                </Text>
            );
        }
        return null;
    };

    return (

        <SafeAreaView style={styles.container}>
            <Bg style={styles.bg} />
             <KeyboardAwareScrollView style={{ zIndex: 0, elevation: 1 }}>
            
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ padding: 12, position: 'absolute', left: 0, top: 0 }}>
                        <View style={{ alignItems: 'center', marginBottom: 6 }}>
                            <View style={{
                                overflow: 'hidden',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.20,
                                shadowRadius: 1.41,
                                elevation: 1, padding: 6, backgroundColor: calculateColor('mission').bg, alignSelf: "flex-start", borderRadius: 8
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: calculateColor('mission').color, }}>
                                    Mission 45%
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ padding: 12, position: 'absolute', right: 0, top: 0 }}>
                        <View style={{ alignItems: 'center', marginBottom: 6 }}>
                            <View style={{
                                overflow: 'hidden',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.20,
                                shadowRadius: 1.41,
                                elevation: 1, padding: 6, backgroundColor: calculateColor('passion').bg, alignSelf: "flex-start", borderRadius: 8
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: calculateColor('passion').color, }}>
                                    Passion 45%
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ padding: 12, position: 'absolute', right: 0, bottom: 0 }}>
                        <View style={{ alignItems: 'center', marginBottom: 6 }}>
                            <View style={{
                                overflow: 'hidden',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.20,
                                shadowRadius: 1.41,
                                elevation: 1, padding: 6, backgroundColor: calculateColor('profession').bg, alignSelf: "flex-start", borderRadius: 8
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: calculateColor('profession').color, }}>
                                    Profession 45%
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ padding: 12, position: 'absolute', left: 0, bottom: 0 }}>
                        <View style={{ alignItems: 'center', marginBottom: 6 }}>
                            <View style={{
                                overflow: 'hidden',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.20,
                                shadowRadius: 1.41,
                                elevation: 1, padding: 6, backgroundColor: calculateColor('vocation').bg, alignSelf: "flex-start", borderRadius: 8
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: calculateColor('vocation').color, }}>
                                    Vocation 45%
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        backgroundColor: 'white', borderRadius: 90, padding: 6, margin: 55,marginTop:35, overflow: 'hidden',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.20,
                        shadowRadius: 1.41,
                        backgroundColor: 'white',
                        elevation: 2,
                    }}>

                        <CircularProgressBase
                            {...props}
                            value={80}
                            radius={81}
                            activeStrokeColor={'#4353FF'}
                            inActiveStrokeColor={'#F5F6FF'}
                        >
                            <CircularProgressBase
                                {...props}
                                value={80}
                                radius={67}
                                activeStrokeColor={'#00BA69'}
                                inActiveStrokeColor={'#F6FFF8'}
                            >
                                <CircularProgressBase
                                    {...props}
                                    value={87}
                                    radius={53}
                                    activeStrokeColor={'#E2445C'}
                                    inActiveStrokeColor={'#FFF8F5'}
                                >
                                    <CircularProgressBase
                                        {...props}
                                        value={62}
                                        radius={40}
                                        activeStrokeColor={'#F48C00'}
                                        inActiveStrokeColor={'#FFFAEA'}
                                    >
                                        <Logo style={{ height: 59, width: 59 }} />
                                    </CircularProgressBase>
                                </CircularProgressBase>
                            </CircularProgressBase>
                        </CircularProgressBase>
                    </View>
                </View>               
                
                <SegmentedControl
        
        containerMargin={16}
        segmentedControlWrapper={{
          backgroundColor: 'white',
          width: Dimensions.get('window').width - 32,
          borderRadius: 12,
          overflow: 'hidden',
          shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 1,
          },
          shadowOpacity: 0.20,
          shadowRadius: 1.41,
          elevation: 2,
        }}
        tileStyle={{
          margin: 4,
          backgroundColor: '#191518',
          overflow: 'hidden',
          shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 1,
          },
          shadowOpacity: 0.20,
          shadowRadius: 1.41,
          elevation: 2,
        }}
        segments={[
          <Segment
            title="ikigAI"
            inactiveTitleStyle={{color: '#191518'}}
            activeTitleStyle={{color: 'white'}}
            activeIconColor={'#F48C00'}
            icon={
              // Accepts react-native-vector-icons
              <MaterialCommunityIcons name="lightning-bolt" size={22} />
            }
          />,
          <Segment
            title="Goals"
            inactiveTitleStyle={{color: '#191518'}}
            activeTitleStyle={{color: 'white'}}
            activeIconColor={'#00BA69'}
            icon={<MaterialIcons name="auto-awesome" size={18} />}
          />,
        ]}
        // badgeValues={[null, 2]}
        onChange={index => setTabIndex(index)}
        currentIndex={tabIndex}
      />
                {tabIndex ==0 ?
                    <>
                    {missions.map((task, i) => <View key={i}>{i === tasks.length - 1 ? <View key={i} style={{ marginBottom: !visible ? 0 : 0 }}>
                        <Mission index={i} id={task.id} type={task.type} task={task.value} remove={remove} />
                    </View> : <View key={i}>
                        <Mission index={i} id={task.id} type={task.type} task={task.value} remove={remove} />
                    </View>}</View>)}
                    <View style={{ height: !visible?100:10, flex: 1 }}></View>
                    </>:

                    <>
                <View style={[styles.card, { marginBottom: -6, zIndex: 2, elevation: 2, marginTop: 8 }]}>
       
                    <View style={{ padding: 8, flexDirection: 'row' }}>
                    
                        <View style={{ flexGrow: 1, marginRight: 8 }}>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => {
                                add();
                            }}>
                                <View style={[styles.button, { flexDirection: 'row', borderRadius: 8, backgroundColor: calculateColor(category).bg, padding: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: calculateColor(category).color }]}>
                                    <Text style={{ color: calculateColor(category).color, fontWeight: 'bold' }}>
                                        Add
                                    </Text>
                                    <View style={{ marginLeft: 4 }}>
                                        <AntDesign name="plus" size={20} color={calculateColor(category).color} />
                                    </View>

                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexGrow: 1, minWidth: 80 }}>
                            <View style={{
                                backgroundColor: calculateColor(category).bg, borderRadius: 8, paddingLeft: 8, paddingRight: 8,
                                flex: 1, justifyContent: 'center', borderWidth: 1, borderColor: calculateColor(category).color, overflow: 'hidden',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.20,
                                shadowRadius: 1.41,

                                elevation: 2,
                            }}>
                                {/* {renderLabel()} */}
                                <Dropdown
                                    style={[styles.dropdown, isFocusCategory && { borderColor: calculateColor(category).color }]}
                                    placeholderStyle={[styles.placeholderStyle, { color: calculateColor(category).color, backgroundColor: calculateColor(category).bg }]}
                                    selectedTextStyle={[styles.selectedTextStyle, { color: calculateColor(category).color, backgroundColor: calculateColor(category).bg }]}
                                    inputSearchStyle={[styles.inputSearchStyle, { color: calculateColor(category).color, backgroundColor: calculateColor(category).bg }]}
                                    iconStyle={styles.iconStyle}
                                    containerStyle={{


                                    }}
                                    data={data}
                                    iconColor={calculateColor(category).color}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!isFocusCategory ? 'Category' : '...'}
                                    value={category}
                                    onFocus={() => setIsFocusCategory(true)}
                                    onBlur={() => setIsFocusCategory(false)}
                                    onChange={item => {
                                        setCategory(item.value);
                                        setIsFocusCategory(false);
                                    }}
                                    renderLeftIcon={() => (
                                        <FontAwesome5 name="tasks" style={styles.icon} size={15} color={calculateColor(category).color} />

                                    )}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                

                    {tasks.map((task, i) => <View key={i}>{i === tasks.length - 1 ? <View key={i} style={{ marginBottom: !visible ? 60 : 0 }}>
                        <Card index={i} id={task.id} type={task.type} task={task.value} remove={remove} />
                    </View> : <View key={i}>
                        <Card index={i} id={task.id} type={task.type} task={task.value} remove={remove} />
                    </View>}</View>)}
                    <View style={{ height: !visible ? 30 : 10, flex: 1 }}></View>
                    </>}

                    
                
            </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>

    );
}


