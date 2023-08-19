import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Appearance, ScrollView, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { getLocales, getCalendars } from 'expo-localization';
import SegmentedControl, { Segment } from "@hadnet/react-native-segmented-control";
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-element-dropdown';
import styles from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import Bg from './bg';
import * as Animatable from 'react-native-animatable';
import Logo from './logo'
import LongRoad from './longRoad';
import ShortRoad from './shortRoad';
import Carousel from './carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from '../context/ThemeContext';
const SlideFromTopAnimation = {
    0: {
        translateY: -Dimensions.get('window').height,
        opacity: 0,
        zIndex: 0,
        elevation: 0,
    },
    1: {
        translateY: 0,
        opacity: 1,
        zIndex: 1,
        elevation: 1
    },
};
const SlideFromTop2Animation = {
    0: {
        opacity: 0,
        zIndex: 0,
        elevation: 0
    },
    1: {
        opacity: 1,
        zIndex: 1,
        elevation: 1
    },
};
const SlideFromTop3Animation = {
    0: {
        opacity: 0,
        zIndex: 0,
        elevation: 0
    },
    1: {
        opacity: 1,
        zIndex: 1,
        elevation: 1
    },
};

const SlideFromBottomAnimation = {
    0: {
        translateY: 0,
    },
    1: {
        translateY: Dimensions.get('window').height,
    },
};
Animatable.initializeRegistryWithDefinitions({
    slideFromTop: SlideFromTopAnimation,
    slideFromBottom: SlideFromBottomAnimation,
    SlideFromTop2: SlideFromTop2Animation,
    slideFromTop3: SlideFromTop3Animation
});

export default function Survey({ navigation }) {
    const [showSurveys, setShowSurveys] = useState(false);
    const [hideChose, setHideChose] = useState(false);
    const [questions, setQuestions] = useState([]);
    const topRef = useRef(null);
    const bottomRef = useRef(null);
    const topRef2 = useRef(null);
    const topRef3 = useRef(null);
    useEffect(() => {
        const timeout = setTimeout(function () {
            // SurveyCards.current.moveY(Dimensions.get('window').height,{ duration: 2000 }).start()
            //   setHideChose(true) 
            // setShowSurveys(true)

            console.log('this')
        }, 3000)
        return () => {
            clearTimeout(timeout);
        }
    }, [])

    // useEffect(() => {
    //     if(questions.length){
    //     topRef.current.animate(SlideFromTopAnimation, 1000);
    //     bottomRef.current.animate(SlideFromBottomAnimation, 1000);

    //     }
    // }, [questions.length])

    return (
        <ThemeProvider>
        <SafeAreaView style={styles.container}>
            <Bg style={styles.bg} />

            <Animatable.View style={styles.surveyCardWrapper} ref={topRef}>
                <Animatable.View style={styles.surveyCardWrapper2} ref={topRef3}>
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Carousel navigation={navigation} data={[
                            {
                                "id": "1",
                                "title": "What activities make you lose track of time?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Reading fantasy novels",
                                    "Painting landscapes",
                                    "Playing musical instruments"
                                ]
                            },
                            {
                                "id": "2",
                                "title": "Recall a moment when you felt most alive. What were you doing?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Hiking on a mountain peak",
                                    "Attending a live music concert",
                                    "Traveling to a new country"
                                ]
                            },
                            {
                                "id": "3",
                                "title": "What hobbies or tasks do you love so much that you would do them for free?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Photography",
                                    "Teaching kids",
                                    "Cooking for friends and family"
                                ]
                            },
                            {
                                "id": "4",
                                "title": "Which topics or activities excite you the most when you think or talk about them?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Space exploration",
                                    "Ancient civilizations",
                                    "Innovations in technology"
                                ]
                            },
                            {
                                "id": "5",
                                "title": "What are the common themes in the books, movies, or articles that you enjoy?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Adventure and exploration",
                                    "Romantic relationships",
                                    "Mysteries and thrillers"
                                ]
                            },
                            {
                                "id": "6",
                                "title": "What causes or issues deeply resonate with you?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Environmental conservation",
                                    "Education for underprivileged children",
                                    "Animal rights and welfare"
                                ]
                            },
                            {
                                "id": "7",
                                "title": "If you had all the resources in the world, what problem would you want to solve?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "World hunger",
                                    "Access to clean water for all",
                                    "Global illiteracy"
                                ]
                            },
                            {
                                "id": "8",
                                "title": "What positive change would you like to bring to your community or the world?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Promote renewable energy sources",
                                    "Organize community clean-up drives",
                                    "Set up free educational workshops"
                                ]
                            },
                            {
                                "id": "9",
                                "title": "When you imagine a better world, what does it look like?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "A world without poverty and hunger",
                                    "A world where everyone has access to education",
                                    "A world living in harmony with nature"
                                ]
                            },
                            {
                                "id": "10",
                                "title": "What legacy do you want to leave behind?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "A foundation for underprivileged children",
                                    "A sustainable solution to a     global problem",
                                    "Inspiring others through art and literature"
                                ]
                            },
                            {
                                "id": "11",
                                "title": "What are your top three skills or talents?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Public speaking",
                                    "Analytical thinking",
                                    "Artistic creativity"
                                ]
                            },
                            {
                                "id": "12",
                                "title": "Which tasks or roles have you excelled in, in the past?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Team leadership",
                                    "Project management",
                                    "Content creation"
                                ]
                            },
                            {
                                "id": "13",
                                "title": "What kind of roles or jobs do people often seek your expertise or help in?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Financial advice",
                                    "Technical troubleshooting",
                                    "Event planning"
                                ]
                            },
                            {
                                "id": "14",
                                "title": "If you could choose any job in the world, what would it be?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Travel blogger",
                                    "Astronaut",
                                    "Wildlife conservationist"
                                ]
                            },
                            {
                                "id": "15",
                                "title": "Are there any roles or jobs that you've been curious about or considered exploring?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Culinary arts",
                                    "Film direction",
                                    "Marine biology"
                                ]
                            },
                            {
                                "id": "16",
                                "title": "What skills or talents do you possess that people would be willing to pay for?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Graphic design",
                                    "Coding and software development",
                                    "Language translation"
                                ]
                            },
                            {
                                "id": "17",
                                "title": "Have you ever been paid for doing something you absolutely loved? If so, what was it?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Photographing a scenic  location",
                                    "Tutoring in a favorite subject",
                                    "Performing at a music gig"
                                ]
                            },
                            {
                                "id": "18",
                                "title": "Which of your skills or talents have the most market demand?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Digital marketing",
                                    "Data analysis",
                                    "Web development"
                                ]
                            },
                            {
                                "id": "19",
                                "title": "Are there any industries or sectors you're particularly interested in?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Renewable energy",
                                    "Virtual reality and gaming",
                                    "Health and wellness"
                                ]
                            },
                            {
                                "id": "20",
                                "title": "If you were to start a business or offer a service, what would it be?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "A cafe with a bookshop",
                                    "A tech startup focusing on sustainable solutions",
                                    "A travel agency promoting eco-tourism"
                                ]
                            }
                        ]
                        } />
                    </View>
                </Animatable.View>
                <Animatable.View style={styles.surveyCardWrapper2} ref={topRef2}>
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Carousel navigation={navigation} data={[
                            {
                                "id": "1",
                                "title": "What activities make you lose track of time?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Reading fantasy novels",
                                    "Painting landscapes",
                                    "Playing musical instruments"
                                ]
                            },
                            {
                                "id": "2",
                                "title": "Recall a moment when you felt most alive. What were you doing?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Hiking on a mountain peak",
                                    "Attending a live music concert",
                                    "Traveling to a new country"
                                ]
                            },
                            {
                                "id": "6",
                                "title": "What causes or issues deeply resonate with you?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Environmental conservation",
                                    "Education for underprivileged children",
                                    "Animal rights and welfare"
                                ]
                            },
                            {
                                "id": "7",
                                "title": "If you had all the resources in the world, what problem would you want to solve?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "World hunger",
                                    "Access to clean water for all",
                                    "Global illiteracy"
                                ]
                            },
                            {
                                "id": "8",
                                "title": "What positive change would you like to bring to your community or the world?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Promote renewable energy sources",
                                    "Organize community clean-up drives",
                                    "Set up free educational workshops"
                                ]
                            },
                            {
                                "id": "11",
                                "title": "What are your top three skills or talents?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Public speaking",
                                    "Analytical thinking",
                                    "Artistic creativity"
                                ]
                            },
                            {
                                "id": "12",
                                "title": "Which tasks or roles have you excelled in, in the past?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Team leadership",
                                    "Project management",
                                    "Content creation"
                                ]
                            },
                            {
                                "id": "13",
                                "title": "What kind of roles or jobs do people often seek your expertise or help in?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Financial advice",
                                    "Technical troubleshooting",
                                    "Event planning"
                                ]
                            },
                            {
                                "id": "16",
                                "title": "What skills or talents do you possess that people would be willing to pay for?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Graphic design",
                                    "Coding and software development",
                                    "Language translation"
                                ]
                            },
                            {
                                "id": "17",
                                "title": "Have you ever been paid for doing something you absolutely loved? If so, what was it?",
                                "type": "text",
                                "correct": 1,
                                "answers": [
                                    "Photographing a scenic  location",
                                    "Tutoring in a favorite subject",
                                    "Performing at a music gig"
                                ]
                            },
                        ]} />
                    </View>

                </Animatable.View>

            </Animatable.View>


            <Animatable.View style={styles.surveyCardWrapperBase} ref={bottomRef} >
                <View style={styles.surveyCardWrapperBase} >
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={{ marginRight: 4 }}>
                                <Logo style={{ height: 40, width: 40 }} />
                            </View>
                            <Text style={styles.cardHeaderText}>Tell me more about yourself.</Text>
                        </View>

                        <TouchableOpacity style={styles.innerCard} onPress={() => {
                            topRef3.current.animate(SlideFromTop2Animation, 1000);
                            topRef.current.animate(SlideFromTopAnimation, 1000);
                            bottomRef.current.animate(SlideFromBottomAnimation, 1000);

                        }}>
                            <View>
                                <LongRoad style={{ maxWidth: 125, maxHeight: 125 }} />
                                <Text style={[styles.cardHeaderText, { marginBottom: 16 }]}>Take normal survey.</Text>
                            </View>

                        </TouchableOpacity>


                        <TouchableOpacity style={[styles.innerCard, { marginBottom: 16 }]} onPress={() => {

                            topRef.current.animate(SlideFromTopAnimation, 1000);
                            bottomRef.current.animate(SlideFromBottomAnimation, 1000);
                            topRef2.current.animate(SlideFromTop2Animation, 1000);
                        }}>
                            <View>
                                <ShortRoad style={{ maxWidth: 125, maxHeight: 125 }} />
                                <Text style={[styles.cardHeaderText, { marginBottom: 16 }]}>Take short survey.</Text>

                            </View>
                        </TouchableOpacity>

                    </View>

                </View>
            </Animatable.View>


        </SafeAreaView>
        </ThemeProvider>
    );
}


