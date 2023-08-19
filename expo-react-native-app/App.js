
import { StyleSheet, Text, View,Dimensions,Appearance  } from 'react-native';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginRegister from './screens/LoginRegister';
import Badge from "@nghinv/react-native-badge";
import Main from './screens/Main'
import SurveyScreen from './screens/Survey'
import Achieve from './screens/Achieve'
import React from 'react';
import {
  Alert,
  Animated,
  TouchableOpacity
} from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();
const Screen1 = () => {
  return <View style={styles.screen1} />;
};
const Screen2 = () => {
  return <View style={styles.screen2} />;
};
const Screen3 = () => {
  return <View style={styles.screen1} />;
};

function MainScreen() {
  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'Achieve':
        icon = 'ios-home-outline';
        break;
      case 'Dashboard':
        icon = 'settings-outline';
        break;
    }

    const getIcon = () => {
      switch(routeName) {
        case "Achieve":   return <MaterialCommunityIcons name="state-machine" size={24} color="#191518" />;
        case "Dashboard":   return <AntDesign name="dashboard" size={24} color="#191518" />;
        default:      return <></>
      }
    }

    return (
      <View>
        {getIcon()}
      </View>
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
        <Text>{routeName=='Achieve'?'Achive':'Dashboard'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    
      <CurvedBottomBarExpo.Navigator
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={55}
        circleWidth={50}
        bgColor="white"
        initialRouteName="title1"
        borderTopLeftRight
        screenOptions={({ route }) => ({ headerShown: false })} 
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('Dasboard')}
            >
              <Ionicons name={'chatbox-ellipses-outline'} color="white" size={25} />
            </TouchableOpacity>
            <Badge
              backgroundColor="#191518"
              containerStyle={styles.badge}
              label={10}
              size={15}
              labelFormatterLimit={2}
            />
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBarExpo.Screen
          name="Achieve"
          position="LEFT"
          screenOptions={({ route }) => ({ headerShown: false })} 
          component={Achieve}
        />
        <CurvedBottomBarExpo.Screen
          name="Dashboard"
          screenOptions={({ route }) => ({ headerShown: false })} 
          component={() => <Screen2 />}
          position="RIGHT"
        />
        <CurvedBottomBarExpo.Screen
          name="Dashboard"
          screenOptions={({ route }) => ({ headerShown: false })} 
          component={() => <Screen2 />}
          
        />
      </CurvedBottomBarExpo.Navigator>

  );
}


function App() {
  
  return (
    <SafeAreaProvider>
        
        <StatusBar
        animated={true}
        backgroundColor="#191518"
        style="light"
        hidden={false}
      />
    <NavigationContainer>
    
      <Stack.Navigator>
        <Stack.Screen  options={{ headerShown: false }} name="Home" component={LoginRegister} />
        <Stack.Screen  options={{ headerShown: false }} name="Main" component={MainScreen} />
        <Stack.Screen  options={{ headerShown: false}} name="Survey" component={SurveyScreen} />
      </Stack.Navigator>
      
    </NavigationContainer>
    
    </SafeAreaProvider>
      
      
  );
}

export default App;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },  badge: {
    position: "absolute",
    top: 1,
    right: 2,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b02127',
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
});
