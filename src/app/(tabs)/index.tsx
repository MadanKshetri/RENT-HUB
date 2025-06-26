// import Categories from '@/src/components/categories';
// import Header from '@/src/components/Header';
// import ItemListScreen from '@/src/components/ItemListScreen';
// import PromotionSlider from '@/src/components/Slider';
// import React from 'react';
// import { View } from 'react-native';
// const HomeScreen = () => {
//   return (    
    
//   <View>  
//     <Header/>
//     <PromotionSlider/>
//     <Categories/> 
//     <ItemListScreen/>
//      </View>

 


//   )
// } 

// export default HomeScreen;


import Categories from '@/src/components/categories';
import Header from '@/src/components/Header';
import ItemListScreen from '@/src/components/ItemListScreen';
import PromotionSlider from '@/src/components/Slider';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

const HomeScreen = () => {
  return (    
    <View style={styles.container}>
      {/* Header is outside the ScrollView, so it remains fixed */}
      <Header/>

      {/* The rest of the content is wrapped in a ScrollView */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={styles.scrollViewContent}
        decelerationRate="normal" // This prop makes the scrolling slow and steady
      >
        <PromotionSlider/>
        <Categories/> 
        <ItemListScreen/> 
      </ScrollView>
    </View> 
  );
}; 

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  scrollViewContent: {
    // Optional: Add any padding or styling specific to the scrollable area
  }
});



