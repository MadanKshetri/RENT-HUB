import Categories from '@/src/components/categories';
import Header from '@/src/components/Header';
import ItemListScreen from '@/src/components/ItemListScreen';
import React from 'react';
import { StyleSheet, View } from 'react-native';
const HomeScreen = () => {
  return (    
    
  <View>  
    <Header/>
    <Categories/> 
    <ItemListScreen/>
  </View>

 


  )
} 

export default HomeScreen;

const styles = StyleSheet.create({})