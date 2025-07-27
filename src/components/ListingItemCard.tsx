import React from "react";
import {
	Image,
	StyleSheet,
	Switch,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function ItemCard({ listing, onToggleAvailability, onDelete }) {
  const imageUrl =
    listing.assets?.[0]?.url || "https://via.placeholder.com/80";

  const createdDate = listing.createdAt
    ? new Date(listing.createdAt).toLocaleDateString()
    : "N/A";

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.listingTitle}>{listing.name || "Untitled"}</Text>

        {listing.category?.name && (
          <Text style={styles.metaText}>{listing.category.name}</Text>
        )}

        {listing.description && (
          <Text
            style={styles.descriptionText}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {listing.description}
          </Text>
        )}

        <Text style={styles.rate}>
          Rs {listing.rate} / {listing.rateType}
        </Text>

        <Text style={styles.metaText}>Listed On: {createdDate}</Text>

        <View style={styles.availability}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor:
                  listing.available === false ? "#F44336" : "#4CAF50",
              },
            ]}
          />
          <Text style={styles.statusText}>
            {listing.available === false ? "Unavailable" : "Available"}
          </Text>
          <Switch
            value={listing.available !== false}
            onValueChange={() => onToggleAvailability(listing.id)}
            trackColor={{ false: "#ccc", true: "#4CAF50" }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => onDelete(listing.id)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#FFE082",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  listingTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E3A8A",
  },
  rate: {
    color: "#555",
    fontSize: 14,
    marginTop: 4,
  },
  metaText: {
    color: "#777",
    fontSize: 12,
    marginTop: 2,
  },
  descriptionText: {
    color: "#555",
    fontSize: 13,
    marginTop: 4,
  },
  availability: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    color: "#333",
    marginRight: 10,
  },
  actions: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginLeft: 10,
  },
  editBtn: {
    backgroundColor: "#FFC107",
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  deleteBtn: {
    backgroundColor: "#E53935",
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 6,
  },
  editText: {
    color: "#1E3A8A",
    fontSize: 12,
    fontWeight: "600",
  },
  deleteText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

// src/components/ItemCard.tsx
// import { useDeleteItemMutation } from "@/Api/mutation/deleteItemMutation";
// import React from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   StyleSheet,
//   Switch,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export default function ItemCard({ listing, onToggleAvailability, onDeleted }) {
// 	const imageUrl = listing.assets?.[0]?.url || "https://via.placeholder.com/80";
// 	const createdDate = listing.createdAt
// 		? new Date(listing.createdAt).toLocaleDateString()
// 		: "N/A";

// 	const { mutate: deleteItemMutation, isLoading: isDeleting } =
// 		useDeleteItemMutation();

// 	const handleDelete = () => {
// 		Alert.alert(
// 			"Confirm Deletion",
// 			"Are you sure you want to delete this item?",
// 			[
// 				{ text: "Cancel", style: "cancel" },
// 				{
// 					text: "Delete",
// 					style: "destructive",
// 					onPress: () => {
// 						deleteItemMutation(listing.id, {
// 							onSuccess: () => {
// 								if (onDeleted) onDeleted(listing.id);
// 								Alert.alert("Success", "Item deleted successfully");
// 							},
// 							onError: () => {
// 								Alert.alert("Error", "Failed to delete item");
// 							},
// 						});
// 					},
// 				},
// 			]
// 		);
// 	};

// 	return (
// 		<View style={styles.card}>
// 			<Image source={{ uri: imageUrl }} style={styles.image} />

// 			<View style={styles.details}>
// 				<Text style={styles.listingTitle}>{listing.name || "Untitled"}</Text>

// 				{listing.category?.name && (
// 					<Text style={styles.metaText}>{listing.category.name}</Text>
// 				)}

// 				{listing.description && (
// 					<Text
// 						style={styles.descriptionText}
// 						numberOfLines={2}
// 						ellipsizeMode="tail"
// 					>
// 						{listing.description}
// 					</Text>
// 				)}

// 				<Text style={styles.rate}>
// 					Rs {listing.rate} / {listing.rateType}
// 				</Text>

// 				<Text style={styles.metaText}>Listed On: {createdDate}</Text>

// 				<View style={styles.availability}>
// 					<View
// 						style={[
// 							styles.statusDot,
// 							{
// 								backgroundColor:
// 									listing.available === false ? "#F44336" : "#4CAF50",
// 							},
// 						]}
// 					/>
// 					<Text style={styles.statusText}>
// 						{listing.available === false ? "Unavailable" : "Available"}
// 					</Text>
// 					<Switch
// 						value={listing.available !== false}
// 						onValueChange={() => onToggleAvailability(listing.id)}
// 						trackColor={{ false: "#ccc", true: "#4CAF50" }}
// 						thumbColor="#fff"
// 					/>
// 				</View>
// 			</View>

// 			<View style={styles.actions}>
// 				<TouchableOpacity style={styles.editBtn}>
// 					<Text style={styles.editText}>Edit</Text>
// 				</TouchableOpacity>

// 				<TouchableOpacity
// 					style={[styles.deleteBtn, isDeleting && { opacity: 0.6 }]}
// 					onPress={handleDelete}
// 					disabled={isDeleting}
// 				>
// 					{isDeleting ? (
// 						<ActivityIndicator color="#fff" />
// 					) : (
// 						<Text style={styles.deleteText}>
// 							{isDeleting ? "Deleting..." : "Delete"}
// 						</Text>
// 					)}
// 				</TouchableOpacity>
// 			</View>
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	card: {
// 		flexDirection: "row",
// 		backgroundColor: "#fff",
// 		borderRadius: 16,
// 		padding: 12,
// 		marginBottom: 14,
// 		elevation: 2,
// 		borderWidth: 1,
// 		borderColor: "#FFE082",
// 	},
// 	image: {
// 		width: 80,
// 		height: 80,
// 		borderRadius: 12,
// 	},
// 	details: {
// 		flex: 1,
// 		marginLeft: 12,
// 		justifyContent: "space-between",
// 	},
// 	listingTitle: {
// 		fontSize: 16,
// 		fontWeight: "700",
// 		color: "#1E3A8A",
// 	},
// 	rate: {
// 		color: "#555",
// 		fontSize: 14,
// 		marginTop: 4,
// 	},
// 	metaText: {
// 		color: "#777",
// 		fontSize: 12,
// 		marginTop: 2,
// 	},
// 	descriptionText: {
// 		color: "#555",
// 		fontSize: 13,
// 		marginTop: 4,
// 	},
// 	availability: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		marginTop: 6,
// 	},
// 	statusDot: {
// 		width: 10,
// 		height: 10,
// 		borderRadius: 5,
// 		marginRight: 6,
// 	},
// 	statusText: {
// 		fontSize: 13,
// 		color: "#333",
// 		marginRight: 10,
// 	},
// 	actions: {
// 		justifyContent: "space-between",
// 		alignItems: "flex-end",
// 		marginLeft: 10,
// 	},
// 	editBtn: {
// 		backgroundColor: "#FFC107",
// 		borderRadius: 6,
// 		paddingVertical: 4,
// 		paddingHorizontal: 10,
// 	},
// 	deleteBtn: {
// 		backgroundColor: "#E53935",
// 		borderRadius: 6,
// 		paddingVertical: 4,
// 		paddingHorizontal: 10,
// 		marginTop: 6,
// 	},
// 	editText: {
// 		color: "#1E3A8A",
// 		fontSize: 12,
// 		fontWeight: "600",
// 	},
// 	deleteText: {
// 		color: "#fff",
// 		fontSize: 12,
// 		fontWeight: "600",
// 	},
// });
