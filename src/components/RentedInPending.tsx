// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { useRouter } from "expo-router"; // Correctly imported from 'expo-router'
// import React from "react";
// import {
// 	Alert, // Correctly imported from 'react-native'
// 	Image,
// 	StyleSheet,
// 	Text,
// 	TouchableOpacity,
// 	View,
// } from "react-native";

// // Define your API base URL
// const API_BASE_URL = "http://192.168.1.83:5000"; // 🔁 Replace with your actual API base URL if different

// /**
//  * PendingRequestCard component displays details of a pending or approved rent request.
//  * It includes an option to proceed to Khalti payment if the request is approved.
//  *
//  * @param {object} props - The component props.
//  * @param {object} props.item - The item object containing details of the rent request.
//  * @param {object} props.item.item - Details about the rented item (name, description, rate, assets, etc.).
//  * @param {string} props.item.rentStart - The start date of the rent.
//  * @param {string} props.item.rentEnd - The end date of the rent.
//  * @param {number} props.item.totalPrice - The total price for the rent.
//  * @param {object} props.item.owner - Details about the item owner (name).
//  * @param {string} props.item.orderStatus - The current status of the rent order (e.g., "PENDING", "APPROVED", "REJECTED").
//  */
// export default function PendingRequestCard({ item }) {
// 	console.log("Itemssns", item);
// 	// Initialize expo-router hook for navigation
// 	const router = useRouter();

// 	// Define colors for different order statuses
// 	const statusColor = {
// 		PENDING: "#f0ad4e", // Orange for pending
// 		REJECTED: "#d9534f", // Red for rejected
// 		APPROVED: "#5cb85c", // Green for approved
// 	};

// 	/**
// 	 * Handles the Khalti payment process.
// 	 * This asynchronous function retrieves the user's authentication token,
// 	 * sends a payment verification request to the backend, and if successful,
// 	 * navigates the user to the Khalti payment web view.
// 	 * It includes robust error handling for various scenarios.
// 	 */
// 	const handleKhaltiPayment = async () => {
// 		try {
// 			// 1. Retrieve the authentication token from AsyncStorage
// 			const token = await AsyncStorage.getItem("token");

// 			// 2. If no token is found, alert the user and stop the process
// 			if (!token) {
// 				Alert.alert(
// 					"Authentication Error",
// 					"User not authenticated. Please log in again."
// 				);
// 				return; // Exit the function
// 			}

// 			// 3. Make a POST request to the backend API to initiate Khalti payment verification
// 			const response = await axios.post(
// 				`${API_BASE_URL}/payment/verify/khalti`, // API endpoint
// 				{
// 					provider: "khalti", // Specify Khalti as the payment provider
// 					rentOrderId: item.id, // Pass the ID of the current rent order
// 					fromMobile: true,
// 				},
// 				{
// 					headers: {
// 						Authorization: `Bearer ${token}`, 
// 						"Content-Type": "application/json", 
// 					},
// 				}
// 			);

// 			// 4. Extract the payment URL from the API response
// 			// Use optional chaining to safely access nested properties (response.data.data.url)
// 			const paymentUrl = response.data?.data?.url;

// 			// 5. Check if a payment URL was successfully received
// 			if (paymentUrl) {
// 				// If a URL is present, navigate to the PaymentWebView screen using expo-router
// 				// Pass the paymentUrl as a parameter so the web view can load it
// 				router.push({
// 					pathname: "/screens/PaymentWebView",
// 					params: { paymentUrl },
// 				});
// 			} else {
// 				// If no payment URL is found in the response, alert the user
// 				Alert.alert(
// 					"Payment Error",
// 					"Payment URL not found in the response. Please try again."
// 				);
// 			}
// 		} catch (error) {
// 			// 6. Catch and handle any errors that occur during the payment initiation process
// 			console.error("Khalti Payment Initiation Error:", error); // Log the detailed error for debugging purposes

// 			// Provide a user-friendly alert message based on the type of error
// 			if (axios.isAxiosError(error)) {
// 				// If it's an Axios-specific error (e.g., network issues, server response errors)
// 				// Extract the error message from the response data or use the generic error message
// 				const errorMessage = error.response?.data?.message || error.message;
// 				Alert.alert(
// 					"Network Error",
// 					`Failed to initiate Khalti payment: ${errorMessage}.`
// 				);
// 			} else {
// 				// Handle any other unexpected errors that are not Axios-related
// 				Alert.alert(
// 					"Unexpected Error",
// 					"An unexpected error occurred during payment initiation. Please try again."
// 				);
// 			}
// 		}
// 	};

// 	return (
// 		<View style={styles.card}>
// 			{/* Display the item image */}
// 			<Image
// 				source={{ uri: item?.item?.assets?.[0]?.url }}
// 				style={styles.image}
// 				resizeMode="cover"
// 			/>
// 			<View style={styles.details}>
// 				{/* Display item and rent details */}
// 				<Text style={styles.title}>{item.item.name}</Text>
// 				<Text>Description: {item.item.description}</Text>
// 				<Text>
// 					Rate: Rs. {item.item.rate} / {item.item.rateType}
// 				</Text>
// 				<Text>Rent Start: {item.rentStart}</Text>
// 				<Text>Rent End: {item.rentEnd}</Text>
// 				<Text>Total Price: Rs. {item.totalPrice}</Text>
// 				<Text>Owner: {item.owner.name}</Text>

// 				{/* Display the order status badge with dynamic background color */}
// 				<View
// 					style={[
// 						styles.statusBadge,
// 						{ backgroundColor: statusColor[item.orderStatus] },
// 					]}
// 				>
// 					<Text style={styles.statusText}>{item.orderStatus}</Text>
// 				</View>

// 				{/* Show the "Proceed to Payment" button only if the order status is "APPROVED" */}
// 				{item.orderStatus.toUpperCase() === "APPROVED" && (
// 					<TouchableOpacity
// 						style={styles.paymentButton}
// 						onPress={handleKhaltiPayment}
// 					>
// 						<Text style={styles.paymentText}>Proceed to Payment</Text>
// 					</TouchableOpacity>
// 				)}
// 			</View>
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	card: {
// 		flexDirection: "row",
// 		backgroundColor: "#fff",
// 		borderRadius: 10,
// 		padding: 10,
// 		marginVertical: 8,
// 		elevation: 3, // Android shadow
// 		shadowColor: "#000", // iOS shadow
// 		shadowOpacity: 0.2, // iOS shadow
// 		shadowRadius: 3, // iOS shadow
// 		shadowOffset: { width: 0, height: 2 },
// 	},
// 	image: {
// 		width: 100,
// 		height: 100,
// 		borderRadius: 8,
// 		marginRight: 12,
// 	},
// 	details: {
// 		flex: 1,
// 	},
// 	title: {
// 		fontWeight: "bold",
// 		fontSize: 16,
// 		marginBottom: 4,
// 	},
// 	statusBadge: {
// 		marginTop: 6,
// 		paddingVertical: 4,
// 		paddingHorizontal: 8,
// 		borderRadius: 5,
// 		alignSelf: "flex-start",
// 	},
// 	statusText: {
// 		color: "#1E3A8A",
// 		fontWeight: "bold",
// 	},
// 	paymentButton: {
// 		marginTop: 10,
// 		backgroundColor: "#FFC107",
// 		paddingVertical: 6,
// 		paddingHorizontal: 12,
// 		borderRadius: 6,
// 	},
// 	paymentText: {
// 		color: "#1E3A8A",
// 		fontWeight: "bold",
// 		textAlign: "center",
// 	},
// });


import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Calendar, Clock, CreditCard, User } from "lucide-react-native";
import React from "react";
import {
	Alert,
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const { width: screenWidth } = Dimensions.get('window');

// Define your API base URL
const API_BASE_URL = "http://192.168.1.83:5000";

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
	cardBorder: "#E5E7EB",
	success: "#10B981",
	warning: "#F59E0B",
};

/**
 * Enhanced PendingRequestCard component with professional UI design
 */
export default function PendingRequestCard({ item }) {
	console.log("Items", item);
	const router = useRouter();

	// Enhanced status configuration with colors and icons
	const statusConfig = {
		PENDING: {
			color: colors.warning,
			backgroundColor: "#FEF3C7",
			borderColor: "#F59E0B",
			textColor: "#92400E",
			label: "Pending Approval"
		},
		REJECTED: {
			color: colors.error,
			backgroundColor: "#FEE2E2",
			borderColor: "#EF4444",
			textColor: "#991B1B",
			label: "Request Rejected"
		},
		APPROVED: {
			color: colors.success,
			backgroundColor: "#D1FAE5",
			borderColor: "#10B981",
			textColor: "#065F46",
			label: "Approved - Ready to Pay"
		},
	};

	const currentStatus = statusConfig[item.orderStatus] || statusConfig.PENDING;

	// Format dates for better display
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	};

	// Calculate rental duration
	const calculateDuration = () => {
		const start = new Date(item.rentStart);
		const end = new Date(item.rentEnd);
		const diffTime = Math.abs(end - start);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};

	const handleKhaltiPayment = async () => {
		try {
			const token = await AsyncStorage.getItem("token");

			if (!token) {
				Alert.alert(
					"Authentication Error",
					"User not authenticated. Please log in again."
				);
				return;
			}

			const response = await axios.post(
				`${API_BASE_URL}/payment/verify/khalti`,
				{
					provider: "khalti",
					rentOrderId: item.id,
					fromMobile: true,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			const paymentUrl = response.data?.data?.url;

			if (paymentUrl) {
				router.push({
					pathname: "/screens/PaymentWebView",
					params: { paymentUrl },
				});
			} else {
				Alert.alert(
					"Payment Error",
					"Payment URL not found in the response. Please try again."
				);
			}
		} catch (error) {
			console.error("Khalti Payment Initiation Error:", error);

			if (axios.isAxiosError(error)) {
				const errorMessage = error.response?.data?.message || error.message;
				Alert.alert(
					"Network Error",
					`Failed to initiate Khalti payment: ${errorMessage}.`
				);
			} else {
				Alert.alert(
					"Unexpected Error",
					"An unexpected error occurred during payment initiation. Please try again."
				);
			}
		}
	};

	return (
		<View style={styles.cardContainer}>
			<View style={styles.card}>
				{/* Status Header */}
				<View style={[styles.statusHeader, { backgroundColor: currentStatus.backgroundColor }]}>
					<View style={[styles.statusIndicator, { backgroundColor: currentStatus.color }]} />
					<Text style={[styles.statusHeaderText, { color: currentStatus.textColor }]}>
						{currentStatus.label}
					</Text>
				</View>

				{/* Main Content */}
				<View style={styles.cardContent}>
					{/* Item Image and Basic Info */}
					<View style={styles.itemHeader}>
						<View style={styles.imageContainer}>
							{item?.item?.assets?.[0]?.url ? (
								<Image
									source={{ uri: item.item.assets[0].url }}
									style={styles.itemImage}
									resizeMode="cover"
								/>
							) : (
								<View style={styles.placeholderImage}>
									<Text style={styles.placeholderText}>📦</Text>
								</View>
							)}
							<View style={styles.imageOverlay}>
								<LinearGradient
									colors={['transparent', 'rgba(0,0,0,0.3)']}
									style={styles.imageGradient}
								/>
							</View>
						</View>

						<View style={styles.itemInfo}>
							<Text style={styles.itemTitle} numberOfLines={2}>
								{item.item.name}
							</Text>
							<Text style={styles.itemDescription} numberOfLines={2}>
								{item.item.description}
							</Text>
							
							{/* Rate Display */}
							<View style={styles.rateContainer}>
								<Text style={styles.currency}>Rs</Text>
								<Text style={styles.rate}>{item.item.rate}</Text>
								<Text style={styles.rateType}>/{item.item.rateType}</Text>
							</View>
						</View>
					</View>

					{/* Rental Details */}
					<View style={styles.detailsSection}>
						{/* Owner Info */}
						<View style={styles.detailRow}>
							<View style={styles.detailIcon}>
								<User size={16} color={colors.secondary} />
							</View>
							<View style={styles.detailContent}>
								<Text style={styles.detailLabel}>Owner</Text>
								<Text style={styles.detailValue}>{item.owner.name}</Text>
							</View>
						</View>

						{/* Rental Period */}
						<View style={styles.detailRow}>
							<View style={styles.detailIcon}>
								<Calendar size={16} color={colors.secondary} />
							</View>
							<View style={styles.detailContent}>
								<Text style={styles.detailLabel}>Rental Period</Text>
								<Text style={styles.detailValue}>
									{formatDate(item.rentStart)} - {formatDate(item.rentEnd)}
								</Text>
								<Text style={styles.durationText}>
									{calculateDuration()} {calculateDuration() === 1 ? 'day' : 'days'}
								</Text>
							</View>
						</View>

						{/* Total Price */}
						<View style={styles.priceSection}>
							<View style={styles.priceRow}>
								<Text style={styles.priceLabel}>Total Amount</Text>
								<View style={styles.priceContainer}>
									<Text style={styles.priceCurrency}>Rs </Text>
									<Text style={styles.totalPrice}>{item.totalPrice}</Text>
								</View>
							</View>
						</View>
					</View>

					{/* Action Button */}
					{item.orderStatus.toUpperCase() === "APPROVED" && (
						<TouchableOpacity
							style={styles.paymentButton}
							onPress={handleKhaltiPayment}
							activeOpacity={0.8}
						>
							<LinearGradient
								colors={[colors.primary, '#FFD54F']}
								style={styles.paymentGradient}
							>
								<CreditCard size={20} color={colors.secondary} />
								<Text style={styles.paymentText}>Proceed to Payment</Text>
							</LinearGradient>
						</TouchableOpacity>
					)}

					{/* Status-specific Messages */}
					{item.orderStatus.toUpperCase() === "PENDING" && (
						<View style={styles.messageContainer}>
							<Clock size={16} color={colors.warning} />
							<Text style={styles.messageText}>
								Waiting for owner approval. You'll be notified once approved.
							</Text>
						</View>
					)}

					{item.orderStatus.toUpperCase() === "REJECTED" && (
						<View style={[styles.messageContainer, styles.rejectedMessage]}>
							<Text style={styles.rejectedText}>
								This request was declined by the owner. You can try requesting different dates.
							</Text>
						</View>
					)}
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		marginHorizontal: 16,
		marginVertical: 8,
	},
	card: {
		backgroundColor: colors.white,
		borderRadius: 16,
		overflow: 'hidden',
		shadowColor: colors.shadow,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 6,
		borderWidth: 1,
		borderColor: colors.cardBorder,
	},
	statusHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.cardBorder,
	},
	statusIndicator: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginRight: 8,
	},
	statusHeaderText: {
		fontSize: 14,
		fontWeight: '600',
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	cardContent: {
		padding: 16,
	},
	itemHeader: {
		flexDirection: 'row',
		marginBottom: 20,
	},
	imageContainer: {
		position: 'relative',
		marginRight: 16,
	},
	itemImage: {
		width: 80,
		height: 80,
		borderRadius: 12,
	},
	placeholderImage: {
		width: 80,
		height: 80,
		borderRadius: 12,
		backgroundColor: colors.background,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: colors.cardBorder,
	},
	placeholderText: {
		fontSize: 24,
		opacity: 0.5,
	},
	imageOverlay: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 40,
		borderRadius: 12,
		overflow: 'hidden',
	},
	imageGradient: {
		flex: 1,
	},
	itemInfo: {
		flex: 1,
		justifyContent: 'space-between',
	},
	itemTitle: {
		fontSize: 18,
		fontWeight: '700',
		color: colors.text,
		marginBottom: 4,
		lineHeight: 22,
	},
	itemDescription: {
		fontSize: 14,
		color: colors.lightText,
		lineHeight: 18,
		marginBottom: 8,
	},
	rateContainer: {
		flexDirection: 'row',
		alignItems: 'baseline',
	},
	currency: {
		fontSize: 14,
		fontWeight: '600',
		color: colors.primary,
	},
	rate: {
		fontSize: 16,
		fontWeight: '700',
		color: colors.primary,
		marginLeft: 2,
	},
	rateType: {
		fontSize: 12,
		color: colors.lightText,
		fontWeight: '500',
		marginLeft: 2,
	},
	detailsSection: {
		marginBottom: 20,
	},
	detailRow: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: 16,
	},
	detailIcon: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: colors.background,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12,
	},
	detailContent: {
		flex: 1,
	},
	detailLabel: {
		fontSize: 12,
		fontWeight: '600',
		color: colors.lightText,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
		marginBottom: 2,
	},
	detailValue: {
		fontSize: 15,
		fontWeight: '600',
		color: colors.text,
		lineHeight: 20,
	},
	durationText: {
		fontSize: 12,
		color: colors.lightText,
		fontWeight: '500',
		marginTop: 2,
	},
	priceSection: {
		backgroundColor: colors.background,
		borderRadius: 12,
		padding: 16,
		marginTop: 8,
	},
	priceRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	priceLabel: {
		fontSize: 16,
		fontWeight: '600',
		color: colors.text,
	},
	priceContainer: {
		flexDirection: 'row',
		alignItems: 'baseline',
	},
	priceCurrency: {
		fontSize: 18,
		fontWeight: '700',
		color: colors.primary,
	},
	totalPrice: {
		fontSize: 24,
		fontWeight: '800',
		color: colors.primary,
		marginLeft: 2,
	},
	paymentButton: {
		borderRadius: 12,
		overflow: 'hidden',
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 4,
		marginTop: 8,
	},
	paymentGradient: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 16,
		paddingHorizontal: 24,
		gap: 8,
	},
	paymentText: {
		color: colors.secondary,
		fontSize: 16,
		fontWeight: '700',
		textAlign: 'center',
	},
	messageContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FEF3C7',
		padding: 12,
		borderRadius: 8,
		marginTop: 12,
		gap: 8,
	},
	messageText: {
		flex: 1,
		fontSize: 13,
		color: '#92400E',
		fontWeight: '500',
		lineHeight: 18,
	},
	rejectedMessage: {
		backgroundColor: '#FEE2E2',
	},
	rejectedText: {
		fontSize: 13,
		color: '#991B1B',
		fontWeight: '500',
		lineHeight: 18,
	},
});