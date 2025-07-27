// import { Ionicons } from "@expo/vector-icons";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { useLocalSearchParams, useRouter } from "expo-router"; // For Expo Router
// import React, { useEffect, useState } from "react";
// import {
// 	Alert,
// 	Image,
// 	Platform,
// 	ScrollView,
// 	StyleSheet,
// 	Text,
// 	TextInput,
// 	TouchableOpacity,
// 	View,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// import { usePostItemRentMutation } from "@/Api/mutation/postItemRentMutation";
// import { useGetItemIdQuery } from "@/Api/query/itemsIdQuery";

// export default function ItemDetailScreen() {
// 		const router = useRouter();
	
// 	const insets = useSafeAreaInsets();

// 	const { id } = useLocalSearchParams<{ id: string }>();
// 		const {
// 		data: item,
// 		isLoading: isItemLoading,
// 		isError: isItemError,
// 		error: itemError,
// 	} = useGetItemIdQuery(id);2

// 	const {
// 		mutate: postRentRequest,
// 		isPending: isRentLoading,
// 		isError: isRentError,
// 		isSuccess: isRentSuccess,
// 		error: rentError,
// 		data,
// 	} = usePostItemRentMutation();
//     const [fresh, setFresh] = useState("")
// 	const [note, setNote] = useState(" Hi, I'd like to rent this for a project.");
// 	const [startDate, setStartDate] = useState(new Date());
// 	const [endDate, setEndDate] = useState(new Date(Date.now() + 2 * 86400000)); 
// 	const [showStartPicker, setShowStartPicker] = useState(false);
// 	const [showEndPicker, setShowEndPicker] = useState(false);

// 	const handleRentRequest = () => {
// 		if (!item) {
// 			Alert.alert("Error", "Item data is not available. Please try again.");
// 			return;
// 		}
// 		const isUUID =
// 			/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
// 				id
// 			);
// 		if (!isUUID) {
// 			Alert.alert("Invalid ID", "Item ID is not a valid UUID.");
// 			return;
// 		}

// 		if (!startDate || !endDate) {
// 			Alert.alert(
// 				"Missing Dates",
// 				"Please select both start and end dates for your rental."
// 			);
// 			return;
// 		}
// 		if (startDate > endDate) {
// 			Alert.alert("Invalid Dates", "Start date cannot be after end date.");
// 			return;
// 		}

// 		console.log("Attempting to rent item with ID:", id);
// 		console.log("Sending POST request with ID:", id);
// 		console.log("Payload data:", {
// 			note: note,
// 			startDate: startDate.toISOString(),
// 			endDate: endDate.toISOString(), 
// 		});

// 		// Trigger the mutation
// 		const res = postRentRequest({
// 			id,
// 			note,
// 			startDate: startDate.toISOString(),
// 			endDate: endDate.toISOString(),
// 		},);

//     console.log("response from server", res);
    
// 	};

// 	// Effect to show alerts based on mutation status
// 	useEffect(() => {
// 		if (isRentSuccess) {
// 			Alert.alert("Success", "Your rental request has been sent!");
// 			setNote("Hi, I'm interested in renting your item.");
// 			setStartDate(new Date());
// 			setEndDate(new Date(Date.now() + 2 * 86400000));
// 			router.push("/");
			
// 		}
// 	 if (isRentError) {
//         let errorMessage = "An unknown error occurred.";

//         // --- New Logic for 403 Error ---
//         if (rentError && rentError.response && rentError.response.status === 403) {
//             errorMessage = "You own this item, it cannot be rented.";
//         } else {
//             errorMessage = rentError?.message || "Failed to send rental request.";
//             // You might want to stringify the error for debugging if rentError structure is complex
//             // errorMessage = `Failed to send rental request: ${JSON.stringify(rentError)}`;
//         }

//         Alert.alert(
//             "Error",
//             errorMessage
//         );
//     }
// }, [isRentSuccess, isRentError, rentError]);

// 	// Loading and Error States for Item Fetching
// 	if (isItemLoading) {
// 		return <Text style={styles.loading}>Loading item details...</Text>;
// 	}

// 	if (isItemError) {
// 		return (
// 			<Text style={styles.error}>
// 				Error loading item: {itemError?.message || "Item not found."}
// 			</Text>
// 		);
// 	}

// 	// Fallback if item is null/undefined after loading and no error
// 	if (!item) {
// 		return <Text style={styles.error}>Item details could not be loaded.</Text>;
// 	}

// 	return (
// 		<ScrollView style={[styles.container, { paddingTop: insets.top }]}>

// 			{/* Image Carousel */}
// 			<ScrollView
// 				horizontal
// 				pagingEnabled
// 				showsHorizontalScrollIndicator={false}
// 				style={styles.imageScroll}
// 			>
// 				{item.item.assets && item.item.assets.length > 0 ? (
// 					item.item.assets.map((asset: any) => (
// 						<Image
// 							key={asset.id}
// 							source={{ uri: asset.url }} // This is for remote URLs, keep as is
// 							style={styles.image}
// 							resizeMode="cover"
// 						/>
// 					))
// 				) : (
// 					<Image
// 						// <-- Use the imported image
// 						style={styles.image}
// 						resizeMode="cover"
// 					/>
// 				)}
// 			</ScrollView>

// 			{/* Item Info */}
// 			<View style={styles.content}>
// 				<Text style={styles.title}>{item.item.name}</Text>
// 				<Text style={styles.category}>📦 {item.item.category?.name}</Text>
// 				<Text style={styles.price}>
// 					Rs {item.item.rate} / {item.item.rateType}
// 				</Text>

// 				{/* Location */}
// 				<View style={styles.locationRow}>
// 					<Ionicons name="location-sharp" size={16} color="#444" />
// 					<Text style={styles.locationText}>
// 						{item.item.location?.address} ({item.item.location?.radius} km
// 						radius)
// 					</Text>
// 				</View>

// 				<Text style={styles.description}>{item.item.description}</Text>

// 				{/* Date Pickers */}
// 				<Text style={styles.label}>Rental Start Date</Text>
// 				<TouchableOpacity
// 					onPress={() => setShowStartPicker(true)}
// 					style={styles.dateInput}
// 				>
// 					<Text>{startDate.toDateString()}</Text>
// 				</TouchableOpacity>

// 				<Text style={styles.label}>Rental End Date</Text>
// 				<TouchableOpacity
// 					onPress={() => setShowEndPicker(true)}
// 					style={styles.dateInput}
// 				>
// 					<Text>{endDate.toDateString()}</Text>
// 				</TouchableOpacity>

// 				{/* DateTimePicker Modals (Conditional Rendering) */}
// 				{showStartPicker && (
// 					<DateTimePicker
// 						value={startDate}
// 						mode="date"
// 						display={Platform.OS === "ios" ? "spinner" : "default"}
// 						onChange={(event, selectedDate) => {
// 							setShowStartPicker(false);
// 							if (selectedDate) setStartDate(selectedDate);
// 						}}
// 						minimumDate={new Date()} // Prevent selecting past dates
// 					/>
// 				)}

// 				{showEndPicker && (
// 					<DateTimePicker
// 						value={endDate}
// 						mode="date"
// 						display={Platform.OS === "ios" ? "spinner" : "default"}
// 						onChange={(event, selectedDate) => {
// 							setShowEndPicker(false);
// 							if (selectedDate) setEndDate(selectedDate);
// 						}}
// 						minimumDate={startDate || new Date()} // End date can't be before start date
// 					/>
// 				)}

// 				{/* Note Field */}
// 				<Text style={styles.label}>Message to Owner</Text>
// 				<TextInput
// 					style={styles.input}
// 					multiline
// 					value={note}
// 					onChangeText={setNote}
// 					placeholder="e.g., Hi, I'd like to rent this for a project."
// 				/>

// 				{/* Rent Button */}
// 				<TouchableOpacity
// 					style={styles.button}
// 					onPress={handleRentRequest}
// 					disabled={isRentLoading || isItemLoading}
// 				>
// 					<Text style={styles.buttonText}>
// 						{isRentLoading ? "Sending Request..." : "Request to Rent"}
// 					</Text>
// 				</TouchableOpacity>
// 				<View>
// 					<Text>
// 						Hello
// 					</Text>
// 				</View>
				
// 			</View>
// 		  </ScrollView>


// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		backgroundColor: "#fff",
// 		flexGrow: 1, // Ensure content can scroll if larger than screen
// 	},
// 	imageScroll: {
// 		maxHeight: 240, // Max height for image scroll view
// 		borderRadius: 12,
// 	},
// 	image: {
// 		width: 360, // Fixed width for each image in the carousel
// 		height: 220,
// 		borderRadius: 12,
// 		marginRight: 10,
// 	},
// 	content: {
// 		// Added a content wrapper for consistent padding
// 		padding: 16,
// 	},
// 	title: {
// 		fontSize: 22,
// 		fontWeight: "700",
// 		marginTop: 16,
// 	},
// 	category: {
// 		fontSize: 16,
// 		color: "#666",
// 		marginVertical: 4,
// 	},
// 	price: {
// 		fontSize: 18,
// 		color: "#f57c00",
// 		fontWeight: "600",
// 		marginBottom: 12,
// 	},
// 	locationRow: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		marginBottom: 8,
// 	},
// 	locationText: {
// 		fontSize: 14,
// 		marginLeft: 4,
// 		color: "#333",
// 	},
// 	description: {
// 		fontSize: 15,
// 		marginVertical: 12,
// 		lineHeight: 20,
// 		color: "#444",
// 	},
// 	label: {
// 		fontSize: 14,
// 		fontWeight: "500",
// 		marginTop: 12,
// 	},
// 	dateInput: {
// 		backgroundColor: "#f5f5f5", // Changed to match input for consistency
// 		padding: 12,
// 		borderRadius: 8,
// 		marginTop: 8,
// 	},
// 	input: {
// 		backgroundColor: "#f5f5f5",
// 		padding: 12,
// 		borderRadius: 8,
// 		marginTop: 8,
// 		minHeight: 80,
// 		textAlignVertical: "top",
// 	},
// 	button: {
// 		marginTop: 20,
// 		backgroundColor: "#ff9800",
// 		paddingVertical: 14,
// 		borderRadius: 10,
// 		alignItems: "center",
// 	},
// 	buttonText: {
// 		color: "#fff",
// 		fontSize: 16,
// 		fontWeight: "600",
// 	},
// 	error: {
// 		marginTop: 30,
// 		color: "red",
// 		textAlign: "center",
// 		fontSize: 16,
// 	},
// 	loading: {
// 		marginTop: 30,
// 		textAlign: "center",
// 		fontSize: 16,
// 		color: "#555",
// 	},
// });


import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Dimensions,
	Image,
	Platform,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { usePostItemRentMutation } from "@/Api/mutation/postItemRentMutation";
import { useGetItemIdQuery } from "@/Api/query/itemsIdQuery";

const { width: screenWidth } = Dimensions.get('window');

export default function ItemDetailScreen() {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	const { id } = useLocalSearchParams<{ id: string }>();
	const {
		data: item,
		isLoading: isItemLoading,
		isError: isItemError,
		error: itemError,
	} = useGetItemIdQuery(id);

	const {
		mutate: postRentRequest,
		isPending: isRentLoading,
		isError: isRentError,
		isSuccess: isRentSuccess,
		error: rentError,
		data,
	} = usePostItemRentMutation();

	const [fresh, setFresh] = useState("")
	const [note, setNote] = useState("Hi, I'd like to rent this for a project.");
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date(Date.now() + 2 * 86400000));
	const [showStartPicker, setShowStartPicker] = useState(false);
	const [showEndPicker, setShowEndPicker] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

		const res = postRentRequest({
			id,
			note,
			startDate: startDate.toISOString(),
			endDate: endDate.toISOString(),
		});

		console.log("response from server", res);
	};

	useEffect(() => {
		if (isRentSuccess) {
			Alert.alert("Success", "Your rental request has been sent!");
			setNote("Hi, I'm interested in renting your item.");
			setStartDate(new Date());
			setEndDate(new Date(Date.now() + 2 * 86400000));
			router.push("/");
		}
		if (isRentError) {
			let errorMessage = "An unknown error occurred.";

			if (rentError && rentError.response && rentError.response.status === 403) {
				errorMessage = "You own this item, it cannot be rented.";
			} else {
				errorMessage = rentError?.message || "Failed to send rental request.";
			}

			Alert.alert("Error", errorMessage);
		}
	}, [isRentSuccess, isRentError, rentError]);

	const handleScroll = (event: any) => {
		const slideSize = screenWidth;
		const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
		setCurrentImageIndex(index);
	};

	if (isItemLoading) {
		return (
			<View style={styles.loadingContainer}>
				<View style={styles.loadingCard}>
					<Text style={styles.loadingText}>Loading item details...</Text>
				</View>
			</View>
		);
	}

	if (isItemError) {
		return (
			<View style={styles.errorContainer}>
				<View style={styles.errorCard}>
					<Ionicons name="alert-circle" size={48} color="#FF6B35" />
					<Text style={styles.errorTitle}>Oops!</Text>
					<Text style={styles.errorText}>
						{itemError?.message || "Item not found."}
					</Text>
					<TouchableOpacity style={styles.retryButton} onPress={() => router.back()}>
						<Text style={styles.retryButtonText}>Go Back</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	if (!item) {
		return (
			<View style={styles.errorContainer}>
				<View style={styles.errorCard}>
					<Ionicons name="alert-circle" size={48} color="#FF6B35" />
					<Text style={styles.errorTitle}>Not Found</Text>
					<Text style={styles.errorText}>Item details could not be loaded.</Text>
				</View>
			</View>
		);
	}

	const images = item.item.assets && item.item.assets.length > 0 
		? item.item.assets 
		: [{ id: 'placeholder', url: 'https://via.placeholder.com/400x300?text=No+Image' }];

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />
			
			{/* Header with Back Button */}
			<View style={[styles.header, { paddingTop: insets.top + 12 }]}>
				<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
					<Ionicons name="arrow-back" size={24} color="#fff" />
				</TouchableOpacity>
				<View style={styles.headerActions}>
					<TouchableOpacity style={styles.actionButton}>
						<Ionicons name="heart-outline" size={24} color="#fff" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.actionButton}>
						<Ionicons name="share-outline" size={24} color="#fff" />
					</TouchableOpacity>
				</View>
			</View>

			<ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
				{/* Enhanced Image Carousel */}
				<View style={styles.imageContainer}>
					<ScrollView
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						onScroll={handleScroll}
						scrollEventThrottle={16}
						style={styles.imageScroll}
					>
						{images.map((asset: any, index: number) => (
							<View key={asset.id} style={styles.imageSlide}>
								<Image
									source={{ uri: asset.url }}
									style={styles.image}
									resizeMode="cover"
								/>
								<LinearGradient
									colors={['transparent', 'rgba(0,0,0,0.1)']}
									style={styles.imageGradient}
								/>
							</View>
						))}
					</ScrollView>
					
					{/* Image Indicators */}
					{images.length > 1 && (
						<View style={styles.indicatorContainer}>
							{images.map((_: any, index: number) => (
								<View
									key={index}
									style={[
										styles.indicator,
										index === currentImageIndex && styles.activeIndicator
									]}
								/>
							))}
						</View>
					)}
				</View>

				{/* Content Card */}
				<View style={styles.contentCard}>
					{/* Item Header */}
					<View style={styles.itemHeader}>
						<View style={styles.itemTitleContainer}>
							<Text style={styles.title}>{item.item.name}</Text>
							<View style={styles.categoryBadge}>
								<Text style={styles.categoryText}>{item.item.category?.name}</Text>
							</View>
						</View>
						<View style={styles.priceContainer}>
							<Text style={styles.price}>₹{item.item.rate}</Text>
							<Text style={styles.priceUnit}>/ {item.item.rateType}</Text>
						</View>
					</View>

					{/* Location */}
					<View style={styles.locationCard}>
						<View style={styles.locationIconContainer}>
							<Ionicons name="location" size={20} color="#FF6B35" />
						</View>
						<View style={styles.locationInfo}>
							<Text style={styles.locationAddress}>{item.item.location?.address}</Text>
							<Text style={styles.locationRadius}>
								{item.item.location?.radius} km radius
							</Text>
						</View>
					</View>

					{/* Description */}
					<View style={styles.descriptionContainer}>
						<Text style={styles.sectionTitle}>Description</Text>
						<Text style={styles.description}>{item.item.description}</Text>
					</View>

					{/* Rental Dates Section */}
					<View style={styles.datesSection}>
						<Text style={styles.sectionTitle}>Rental Period</Text>
						
						<View style={styles.dateRow}>
							<View style={styles.dateColumn}>
								<Text style={styles.dateLabel}>Start Date</Text>
								<TouchableOpacity
									onPress={() => setShowStartPicker(true)}
									style={styles.dateButton}
								>
									<Ionicons name="calendar-outline" size={20} color="#FF6B35" />
									<Text style={styles.dateText}>{startDate.toDateString()}</Text>
								</TouchableOpacity>
							</View>
							
							<View style={styles.dateArrow}>
								<Ionicons name="arrow-forward" size={20} color="#999" />
							</View>
							
							<View style={styles.dateColumn}>
								<Text style={styles.dateLabel}>End Date</Text>
								<TouchableOpacity
									onPress={() => setShowEndPicker(true)}
									style={styles.dateButton}
								>
									<Ionicons name="calendar-outline" size={20} color="#FF6B35" />
									<Text style={styles.dateText}>{endDate.toDateString()}</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>

					{/* Message Section */}
					<View style={styles.messageSection}>
						<Text style={styles.sectionTitle}>Message to Owner</Text>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.messageInput}
								multiline
								value={note}
								onChangeText={setNote}
								placeholder="Write a message to the owner..."
								placeholderTextColor="#999"
								textAlignVertical="top"
							/>
						</View>
					</View>

					{/* Rent Button */}
					<TouchableOpacity
						style={[
							styles.rentButton,
							(isRentLoading || isItemLoading) && styles.rentButtonDisabled
						]}
						onPress={handleRentRequest}
						disabled={isRentLoading || isItemLoading}
					>
						<LinearGradient
							colors={['#FF6B35', '#FF8F65']}
							style={styles.buttonGradient}
						>
							{isRentLoading ? (
								<View style={styles.loadingButtonContent}>
									<Text style={styles.buttonText}>Sending Request...</Text>
								</View>
							) : (
								<View style={styles.buttonContent}>
									<Ionicons name="send" size={20} color="#fff" />
									<Text style={styles.buttonText}>Request to Rent</Text>
								</View>
							)}
						</LinearGradient>
					</TouchableOpacity>
				</View>

				{/* Bottom Spacing */}
				<View style={{ height: 32 }} />
			</ScrollView>

			{/* DateTimePicker Modals */}
			{showStartPicker && (
				<DateTimePicker
					value={startDate}
					mode="date"
					display={Platform.OS === "ios" ? "spinner" : "default"}
					onChange={(event, selectedDate) => {
						setShowStartPicker(false);
						if (selectedDate) setStartDate(selectedDate);
					}}
					minimumDate={new Date()}
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
					minimumDate={startDate || new Date()}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFC107",
	},
	header: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 100,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingBottom: 12,
	},
	backButton: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: 'rgba(0,0,0,0.3)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerActions: {
		flexDirection: 'row',
		gap: 12,
	},
	actionButton: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: 'rgba(0,0,0,0.3)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	scrollContainer: {
		flex: 1,
	},
	imageContainer: {
		position: 'relative',
	},
	imageScroll: {
		height: 300,
	},
	imageSlide: {
		width: screenWidth,
		height: 300,
		position: 'relative',
	},
	image: {
		width: screenWidth,
		height: 300,
	},
	imageGradient: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 60,
	},
	indicatorContainer: {
		position: 'absolute',
		bottom: 20,
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 8,
	},
	indicator: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: 'rgba(255,255,255,0.5)',
	},
	activeIndicator: {
		backgroundColor: '#fff',
		width: 24,
	},
	contentCard: {
		marginTop: -20,
		backgroundColor: '#fff',
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		paddingHorizontal: 24,
		paddingTop: 28,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
	},
	itemHeader: {
		marginBottom: 24,
	},
	itemTitleContainer: {
		marginBottom: 12,
	},
	title: {
		fontSize: 28,
		fontWeight: '700',
		color: '#1a1a1a',
		marginBottom: 8,
		lineHeight: 34,
	},
	categoryBadge: {
		alignSelf: 'flex-start',
		backgroundColor: '#f0f8ff',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: '#e3f2fd',
	},
	categoryText: {
		fontSize: 14,
		color: '#4A90E2',
		fontWeight: '600',
	},
	priceContainer: {
		flexDirection: 'row',
		alignItems: 'baseline',
		gap: 4,
	},
	price: {
		fontSize: 32,
		fontWeight: '800',
		color: '#FF6B35',
	},
	priceUnit: {
		fontSize: 16,
		color: '#666',
		fontWeight: '500',
	},
	locationCard: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 16,
		borderRadius: 16,
		marginBottom: 24,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,
		borderWidth: 1,
		borderColor: '#f0f0f0',
	},
	locationIconContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#fff5f2',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12,
	},
	locationInfo: {
		flex: 1,
	},
	locationAddress: {
		fontSize: 16,
		fontWeight: '600',
		color: '#1a1a1a',
		marginBottom: 2,
	},
	locationRadius: {
		fontSize: 14,
		color: '#666',
	},
	descriptionContainer: {
		marginBottom: 32,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: '700',
		color: '#1a1a1a',
		marginBottom: 12,
	},
	description: {
		fontSize: 16,
		lineHeight: 24,
		color: '#444',
	},
	datesSection: {
		marginBottom: 32,
	},
	dateRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
	dateColumn: {
		flex: 1,
	},
	dateArrow: {
		paddingTop: 20,
	},
	dateLabel: {
		fontSize: 14,
		fontWeight: '600',
		color: '#666',
		marginBottom: 8,
	},
	dateButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 16,
		borderRadius: 12,
		gap: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,
		borderWidth: 1,
		borderColor: '#f0f0f0',
	},
	dateText: {
		fontSize: 15,
		fontWeight: '600',
		color: '#1a1a1a',
		flex: 1,
	},
	messageSection: {
		marginBottom: 32,
	},
	inputContainer: {
		backgroundColor: '#fff',
		borderRadius: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,
		borderWidth: 1,
		borderColor: '#f0f0f0',
	},
	messageInput: {
		padding: 16,
		fontSize: 16,
		minHeight: 100,
		textAlignVertical: 'top',
		color: '#1a1a1a',
		lineHeight: 22,
	},
	rentButton: {
		borderRadius: 16,
		overflow: 'hidden',
		shadowColor: '#FF6B35',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 12,
		elevation: 6,
		marginBottom: 16,
	},
	rentButtonDisabled: {
		opacity: 0.7,
	},
	buttonGradient: {
		paddingVertical: 18,
		paddingHorizontal: 24,
	},
	buttonContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
	},
	loadingButtonContent: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '700',
		textAlign: 'center',
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f8f9fa',
		padding: 24,
	},
	loadingCard: {
		backgroundColor: '#fff',
		padding: 32,
		borderRadius: 20,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 6,
	},
	loadingText: {
		fontSize: 18,
		color: '#666',
		fontWeight: '600',
	},
	errorContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f8f9fa',
		padding: 24,
	},
	errorCard: {
		backgroundColor: '#fff',
		padding: 32,
		borderRadius: 20,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 6,
		maxWidth: 300,
	},
	errorTitle: {
		fontSize: 24,
		fontWeight: '700',
		color: '#1a1a1a',
		marginTop: 16,
		marginBottom: 8,
	},
	errorText: {
		fontSize: 16,
		color: '#666',
		textAlign: 'center',
		lineHeight: 22,
		marginBottom: 24,
	},
	retryButton: {
		backgroundColor: '#FF6B35',
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 12,
	},
	retryButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
}); 
