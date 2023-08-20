import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,ActivityIndicator,
    KeyboardAvoidingView, Platform, TextInput
} from "react-native";
import Svg, {
    Path,
    Rect,

} from "react-native-svg";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Icon } from "react-native-eva-icons";
import Logo from '../logo'
import Carousel, { getInputRangeFromIndexes } from "react-native-snap-carousel";
import ProgressBar from "react-native-animated-progress";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { useProvider } from '../../context/Provider';
import axios from 'axios';
const BASE_URL = 'https://ikig-ai.me/api';

export default function Survey({ navigation, route,data }) {
    const [step, setStep] = useState(0);
    const [finalAnswers,setFinalAnswers]= useState([]);
    const flatListRef = useRef(null);
    const [loading,setLoading] = useState(false);
    const [questions, setQuestions] = useState(data);
    // reverse array order in one line: array.reverse()
    const [wrong, setWrong] = useState(0);
    const [correctA, setCorrectA] = useState(2);
    const [firstDate, setFirstDate] = useState(new Date());
    const [currentAnswers, setCurrentAnswers] = useState([]);
    const [extraInputs, setExtraInputs] = useState([]);
    const forceUpdate = React.useState()[1].bind(null, {});
    const [progress,setProgress] = useState(0);
    const [progressText,setProgressText] = useState('0/'+data.length);
    const { token, loadToken } = useProvider();

    useEffect(()=>{
        loadToken();
    },[])
    
    const addAnswer = (index, answer) => {
        var newAnswers = currentAnswers;
        newAnswers[index] = answer;
        setCurrentAnswers(newAnswers);
        
        //forceUpdate();
    };
    const _scrollInterpolator = (index, carouselProps) => {
        const range = [3, 2, 1, 0, -1];
        const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
        const outputRange = range;

        return { inputRange, outputRange };
    };
    const _renderItem = ({ item, index }) => {
        return (
            <>
                <Text></Text>
                <QuestionCard
                    indexxx={index + 1}
                    total={questions.length}
                    title={item.title}
                    type={item.type}
                    image={item.image}
                    description={item.description}
                    theme={'survey'}
                    correct={item.correct}
                    answers={item.answers}
                    answer={currentAnswers[index]}
                    step={step}
                /></>
        );
    };
   
    const sendSurvey = async (token,finalAnswers) => {
       console.log(finalAnswers)
        try {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Survey is procession!',
                textBody: "Please be patient while we process your survey."
              });
          const response = await axios.post(`${BASE_URL}/survey`,{
            survey:finalAnswers
          }, {
            headers:{
                'Authorization':`Bearer ${token}`
            }
          });
          console.log(response.data)
          if(response.data.success){
            setLoading(false);
            navigation.navigate("Main");
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

    const _animatedStyles = (index, animatedValue, carouselProps) => {
        const sizeRef = carouselProps.vertical
            ? carouselProps.itemHeight
            : carouselProps.itemWidth;
        const translateProp = carouselProps.vertical ? "translateY" : "translateX";

        return {
            zIndex: carouselProps.data.length - index,
            opacity: animatedValue.interpolate({
                inputRange: [2, 3],
                outputRange: [1, 0],
            }),
            transform: [
                {
                    rotate: animatedValue.interpolate({
                        inputRange: [-1, 0, 1, 2, 3],
                        outputRange: ["-25deg", "0deg", "-3deg", "1.8deg", "0deg"],
                        extrapolate: "clamp",
                    }),
                },
                {
                    [translateProp]: animatedValue.interpolate({
                        inputRange: [-1, 0, 1, 2, 3],
                        outputRange: [
                            -sizeRef * 0.5,
                            0,
                            -sizeRef, // centered
                            -sizeRef * 2, // centered
                            -sizeRef * 3, // centered
                        ],
                        extrapolate: "clamp",
                    }),
                },
            ],
        };
    };
    const QuestionCard = ({
        title,
        indexxx,
        type,
        theme,
        description,
        image,
        answers,
        step,
        answer,
    }) => {
        const [answered, setAnswered] = useState(answer);
        const indexx = indexxx;
        const [extraInput,setExtraInput] = useState('');
        const [counter,setCounter] = useState(0);
   
        useEffect(() => {
      
            const timeout = setTimeout(function(){
              
                let tempMatrix =[]; 
                for (let index = 0; index < currentAnswers.length; index++) {
                    const element = currentAnswers[index];
                    if(element?.length){
                        tempMatrix.push(index);
                    }
                }
                for (let index = 0; index < extraInputs.length; index++) {
                    const element = extraInputs[index];
                    let isThere = false;
                    for (let index1 = 0; index1 < tempMatrix.length; index1++) {
                        const element = tempMatrix[index1];
                        if(element === index){
                            isThere = true;
                        }
                    }
                    if(element?.length && !isThere){
                        tempMatrix.push(index)
                    }
                }
                setProgressText(tempMatrix.length+'/'+questions.length)
                setProgress(parseInt((100 / questions.length) * tempMatrix.length));
    
            },1500)
            return ()=>{
                clearTimeout(timeout);
               }
       
           
        }, [counter]);
        return (

           
                
                <View
                    style={[
                        styles.questionCard,
                        {
                           // height: Dimensions.get("window").height - 250,
                            margin: 4,
                            marginBottom: 100,
                            padding: 8,
                            paddingRight: 8,

                        },
                    ]}
                >
                  
                        <View style={{ padding: 8, paddingRight: 24, paddingLeft: 4, paddingBottom: 0 }}>
                            <View
                                style={[
                                    styles.questionCountContainer,
                                    {
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: "100%",
                                    },
                                ]}
                            >
                                <View
                                    style={[
                                        styles.questionCount,
                                        {
                                            overflow: 'hidden',
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 1,
                                            },
                                            shadowOpacity: 0.20,
                                            shadowRadius: 1.41,
                                            elevation: 2,
                                            backgroundColor: "#191518",
                                            maxHeight: 35,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: 8,
                                            marginBottom: 8,
                                            marginLeft:2,
                                        },
                                    ]}
                                >
                                    <Text style={{fontWeight:'bold',color:'white'}}>{indexx}/{questions.length}</Text>
                                </View>
                                <View style={{ position: "absolute", right: -22, top: -4 }}>
                                    <TouchableOpacity>
                                        <View>
                                        <Logo style={{ height: 40, width: 40 }} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={styles.questionTitle}>{title}</Text>
                            
                                <Image
                                    resizeMode="contain"
                                    style={{ width: "100%", marginBottom: 0, borderRadius: 4 }}
                                    // source={{ uri: image }}
                                    source={image}
                                />
                            
                            <Text
                                style={{
                                    fontSize: 18,
                                    marginTop: -8,
                                    marginBottom: 24,
                                    //backgroundColor:'#f7f7f7',padding:10,
                                    borderRadius: 8,
                                }}
                            >
                                {description}
                            </Text>

                            <ScrollView>
                                {answers?.map((answer, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={
                                            index == answers?.length - 1
                                                ? {
                                                    flexDirection: "row",
                                                    paddingBottom: 19,
                                                    alignItems: "center",
                                                }
                                                : {
                                                    flexDirection: "row",
                                                    paddingBottom: 19,
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: "rgba(0, 0, 0, 0.2)",
                                                    alignItems: "center",
                                                }
                                        }
                                        onPress={() => {
                                            
                                                setAnswered(index);
                                               
                                                addAnswer(indexxx-1,answers[index])
                                                const tempQuesitons = questions;
                                                const tempCurrentAnswers = currentAnswers;
                                                if(tempQuesitons[indexxx-1].selected == null){
                                                    tempQuesitons[indexxx-1].selected =index;
                                                }else if(tempQuesitons[indexxx-1].selected == index){
                                                    tempQuesitons[indexxx-1].selected =null;
                                                    tempCurrentAnswers[indexxx-1] = null;
                                                }else {
                                                    tempQuesitons[indexxx-1].selected =index;
                                                }
                                                setCurrentAnswers(tempCurrentAnswers);
                                                setQuestions(tempQuesitons)
                                                setCounter(counter+1)
                                        }
                                        }
                                    >
                                        
                                            <>
                                                {
                                                    questions[indexxx-1].selected  === index ? (
                                                        <Svg
                                                            style={index !== 0 ? { marginTop: 16 } : {}}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                        >
                                                            <Path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M0.833344 10.0002C0.833344 4.93755 4.9374 0.833496 10 0.833496C15.0626 0.833496 19.1667 4.93755 19.1667 10.0002C19.1667 15.0628 15.0626 19.1668 10 19.1668C4.9374 19.1668 0.833344 15.0628 0.833344 10.0002Z"
                                                                fill="#b02127"
                                                            />
                                                            <Path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M14.4256 6.70264C14.751 7.02807 14.751 7.55571 14.4256 7.88115L9.25297 13.2978C8.92754 13.6232 8.3999 13.6232 8.07446 13.2978L5.57446 10.7978C5.24902 10.4724 5.24902 9.94474 5.57446 9.6193C5.8999 9.29387 6.42754 9.29387 6.75297 9.6193L8.66372 11.53L13.2471 6.70264C13.5725 6.3772 14.1001 6.3772 14.4256 6.70264Z"
                                                                fill="white"
                                                            />
                                                        </Svg>
                                                    ) : (
                                                        <Svg
                                                            style={index !== 0 ? { marginTop: 16 } : {}}
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <Path
                                                                d="M19.5 10C19.5 15.2467 15.2467 19.5 10 19.5C4.75329 19.5 0.5 15.2467 0.5 10C0.5 4.75329 4.75329 0.5 10 0.5C15.2467 0.5 19.5 4.75329 19.5 10Z"
                                                                fill="white"
                                                                stroke="#191518"
                                                            />
                                                        </Svg>
                                                    )}
                                            </>
                                        
                                        <View style={index !== 0 ? { marginTop: 16,flexDirection:'row' ,flexShrink: 1} : {flexDirection:'row',flexShrink: 1}}>
                                            
                                                <Text
                                                    style={{
                                                        marginLeft: 8,
                                                        fontSize: 14,
                                                        color: "#191518",
                                                        zIndex:999,
                                                        elevation:3,flex: 1, flexWrap: 'wrap'
                                                    }}
                                                >
                                                    {answer}
                                                </Text>
                                            
                                        </View>
                                    </TouchableOpacity>
                                ))}
                             </ScrollView>





                        </View>
               

                    <View
                        style={{
                            width: Dimensions.get("window").width - 64 - 24,
                            borderRadius: 8,
                            borderColor: '#E0E0E0',
                            borderWidth: 1,
                            padding: 16,
                            paddingTop: 8,
                            marginTop: 8,
                            marginBottom: 8,
                            position: 'relative',
                            marginLeft: -14,
                            paddingBottom: 8,
                            paddingRight: 45,

                            justifyContent: "center",
                        }}
                    >
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            style={{ height: 50, textAlignVertical: 'top', }}
                            placeholder={"Add extra input or write another answer..."}
                            value={extraInputs[indexxx-1]}
                            onChangeText={(text) => {
                            
                            setExtraInput(text)
                            let tempExtraInputs = extraInputs;
                            let tempCurrentAnswers = currentAnswers;
                            if(!tempCurrentAnswers[indexxx-1]){
                                tempCurrentAnswers[indexxx-1]=""
                            }
                           
                            tempExtraInputs[indexxx-1] = text;
                            
                            setExtraInputs(tempExtraInputs)
                            
                            setCurrentAnswers(tempCurrentAnswers);
                            
                            setCounter(counter+1)
                           
                            }}
                        />
                        {/* <TextInput /> */}
                        <View style={{ position: "absolute", bottom: -1, right: -1, height: 46, width: 40, borderTopRightRadius: 8, borderBottomRightRadius: 8 }}>
                            <TouchableOpacity onPress={()=>{
                                
                                if(indexxx === questions.length){
                                    setLoading(true);
                                    let tempMatrix =[]; 
                                    for (let index = 0; index < currentAnswers.length; index++) {
                                        const element = currentAnswers[index];
                                        if(element?.length){
                                            tempMatrix.push(index);
                                        }
                                    }
                                    for (let index = 0; index < extraInputs.length; index++) {
                                        const element = extraInputs[index];
                                        let isThere = false;
                                        for (let index1 = 0; index1 < tempMatrix.length; index1++) {
                                            const element = tempMatrix[index1];
                                            if(element === index){
                                                isThere = true;
                                            }
                                        }
                                        if(element?.length && !isThere){
                                            tempMatrix.push(index)
                                        }
                                    }
                                    if(tempMatrix.length==questions.length){
                                        let tempFinalAnswers = finalAnswers;
                                        for (let index = 0; index < currentAnswers.length; index++) {
                                            const answer = currentAnswers[index];
                                            if(answer && extraInputs[index]?.length){
                                                tempFinalAnswers[index]={
                                                    answer:answer+". "+extraInputs[index],
                                                    question:questions[index].title
                                            }
                                            }else if(!answer && extraInputs[index]?.length ){
                                                tempFinalAnswers[index]={
                                                    answer:extraInputs[index],
                                                    question:questions[index].title
                                                }
                                            }else {
                                                
                                                tempFinalAnswers[index]={
                                                    answer:answer,
                                                    question:questions[index].title
                                                }
                                            }
                                        }
                                        sendSurvey(token,tempFinalAnswers)




                                    }else{
                                        Toast.show({
                                            type: ALERT_TYPE.DANGER,
                                            title: 'Error',
                                            textBody: "Finalize the survey first!",
                                          });
                                          setTimeout(function(){
                                            setLoading(false); 
                                          },1000)
                                        
                                    }
                                   // navigation.navigate("Main")
                                }else{
                                    flatListRef.current.snapToNext();
                                }
                               
                            }}>
                                <View style={{ width: '100%', height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                   {loading?<ActivityIndicator size="small" color="#b02127"/>:
                                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="#b02127" />
                                    </Svg>}
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View>

                    </View>

                </View>

           
        );
    };

    return (
            <AlertNotificationRoot>        
        <KeyboardAwareScrollView
            vertical
            key={1}
        >     
                    <View  style={{flex:1}}>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 80,
                    margin: 16,
                    width: Dimensions.get('window').width - 32,
                    borderRadius: 9,
                    maxHeight:90,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 1.41,
                    backgroundColor: 'white',
                    elevation: 22,
                    margin: 16,
                    flex: 2,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 25
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        margin: 16,
                        marginBottom: 4,
                        textTransform: "uppercase",
                        color: "#191518",
                    }}
                >
                    Survey progress
                </Text>

                <View
                    style={{
                        justifyContent: "space-evenly",
                        paddingHorizontal: 0,
                        marginBottom: 0,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            paddingRight: 50,
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 16,
                        }}
                    >
                        <View
                            style={{
                                minHeight: 30,
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: 50,
                            }}
                        >
                            <View style={{ marginRight: 12, marginLeft: 0 }}>
        
                                <ProgressBar
                                    progress={progress}
                                    height={11}
                                    backgroundColor="#b02127"
                                    trackColor="#191518"
                                    style={{ maxWidth: 19 }}
                                />
                                <Text
                                    style={{
                                        height: 0,
                                        width: Dimensions.get("window").width - 100,
                                        opacity: 0,
                                    }}
                                >
                                    Progress without animation
                                </Text>
                            </View>
                        </View>
                        <Text
                            style={{ fontWeight: "bold", fontSize: 12, color: "#191518" }}
                        >
                            {/* {currentAnswers.length} */}
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 12,
                                    color: "#191518",
                                    letterSpacing: 1.5,
                                }}
                            >
                               {progressText}
                            </Text>
                            {/* {questions.length} */}
                        </Text>
                    </View>

                    <View></View>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Carousel
                    // use flat list ref to scroll to the end code:
                    scrollInterpolator={_scrollInterpolator}
                    ref={flatListRef}
                    layout={"default"}
                    // layout={'tinder'} layoutCardOffset={`18`}
                    //  startIndex={questions.length-1}
                    useScrollView={true}
                    data={questions}
                  //  scrollEnabled={true}
                    renderItem={_renderItem}
                    sliderWidth={Dimensions.get("window").width}
                    itemWidth={Dimensions.get("window").width - 64}
                    slideInterpolatedStyle={_animatedStyles}
                    keyboardShouldPersistTaps='always'
                />
            </View>
            </View>
        </KeyboardAwareScrollView>
        </AlertNotificationRoot>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1F3F6",
    },
    header: {
        backgroundColor: "white",
        //  paddingTop: StatusBar.currentHeight,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowRadius: 4,
        shadowColor: "rgba(166, 171, 189, 0.25)",
        shadowOpacity: 1,
        elevation: 4,
        marginBottom: 8,
        zIndex: 1,
    },
    headerTitle: {
        minHeight: 44,
        alignItems: "center",
        flexDirection: "row",
        paddingBottom: 8,
        justifyContent: "space-between",
        width: "100%",
    },
    back: {
        marginLeft: 16,
        marginRight: 16,
    },
    headerTitleText: {
        fontSize: 20,
        color: "#333333",
        fontWeight: "bold",
        flex: 1,
        flexWrap: "wrap",
    },
    cardContainer: {
        width: "100%",
        padding: 8,
        flexDirection: "row",
        marginBottom: 6,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowRadius: 4,
        shadowColor: "rgba(166, 171, 189, 0.25)",
        shadowOpacity: 1,
        elevation: 3,
        zIndex: 1,
    },
    cardImage: {
        height: 64,
        width: 64,
        borderRadius: 8,
    },
    cardImageContainer: {
        marginLeft: 12,
        borderRadius: 8,
    },
    cardTitle: {
        color: "#333333",
        fontSize: 16,
        flex: 1,
        flexWrap: "wrap",
        fontWeight: "bold",
    },
    titleContainer: {
        marginLeft: 12,
        flexGrow: 1,
        flex: 1,
        justifyContent: "space-between",
    },
    cardInfo: {
        flexDirection: "row",
    },
    cardTime: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardTimeText: {
        color: "#333333",
        marginLeft: 9,
    },
    cardQuestions: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 16,
    },
    cardCompleted: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardCompletedContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 4,
    },
    cardCompletedText: {
        marginLeft: 4,
        fontWeight: "bold",
        fontSize: 12,
    },
    cardImageTop: {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        opacity: 0.6,
        top: 0,
        position: "absolute",
    },
    mainHeader: {
        //paddingTop:StatusBar.currentHeight,
        backgroundColor: "#FFFFFF",
    },
    container: {
        flex: 1,
        backgroundColor: "#F1F3F6",
    },
    containerHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    greetings: {
        color: "#333333",
        fontSize: 20,
        fontWeight: "bold",
    },
    performanceText: {
        color: "#4F4F4F",
        fontSize: 18,
    },
    wrapperHeader: {
        padding: 16,
        height: 87,
        marginBottom: 8,
    },
    memorizationWrapper: {
        padding: 16,
        paddingTop: 0,
    },
    memorizationHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    memorizationTitle: {
        color: "#5E5873",
        fontSize: 14,
        textTransform: "uppercase",
        marginLeft: 8,
        fontWeight: "bold",
    },
    memorizationContainer: {
        flexDirection: "row",
        marginTop: 8,
    },
    memorizationCircle: {
        width: 9,
        height: 9,
        backgroundColor: "#00CA72",
        borderRadius: 4.5,
    },
    memorizationDetailsContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 3,
    },
    memorizationText: {
        color: "#333333",
        fontSize: 14,
        marginLeft: 8,
        fontWeight: "bold",
    },
    topWrapper: {
        backgroundColor: "#FFFFFF",
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
        marginBottom: 8,
    },
    knowledgeRow: {
        flexDirection: "row",
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 8,
    },
    knowledgeCard: {
        padding: 4,
        width: (Dimensions.get("window").width - 48) / 3,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 4,
    },
    knowledgeTitle: {
        width: "100%",
        textAlign: "center",
        textTransform: "uppercase",
        fontSize: 10,
        fontWeight: "bold",
        color: "#5E5873",
        minHeight: 26,
    },
    knowledgeProgresWrapper: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 4,
    },
    knowledgeInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    knowledgeInfoTextLeft: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#4F4F4F",
    },
    knowledgeInfoWrapper: {
        alignItems: "center",
        justifyContent: "center",
    },
    knowledgeInfoTextRight: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#828282",
    },
    softRowWrapper: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 12,
    },
    softRow: {
        justifyContent: "center",
    },
    softInfoWrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 8,
        position: "absolute",
        left: 0,
    },
    infoPercentage: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#000000",
        marginLeft: 8,
    },
    softTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#5E5873",
        textTransform: "uppercase",
        marginBottom: 4,
    },
    tasksTitleWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
        marginRight: 16,
        marginLeft: 16,
        marginBottom: 8,
    },
    tasksTitle: {
        color: "#333333",
        fontSize: 20,
        fontWeight: "bold",
    },
    cardContainer: {
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 16,
        borderRadius: 8,
        padding: 16,
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "#E0E0E0",
    },
    cardInfoHeader: {
        marginLeft: 16,
    },
    cardInfoHeaderWrapper: {
        flexDirection: "row",
        paddingBottom: 16,
    },
    cardInfoHeaderText: {
        color: "#4F4F4F",
        fontSize: 16,
        textTransform: "uppercase",
        fontWeight: "bold",
    },
    cardInfoHeaderSubText: {
        color: "#828282",
        fontSize: 12,
    },
    cardInfoRight: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
    },
    cardInfoRightTextWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardInfoRightText: {
        color: "#4F4F4F",
        fontSize: 14,
        fontWeight: "bold",
    },
    titleCard: {
        color: "#333333",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 8,
        marginBottom: 16,
    },
    bottomCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    time: {
        color: "#4F4F4F",
        fontSize: 12,
    },
    tag: {
        padding: 8,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: "white",
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    tagText: {
        fontSize: 13,
        marginLeft: 8,
    },
    wrapperCompleted: {
        alignItems: "center",
        marginBottom: 100,
    },
    completedTasks: {
        width: 69.82,
        height: 95.12,
    },
    completedTasksText: {
        color: "#333333",
        fontSize: 18,
        fontWeight: "bold",
    },
    wrapperNoTasks: {
        alignItems: "center",
        marginBottom: 100,
    },
    NoTasksSvg: {
        marginBottom: 16,
        marginTop: 16,
    },
    NoTasksText: {
        color: "rgba(0, 0, 0, 0.3)",
        fontSize: 16,
        fontWeight: "bold",
        maxWidth: 200,
        textAlign: "center",
    },
    coursesHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingRight: 16,
        paddingLeft: 16,
        height: 30,
        marginBottom: 8,
    },
    headerText: {
        color: "#333333",
        fontSize: 20,
        fontWeight: "bold",
    },
    cardHeader: {
        flexDirection: "row",
    },
    cardInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardInfoText: {
        color: "#333333",
        fontSize: 12,
    },
    cardInfoSvg: {
        marginRight: 8,
    },
    card: {
        backgroundColor: "#FFFFFF",
        marginRight: 8,
        marginLeft: 8,
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,

        elevation: 1,
    },
    cardIcon: {
        marginRight: 16,
        marginTop: -4,
    },
    cardTypeText: {
        color: "#333333",
        fontSize: 12,
        fontWeight: "bold",
    },
    cardTag: {
        justifyContent: "flex-start",
        alignItems: "flex-end",
        flexGrow: 1,
        marginLeft: 16,
    },
    cardTitle: {
        color: "#333333",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 4,
    },
    cardDescription: {
        color: "#4F4F4F",
        fontSize: 14,
        marginTop: 8,
    },
    cardCreationTime: {
        color: "#828282",
        fontSize: 12,
        marginTop: 8,
    },
    cardCreationTimeTime: {
        color: "#333333",
        fontSize: 12,
    },
    cardMeetingText: {
        color: "#828282",
        fontSize: 12,
    },
    cardMeetingTitle: {
        color: "#333333",
        fontSize: 18,
        fontWeight: "bold",
    },
    cardMeetingTimeContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16.5,
    },
    cardMeetingLocationContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 16.5,
    },
    cardMeetingTimeText: {
        color: "#000000",
        marginLeft: 16,
        fontSize: 14,
    },
    cardMeetingLocationSvg: {
        marginTop: 2,
    },
    cardMeetingActionsWrapper: {
        flexDirection: "row",
        marginTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
    cardMeetingActionsNo: {
        marginRight: 8,
        height: 40,
        borderWidth: 1,
        borderColor: "#E2445C",
        width: 94,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    cardMeetingActionsNoText: {
        color: "#E2445C",
        fontSize: 14,
    },
    cardMeetingActionsYes: {
        height: 40,
        borderWidth: 1,
        backgroundColor: "#E2445C",
        borderColor: "#E2445C",
        flexGrow: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    cardMeetingActionsYesText: {
        color: "#FFFFFF",
        fontSize: 14,
    },
    cardMeetingDescriptionTitle: {
        color: "#333333",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 16,
    },
    cardMeetingDescription: {
        color: "#828282",
        fontSize: 16,
        marginTop: 8,
    },
    topButtons: {
        flexDirection: "row",
        padding: 4,
        backgroundColor: "#E4E7ED",
        margin: 8,
        borderRadius: 8,
    },
    testButton: {
        marginTop: 8,
        height: 40,
        backgroundColor: "#FDAB3D",
        width: "100%",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    surveyButton: {
        marginTop: 8,
        height: 40,
        backgroundColor: "#00CA72",
        width: "100%",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    competitionButton: {
        marginTop: 8,
        height: 40,
        backgroundColor: "#E2445C",
        width: "100%",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    pisaButton: {
        marginTop: 8,
        height: 40,
        backgroundColor: "#4353FF",
        width: "100%",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    bottomView: {
        height: 8,
    },
    dropdown: {
        margin: 0,
        marginBottom: 0,
        height: 34,
        backgroundColor: "white",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(224, 224, 224, 1)",
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        paddingLeft: 16,
        paddingRight: 16,
        height: 42,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textItem: {
        flex: 1,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 14,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    dropdownContainer: {
        borderRadius: 8,
    },
    cardNotions: {
        padding: 16,
        backgroundColor: "#FFFF",
        margin: 8,
        marginBottom: 0,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    cardNotionsTop: {
        flexDirection: "row",
    },
    cardNotionsTitle: {
        color: "#333333",
        fontWeight: "bold",
        fontSize: 18,
        marginLeft: 8,
        flex: 1,
        flexWrap: "wrap",
    },
    cardNotionsBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardNotionsStatus: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    cardNotionsStatusText: {
        color: "#4F4F4F",
        fontSize: 12,
        fontWeight: "bold",
    },
    tag: {
        padding: 8,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: "white",
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    tagText: {
        fontSize: 13,
        marginLeft: 8,
    },
    tag: {
        padding: 8,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: "white",
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    cardTag: {
        justifyContent: "flex-start",
        alignItems: "flex-end",
        flexGrow: 1,
        marginLeft: 16,
    },
    tagText: {
        fontSize: 13,
        marginLeft: 8,
    },
    centeredView: {
        flex: 1,

        marginTop: 0,
        backgroundColor: "rgba(245,246,249,0.85)",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "#F1F3F6",
        height: 0,
    },
    containerContent: {
        flex: 1,
        backgroundColor: "#F1F3F6",
    },
    containerMain: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 130,
    },
    logoContainer: {
        alignItems: "center",
        marginRight: 40,
        marginLeft: 40,
    },
    mainText: {
        color: "#333333",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginTop: 66,
    },
    header: {
        backgroundColor: "#FFFFFF",
        //paddingTop: StatusBar.currentHeight,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
        zIndex: 1,
    },
    headerType: {
        color: "#828282",
        fontSize: 12,
        fontWeight: "bold",
    },
    headerTitle: {
        alignItems: "center",
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10,
        width: Dimensions.get("window").width - 8,
    },
    back: {
        marginLeft: 16,
        marginRight: 16,
    },
    headerTitleText: {
        fontSize: 16,
        color: "#333333",
        fontWeight: "bold",
        flexShrink: 1,
        paddingRight: 16,
    },
    startTest: {
        height: 40,
        backgroundColor: "#4353FF",
        borderRadius: 8,
        width: Dimensions.get("window").width - 66,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 56,
    },
    testSvg: {
        position: "absolute",
        right: 13,
    },
    testText: {
        fontSize: 14,
        color: "#FFFFFF",
    },
    questionCard: {
        padding: 16,
        paddingRight: 24,
        paddingLeft: 24,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        marginTop: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    questionCountContainer: {
        alignSelf: "flex-start",
    },
    questionCount: {
        padding: 8,
        borderRadius: 8,
    },
    questionCountText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    questionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333333",
        marginTop: 16,
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 23,
    },
    buttonBack: {
        marginRight: 16,
        alignItems: "center",
        paddingLeft: 16,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#4353FF",
        paddingTop: 11,
        paddingBottom: 11,
        borderRadius: 8,
    },
    buttonBackText: {
        color: "#4353FF",
        fontSize: 14,
        marginLeft: 11,
        marginRight: 25,
    },
    buttonNext: {
        backgroundColor: "#4353FF",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    buttonNextText: {
        color: "#FFFFFF",
        fontSize: 14,
    },
    buttonNextSvg: {
        position: "absolute",
        right: 12,
    },
    bottomOfTest: {
        height: 8,
    },
    overlay: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "white",
        opacity: 0.7,
    },
    imageAnswer: {
        width: "100%",
        height: 189,
        borderRadius: 8,
    },
    imageAnswerImage: {
        borderRadius: 8,
    },
    imageOverlay: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "white",
        opacity: 0.4,
        borderRadius: 8,
    },
    subHeaderText: {
        color: "#828282",
        textAlign: "center",
        fontSize: 16,
        marginTop: 16,
    },
    headerTitle: {
        position: "relative",
        minHeight: 44,
        alignItems: "center",
        flexDirection: "row",
        paddingBottom: 8,
        justifyContent: "space-between",
        width: "100%",
        paddingRight: 16,
        paddingTop: 8,
    },
});
