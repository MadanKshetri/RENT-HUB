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

// import Categories from "@/src/components/categories";
// import Header from "@/src/components/Header";
// import ItemListScreen from "@/src/components/ItemListScreen";
// import PromotionSlider from "@/src/components/Slider";
// import React from "react";
// import { ScrollView, StyleSheet, View } from "react-native";

// const HomeScreen = () => {
// 	return (
// 		<View style={styles.container}>
// 			<Header />

// 			<ScrollView
// 				showsVerticalScrollIndicator={false}
// 				style={styles.scrollViewContent}
// 			>
// 				{/* Wrap this section in orange background */}
// 				<View style={styles.promoSection}>
// 					<PromotionSlider />
// 					<View style={{ height: 8 }} />
// 					<Categories />
// 				</View>

// 				{/* Below this, back to default background */}
// 				<View style={{ height: 8 }} />
// 				<ItemListScreen />
// 			</ScrollView>
// 		</View>
// 	);
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#F9FAFB", // This applies to areas not covered by the orange
// 	},
// 	scrollViewContent: {
// 		// no backgroundColor here, so orange section and rest are distinct
// 	},
// 	promoSection: {
// 		backgroundColor: "#FFC107", // Apply theme color here
// 		paddingTop: 10,
// 		paddingBottom: 15,
// 	},
// });
import { useGetItemsQuery } from "@/Api/query/itemsQuery";
import useAuthUserQuery from "@/Api/query/useAuthQuery";
import Header from "@/src/components/Header";
import LoginPromptModal from "@/src/components/LoginPromptModal ";
import PromotionSlider from "@/src/components/Slider";
import Categories from "@/src/components/categories";
import { useAuthStore } from "@/src/store/authStore";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from "react-native";


const HomeScreen = () => {

const { data: user, isSuccess } = useAuthUserQuery();
const userName = user?.data?.fullName;



const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  useEffect(()=>{
    if(isSuccess){
      login( )
    }
  },[isSuccess])
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useGetItemsQuery({});

  if (isLoading) {
    return <ActivityIndicator size="large" color="orange" />;
  }

  if (error) {
    return (
      <Text style={{ color: "red", textAlign: "center" }}>
        Failed to load items
      </Text>
    );
  }

  const items = data?.pages?.flatMap((page) => {
  console.log("Page item:", page);
  return page?.data ?? [];
}) ?? [];


  console.log("fetched Itmes",items);

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <Header/>
      <LoginPromptModal />
      <FlatList
        data={items}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingBottom: 24,
        }}
        ListHeaderComponent={() => (
          <>
            <View style={{ backgroundColor: "#FFC107", paddingVertical: 10 }}>
              <PromotionSlider />
              <View style={{ height: 8 }} />
              <Categories />
            </View>
            <View style={{ height: 8 }} />
          </>
        )}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 15,
          marginBottom: 12,
        }}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Pressable
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                overflow: "hidden",
                width: "48%",
                elevation: 2,
              }}
            >
              {item.assets?.[0]?.url && (
                <Image
                  source={{ uri: item.assets[0].url }}
                  style={{ width: "100%", height: 100 }}
                />
              )}
              <Text style={{ fontWeight: "600", padding: 8 }}>
                {item.name}
              </Text>
              <Text style={{ paddingHorizontal: 8, paddingBottom: 8 }}>
                Rs {item.rate}/{item.rateType}
              </Text>
            </Pressable>
          </Link>
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.3}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <ActivityIndicator size="small" color="orange" />
          ) : null
        }
      />
    </View>
  );
};

export default HomeScreen;
