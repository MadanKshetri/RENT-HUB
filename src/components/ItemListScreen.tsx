
// // import { useGetItemsQuery } from "@/Api/query/itemsQuery";
// // import { Link } from "expo-router";
// // import React from "react";
// // import {
// // 	ActivityIndicator,
// // 	Dimensions,
// // 	FlatList,
// // 	Image,
// // 	Pressable,
// // 	StyleSheet,
// // 	Text
// // } from "react-native";

// // const numColumns = 2;
// // const screenWidth = Dimensions.get("window").width;
// // const itemMargin = 12;
// // const itemWidth = (screenWidth - itemMargin * (numColumns + 1)) / numColumns;

// // const ItemListScreen = () => {
// // 	const { isLoading, error, data } = useGetItemsQuery();

// // 	if (isLoading) return <ActivityIndicator size="large" color="orange" />;
// // 	if (error) return <Text style={styles.error}>Failed to load items</Text>;

// // 	return (
// // 		<FlatList
// // 			data={data}
// // 			keyExtractor={(item) => item.id.toString()}
// // 			numColumns={numColumns}
// // 			key={numColumns}
// // 			renderItem={({ item }) => (
// // 				<Link
// // 					href={`/product/${item.id}`}
// // 					asChild
// // 				>
// // 					<Pressable style={styles.itemCard}>
// // 						{item.assets?.[0]?.url && (
// // 							<Image
// // 								source={{ uri: item.assets[0].url }}
// // 								style={styles.image}
// // 								resizeMode="cover"
// // 							/>
// // 						)}
// // 						<Text style={styles.title}>{item.name}</Text>
// // 						<Text style={styles.price}>
// // 							Rs {item.rate}/{item.rateType}
// // 						</Text>
// // 					</Pressable>
// // 				</Link>
// // 			)}
// // 			contentContainerStyle={styles.container}
// // 		/>
// // 	);
// // };

// // export default ItemListScreen;

// // const styles = StyleSheet.create({
// // 	container: {
// // 		padding: itemMargin,
// // 	},
// // 	itemCard: {
// // 		width: itemWidth,
// // 		backgroundColor: "#fff",
// // 		borderRadius: 12,
// // 		overflow: "hidden",
// // 		margin: itemMargin / 2,
// // 		elevation: 2,
// // 		shadowColor: "#000",
// // 		shadowOffset: { width: 0, height: 1 },
// // 		shadowOpacity: 0.1,
// // 		shadowRadius: 2,
// // 	},
// // 	image: {
// // 		width: "100%",
// // 		height: 120,
// // 	},
// // 	title: {
// // 		fontSize: 16,
// // 		fontWeight: "600",
// // 		paddingHorizontal: 8,
// // 		paddingTop: 8,
// // 	},
// // 	price: {
// // 		fontSize: 14,
// // 		color: "#555",
// // 		paddingHorizontal: 8,
// // 		paddingBottom: 10,
// // 	},
// // 	error: {
// // 		color: "red",
// // 		textAlign: "center",
// // 		marginTop: 20,
// // 	},
// // });


// import { useGetItemsQuery } from "@/Api/query/itemsQuery";
// import { Feather } from '@expo/vector-icons'; // Import Feather for the heart icon
// import { Link } from "expo-router";
// import React from "react";
// import {
// 	ActivityIndicator,
// 	Dimensions,
// 	FlatList,
// 	Image,
// 	Pressable,
// 	StyleSheet,
// 	Text, // Import View for wrapping
// 	TouchableOpacity,
// 	View, // Import View for wrapping
// } from "react-native";

// const numColumns = 2;
// const screenWidth = Dimensions.get("window").width;
// const sectionPaddingHorizontal = 15; // Overall horizontal padding for the section
// const itemGap = 12; // Gap between the cards in a row and around the edges

// // Calculate itemWidth to ensure proper spacing and fit two columns
// const itemWidth = (screenWidth - (sectionPaddingHorizontal * 2) - itemGap) / numColumns;

// const ItemListScreen = () => {
//   const { isLoading, error, data } = useGetItemsQuery();

//   if (isLoading) return <ActivityIndicator size="large" color="orange" style={styles.loadingIndicator} />;
//   if (error) return <Text style={styles.errorText}>Failed to load items</Text>;

//   return (
//     <View style={styles.sectionContainer}>
//       {/* Title and "See more" button for the Recommended section */}
//       <View style={styles.titleContainer}>
//         <Text style={styles.sectionTitle}>Recommended</Text>
//         <TouchableOpacity>
//           <Text style={styles.seeMoreText}>See more</Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={numColumns}
//         key={numColumns} // Key prop to force re-render if numColumns changes (though static here)
//         renderItem={({ item }) => (
//           <Link
//             href={`/product/${item.id}`} // Navigate to product detail
//             asChild
//           >
//             <Pressable style={styles.itemCard}>
//               {item.assets?.[0]?.url && (
//                 <Image
//                   source={{ uri: item.assets[0].url }}
//                   style={styles.image}
//                   resizeMode="cover"
//                 />
//               )}
//               {/* "New!" Badge */}
//               {/* You might want to add a condition here, e.g., if item.isNew */}
//               <View style={styles.newBadge}>
//                 <Text style={styles.newBadgeText}>New!</Text>
//               </View>

//               {/* Heart Icon for Wishlist */}
//               <TouchableOpacity style={styles.wishlistIconContainer}>
//                 <Feather name="heart" size={18} color="#999" />
//               </TouchableOpacity>

//               <Text style={styles.title}>{item.name}</Text>
//               <Text style={styles.price}>
//                 Rs {item.rate}/{item.rateType}
//               </Text>
//             </Pressable>
//           </Link>
//         )}
//         contentContainerStyle={styles.flatListContainer}
//         // columnWrapperStyle helps distribute space evenly between columns
//         columnWrapperStyle={styles.columnWrapper}
//       />
//     </View>
//   );
// };

// export default ItemListScreen;

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginVertical: 15,
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//     paddingHorizontal: sectionPaddingHorizontal,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#222',
//   },
//   seeMoreText: {
//     fontSize: 14,
//     color: '#888',
//     fontWeight: '600',
//   },
//   loadingIndicator: {
//     marginTop: 20,
//   },
//   errorText: {
//     color: "red",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   flatListContainer: {
//     paddingHorizontal: sectionPaddingHorizontal - itemGap / 2, // Adjust to absorb half the itemGap
//   },
//   columnWrapper: {
//     justifyContent: 'space-between', // Distribute items evenly
//     marginBottom: itemGap, // Gap between rows
//   },
//   itemCard: {
//     width: itemWidth,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     overflow: "hidden", // Ensures image corners are rounded
//     // marginHorizontal is handled by columnWrapperStyle and flatListContainer padding
//     marginHorizontal: itemGap / 2, // Half margin on each side for the gap between items
//     // Shadow properties for a subtle lifted effect
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   image: {
//     width: "100%",
//     height: 120, // Height for the image
//     borderTopLeftRadius: 12, // Match card border radius
//     borderTopRightRadius: 12, // Match card border radius
//   },
//   newBadge: {
//     position: 'absolute',
//     top: 8,
//     left: 8,
//     backgroundColor: '#FF6F61', // Red color for "New!" badge
//     borderRadius: 5,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     zIndex: 1, // Ensure it's above the image
//   },
//   newBadgeText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   wishlistIconContainer: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
//     borderRadius: 20,
//     padding: 6,
//     zIndex: 1, // Ensure it's above the image
//     shadowColor: '#000', // Subtle shadow for the heart button
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   title: {
//     fontSize: 15, // Adjusted font size
//     fontWeight: "600",
//     color: '#333', // Darker text color
//     paddingHorizontal: 10, // More padding
//     paddingTop: 8,
//   },
//   price: {
//     fontSize: 13, // Adjusted font size
//     color: "#555",
//     paddingHorizontal: 10, // More padding
//     paddingBottom: 10,
//     fontWeight: '500', // Medium font weight
//   },
// });


import { useGetItemsQuery } from "@/Api/query/itemsQuery";
import { Feather } from '@expo/vector-icons';
import { Link } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const sectionPaddingHorizontal = 15;
const itemGap = 12;

const itemWidth = (screenWidth - (sectionPaddingHorizontal * 2) - itemGap) / numColumns;

const ItemListScreen = () => {
  const { isLoading, error, data } = useGetItemsQuery();

  if (isLoading) return <ActivityIndicator size="large" color="orange" style={styles.loadingIndicator} />;
  if (error) return <Text style={styles.errorText}>Failed to load items</Text>;

  return (
    <View style={styles.sectionContainer}>
      {/* Title and "See more" button for the Recommended section */}
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Recommended</Text>
        <TouchableOpacity>
          <Text style={styles.seeMoreText}>See more</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.itemsGrid}>
        {data.map((item) => (
          <Link
            href={`/product/${item.id}`}
            asChild
            key={item.id.toString()}
          >
            <Pressable style={styles.itemCard}>
              {/* Ensure no whitespace or newlines directly between these elements */}
              {item.assets?.[0]?.url && (
                <Image
                  source={{ uri: item.assets[0].url }}
                  style={styles.image}
                  resizeMode="cover"
                />
              )}
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>verified</Text>
              </View>
              <TouchableOpacity style={styles.wishlistIconContainer}>
                <Feather name="heart" size={18} color="#1E3A8A" />
              </TouchableOpacity>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>
                Rs {item.rate}/{item.rateType}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </View>
  );
};

export default ItemListScreen;

const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: sectionPaddingHorizontal,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  seeMoreText: {
    fontSize: 14,
    color: '#FFC107',
    fontWeight: '600',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: sectionPaddingHorizontal,
  },
  itemCard: {
    width: itemWidth,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: itemGap,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FFC107',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 1,
  },
  newBadgeText: {
    color: '#1E3A8A',
    fontSize: 12,
    fontWeight: 'bold',
  },
  wishlistIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
    borderRadius: 20,
    padding: 6,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: '#1E3A8A',
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  price: {
    fontSize: 13,
    color: "#333",
    paddingHorizontal: 10,
    paddingBottom: 10,
    fontWeight: '500',
  },
});
	