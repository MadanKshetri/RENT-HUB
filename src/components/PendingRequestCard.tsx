// import React from "react";
// import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// export default function PendingRequestCard({ item, onAccept, onReject }: any) {
// 	const product = item?.item;
// 	const renter = item?.renter;
// 	const imageUrl = product?.assets?.[0]?.url;

// 	console.log("Image URL:", product?.assets?.[0]);
// 	// Get first image from assets array

// 	return (
// 		<View style={styles.card}>
// 			{imageUrl ? (
// 				<Image
// 					source={{ uri: imageUrl }}
// 					style={styles.image}
// 					resizeMode="cover"
// 				/>
// 			) : (
// 				<View style={[styles.image, styles.placeholder]}>
// 					<Text>No Image</Text>
// 				</View>
// 			)}

// 			<View style={styles.details}>
// 				<Text style={styles.title}>{product?.name || "Unnamed Item"}</Text>
// 				<Text style={styles.description}>
// 					{product?.description || "No description available."}
// 				</Text>
// 				<Text style={styles.requestedBy}>
// 					Requested by: {renter?.name || "Unknown User"}
// 				</Text>

// 				<View style={styles.actions}>
// 					<TouchableOpacity
// 						style={styles.acceptButton}
// 						onPress={() => onAccept(item.id)}
// 					>
// 						<Text style={styles.buttonText}>Accept</Text>
// 					</TouchableOpacity>
// 					<TouchableOpacity
// 						style={styles.rejectButton}
// 						onPress={() => onReject(item.id)}
// 					>
// 						<Text style={styles.buttonText}>Reject</Text>
// 					</TouchableOpacity>
// 				</View>
// 			</View>
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	card: {
// 		margin: 12,
// 		backgroundColor: "#fff",
// 		borderRadius: 10,
// 		flexDirection: "row",
// 		overflow: "hidden",
// 		shadowColor: "#000",
// 		shadowOpacity: 0.1,
// 		shadowOffset: { width: 0, height: 2 },
// 		elevation: 3,
// 	},
// 	image: {
// 		width: 100,
// 		height: 100,
// 	},
// 	placeholder: {
// 		justifyContent: "center",
// 		alignItems: "center",
// 		backgroundColor: "#eee",
// 	},
// 	details: {
// 		flex: 1,
// 		padding: 10,
// 		justifyContent: "space-between",
// 	},
// 	title: {
// 		fontSize: 16,
// 		fontWeight: "600",
// 	},
// 	description: {
// 		fontSize: 14,
// 		color: "#666",
// 		marginVertical: 4,
// 	},
// 	requestedBy: {
// 		fontSize: 12,
// 		color: "#888",
// 		fontStyle: "italic",
// 	},
// 	actions: {
// 		flexDirection: "row",
// 		marginTop: 8,
// 	},
// 	acceptButton: {
// 		backgroundColor: "#4CAF50",
// 		padding: 8,
// 		borderRadius: 5,
// 		marginRight: 8,
// 	},
// 	rejectButton: {
// 		backgroundColor: "#f44336",
// 		padding: 8,
// 		borderRadius: 5,
// 	},
// 	buttonText: {
// 		color: "#fff",
// 		fontWeight: "bold",
// 	},
// });
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PendingRequestCard({ item, onAccept, onReject }: any) {
  const product = item?.item;
  const renter = item?.renter;
  const imageUrl = product?.assets?.[0]?.url;

  const status = item?.orderStatus;

  return (
    <View style={styles.card}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text>No Image</Text>
        </View>
      )}

      <View style={styles.details}>
        <Text style={styles.title}>{product?.name || "Unnamed Item"}</Text>
        <Text style={styles.description}>{product?.description || "No description available."}</Text>
        <Text style={styles.requestedBy}>Requested by: {renter?.name || "Unknown User"}</Text>

        {/* Status Logic */}
        {status?.toUpperCase() === "PENDING" ? (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.acceptButton} onPress={() => onAccept(item.id)}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton} onPress={() => onReject(item.id)}>
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        ) : status?.toUpperCase() === "APPROVED" ? (
          <Text style={styles.approvedText}>Waiting for Payment</Text>
        ) : status?.toUpperCase( ) === "REJECTED" ? (
          <Text style={styles.rejectedText}>Request Rejected</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  details: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  requestedBy: {
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
  },
  actions: {
    flexDirection: "row",
    marginTop: 8,
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  rejectButton: {
    backgroundColor: "#f44336",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  approvedText: {
    color: "#007bff",
    fontWeight: "600",
    marginTop: 8,
  },
  rejectedText: {
    color: "#ff4444",
    fontWeight: "600",
    marginTop: 8,
  },
});
