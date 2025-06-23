import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams } from "expo-router"; // For Expo Router
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { usePostItemRentMutation } from "@/Api/mutation/postItemRentMutation";
import { useGetItemIdQuery } from "@/Api/query/itemsIdQuery";

export default function ItemDetailScreen() {
	const insets = useSafeAreaInsets();
	const { id } = useLocalSearchParams<{ id: string }>();
	//   console.log("ID received from params:", id); // Add this line
	// console.log("Type of ID received:", typeof id); // And this one

	// Fetch item details
	const {
		data: item,
		isLoading: isItemLoading,
		isError: isItemError,
		error: itemError,
	} = useGetItemIdQuery(id);

	// console.log(item);

	// Handle rental request mutation
	const {
		mutate: postRentRequest,
		isPending: isRentLoading,
		isError: isRentError,
		isSuccess: isRentSuccess,
		error: rentError,
		data,
	} = usePostItemRentMutation();

	const [note, setNote] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date(Date.now() + 2 * 86400000)); // Default 2 days from now
	const [showStartPicker, setShowStartPicker] = useState(false);
	const [showEndPicker, setShowEndPicker] = useState(false);

	// Handle submitting the rental request
	const handleRentRequest = () => {
		if (!item) {
			Alert.alert("Error", "Item data is not available. Please try again.");
			return;
		}
		const isUUID =
			/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
				id
			);
		if (!isUUID) {
			Alert.alert("Invalid ID", "Item ID is not a valid UUID.");
			return;
		}

		if (!startDate || !endDate) {
			Alert.alert(
				"Missing Dates",
				"Please select both start and end dates for your rental."
			);
			return;
		}
		if (startDate > endDate) {
			Alert.alert("Invalid Dates", "Start date cannot be after end date.");
			return;
		}

		console.log("Attempting to rent item with ID:", id);
		console.log("Sending POST request with ID:", id);
		console.log("Payload data:", {
			note: note,
			startDate: startDate.toISOString(),
			endDate: endDate.toISOString(), 
		});

		// Trigger the mutation
		const res = postRentRequest({
			id,
			note,
			startDate: startDate.toISOString(),
			endDate: endDate.toISOString(),
		},);

    console.log("response from server", res);
    
	};

	// Effect to show alerts based on mutation status
	useEffect(() => {
		if (isRentSuccess) {
			Alert.alert("Success", "Your rental request has been sent!");
			setNote("Hi, I'm interested in renting your item.");
			setStartDate(new Date());
			setEndDate(new Date(Date.now() + 2 * 86400000));
		}
		if (isRentError) {
			Alert.alert(
				"Error",
				`Failed to send rental request: ${
					rentError?.message || "An unknown error occurred."
				}`
			);
		}
	}, [isRentSuccess, isRentError, rentError]);

	// Loading and Error States for Item Fetching
	if (isItemLoading) {
		return <Text style={styles.loading}>Loading item details...</Text>;
	}

	if (isItemError) {
		return (
			<Text style={styles.error}>
				Error loading item: {itemError?.message || "Item not found."}
			</Text>
		);
	}

	// Fallback if item is null/undefined after loading and no error
	if (!item) {
		return <Text style={styles.error}>Item details could not be loaded.</Text>;
	}

	return (
		<ScrollView style={[styles.container, { paddingTop: insets.top }]}>
			{/* Image Carousel */}
			<ScrollView
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				style={styles.imageScroll}
			>
				{item.item.assets && item.item.assets.length > 0 ? (
					item.item.assets.map((asset: any) => (
						<Image
							key={asset.id}
							source={{ uri: asset.url }} // This is for remote URLs, keep as is
							style={styles.image}
							resizeMode="cover"
						/>
					))
				) : (
					<Image
						// <-- Use the imported image
						style={styles.image}
						resizeMode="cover"
					/>
				)}
			</ScrollView>

			{/* Item Info */}
			<View style={styles.content}>
				<Text style={styles.title}>{item.item.name}</Text>
				<Text style={styles.category}>📦 {item.item.category?.name}</Text>
				<Text style={styles.price}>
					₹{item.item.rate} / {item.item.rateType}
				</Text>

				{/* Location */}
				<View style={styles.locationRow}>
					<Ionicons name="location-sharp" size={16} color="#444" />
					<Text style={styles.locationText}>
						{item.item.location?.address} ({item.item.location?.radius} km
						radius)
					</Text>
				</View>

				<Text style={styles.description}>{item.item.description}</Text>

				{/* Date Pickers */}
				<Text style={styles.label}>Rental Start Date</Text>
				<TouchableOpacity
					onPress={() => setShowStartPicker(true)}
					style={styles.dateInput}
				>
					<Text>{startDate.toDateString()}</Text>
				</TouchableOpacity>

				<Text style={styles.label}>Rental End Date</Text>
				<TouchableOpacity
					onPress={() => setShowEndPicker(true)}
					style={styles.dateInput}
				>
					<Text>{endDate.toDateString()}</Text>
				</TouchableOpacity>

				{/* DateTimePicker Modals (Conditional Rendering) */}
				{showStartPicker && (
					<DateTimePicker
						value={startDate}
						mode="date"
						display={Platform.OS === "ios" ? "spinner" : "default"}
						onChange={(event, selectedDate) => {
							setShowStartPicker(false);
							if (selectedDate) setStartDate(selectedDate);
						}}
						minimumDate={new Date()} // Prevent selecting past dates
					/>
				)}

				{showEndPicker && (
					<DateTimePicker
						value={endDate}
						mode="date"
						display={Platform.OS === "ios" ? "spinner" : "default"}
						onChange={(event, selectedDate) => {
							setShowEndPicker(false);
							if (selectedDate) setEndDate(selectedDate);
						}}
						minimumDate={startDate || new Date()} // End date can't be before start date
					/>
				)}

				{/* Note Field */}
				<Text style={styles.label}>Message to Owner</Text>
				<TextInput
					style={styles.input}
					multiline
					value={note}
					onChangeText={setNote}
					placeholder="e.g., Hi, I'd like to rent this for a project."
				/>

				{/* Rent Button */}
				<TouchableOpacity
					style={styles.button}
					onPress={handleRentRequest}
					disabled={isRentLoading || isItemLoading}
				>
					<Text style={styles.buttonText}>
						{isRentLoading ? "Sending Request..." : "Request to Rent"}
					</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		flexGrow: 1, // Ensure content can scroll if larger than screen
	},
	imageScroll: {
		maxHeight: 240, // Max height for image scroll view
		borderRadius: 12,
	},
	image: {
		width: 360, // Fixed width for each image in the carousel
		height: 220,
		borderRadius: 12,
		marginRight: 10,
	},
	content: {
		// Added a content wrapper for consistent padding
		padding: 16,
	},
	title: {
		fontSize: 22,
		fontWeight: "700",
		marginTop: 16,
	},
	category: {
		fontSize: 16,
		color: "#666",
		marginVertical: 4,
	},
	price: {
		fontSize: 18,
		color: "#f57c00",
		fontWeight: "600",
		marginBottom: 12,
	},
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	locationText: {
		fontSize: 14,
		marginLeft: 4,
		color: "#333",
	},
	description: {
		fontSize: 15,
		marginVertical: 12,
		lineHeight: 20,
		color: "#444",
	},
	label: {
		fontSize: 14,
		fontWeight: "500",
		marginTop: 12,
	},
	dateInput: {
		backgroundColor: "#f5f5f5", // Changed to match input for consistency
		padding: 12,
		borderRadius: 8,
		marginTop: 8,
	},
	input: {
		backgroundColor: "#f5f5f5",
		padding: 12,
		borderRadius: 8,
		marginTop: 8,
		minHeight: 80,
		textAlignVertical: "top",
	},
	button: {
		marginTop: 20,
		backgroundColor: "#ff9800",
		paddingVertical: 14,
		borderRadius: 10,
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	error: {
		marginTop: 30,
		color: "red",
		textAlign: "center",
		fontSize: 16,
	},
	loading: {
		marginTop: 30,
		textAlign: "center",
		fontSize: 16,
		color: "#555",
	},
});
