import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
    backgroundColor: '#fff',
      },
      dropdown: {
        height: 50,
        borderColor: '#FBAE3C',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor:'#001220',
        color:'#FBAE3C',
        borderColor:'#FBAE3C'
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor:'#001220',
        color:'#FBAE3C',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        borderRadius:4
      },
      placeholderStyle: {
        fontSize: 16,
        backgroundColor:'#001220',
        color:'#FBAE3C',
        borderColor:'#FBAE3C'
      },
      selectedTextStyle: {
        fontSize: 16,
        backgroundColor:'#001220',
        color:'#FBAE3C',
        borderColor:'#FBAE3C'
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
        backgroundColor:'#001220',
        color:'#FBAE3C',
        borderColor:'#FBAE3C',
        borderRadius:8
      },

});


export default styles;