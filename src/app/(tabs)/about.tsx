// // import React from 'react'
// // import { StyleSheet, View } from 'react-native'
// // import AuthVerificationScreen from '../(auth)/DocumentVerification'

// // const about = () => {
// //   return (
// //     <View>
// //       {/* <LoginScreen/> */}
// //       <AuthVerificationScreen/>
// //     </View>
// //   )
// // }

// // export default about

// // const styles = StyleSheet.create({})

// import { AntDesign, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons'; // Assuming these icon libraries are installed
// import React from 'react';
// import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function about() {
//   return (
//     <ScrollView style={styles.container}>
//       {/* Header Section */}
//       <View style={styles.headerBackground}>
//         <Text style={styles.profileTitle}>My Profile</Text>
//         <View style={styles.profileImageContainer}>
//           {/* Placeholder image. Replace with your actual image source */}
//           <Image
//             source={{ uri: 'https://placehold.co/100x100/ADD8E6/000000?text=Profile' }}
//             style={styles.profileImage}
//           />
//           <TouchableOpacity style={styles.plusIconContainer}>
//             <AntDesign name="pluscircle" size={24} color="#FFD700" />
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.userName}>Your Name</Text>
//         <Text style={styles.userEmail}>youremail@email.com</Text>
//       </View>

//       {/* Menu Section */}
//       <View style={styles.menuContainer}>
//         {/* Edit Profile */}
//         <TouchableOpacity style={styles.menuItem}>
//           <FontAwesome5 name="user-alt" size={24} color="#555" />
//           <View style={styles.menuItemTextContainer}>
//             <Text style={styles.menuItemTitle}>Edit Profile</Text>
//             <Text style={styles.menuItemSubtitle}>Edit your personal details</Text>
//           </View>
//           <MaterialIcons name="keyboard-arrow-right" size={24} color="#ccc" />
//         </TouchableOpacity>

//         {/* My Favorites */}
//         <TouchableOpacity style={styles.menuItem}>
//           <FontAwesome5 name="bookmark" size={24} color="#555" />
//           <View style={styles.menuItemTextContainer}>
//             <Text style={styles.menuItemTitle}>My Favorites</Text>
//             <Text style={styles.menuItemSubtitle}>View your favorite items</Text>
//           </View>
//           <MaterialIcons name="keyboard-arrow-right" size={24} color="#ccc" />
//         </TouchableOpacity>

//         {/* Vouchers */}
//         <TouchableOpacity style={styles.menuItem}>
//           <FontAwesome5 name="ticket-alt" size={24} color="#555" />
//           <View style={styles.menuItemTextContainer}>
//             <Text style={styles.menuItemTitle}>Vouchers</Text>
//             <Text style={styles.menuItemSubtitle}>Vouchers and account balance</Text>
//           </View>
//           <MaterialIcons name="keyboard-arrow-right" size={24} color="#ccc" />
//         </TouchableOpacity>

//         {/* Sign Out */}
//         <TouchableOpacity style={styles.menuItem}>
//           <Feather name="log-out" size={24} color="#555" />
//           <View style={styles.menuItemTextContainer}>
//             <Text style={styles.menuItemTitle}>Sign Out</Text>
//             {/* No subtitle for Sign Out */}
//           </View>
//           <MaterialIcons name="keyboard-arrow-right" size={24} color="#ccc" />
//         </TouchableOpacity>

//         {/* Help Section */}
//         <Text style={styles.helpSectionTitle}>Help</Text>

//         {/* Frequently asked questions */}
//         <TouchableOpacity style={styles.menuItem}>
//           <FontAwesome5 name="question-circle" size={24} color="#555" />
//           <View style={styles.menuItemTextContainer}>
//             <Text style={styles.menuItemTitle}>Frequently asked questions</Text>
//             <Text style={styles.menuItemSubtitle}>Find out what other people frequently ask questions about. Might have your answers also.</Text>
//           </View>
//           <MaterialIcons name="keyboard-arrow-right" size={24} color="#ccc" />
//         </TouchableOpacity>

//         {/* Start Chat */}
//         <TouchableOpacity style={styles.menuItem}>
//           <MaterialIcons name="chat" size={24} color="#555" />
//           <View style={styles.menuItemTextContainer}>
//             <Text style={styles.menuItemTitle}>Start Chat</Text>
//             <Text style={styles.menuItemSubtitle}>Contact RentHub</Text>
//           </View>
//           <MaterialIcons name="keyboard-arrow-right" size={24} color="#ccc" />
//         </TouchableOpacity>

//         {/* Delete Account */}
//         <TouchableOpacity style={[styles.menuItem, styles.lastMenuItem]}>
//           <MaterialIcons name="delete" size={24} color="#555" />
//           <View style={styles.menuItemTextContainer}>
//             <Text style={styles.menuItemTitle}>Delete Account</Text>
//             {/* No subtitle for Delete Account */}
//           </View>
//           <MaterialIcons name="keyboard-arrow-right" size={24} color="#ccc" />
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0', // Light grey background for the whole screen
//   },
//   headerBackground: {
//     backgroundColor: '#FFC107', // Yellow background
//     paddingTop: 60, // Adjust for status bar
//     paddingBottom: 50, // Space for the profile image to overlap
//     alignItems: 'center',
//     borderBottomLeftRadius: 50, // Curved bottom left
//     borderBottomRightRadius: 50, // Curved bottom right
//     marginBottom: -50, // Pull the menu container up to overlap
//     position: 'relative', // Needed for absolute positioning of profile image
//   },
//   profileTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//   },
//   profileImageContainer: {
//     position: 'absolute',
//     bottom: -50, // Half of the image height to make it overlap
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#fff', // White background for the image border
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   profileImage: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     borderWidth: 2,
//     borderColor: '#fff',
//   },
//   plusIconContainer: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//   },
//   userName: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 60, // Space below the overlapping image
//   },
//   userEmail: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 20,
//   },
//   menuContainer: {
//     backgroundColor: '#fff',
//     marginHorizontal: 20,
//     marginTop: 80, // Adjust to position below the header and profile image
//     borderRadius: 15,
//     paddingVertical: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   menuItemTextContainer: {
//     flex: 1,
//     marginLeft: 15,
//   },
//   menuItemTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//   },
//   menuItemSubtitle: {
//     fontSize: 12,
//     color: '#888',
//     marginTop: 2,
//   },
//   helpSectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 20,
//     marginBottom: 10,
//     marginLeft: 20,
//   },
//   lastMenuItem: {
//     borderBottomWidth: 0, // No border for the last item in the list
//   },
// });

import useAuthUserQuery from "@/Api/query/useAuthQuery";
import {
	AntDesign,
	FontAwesome5,
	MaterialIcons
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import SignOutItem from "../screens/signOutScreen";

export default function App() {
	const { data: user, isLoading, isError } = useAuthUserQuery();
	console.log("UserData", user);

	const [selectedImage, setSelectedImage] = useState(null); // State to hold the selected image URI

	useEffect(() => {
		(async () => {
			if (Platform.OS !== "web") {
				const { status } =
					await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== "granted") {
					Alert.alert(
						"Permission Denied",
						"Sorry, we need camera roll permissions to make this work!"
					);
				}
			}

			// Load saved profile image
			const savedImage = await AsyncStorage.getItem("profileImage");
			if (savedImage) {
				setSelectedImage(savedImage);
			}
		})();
	}, []);

	const pickImage = async () => {
		const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			Alert.alert(
				"Permission Required",
				"Please grant media library permissions in your device settings to select a photo."
			);
			return;
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			const uri = result.assets[0].uri;
			setSelectedImage(uri);
			await AsyncStorage.setItem("profileImage", uri);
		}
	};

	return (
		<ScrollView style={styles.container}>
			{/* Header Section */}
			<View style={styles.headerBackground}>
				{/* <Text style={styles.profileTitle}>My Profile</Text> */}
				<TouchableOpacity
					style={styles.profileImageContainer}
					onPress={pickImage}
				>
					{/* Display selected image or placeholder */}
					<Image
						source={{
							uri:
								selectedImage ||
								"https://placehold.co/100x100/ADD8E6/000000?text=Profile",
						}}
						style={styles.profileImage}
					/>
					<View style={styles.plusIconContainer}>
						<AntDesign name="pluscircle" size={24} color="#FFD700" />
					</View>
				</TouchableOpacity>
			</View>
			{/* ADD name/email right below the header */}
			<View style={styles.userInfoContainer}>
				{isLoading ? (
					<>
						<Text style={styles.userName}>Loading...</Text>
						<Text style={styles.userEmail}>Please wait</Text>
					</>
				) : isError ? (
					<>
						<Text style={styles.userName}>Error loading</Text>
						<Text style={styles.userEmail}>Check your connection</Text>
					</>
				) : (
					<>
						<Text style={styles.userName}>
							{user?.data?.fullName || "No Name"}
						</Text>
						<Text style={styles.userEmail}>
							{user?.data?.email || "No Email"}
						</Text>
					</>
				)}
			</View>
			{/* Menu Section */}
			<View style={styles.menuContainer}>
				{/* Edit Profile */}
				<Link href={"/screens/KycVerifyScreen"}asChild>
				<TouchableOpacity style={styles.menuItem}>
					<FontAwesome5 name="user-alt" size={24} color="#1E3A8A" />
					<View style={styles.menuItemTextContainer}>
						<Text style={styles.menuItemTitle}>KYC VERIFY</Text>
						<Text style={styles.menuItemSubtitle}>
							Edit your personal details
						</Text>
					</View>
					<MaterialIcons name="keyboard-arrow-right" size={24} color="#1E3A8A" />
				</TouchableOpacity>
				</Link>

				{/* My Favorites */}
				{/* <TouchableOpacity style={styles.menuItem}>
					<FontAwesome5 name="bookmark" size={24} color="#1E3A8A" />
					<View style={styles.menuItemTextContainer}>
						<Text style={styles.menuItemTitle}>My Favorites</Text>
						<Text style={styles.menuItemSubtitle}>
							View your favorite items
						</Text>
					</View>
					<MaterialIcons name="keyboard-arrow-right" size={24} color="#1E3A8A" />
				</TouchableOpacity> */}

				{/* Vouchers */}
				<Link href={"/screens/loginScreen"}asChild>
				<TouchableOpacity style={styles.menuItem}>
					<FontAwesome5 name="fa-sign-in" size={24} color="#1E3A8A" />
					<View style={styles.menuItemTextContainer}>
						<Text style={styles.menuItemTitle}>Login</Text>
						<Text style={styles.menuItemSubtitle}>
							Login in to the RentHub
						</Text>
					</View>
					<MaterialIcons name="keyboard-arrow-right" size={24} color="#1E3A8A" />
				</TouchableOpacity>
				</Link>
				

				{/* Sign Out */}
				<SignOutItem/>
				

				{/* Help Section */}
				<Text style={styles.helpSectionTitle}>Help</Text>

				{/* Frequently asked questions */}
				<Link href={"/screens/FaqScreen"}asChild>
				<TouchableOpacity style={styles.menuItem}>
					<FontAwesome5 name="question-circle" size={24} color="#1E3A8A" />
					<View style={styles.menuItemTextContainer}>
						<Text style={styles.menuItemTitle}>Frequently asked questions</Text>
						<Text style={styles.menuItemSubtitle}>
							Find out what other people frequently ask questions about. Might
							have your answers also.
						</Text>
					</View>
					<MaterialIcons name="keyboard-arrow-right" size={24} color="#1E3A8A" />
				</TouchableOpacity>
				</Link>

				{/* Start Chat */}
				<TouchableOpacity style={styles.menuItem}>
					<MaterialIcons name="chat" size={24} color="#555" />
					<View style={styles.menuItemTextContainer}>
						<Text style={styles.menuItemTitle}>Start Chat</Text>
						<Text style={styles.menuItemSubtitle}>Contact RentHub</Text>
					</View>
					<MaterialIcons name="keyboard-arrow-right" size={24} color="#ccc" />
				</TouchableOpacity>

				{/* Terms and Policies */}

				{/* Start Chat */}
				<TouchableOpacity style={styles.menuItem}>
					<MaterialIcons name="book" size={24} color="#555" />
					<View style={styles.menuItemTextContainer}>
						<Text style={styles.menuItemTitle}>
							Read our terms and consitions
						</Text>
						<Text style={styles.menuItemSubtitle}>Terms and Condition</Text>
					</View>
					<MaterialIcons name="keyboard-arrow-right" size={24} color="#ccc" />
				</TouchableOpacity>

				{/* Delete Account */}
				<TouchableOpacity style={[styles.menuItem, styles.lastMenuItem]}>
					<MaterialIcons name="delete" size={24} color="#555" />
					<View style={styles.menuItemTextContainer}>
						<Text style={styles.menuItemTitle}>Delete Account</Text>
						{/* No subtitle for Delete Account */}
					</View>
					<MaterialIcons name="keyboard-arrow-right" size={24} color="#ccc" />
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f0f0f0", // Light grey background for the whole screen
	},
	headerBackground: {
		backgroundColor: "#FFC107", // Yellow background
		paddingTop: 100, // Adjust for status bar
		paddingBottom: 20, // Space for the profile image to overlap
		alignItems: "center",
		borderBottomLeftRadius: 50, // Curved bottom left
		borderBottomRightRadius: 50, // Curved bottom right
		marginBottom: -5, // Pull the menu container up to overlap
		position: "relative", // Needed for absolute positioning of profile image
	},
	profileTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#1E3A8A",
		marginBottom: 20,
	},
	userInfoContainer: {
		alignItems: "center",
	},

	profileImageContainer: {
		position: "absolute",
		bottom: -50, // Half of the image height to make it overlap
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: "#fff", // White background for the image border
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	profileImage: {
		width: 90,
		height: 90,
		borderRadius: 45,
		borderWidth: 2,
		borderColor: "#fff",
	},
	plusIconContainer: {
		position: "absolute",
		bottom: 0,
		right: 0,
		backgroundColor: "#fff",
		borderRadius: 12,
	},
	userName: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#1E3A8A",
		marginTop: 60, // Space below the overlapping image
	},
	userEmail: {
		fontSize: 16,
		color: "#666",
		marginBottom: 20,
	},
	menuContainer: {
		backgroundColor: "#fff",
		marginHorizontal: 20,
		marginTop: 10, // Adjust to position below the header and profile image
		borderRadius: 15,
		paddingVertical: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 3,
	},
	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	menuItemTextContainer: {
		flex: 1,
		marginLeft: 15,
	},
	menuItemTitle: {
		fontSize: 16,
		fontWeight: "500",
		color: "#1E3A8A",
	},
	menuItemSubtitle: {
		fontSize: 12,
		color: "#1E3A8A",
		marginTop: 2,
	},
	helpSectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
		marginTop: 20,
		marginBottom: 10,
		marginLeft: 20,
	},
	lastMenuItem: {
		borderBottomWidth: 0, // No border for the last item in the list
	},
});
