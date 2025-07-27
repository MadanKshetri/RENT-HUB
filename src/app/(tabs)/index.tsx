// // // import Categories from '@/src/components/categories';
// // // import Header from '@/src/components/Header';
// // // import ItemListScreen from '@/src/components/ItemListScreen';
// // // import PromotionSlider from '@/src/components/Slider';
// // // import React from 'react';
// // // import { View } from 'react-native';
// // // const HomeScreen = () => {
// // //   return (

// // //   <View>
// // //     <Header/>
// // //     <PromotionSlider/>
// // //     <Categories/>
// // //     <ItemListScreen/>
// // //      </View>

// // //   )
// // // }

// // // export default HomeScreen;

// // import Categories from "@/src/components/categories";
// // import Header from "@/src/components/Header";
// // import ItemListScreen from "@/src/components/ItemListScreen";
// // import PromotionSlider from "@/src/components/Slider";
// // import React from "react";
// // import { ScrollView, StyleSheet, View } from "react-native";

// // const HomeScreen = () => {
// //   return (
// //     <View style={styles.container}>
// //       <Header />
// //       <ScrollView
// //         showsVerticalScrollIndicator={false}
// //         style={styles.scrollViewContent}
// //       >
// //         <PromotionSlider />

// //         <View style={{ height: 8 }} />

// //         <Categories />

// //         <View style={{ height: 8 }} />

// //         <ItemListScreen />
// //       </ScrollView>
// //     </View>
// //   );
// // };


// // export default HomeScreen;

// // const styles = StyleSheet.create({
// // 	container: {
// // 		flex: 1,
// // 		backgroundColor: "#F9FAFB",
// // 	},
// // 	scrollViewContent: {
// //   backgroundColor: '#FFC107',
// // },
// // });

// // import Categories from "@/src/components/categories";
// // import Header from "@/src/components/Header";
// // import ItemListScreen from "@/src/components/ItemListScreen";
// // import PromotionSlider from "@/src/components/Slider";
// // import React from "react";
// // import { ScrollView, StyleSheet, View } from "react-native";

// // const HomeScreen = () => {
// // 	return (
// // 		<View style={styles.container}>
// // 			<Header />

// // 			<ScrollView
// // 				showsVerticalScrollIndicator={false}
// // 				style={styles.scrollViewContent}
// // 			>
// // 				{/* Wrap this section in orange background */}
// // 				<View style={styles.promoSection}>
// // 					<PromotionSlider />
// // 					<View style={{ height: 8 }} />
// // 					<Categories />
// // 				</View>

// // 				{/* Below this, back to default background */}
// // 				<View style={{ height: 8 }} />
// // 				<ItemListScreen />
// // 			</ScrollView>
// // 		</View>
// // 	);
// // };

// // export default HomeScreen;

// // const styles = StyleSheet.create({
// // 	container: {
// // 		flex: 1,
// // 		backgroundColor: "#F9FAFB", // This applies to areas not covered by the orange
// // 	},
// // 	scrollViewContent: {
// // 		// no backgroundColor here, so orange section and rest are distinct
// // 	},
// // 	promoSection: {
// // 		backgroundColor: "#FFC107", // Apply theme color here
// // 		paddingTop: 10,
// // 		paddingBottom: 15,
// // 	},
// // });
// import { useGetItemsQuery } from "@/Api/query/itemsQuery";
// import useAuthUserQuery from "@/Api/query/useAuthQuery";
// import Header from "@/src/components/Header";
// import LoginPromptModal from "@/src/components/LoginPromptModal ";
// import PromotionSlider from "@/src/components/Slider";
// import Categories from "@/src/components/categories";
// import { useAuthStore } from "@/src/store/authStore";
// import { Link } from "expo-router";
// import React, { useEffect } from "react";
// import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from "react-native";


// const HomeScreen = () => {

// const { data: user, isSuccess } = useAuthUserQuery();
// const userName = user?.data?.fullName;



// const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
//   const login = useAuthStore((state) => state.login);
//   const logout = useAuthStore((state) => state.logout);
//   useEffect(()=>{
//     if(isSuccess){
//       login( )
//     }
//   },[isSuccess])
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     error,
//   } = useGetItemsQuery({});

//   if (isLoading) {
//     return <ActivityIndicator size="large" color="orange" />;
//   }

//   if (error) {
//     return (
//       <Text style={{ color: "red", textAlign: "center" }}>
//         Failed to load items
//       </Text>
//     );
//   }

//   const items = data?.pages?.flatMap((page) => {
//   console.log("Page item:", page);
//   return page?.data ?? [];
// }) ?? [];


//   console.log("fetched Itmes",items);

//   return (
//     <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
//       <Header/>
//       <LoginPromptModal />
//       <FlatList
//         data={items}
//         numColumns={2}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={{
//           paddingBottom: 24,
//         }}
//         ListHeaderComponent={() => (
//           <>
//             <View style={{ backgroundColor: "#FFC107", paddingVertical: 10 }}>
//               <PromotionSlider />
//               <View style={{ height: 8 }} />
//               <Categories />
//             </View>
//             <View style={{ height: 8 }} />
//           </>
//         )}
//         columnWrapperStyle={{
//           justifyContent: "space-between",
//           paddingHorizontal: 10,
//           marginBottom: 12,
//         }}
//         renderItem={({ item }) => (
//           <Link href={`/product/${item.id}`} asChild>
//             <Pressable
//               style={{
//                 backgroundColor: "#fff",
//                 borderRadius: 10,
//                 overflow: "hidden",
//                 width: "48%",
//                 elevation: 2,
//               }}
//             >
//               {item.assets?.[0]?.url && (
//                 <Image
//                   source={{ uri: item.assets[0].url }}
//                   style={{ width: "100%", height: 100 }}
//                 />
//               )}
//               <Text style={{ fontWeight: "600", padding: 8 }}>
//                 {item.name}
//               </Text>
//               <Text style={{ paddingHorizontal: 8, paddingBottom: 8 }}>
//                 Rs {item.rate}/{item.rateType}
//               </Text>
//             </Pressable>
//           </Link>
//         )}
//         onEndReached={() => {
//           if (hasNextPage && !isFetchingNextPage) {
//             fetchNextPage();
//           }
//         }}
//         onEndReachedThreshold={0.3}
//         ListFooterComponent={() =>
//           isFetchingNextPage ? (
//             <ActivityIndicator size="small" color="orange" />
//           ) : null
//         }
//       />
//     </View>
//   );
// };

// export default HomeScreen;

import { useGetItemsQuery } from "@/Api/query/itemsQuery";
import useAuthUserQuery from "@/Api/query/useAuthQuery";
import { useGetTrendingItemsQuery } from "@/Api/query/useGetTrendingItemsQuery";
import Header from "@/src/components/Header";
import LoginPromptModal from "@/src/components/LoginPromptModal ";
import PromotionSlider from "@/src/components/Slider";
import Categories from "@/src/components/categories";
import { useAuthStore } from "@/src/store/authStore";
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import { Heart, Star, TrendingUp } from 'lucide-react-native';
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";


const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 40) / 2;

const colors = {
  primary: "#FFC107",
  secondary: "#1E3A8A",
  background: "#F8F9FA",
  text: "#333333",
  lightText: "#666666",
  error: "#D32F2F",
  placeholder: "#999999",
  white: "#FFFFFF",
  shadow: "rgba(0, 0, 0, 0.1)",
};

const HomeScreen = () => {
  const { data: user, isSuccess } = useAuthUserQuery();
  const userName = user?.data?.fullName;

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (isSuccess) {
      login();
    }
  }, [isSuccess]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useGetItemsQuery({});

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading amazing items...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load items</Text>
        <Text style={styles.errorSubtext}>Please check your connection and try again</Text>
      </View>
    );
  }

  const items = data?.pages?.flatMap((page) => {
    console.log("Page item:", page);
    return page?.data ?? [];
  }) ?? [];

  // Mock trending items (you can replace with actual trending data)
const {
  data: trendingData,
  isLoading: isTrendingLoading,
  isError: isTrendingError,
} = useGetTrendingItemsQuery();
console.log("trending data",trendingData)

const trendingItems = trendingData?.data || [];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} size={12} color={colors.primary} fill={colors.primary} />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} size={12} color={colors.primary} fill={colors.primary} />
        );
      } else {
        stars.push(
          <Star key={i} size={12} color={colors.placeholder} />
        );
      }
    }
    return stars;
  };

  const TrendingItemCard = ({ item }) => (
    <Link href={`/product/${item.id}`} asChild>
      <Pressable style={styles.trendingCard}>
        <View style={styles.trendingImageContainer}>
          {item.assets?.[0]?.url && (
            <Image
              source={{ uri: item.assets[0].url }}
              style={styles.trendingImage}
            />
          )}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.trendingGradient}
          />
          <View style={styles.trendingBadge}>
            <TrendingUp size={12} color={colors.white} />
            <Text style={styles.trendingBadgeText}>Trending</Text>
          </View>
        </View>
        <View style={styles.trendingContent}>
          <Text style={styles.trendingTitle} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.trendingRating}>
            {renderStars(item.rating || 4.2)}
            <Text style={styles.ratingText}>({item.reviewCount || 23})</Text>
          </View>
          <Text style={styles.trendingPrice}>
            Rs {item.rate}/{item.rateType}
          </Text>
        </View>
      </Pressable>
    </Link>
  );

  const ItemCard = ({ item }) => (
    <Link href={`/product/${item.id}`} asChild>
      <Pressable style={styles.itemCard}>
        <View style={styles.imageContainer}>
          {item.assets?.[0]?.url && (
            <Image
              source={{ uri: item.assets[0].url }}
              style={styles.itemImage}
            />
          )}
          <Pressable style={styles.favoriteButton}>
            <Heart size={16} color={colors.lightText} />
          </Pressable>
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {renderStars(item.rating || 4.1)}
            </View>
            <Text style={styles.ratingText}>
              {item.rating || 4.1} ({item.reviewCount || 15})
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              Rs {item.rate}
            </Text>
            <Text style={styles.rateType}>
              /{item.rateType}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );

  return (
    <View style={styles.container}>
      <Header />
      <LoginPromptModal />
      <FlatList
        data={items}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            {/* Promotion Section */}
            <LinearGradient
              colors={[colors.primary, '#FFD54F']}
              style={styles.promotionSection}
            >
              <PromotionSlider />
              <View style={styles.spacing} />
              <Categories />
            </LinearGradient>

            {/* Trending Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleContainer}>
                  <TrendingUp size={20} color={colors.secondary} />
                  <Text style={styles.sectionTitle}>Trending Now</Text>
                </View>
                <Text style={styles.seeAllText}>See All</Text>
              </View>
             {isTrendingLoading ? (
  <ActivityIndicator size="small" color={colors.primary} />
) : isTrendingError ? (
  <Text style={styles.errorText}>Could not load trending items</Text>
) : (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.trendingScrollContainer}
  >
    {trendingItems.map((item, index) => (
      <TrendingItemCard key={`trending-${item.id}-${index}`} item={item} />
    ))}
  </ScrollView>
)}

            </View>

            {/* All Items Section Header */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>All Items</Text>
                <Text style={styles.itemCount}>{items.length} items</Text>
              </View>
            </View>
          </>
        )}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => <ItemCard item={item} />}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.3}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.loadingMoreText}>Loading more items...</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: colors.lightText,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 24,
  },
  promotionSection: {
    paddingVertical: 16,
    marginBottom: 8,
  },
  spacing: {
    height: 8,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
    letterSpacing: 0.3,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: '600',
  },
  itemCount: {
    fontSize: 14,
    color: colors.lightText,
    fontWeight: '500',
  },
  trendingScrollContainer: {
    paddingRight: 16,
  },
  trendingCard: {
    width: 160,
    marginRight: 12,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trendingImageContainer: {
    position: 'relative',
    height: 120,
  },
  trendingImage: {
    width: '100%',
    height: '100%',
  },
  trendingGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  trendingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },
  trendingBadgeText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: '600',
    marginLeft: 2,
  },
  trendingContent: {
    padding: 12,
  },
  trendingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
    lineHeight: 18,
  },
  trendingRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  trendingPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.secondary,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  itemCard: {
    width: ITEM_WIDTH,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    height: 140,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.white,
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  itemContent: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 18,
  },
  ratingContainer: {
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  ratingText: {
    fontSize: 11,
    color: colors.lightText,
    fontWeight: '500',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.secondary,
  },
  rateType: {
    fontSize: 12,
    color: colors.lightText,
    fontWeight: '500',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingMoreText: {
    marginTop: 8,
    fontSize: 14,
    color: colors.lightText,
    fontWeight: '500',
  },
});

export default HomeScreen; 