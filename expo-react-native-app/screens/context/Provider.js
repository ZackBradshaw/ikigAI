import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext();

export const useProvider = () => {
  return useContext(Context);
};

export const Provider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userInfo,setUserInfo] = useState({});
  const saveToken = async (newToken) => {
    try {
      await AsyncStorage.setItem('userToken', newToken);
      setToken(newToken);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  const loadToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) setToken(storedToken);
    } catch (error) {
      console.error('Error loading token:', error);
    }
  };


  return (
    <Context.Provider value={{ token, saveToken, loadToken,setUserInfo,userInfo }}>
      {children}
    </Context.Provider>
  );
};
