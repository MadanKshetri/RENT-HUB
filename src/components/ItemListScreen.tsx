
import { useGetItemsQuery } from "@/Api/query/itemsQuery";
import { Link } from "expo-router";
import React from "react";
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	Image,
	Pressable,
	StyleSheet,
	Text
} from "react-native";

const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const itemMargin = 12;
const itemWidth = (screenWidth - itemMargin * (numColumns + 1)) / numColumns;

const ItemListScreen = () => {
	const { isLoading, error, data } = useGetItemsQuery();

	if (isLoading) return <ActivityIndicator size="large" color="orange" />;
	if (error) return <Text style={styles.error}>Failed to load items</Text>;

	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id.toString()}
			numColumns={numColumns}
			key={numColumns}
			renderItem={({ item }) => (
				<Link
					href={`/product/${item.id}`}
					asChild
				>
					<Pressable style={styles.itemCard}>
						{item.assets?.[0]?.url && (
							<Image
								source={{ uri: item.assets[0].url }}
								style={styles.image}
								resizeMode="cover"
							/>
						)}
						<Text style={styles.title}>{item.name}</Text>
						<Text style={styles.price}>
							₹{item.rate}/{item.rateType}
						</Text>
					</Pressable>
				</Link>
			)}
			contentContainerStyle={styles.container}
		/>
	);
};

export default ItemListScreen;

const styles = StyleSheet.create({
	container: {
		padding: itemMargin,
	},
	itemCard: {
		width: itemWidth,
		backgroundColor: "#fff",
		borderRadius: 12,
		overflow: "hidden",
		margin: itemMargin / 2,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	image: {
		width: "100%",
		height: 120,
	},
	title: {
		fontSize: 16,
		fontWeight: "600",
		paddingHorizontal: 8,
		paddingTop: 8,
	},
	price: {
		fontSize: 14,
		color: "#555",
		paddingHorizontal: 8,
		paddingBottom: 10,
	},
	error: {
		color: "red",
		textAlign: "center",
		marginTop: 20,
	},
});
