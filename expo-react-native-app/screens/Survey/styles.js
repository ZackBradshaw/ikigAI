import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems:"center",
    position:'absolute',
    bottom:0,right:0,top:0,left:0  
  },surveyCardWrapper:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    justifyContent:'center',
    alignItems:'center',
   position:'relative',
   opacity:0,
   // backgroundColor:'blue',
   // top:-Dimensions.get('window').height
   top:0
  },surveyCardWrapper2:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    justifyContent:'center',
    alignItems:'center',
   position:'absolute',
   opacity:0,
   // backgroundColor:'blue',
   // top:-Dimensions.get('window').height
 top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },surveyCardWrapperBase:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
   // backgroundColor:'blue',
   // top:-Dimensions.get('window').height
   // transform:'translateY(-'+Dimensions.get('window').height+"px)"
  },
    bg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get("window").height,
        elevation: 0
    }, cardWrapper:{
          
        width: Dimensions.get('window').width - 64,
        height: Dimensions.get('window').height - 128,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    },
    innerCard:{
      overflow: 'hidden',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      backgroundColor: 'white',
      elevation: 2,
      margin:16,
      marginBottom:0,
      flex:2,
      borderRadius: 8,
      justifyContent:'center',
      alignItems:'center',
      
    },
    card: {
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        backgroundColor: 'white',
        elevation: 2,
        width: Dimensions.get('window').width - 64,
        height: 400,
        borderRadius: 8,
    },cardRegister: {
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        backgroundColor: 'white',
        elevation: 2,
        width: Dimensions.get('window').width - 64,
        height: 600,
        borderRadius: 8,
    },  cardHeader: {
        overflow: 'hidden',
        shadowColor: "#000",
        flexDirection:'row',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2, alignItems: 'center', justifyContent: 'center', padding: 8, backgroundColor: '#fff'
    },cardHeaderText:{
        color: '#191518', fontWeight: 'bold', fontSize: 16
    },
    inputWrapper:{
    padding:4,
    borderRadius:8,
    borderWidth:1,
    borderColor:'#191518',
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    backgroundColor: 'white',
    elevation: 2,
    },
    inputLabel:{
        marginBottom:8,
        marginLeft:2
    },
    input: {
        height: 40,
        margin: 0,
        padding: 4,
        paddingBottom:1,
        paddingTop:1
    },button:{
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2, 
    },wrapperPassword:{
        position:'absolute',
        right:0,
        paddingRight:0,
        // backgroundColor:'red',
        height:50,
        width:50,
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        elevation: 3,
        zIndex:10,
    }

});


export default styles;