// // import Categories from '@/src/components/categories';
// // import Header from '@/src/components/Header';
// // import ItemListScreen from '@/src/components/ItemListScreen';
// // import PromotionSlider from '@/src/components/Slider';
// // import React from 'react';
// // import { View } from 'react-native';
// // const HomeScreen = () => {
// //   return (

// //   <View>
// //     <Header/>
// //     <PromotionSlider/>
// //     <Categories/>
// //     <ItemListScreen/>
// //      </View>

// //   )
// // }

// // export default HomeScreen;

// import Categories from "@/src/components/categories";
// import Header from "@/src/components/Header";
// import ItemListScreen from "@/src/components/ItemListScreen";
// import PromotionSlider from "@/src/components/Slider";
// import React from "react";
// import { ScrollView, StyleSheet, View } from "react-native";

// const HomeScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Header />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         style={styles.scrollViewContent}
//       >
//         <PromotionSlider />

//         <View style={{ height: 8 }} />

//         <Categories />

//         <View style={{ height: 8 }} />

//         <ItemListScreen />
//       </ScrollView>
//     </View>
//   );
// };


// export default HomeScreen;

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#F9FAFB",
// 	},
// 	scrollViewContent: {
//   backgroundColor: '#FFC107',
// },
// });

import Categories from "@/src/components/categories";
import Header from "@/src/components/Header";
import ItemListScreen from "@/src/components/ItemListScreen";
import PromotionSlider from "@/src/components/Slider";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const HomeScreen = () => {
	return (
		<View style={styles.container}>
			<Header />

			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.scrollViewContent}
			>
				{/* Wrap this section in orange background */}
				<View style={styles.promoSection}>
					<PromotionSlider />
					<View style={{ height: 8 }} />
					<Categories />
				</View>

				{/* Below this, back to default background */}
				<View style={{ height: 8 }} />
				<ItemListScreen />
			</ScrollView>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F9FAFB", // This applies to areas not covered by the orange
	},
	scrollViewContent: {
		// no backgroundColor here, so orange section and rest are distinct
	},
	promoSection: {
		backgroundColor: "#FFC107", // Apply theme color here
		paddingTop: 10,
		paddingBottom: 15,
	},
});
