import { useCategoryItemsQuery } from "@/Api/query/useCategoryIdQuery";
import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const sectionPaddingHorizontal = 15;
const itemGap = 12;

const itemWidth =
  (screenWidth - sectionPaddingHorizontal * 2 - itemGap) / numColumns;

const CategoryItemsScreen = () => {
  const { categoryId } = useLocalSearchParams();
  const { data, isLoading, error } = useCategoryItemsQuery(categoryId as string);

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="#10b981"
        style={styles.loadingIndicator}
      />
    );
  }

  if (error) {
    return (
      <Text style={styles.errorText}>
        Failed to load items in this category.
      </Text>
    );
  }

  const items = data?.data || [];

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        {/* <Text style={styles.sectionTitle}>{categoryId} Items</Text> */}
      </View>

      {items.length === 0 ? (
        <Text style={styles.noItemsText}>No items found in this category.</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: sectionPaddingHorizontal
          }}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => {
            const imageUrl =
              item.assets?.[0]?.url ||
              "https://via.placeholder.com/300x200.png?text=No+Image";

            return (
              <Link href={`/product/${item.id}`} asChild>
                <TouchableOpacity style={styles.itemCard}>
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.price}>
                    Rs {item.rate} / {item.rateType}
                  </Text>
                  <Text style={styles.location}>{item.location?.address}</Text>
                </TouchableOpacity>
              </Link>
            );
          }}
        />
      )}
    </View>
  );
};

export default CategoryItemsScreen;


const styles = StyleSheet.create({
	sectionContainer: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: 20,
	},
	titleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15,
		paddingHorizontal: sectionPaddingHorizontal,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#222",
		textTransform: "capitalize",
	},
	seeMoreText: {
		fontSize: 14,
		color: "#888",
		fontWeight: "600",
	},
	loadingIndicator: {
		marginTop: 40,
	},
	errorText: {
		color: "red",
		textAlign: "center",
		marginTop: 40,
	},
	noItemsText: {
		fontSize: 16,
		color: "#9ca3af",
		textAlign: "center",
		marginTop: 40,
	},
	itemsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
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
	},
	newBadge: {
		position: "absolute",
		top: 8,
		left: 8,
		backgroundColor: "#10b981",
		borderRadius: 5,
		paddingHorizontal: 6,
		paddingVertical: 2,
		zIndex: 1,
	},
	newBadgeText: {
		color: "#fff",
		fontSize: 12,
		fontWeight: "bold",
	},
	wishlistIconContainer: {
		position: "absolute",
		top: 8,
		right: 8,
		backgroundColor: "rgba(255, 255, 255, 0.8)",
		borderRadius: 20,
		padding: 6,
		zIndex: 1,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	title: {
		fontSize: 15,
		fontWeight: "600",
		color: "#333",
		paddingHorizontal: 10,
		paddingTop: 8,
	},
	price: {
		fontSize: 13,
		color: "#555",
		paddingHorizontal: 10,
		paddingTop: 2,
		fontWeight: "500",
	},
	location: {
		fontSize: 12,
		color: "#777",
		paddingHorizontal: 10,
		paddingBottom: 10,
	},
	scrollViewContent: {},
});
