// import { useGetItemsQuery } from "@/Api/query/itemsQuery"; // Adjust path if necessary, assuming this is 	
// import { Feather } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import React, { useMemo, useState } from "react";
// import {
// 	ActivityIndicator,
// 	FlatList,
// 	Platform,
// 	SafeAreaView,
// 	StyleSheet,
// 	Text,
// 	TextInput,
// 	TouchableOpacity,
// 	View
// } from "react-native"; // Import Image and TouchableOpacity
// import { useSafeAreaInsets } from "react-native-safe-area-context";


// const searchScreen = () => {
// 	const router = useRouter();

// 	const insets = useSafeAreaInsets();
// 	const [searchText, setSearchText] = useState("");

// 	const { data: items, isLoading, isError, error } = useGetItemsQuery();

// 	const filteredItems = useMemo(() => {
// 		if (!items || !Array.isArray(items)) {
// 			return [];
// 		}

// 		const lowercasedSearchText = searchText.toLowerCase();

// 		return items.filter((item) => {
// 			// Ensure 'item' itself is an object and not null/undefined
// 			if (!item || typeof item !== "object") {
// 				return false; // Skip invalid items
// 			}

// 			// Safely check name, description, category
// 			const nameMatches =
// 				item.name &&
// 				typeof item.name === "string" &&
// 				item.name.toLowerCase().includes(lowercasedSearchText);

// 			// Assuming you might still want to search by description or category if they exist
// 			const descriptionMatches =
// 				item.description &&
// 				typeof item.description === "string" &&
// 				item.description.toLowerCase().includes(lowercasedSearchText);

// 			const categoryMatches =
// 				item.category &&
// 				typeof item.category === "string" &&
// 				item.category.toLowerCase().includes(lowercasedSearchText);

// 			return nameMatches || descriptionMatches || categoryMatches;
// 		});
// 	}, [items, searchText]);

// 	// --- MODIFIED: renderItem function to use item.assets[0].url ---
// 	const renderItem = ({ item }) => (
// 		<TouchableOpacity
// 		onPress={() => router.push(`/product/${item.id}`)}
//     activeOpacity={0.8}
// 		>
// 		<View style={styles.itemContainer}>
// 			{/* Use item.assets?.[0]?.url for image source */}
// 			{item.assets?.[0]?.url ? (
// 				<Image
// 					source={{ uri: item.assets[0].url }}
// 					style={styles.itemImage}
// 					resizeMode="cover"
// 				/>
// 			) : (
// 				// Optional: Placeholder if no image URL
// 				<View style={styles.imagePlaceholder}>
// 					<Feather name="image" size={50} color="#ccc" />
// 					<Text style={styles.placeholderText}>No Image</Text>
// 				</View>
// 			)}
// 			<View style={styles.itemDetails}>
//                 <Text>
// 				<Text style={styles.itemName}>{item.name || "Untitled Item"}</Text>{" "}
// 				{/* Fallback for name */}
// 				{/* Display rate and rateType */}
// 				{item.rate != null && item.rateType ? (
// 					<Text style={styles.itemRate}>
// 						{`Rs. ${item.rate} / ${item.rateType}`}
// 					</Text>
// 				) : null}
// 				{/* If you have a description, you can add it back here */}
// 				{/* {item.description && <Text style={styles.itemDescription} numberOfLines={2}>{item.description}</Text>} */}
//                 </Text>
// 			</View>
// 		</View>
// 		</TouchableOpacity>
// 	);

// 	if (isLoading) {
// 		return (
// 			<SafeAreaView
// 				style={[
// 					styles.fullScreenCentered,
// 					{ paddingTop: Platform.OS === "android" ? insets.top : 0 },
// 				]}
// 			>
// 				<ActivityIndicator size="large" color="yellow" />
// 			</SafeAreaView>
// 		);
// 	}

// 	if (isError) {
// 		return (
// 			<SafeAreaView
// 				style={[
// 					styles.fullScreenCentered,
// 					{ paddingTop: Platform.OS === "android" ? insets.top : 0 },
// 				]}
// 			>
// 				<Text style={styles.errorText}>
// 					Failed to load items: {error?.message || "Unknown error"}
// 				</Text>
// 			</SafeAreaView>
// 		);
// 	}

// 	return (
// 		<SafeAreaView
// 			style={[
// 				styles.container,
// 				{ paddingTop: Platform.OS === "android" ? insets.top : 0 },
// 			]}
// 		>
// 			<View style={styles.header}>
// 				<Feather
// 					name="search"
// 					size={20}
// 					color="#888"
// 					style={styles.searchIcon}
// 				/>
// 				<TextInput
// 					placeholder="Search for items..."
// 					placeholderTextColor="#888"
// 					style={styles.searchInput}
// 					value={searchText}
// 					onChangeText={setSearchText}
// 					autoFocus={true} // Optionally focus the input when the screen opens
// 					clearButtonMode="while-editing" // iOS-only clear button for the actual input
// 				/>
// 				{Platform.OS === "android" && searchText.length > 0 && (
// 					<TouchableOpacity
// 						onPress={() => setSearchText("")}
// 						style={styles.clearButton}
// 					>
// 						<Text style={styles.clearButtonText}>X</Text>
// 					</TouchableOpacity>
// 				)}
// 			</View>

// 			<FlatList
// 				data={filteredItems}
// 				renderItem={renderItem}
// 				// Use item.id for keyExtractor, with a fallback if id is missing or not a string
// 				keyExtractor={(item) => item.id?.toString() || `item-${Math.random()}`}
// 				ListEmptyComponent={
// 					<View style={styles.emptyResultsContainer}>
// 						<Text>No items found matching your search.</Text>
// 					</View>
// 				}
// 				contentContainerStyle={
// 					filteredItems.length === 0 ? styles.emptyListContent : null
// 				}
// 			/>
// 		</SafeAreaView>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#f0f0f0",
// 	},
// 	fullScreenCentered: {
// 		flex: 1,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		backgroundColor: "#f0f0f0",
// 	},
// 	header: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		backgroundColor: "#fff",
// 		paddingHorizontal: 15,
// 		paddingVertical: 10,
// 		borderBottomWidth: 1,
// 		borderBottomColor: "#eee",
// 	},
// 	searchIcon: {
// 		marginRight: 10,
// 	},
// 	searchInput: {
// 		flex: 1,
// 		height: 40,
// 		fontSize: 16,
// 		color: "#333",
// 	},
// 	clearButton: {
// 		padding: 5,
// 		marginLeft: 10,
// 	},
// 	clearButtonText: {
// 		color: "#888",
// 		fontSize: 16,
// 	},
// 	// --- Styles for FlatList items ---
// 	itemContainer: {
// 		flexDirection: "row", // Arrange image and details side-by-side
// 		backgroundColor: "#fff",
// 		padding: 10,
// 		marginHorizontal: 10,
// 		marginTop: 10,
// 		borderRadius: 8,
// 		shadowColor: "#000",
// 		shadowOffset: { width: 0, height: 1 },
// 		shadowOpacity: 0.2,
// 		shadowRadius: 1.41,
// 		elevation: 2,
// 		alignItems: "center", // Vertically align items in the row
// 	},
// 	itemImage: {
// 		width: 80,
// 		height: 80,
// 		borderRadius: 5,
// 		marginRight: 10,
// 		// resizeMode: 'cover', // Ensures image covers the area
// 	},
// 	imagePlaceholder: {
// 		width: 80,
// 		height: 80,
// 		borderRadius: 5,
// 		marginRight: 10,
// 		backgroundColor: "#e0e0e0", // Lighter gray for placeholder
// 		justifyContent: "center",
// 		alignItems: "center",
// 	},
// 	placeholderText: {
// 		fontSize: 10,
// 		color: "#666",
// 		marginTop: 5,
// 	},
// 	itemDetails: {
// 		flex: 1, // Take up remaining space
// 	},
// 	itemName: {
// 		fontSize: 18,
// 		fontWeight: "bold",
// 		marginBottom: 2,
// 		color: "#333",
// 	},
// 	itemRate: {
// 		fontSize: 16,
// 		fontWeight: "bold",
// 		color: "green",
// 		marginBottom: 5,
// 	},
// 	itemDescription: {
// 		// If you re-add description
// 		fontSize: 14,
// 		color: "#666",
// 	},
// 	loadingContainer: {
// 		// This style is now potentially replaced by fullScreenCentered
// 		flex: 1,
// 		justifyContent: "center",
// 		alignItems: "center",
// 	},
// 	errorText: {
// 		// Renamed from 'error' to avoid conflict with `error` prop
// 		color: "red",
// 		textAlign: "center",
// 		marginTop: 20,
// 		fontSize: 16,
// 	},
// 	emptyResultsContainer: {
// 		justifyContent: "center",
// 		alignItems: "center",
// 		padding: 20,
// 	},
// 	emptyListContent: {
// 		flexGrow: 1,
// 		justifyContent: "center",
// 		alignItems: "center",
// 	},
// });

// export default searchScreen;

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function searchScreen() {
  return (
	<View>
	  <Text>searchScreen</Text>
	</View>
  )
}

const styles = StyleSheet.create({})
