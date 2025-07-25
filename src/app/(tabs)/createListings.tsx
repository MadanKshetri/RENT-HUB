// import { usePostItemMutation } from "@/Api/mutation/postItemMutation";
// import { useCategoriesQuery } from "@/Api/query/categoriesQuery";
// import { Picker } from "@react-native-picker/picker";
// import * as ImagePicker from "expo-image-picker";
// import React, { useState } from "react";
// import {
// 	Alert,
// 	Image,
// 	ScrollView,
// 	StyleSheet,
// 	Text,
// 	TextInput,
// 	TouchableOpacity,
// } from "react-native";

// const CreateListingScreen = () => {
// 	const { data, isLoading } = useCategoriesQuery();

// 	const [name, setName] = useState("");
// 	const [rate, setRate] = useState("");
// 	const [rateType, setRateType] = useState("");
// 	const [categoryId, setCategoryId] = useState("");
// 	const [deposit, setDeposit] = useState("");
// 	const [description, setDescription] = useState("");
// 	const [address, setAddress] = useState("");
// 	const [photos, setPhotos] = useState<string[]>([]);

// 	const { mutate, isPending } = usePostItemMutation();

// 	const handlePickImage = async () => {
// 		const result = await ImagePicker.launchImageLibraryAsync({
// 			mediaTypes: ImagePicker.MediaTypeOptions.Images,

// 			allowsMultipleSelection: true, // optional
// 			quality: 1,
// 		});

// 		if (!result.canceled && result.assets && result.assets.length > 0) {
// 			const uri = result.assets[0].uri;
// 			setPhotos((prev) => [...prev, uri]);
// 		}	
// 	};

// 	const handleSubmit = () => {
// 		console.log(data);
// 		if (
// 			!name ||
// 			!rate ||
// 			!rateType ||
// 			!categoryId ||
// 			!description ||
// 			!address ||
// 			photos.length === 0
// 		) {
// 			Alert.alert(
// 				"Missing Fields",
// 				"Please fill all fields and upload a photo."
// 			);
// 			return;
// 		}

// 		const payload = {
// 			name,
// 			rate: Number(rate),
// 			rateType,
// 			photos,
// 			categoryId,
// 			deposit: Number(deposit) || 0,
// 			description,
// 			location: {
// 				address,
// 				latitude: 27, // use integer to satisfy validation
// 				longitude: 85, // use integer
// 				radius: 10,
// 			},
// 		};

// 		console.log("Submitting payload:", payload);

// 		mutate(payload, {
// 			onSuccess: () => {
// 				Alert.alert("Success", "Item posted successfully!");
// 				setName("");
// 				setRate("");
// 				setRateType("");
// 				setCategoryId("");
// 				setDeposit("");
// 				setDescription("");
// 				setAddress("");
// 				setPhotos([]);
// 			},
// 			onError: (err: any) => {
// 				console.error(
// 					"Error posting item:",
// 					err?.response?.data || err.message
// 				);
// 				Alert.alert("Error", err?.message || "Failed to post item.");
// 			},
// 		});
// 	};

// 	return (
// 		<ScrollView contentContainerStyle={styles.container}>
// 			<Text style={styles.label}>Item Name</Text>
// 			<TextInput style={styles.input} value={name} onChangeText={setName} />

// 			<Text style={styles.label}>Rate</Text>
// 			<TextInput
// 				style={styles.input}
// 				value={rate}
// 				onChangeText={setRate}
// 				keyboardType="numeric"
// 			/>

// 			<Picker
// 				selectedValue={rateType}
// 				onValueChange={(itemValue) => setRateType(itemValue)}
// 				style={styles.input}
// 			>
// 				<Picker.Item label="Select Rate Type" value="" />
// 				<Picker.Item label="Hourly" value="hourly" />
// 				<Picker.Item label="Daily" value="daily" />
// 				<Picker.Item label="Weekly" value="weekly" />
// 				<Picker.Item label="Monthly" value="monthly" />
// 			</Picker>

// 			<Text style={styles.label}>Select Category</Text>
// 			{isLoading ? (
// 				<Text>Loading categories...</Text>
// 			) : (
// 				<Picker
// 					selectedValue={categoryId}
// 					onValueChange={(itemValue) => {
// 						console.log(itemValue);
// 						console.log("itemValue");

// 						return setCategoryId(itemValue);
// 					}}
// 					style={styles.input}
// 				>
// 					<Picker.Item label="Select Category" value="" />
// 					{Array.isArray(data?.data) &&
// 						data.data.map((cat) => (
// 							<Picker.Item key={cat.id} label={cat.name} value={cat.id} />
// 						))}
// 				</Picker>
// 			)}

// 			<Text style={styles.label}>Deposit</Text>
// 			<TextInput
// 				style={styles.input}
// 				value={deposit}
// 				onChangeText={setDeposit}
// 				keyboardType="numeric"
// 			/>

// 			<Text style={styles.label}>Description</Text>
// 			<TextInput
// 				style={[styles.input, { height: 100 }]}
// 				value={description}
// 				onChangeText={setDescription}
// 				multiline
// 			/>

// 			<Text style={styles.label}>Address</Text>
// 			<TextInput
// 				style={styles.input}
// 				value={address}
// 				onChangeText={setAddress}
// 			/>

// 			<Text style={styles.label}>Photos</Text>
// 			<TouchableOpacity onPress={handlePickImage} style={styles.imageButton}>
// 				<Text style={styles.imageButtonText}>Pick Image</Text>
// 			</TouchableOpacity>

// 			<ScrollView horizontal>
// 				{photos.map((uri, index) => (
// 					<Image key={index} source={{ uri }} style={styles.imagePreview} />
// 				))}
// 			</ScrollView>

// 			<TouchableOpacity
// 				style={styles.submitButton}
// 				onPress={handleSubmit}
// 				disabled={isPending}
// 			>
// 				<Text style={styles.submitButtonText}>
// 					{isPending ? "Submitting..." : "Submit Listing"}
// 				</Text>
// 			</TouchableOpacity>
// 		</ScrollView>
// 	);
// };

// export default CreateListingScreen;

// const styles = StyleSheet.create({
// 	container: {
// 		padding: 16,
// 		gap: 12,
// 	},
// 	label: {
// 		fontWeight: "600",
// 		fontSize: 16,
// 		marginBottom: 4,
// 	},
// 	input: {
// 		borderWidth: 1,
// 		borderColor: "#ccc",
// 		borderRadius: 8,
// 		paddingHorizontal: 12,
// 		paddingVertical: 8,
// 		fontSize: 16,
// 	},
// 	imageButton: {
// 		backgroundColor: "#f0ad4e",
// 		padding: 10,
// 		borderRadius: 8,
// 		alignItems: "center",
// 	},
// 	imageButtonText: {
// 		color: "#fff",
// 		fontWeight: "bold",
// 	},
// 	imagePreview: {
// 		width: 80,
// 		height: 80,
// 		borderRadius: 8,
// 		marginRight: 10,
// 		marginTop: 8,
// 	},
// 	submitButton: {
// 		backgroundColor: "#28a745",
// 		padding: 14,
// 		borderRadius: 10,
// 		alignItems: "center",
// 		marginTop: 16,
// 	},
// 	submitButtonText: {
// 		color: "#fff",
// 		fontSize: 16,
// 		fontWeight: "600",
// 	},
// });


// import { usePostItemMutation } from "@/Api/mutation/postItemMutation";
// import { useCategoriesQuery } from "@/Api/query/categoriesQuery";
// import { Feather } from "@expo/vector-icons";
// import { Picker } from "@react-native-picker/picker";
// import * as ImagePicker from "expo-image-picker";
// import React, { useState } from "react";
// import {
// 	ActivityIndicator,
// 	Alert,
// 	Image,
// 	ScrollView,
// 	StyleSheet,
// 	Text,
// 	TextInput,
// 	TouchableOpacity,
// 	View,
// } from "react-native";
// import Animated, { FadeInUp } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// const CreateListingScreen = () => {
//   const { data, isLoading } = useCategoriesQuery();

//   const [name, setName] = useState("");
//   const [rate, setRate] = useState("");
//   const [rateType, setRateType] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [deposit, setDeposit] = useState("");
//   const [description, setDescription] = useState("");
//   const [address, setAddress] = useState("");
//   const [photos, setPhotos] = useState<string[]>([]);

//   const { mutate, isPending } = usePostItemMutation();
//   const insets = useSafeAreaInsets();

//   const handlePickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsMultipleSelection: true,
//       quality: 1,
//     });

//     if (!result.canceled && result.assets && result.assets.length > 0) {
//       const uri = result.assets[0].uri;
//       setPhotos((prev) => [...prev, uri]);
//     }
//   };

//   const handleSubmit = () => {
//     if (
//       !name ||
//       !rate ||
//       !rateType ||
//       !categoryId ||
//       !description ||
//       !address ||
//       photos.length === 0
//     ) {
//       Alert.alert("Missing Fields", "Please fill all fields and upload a photo.");
//       return;
//     }

//     const payload = {
//       name,
//       rate: Number(rate),
//       rateType,
//       photos,
//       categoryId,
//       deposit: Number(deposit) || 0,
//       description,
//       location: {
//         address,
//         latitude: 27,
//         longitude: 85,
//         radius: 10,
//       },
//     };

//     mutate(payload, {
//       onSuccess: () => {
//         Alert.alert("Success", "Item posted successfully!");
//         setName("");
//         setRate("");
//         setRateType("");
//         setCategoryId("");
//         setDeposit("");
//         setDescription("");
//         setAddress("");
//         setPhotos([]);
//       },
//       onError: (err: any) => {
//         console.error("Error posting item:", err?.response?.data || err.message);
//         Alert.alert("Error", err?.message || "Failed to post item.");
//       },
//     });
//   };

//   return (
//     <ScrollView
//       contentContainerStyle={{
//         padding: 20,
//         paddingTop: insets.top + 20,
//         gap: 16,
//         backgroundColor: "#f9f9f9",
//       }}
//       showsVerticalScrollIndicator={false}
//     >
//       <Animated.View entering={FadeInUp.delay(100)}>
//         <FormLabel label="Item Name" />
//         <StyledInput value={name} onChangeText={setName} />

//         <FormLabel label="Rate" />
//         <StyledInput value={rate} onChangeText={setRate} keyboardType="numeric" />

//         <FormLabel label="Rate Type" />
//         <StyledPicker selectedValue={rateType} onValueChange={setRateType}>
//           <Picker.Item label="Select Rate Type" value="" />
//           <Picker.Item label="Hourly" value="hourly" />
//           <Picker.Item label="Daily" value="daily" />
//           <Picker.Item label="Weekly" value="weekly" />
//           <Picker.Item label="Monthly" value="monthly" />
//         </StyledPicker>

//         <FormLabel label="Category" />
//         {isLoading ? (
//           <ActivityIndicator color="#ff9900" />
//         ) : (
//           <StyledPicker selectedValue={categoryId} onValueChange={setCategoryId}>
//             <Picker.Item label="Select Category" value="" />
//             {Array.isArray(data?.data) &&
//               data.data.map((cat) => (
//                 <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
//               ))}
//           </StyledPicker>
//         )}

//         <FormLabel label="Deposit" />
//         <StyledInput
//           value={deposit}
//           onChangeText={setDeposit}
//           keyboardType="numeric"
//         />

//         <FormLabel label="Description" />
//         <StyledInput
//           value={description}
//           onChangeText={setDescription}
//           multiline
//           style={{ height: 100, textAlignVertical: "top" }}
//         />

//         <FormLabel label="Address" />
//         <StyledInput value={address} onChangeText={setAddress} />

//         <FormLabel label="Photos" />
//         <TouchableOpacity onPress={handlePickImage} style={styles.imageButton}>
//           <Feather name="image" size={20} color="#fff" />
//           <Text style={styles.imageButtonText}> Pick Image</Text>
//         </TouchableOpacity>

//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           {photos.map((uri, index) => (
//             <Image key={index} source={{ uri }} style={styles.imagePreview} />
//           ))}
//         </ScrollView>

//         <TouchableOpacity
//           style={styles.submitButton}
//           onPress={handleSubmit}
//           disabled={isPending}
//         >
//           {isPending ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.submitButtonText}>Submit Listing</Text>
//           )}
//         </TouchableOpacity>
//       </Animated.View>
//     </ScrollView>
//   );
// };

// const FormLabel = ({ label }) => <Text style={styles.label}>{label}</Text>;

// const StyledInput = (props) => (
//   <TextInput
//     {...props}
//     style={[styles.input, props.style]}
//     placeholderTextColor="#999"
//   />
// );

// const StyledPicker = ({ children, ...props }) => (
//   <View style={styles.pickerContainer}>
//     <Picker {...props}>{children}</Picker>
//   </View>
// );

// export default CreateListingScreen;

// const styles = StyleSheet.create({
//   label: {
//     fontWeight: "600",
//     fontSize: 16,
//     marginBottom: 4,
//     color: "#333",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     fontSize: 16,
//     backgroundColor: "#fff",
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     overflow: "hidden",
//     backgroundColor: "#fff",
//   },
//   imageButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#ff9900",
//     padding: 12,
//     borderRadius: 10,
//     marginTop: 8,
//   },
//   imageButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   imagePreview: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//     marginRight: 12,
//     marginTop: 10,
//   },
//   submitButton: {
//     backgroundColor: "#28a745",
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   submitButtonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },
// });

// import { usePostItemMutation } from "@/Api/mutation/postItemMutation";
// import { useCategoriesQuery } from "@/Api/query/categoriesQuery";
// import { Feather } from "@expo/vector-icons";
// import { Picker } from "@react-native-picker/picker";
// import * as ImagePicker from "expo-image-picker";
// import { Formik } from "formik";
// import React, { useState } from "react";
// import {
// 	ActivityIndicator,
// 	Alert,
// 	Image,
// 	ScrollView,
// 	StyleSheet,
// 	Text,
// 	TextInput,
// 	TouchableOpacity,
// 	View,
// } from "react-native";
// import Animated, { FadeInUp } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import * as yup from "yup";

// const validationSchema = yup.object().shape({
//   name: yup.string().required("Item name is required"),
//   rate: yup.number().typeError("Rate must be a number").required("Rate is required"),
//   rateType: yup.string().required("Rate type is required"),
//   categoryId: yup.string().required("Category is required"),
//   deposit: yup.number().typeError("Deposit must be a number").required("Deposit is required"),
//   description: yup.string().required("Description is required"),
//   address: yup.string().required("Address is required"),
// });

// const imagePlaceholders = ["Front View", "Side View", "Top View"];

// const CreateListingScreen = () => {
//   const { data, isLoading } = useCategoriesQuery();
//   const { mutate, isPending } = usePostItemMutation();
//   const insets = useSafeAreaInsets();
//   const [photos, setPhotos] = useState<string[]>([]);

//   const handlePickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsMultipleSelection: true,
//       quality: 1,
//       selectionLimit: 5,
//     });

//     if (!result.canceled && result.assets) {
//       const uris = result.assets.map((asset) => asset.uri);
//       setPhotos((prev) => [...prev, ...uris]);
//     }
//   };

//   return (
//     <ScrollView
//       contentContainerStyle={{
//         padding: 20,
//         paddingTop: insets.top + 20,
//         gap: 16,
//         backgroundColor: "#f9f9f9",
//       }}
//       showsVerticalScrollIndicator={false}
//     >
//       <Formik
//         initialValues={{
//           name: "",
//           rate: "",
//           rateType: "",
//           categoryId: "",
//           deposit: "",
//           description: "",
//           address: "",
//         }}
//         validationSchema={validationSchema}
//         onSubmit={(values) => {
//           if (photos.length === 0) {
//             Alert.alert("Missing Images", "Please upload at least one image.");
//             return;
//           }

//           const payload = {
//             ...values,
//             rate: Number(values.rate),
//             deposit: Number(values.deposit),
//             photos,
//             location: {
//               address: values.address,
//               latitude: 27,
//               longitude: 85,
//               radius: 10,
//             },
//           };

//           mutate(payload, {
//             onSuccess: () => {
//               Alert.alert("Success", "Item posted successfully!");
//               setPhotos([]);
//             },
//             onError: (err: any) => {
//               console.error("Error posting item:", err?.response?.data || err.message);
//               Alert.alert("Error", err?.message || "Failed to post item.");
//             },
//           });
//         }}
//       >
//         {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
//           <Animated.View entering={FadeInUp.delay(100)}>
//             <FormLabel label="Item Name" />
//             <StyledInput
//               value={values.name}
//               onChangeText={handleChange("name")}
//               onBlur={handleBlur("name")}
//               error={touched.name && errors.name}
//             />

//             <FormLabel label="Rate" />
//             <StyledInput
//               value={values.rate}
//               onChangeText={handleChange("rate")}
//               onBlur={handleBlur("rate")}
//               keyboardType="numeric"
//               error={touched.rate && errors.rate}
//             />

//             <FormLabel label="Rate Type" />
//             <StyledPicker
//               selectedValue={values.rateType}
//               onValueChange={handleChange("rateType")}
//             >
//               <Picker.Item label="Select Rate Type" value="" />
//               <Picker.Item label="Hourly" value="hourly" />
//               <Picker.Item label="Daily" value="daily" />
//               <Picker.Item label="Weekly" value="weekly" />
//               <Picker.Item label="Monthly" value="monthly" />
//             </StyledPicker>
//             {touched.rateType && errors.rateType && <Text style={styles.errorText}>{errors.rateType}</Text>}

//             <FormLabel label="Category" />
//             {isLoading ? (
//               <ActivityIndicator color="#ff9900" />
//             ) : (
//               <StyledPicker
//                 selectedValue={values.categoryId}
//                 onValueChange={handleChange("categoryId")}
//               >
//                 <Picker.Item label="Select Category" value="" />
//                 {Array.isArray(data?.data) &&
//                   data.data.map((cat) => (
//                     <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
//                   ))}
//               </StyledPicker>
//             )}
//             {touched.categoryId && errors.categoryId && <Text style={styles.errorText}>{errors.categoryId}</Text>}

//             <FormLabel label="Deposit" />
//             <StyledInput
//               value={values.deposit}
//               onChangeText={handleChange("deposit")}
//               onBlur={handleBlur("deposit")}
//               keyboardType="numeric"
//               error={touched.deposit && errors.deposit}
//             />

//             <FormLabel label="Description" />
//             <StyledInput
//               value={values.description}
//               onChangeText={handleChange("description")}
//               onBlur={handleBlur("description")}
//               multiline
//               style={{ height: 100, textAlignVertical: "top" }}
//               error={touched.description && errors.description}
//             />

//             <FormLabel label="Address" />
//             <StyledInput
//               value={values.address}
//               onChangeText={handleChange("address")}
//               onBlur={handleBlur("address")}
//               error={touched.address && errors.address}
//             />

//             <FormLabel label="Photos" />
//             <TouchableOpacity onPress={handlePickImage} style={styles.imageButton}>
//               <Feather name="image" size={20} color="#fff" />
//               <Text style={styles.imageButtonText}> Pick Images</Text>
//             </TouchableOpacity>

//             <View style={{ marginTop: 12 }}>
//               {imagePlaceholders.map((label, index) => (
//                 <View key={label} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
//                   <Text style={{ width: 90, color: "#444" }}>{label}:</Text>
//                   {photos[index] ? (
//                     <Image source={{ uri: photos[index] }} style={styles.imagePreview} />
//                   ) : (
//                     <View style={[styles.imagePreview, { backgroundColor: "#eee", justifyContent: "center", alignItems: "center" }]}> 
//                       <Text style={{ color: "#999", fontSize: 12 }}>No Image</Text>
//                     </View>
//                   )}
//                 </View>
//               ))}
//             </View>

//             <TouchableOpacity
//               style={styles.submitButton}
//               onPress={handleSubmit}
//               disabled={isPending}
//             >
//               {isPending ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.submitButtonText}>Submit Listing</Text>
//               )}
//             </TouchableOpacity>
//           </Animated.View>
//         )}
//       </Formik>
//     </ScrollView>
//   );
// };

// const FormLabel = ({ label }) => <Text style={styles.label}>{label}</Text>;

// const StyledInput = ({ error, ...props }) => (
//   <>
//     <TextInput
//       {...props}
//       style={[styles.input, props.style]}
//       placeholderTextColor="#999"
//     />
//     {error && <Text style={styles.errorText}>{error}</Text>}
//   </>
// );

// const StyledPicker = ({ children, ...props }) => (
//   <View style={styles.pickerContainer}>
//     <Picker {...props}>{children}</Picker>
//   </View>
// );

// export default CreateListingScreen;

// const styles = StyleSheet.create({
//   label: {
//     fontWeight: "600",
//     fontSize: 16,
//     marginBottom: 4,
//     color: "#333",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     fontSize: 16,
//     backgroundColor: "#fff",
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     overflow: "hidden",
//     backgroundColor: "#fff",
//   },
//   imageButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#ff9900",
//     padding: 12,
//     borderRadius: 10,
//     marginTop: 8,
//   },
//   imageButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   imagePreview: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//     marginRight: 12,
//     marginTop: 10,
//   },
//   submitButton: {
//     backgroundColor: "#28a745",
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   submitButtonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   errorText: {
//     color: "red",
//     fontSize: 14,
//     marginTop: 4,
//     marginBottom: 6,
//   },
// });

// import { usePostItemMutation } from "@/Api/mutation/postItemMutation";
// import { useCategoriesQuery } from "@/Api/query/categoriesQuery";
// import { Feather } from "@expo/vector-icons";
// import { Picker } from "@react-native-picker/picker";
// import * as ImagePicker from "expo-image-picker";
// import { Formik } from "formik";
// import React, { useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Animated, { FadeInUp } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// import * as yup from "yup";

// const validationSchema = yup.object().shape({
//   name: yup.string().required("Item name is required"),
//   rate: yup.number().typeError("Rate must be a number").required("Rate is required"),
//   rateType: yup.string().required("Rate type is required"),
//   categoryId: yup.string().required("Category is required"),
//   deposit: yup.number().typeError("Deposit must be a number").required("Deposit is required"),
//   description: yup.string().required("Description is required"),
//   address: yup.string().required("Address is required"),
// });


// const CreateListingScreen = () => {
  
//   const { data, isLoading } = useCategoriesQuery();
//   const { mutate, isPending,  } = usePostItemMutation();
//   const insets = useSafeAreaInsets();
//   const [mainImage, setMainImage] = useState<string | null>(null);
//   const [photos, setPhotos] = useState<string[]>([]);

//   const handlePickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsMultipleSelection: true,
//       quality: 1,
//       selectionLimit: 5,
//     });

//     if (!result.canceled && result.assets) {
//       const uris = result.assets.map((asset) => asset.uri);
//       if (!mainImage && uris.length > 0) setMainImage(uris[0]);
//       setPhotos((prev) => [...prev, ...uris.filter((uri) => uri !== mainImage)]);
//     }
//   };

//   const handleDeleteImage = (uri: string) => {
//     if (mainImage === uri) setMainImage(null);
//     setPhotos((prev) => prev.filter((photo) => photo !== uri));
//   };

//   return (
//     <ScrollView
//       contentContainerStyle={{
//         padding: 20,
//         paddingTop: insets.top + 20,
//         gap: 16,
//         backgroundColor: "#f9f9f9",
//       }}
//       showsVerticalScrollIndicator={false}
//     >
//       <Formik
//         initialValues={{
//           name: "",
//           rate: "",
//           rateType: "",
//           categoryId: "",
//           deposit: "",
//           description: "",
//           address: "",
//         }}
//         validationSchema={validationSchema}
//         onSubmit={(values, {resetForm}) => {
//           if (!mainImage) {
//             Alert.alert("Missing Images", "Please select a main image.");
//             return;
//           }

//           const payload = {
//             ...values,
//             rate: Number(values.rate),
//             deposit: Number(values.deposit),
//             photos: [mainImage, ...photos],
//             location: {
//               address: values.address,
//               latitude: 27,
//               longitude: 85,
//               radius: 10,
//             },
//           };
//          console.log(data)
//           mutate(payload, {
//             onSuccess: () => {
//               console.log("✅ Item posted successfully:", data.name); 
//               Alert.alert("Success", "Item posted successfully!");
//               setMainImage(null);
//               setPhotos([]);
//                resetForm()

//             },
//             onError: (err: any) => {
//               console.error("Error posting item:", err?.response?.data || err.message);
//               Alert.alert("Error", err?.message || "Failed to post item.");
//             },
//           });
//         }}
//       >
//         {({ handleChange, handleBlur, handleSubmit, values, errors, touched, resetForm }) => (
//           <Animated.View entering={FadeInUp.delay(100)}>
//             <FormLabel label="Item Name" />
//             <StyledInput
//               value={values.name}
//               onChangeText={handleChange("name")}
//               onBlur={handleBlur("name")}
//               error={touched.name && errors.name}
//             />

//             <FormLabel label="Rate" />
//             <StyledInput
//               value={values.rate}
//               onChangeText={handleChange("rate")}
//               onBlur={handleBlur("rate")}
//               keyboardType="numeric"
//               error={touched.rate && errors.rate}
//             />

//             <FormLabel label="Rate Type" />
//             <StyledPicker selectedValue={values.rateType} onValueChange={handleChange("rateType")}>
//               <Picker.Item label="Select Rate Type" value="" />
//               <Picker.Item label="Hourly" value="hourly" />
//               <Picker.Item label="Daily" value="daily" />
//               <Picker.Item label="Weekly" value="weekly" />
//               <Picker.Item label="Monthly" value="monthly" />
//             </StyledPicker>
//             {touched.rateType && errors.rateType && <Text style={styles.errorText}>{errors.rateType}</Text>}

//             <FormLabel label="Category" />
//             {isLoading ? (
//               <ActivityIndicator color="#ff9900" />
//             ) : (
//               <StyledPicker selectedValue={values.categoryId} onValueChange={handleChange("categoryId")}>
//                 <Picker.Item label="Select Category" value="" />
//                 {Array.isArray(data?.data) &&
//                   data.data.map((cat) => (
//                     <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
//                   ))}
//               </StyledPicker>
//             )}
//             {touched.categoryId && errors.categoryId && <Text style={styles.errorText}>{errors.categoryId}</Text>}

//             <FormLabel label="Deposit" />
//             <StyledInput
//               value={values.deposit}
//               onChangeText={handleChange("deposit")}
//               onBlur={handleBlur("deposit")}
//               keyboardType="numeric"
//               error={touched.deposit && errors.deposit}
//             />

//             <FormLabel label="Description" />
//             <StyledInput
//               value={values.description}
//               onChangeText={handleChange("description")}
//               onBlur={handleBlur("description")}
//               multiline
//               style={{ height: 100, textAlignVertical: "top" }}
//               error={touched.description && errors.description}
//             />

//             <FormLabel label="Address" />
//             <StyledInput
//               value={values.address}
//               onChangeText={handleChange("address")}
//               onBlur={handleBlur("address")}
//               error={touched.address && errors.address}
//             />

//             <FormLabel label="Photos" />
//             <TouchableOpacity onPress={handlePickImage} style={styles.imageButton}>
//               <Feather name="image" size={20} color="#fff" />
//               <Text style={styles.imageButtonText}> Pick Images</Text>
//             </TouchableOpacity>

//             {mainImage && (
//               <View style={styles.imageWrapper}>
//                 <Image source={{ uri: mainImage }} style={[styles.imagePreview, { width: 120, height: 120 }]} />
//                 <TouchableOpacity
//                   style={styles.deleteIcon}
//                   onPress={() => handleDeleteImage(mainImage)}
//                 >
// 					<Feather name="trash" size={16} color="#fff" />

//                 </TouchableOpacity>
//               </View>
//             )}

//             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 16 }}>
//               {photos.map((uri, index) => (
//                 <View key={index} style={styles.imageWrapper}>
//                   <Image source={{ uri }} style={styles.imagePreview} />
//                   <TouchableOpacity
//                     style={styles.deleteIcon}
//                     onPress={() => handleDeleteImage(uri)}
//                   >
// 					<Feather name="trash" size={16} color="#fff" />

//                   </TouchableOpacity>
//                 </View>
//               ))}
//             </ScrollView>

//             <TouchableOpacity
//               style={styles.submitButton}
//               onPress={handleSubmit}
//               disabled={isPending}
//             >
//               {isPending ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.submitButtonText}>Submit Listing</Text>
//               )}
//             </TouchableOpacity>
//           </Animated.View>
//         )}
//       </Formik>
//     </ScrollView>
//   );
// };

// const FormLabel = ({ label }) => <Text style={styles.label}>{label}</Text>;

// const StyledInput = ({ error, ...props }) => (
//   <>
//     <TextInput
//       {...props}
//       style={[styles.input, props.style]}
//       placeholderTextColor="#999"
//     />
//     {error && <Text style={styles.errorText}>{error}</Text>}
//   </>
// );

// const StyledPicker = ({ children, ...props }) => (
//   <View style={styles.pickerContainer}>
//     <Picker {...props}>{children}</Picker>
//   </View>
// );

// export default CreateListingScreen;

// const styles = StyleSheet.create({
//   label: {
//     fontWeight: "600",
//     fontSize: 16,
//     marginBottom: 4,
//     color: "#333",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     fontSize: 16,
//     backgroundColor: "#fff",
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     overflow: "hidden",
//     backgroundColor: "#fff",
//   },
//   imageButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#ff9900",
//     padding: 12,
//     borderRadius: 10,
//     marginTop: 8,
//   },
//   imageButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   imagePreview: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//   },
//   imageWrapper: {
//     marginRight: 12,
//     position: "relative",
//   },
//   deleteIcon: {
//     position: "absolute",
//     top: -8,
//     right: -8,
//     backgroundColor: "#e63946",
//     borderRadius: 999,
//     padding: 4,
//     zIndex: 2,
//   },
//   submitButton: {
//     backgroundColor: "#28a745",
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   submitButtonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   errorText: {
//     color: "red",
//     fontSize: 14,
//     marginTop: 4,
//     marginBottom: 6,
//   },
// });

// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from "expo-router";
// import React, { useState } from 'react';
// import {
//   ActivityIndicator,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Switch,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';


// const router = useRouter();

// // Example API hook (replace this import with yours)
// import { useGetRentedOutItemsQuery } from '@/Api/query/useGetRentedOutItemsQuery';

// const tabs = ['All Listings', 'Active Listings', 'Rented Out'];


// export default function Bookings() {
//   const [selectedTab, setSelectedTab] = useState('All Listings');

//   const { data, isLoading, error } = useGetRentedOutItemsQuery();
//   console.log('All rented items:', data);

//   const allListings = data?.data || [];

//   // Filter logic
//   const filteredListings = allListings.filter((item) => {
//     switch (selectedTab) {
//       case 'Active Listings':
//         return item.available === true;
//       case 'Rented Out':
//         return item.available === false;
//       default:
//         return true;
//     }
//   });

//   const toggleAvailability = (id) => {
//     console.log(`Toggle availability for item ID: ${id}`);
//     // TODO: Implement API call to update availability
//   };

//   return (
//     <View style={styles.container}>
//       <View style = {styles.TabsConatiner}>
//       <Text style={styles.title}>My Listings</Text>

//       {/* Tabs */}
//       <View style={styles.tabsContainer}>
//         {tabs.map((tab) => (
//           <TouchableOpacity
//             key={tab}
//             onPress={() => setSelectedTab(tab)}
//             style={[
//               styles.tabButton,
//               selectedTab === tab ? styles.activeTab : styles.inactiveTab,
//             ]}
//           >
//             <Text
//               style={
//                 selectedTab === tab
//                   ? styles.activeTabText
//                   : styles.inactiveTabText
//               }
//             >
//               {tab}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       </View>

//       {/* Content */}
//       {isLoading ? (
//         <ActivityIndicator size="large" color="#4863e8" />
//       ) : error ? (
//         <Text style={{ color: 'red' }}>Failed to load data.</Text>
//       ) : (
//         <ScrollView
//           style={styles.scrollView}
//           contentContainerStyle={{ paddingBottom: 100 }}
//           showsVerticalScrollIndicator={false}
//         >
//           {filteredListings.length === 0 ? (
//             <Text style={styles.emptyText}>
//               No items found for "{selectedTab}"
//             </Text>
//           ) : (
//             filteredListings.map((listing) => {
//               const imageUrl =
//                 listing.assets?.[0]?.url || 'https://via.placeholder.com/80';
//               const createdDate = listing.createdAt
//                 ? new Date(listing.createdAt).toLocaleDateString()
//                 : 'N/A';

//               return (
//                 <View key={listing.id} style={styles.card}>
//                   <Image source={{ uri: imageUrl }} style={styles.image} />

//                   <View style={styles.details}>
//                     <Text style={styles.listingTitle}>
//                       {listing.name || 'Untitled'}
//                     </Text>
//                     {listing.category?.name && (
//                       <Text style={styles.metaText}>
//                         {listing.category.name}
//                       </Text>
//                     )}
//                     {listing.description && (
//                       <Text
//                         style={styles.descriptionText}
//                         numberOfLines={2}
//                         ellipsizeMode="tail"
//                       >
//                         {listing.description}
//                       </Text>
//                     )}
//                     <Text style={styles.rate}>
//                       Rs {listing.rate} / {listing.rateType}
//                     </Text>
//                     <Text style={styles.metaText}>
//                       Listed On: {createdDate}
//                     </Text>

//                     <View style={styles.availability}>
//                       <View
//                         style={[
//                           styles.statusDot,
//                           {
//                             backgroundColor: listing.available === false
//                               ? '#F44336'
//                               : '#4CAF50',
//                           },
//                         ]}
//                       />
//                       <Text style={styles.statusText}>
//                         {listing.available === false
//                           ? 'Unavailable'
//                           : 'Available'}
//                       </Text>
//                       <Switch
//                         value={listing.available !== false}
//                         onValueChange={() => toggleAvailability(listing.id)}
//                         trackColor={{ false: '#ccc', true: '#4CAF50' }}
//                         thumbColor="#fff"
//                       />
//                     </View>
//                   </View>

//                   <View style={styles.actions}>
//                     <TouchableOpacity style={styles.editBtn}>
//                       <Text style={styles.editText}>Edit</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.deleteBtn}>
//                       <Text style={styles.deleteText}>Delete</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               );
//             })
//           )}
//         </ScrollView>
//       )}

//       {/* Fixed Add Button */}
      
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => router.push("/AddItemScreen")}

//       >
//         <Ionicons name="add" size={20} color="#fff" style={styles.addIcon} />
//         <Text style={styles.addButtonText}>Add New Item</Text>
//       </TouchableOpacity>
      
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFC107",
//     paddingTop: 40,
//     paddingHorizontal: 16,
//   },
 
//   title: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 20,
//     color: "#1E3A8A",
//   },
//   tabsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 16,
//     backgroundColor: "#FFE082", // lighter yellow background
//     padding: 6,
//     borderRadius: 12,
//   },
//   tabButton: {
//     flex: 1,
//     paddingVertical: 10,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   activeTab: {
//     backgroundColor: "#FFC107",
//   },
//   inactiveTab: {
//     backgroundColor: "transparent",
//   },
//   activeTabText: {
//     color: "#1E3A8A",
//     fontWeight: "600",
//   },
//   inactiveTabText: {
//     color: "#1E3A8A",
//     fontWeight: "500",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   emptyText: {
//     textAlign: "center",
//     marginTop: 40,
//     color: "#999",
//     fontSize: 16,
//   },
//   card: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 12,
//     marginBottom: 14,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.08,
//     shadowRadius: 2,
//     borderWidth: 1,
//     borderColor: "#FFE082",
//   },
//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 12,
//   },
//   details: {
//     flex: 1,
//     marginLeft: 12,
//     justifyContent: "space-between",
//   },
//   listingTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#1E3A8A",
//   },
//   rate: {
//     color: "#555",
//     fontSize: 14,
//     marginTop: 4,
//   },
//   metaText: {
//     color: "#777",
//     fontSize: 12,
//     marginTop: 2,
//   },
//   descriptionText: {
//     color: "#555",
//     fontSize: 13,
//     marginTop: 4,
//   },
//   availability: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 6,
//   },
//   statusDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginRight: 6,
//   },
//   statusText: {
//     fontSize: 13,
//     color: "#333",
//     marginRight: 10,
//   },
//   actions: {
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//     marginLeft: 10,
//   },
//   editBtn: {
//     backgroundColor: "#FFC107",
//     borderRadius: 6,
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//   },
//   deleteBtn: {
//     backgroundColor: "#E53935",
//     borderRadius: 6,
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//   },
//   editText: {
//     color: "#1E3A8A",
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   deleteText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   addButton: {
//     position: "absolute",
//     bottom: 20,
//     left: 16,
//     right: 16,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#1E3A8A",
//     paddingVertical: 14,
//     borderRadius: 10,
//     elevation: 4,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   addIcon: {
//     marginRight: 8,
//   },
//   addButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });



// // screens/BookingsScreen.js
// import AddButton from "@/src/components/ListingAddButton";
// import HeaderTabs from "@/src/components/ListingHeader";
// import ItemCard from "@/src/components/ListingItemCard";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

// import { useGetPendingRentOutItemsQuery } from "@/Api/query/useGetPendingRentOutItemsQuery";
// import { useGetRentedOutItemsQuery } from "@/Api/query/useGetRentedOutItemsQuery";

// const tabs = ["All Listings", "Request", "Rented Out"];

// export default function BookingsScreen() {
//   const router = useRouter();
//   const [selectedTab, setSelectedTab] = useState("All Listings");

//   const {
//     data: rentedOutData,
//     isLoading: isLoadingRentedOut,
//     error: errorRentedOut,
//   } = useGetRentedOutItemsQuery();

//   const {
//     data: pendingData,
//     isLoading: isLoadingPending,
//     error: errorPending,
//   } = useGetPendingRentOutItemsQuery();
//   console.log("pendin data",pendingData )

//   // Prepare filtered listings based on the selected tab
//   let filteredListings = [];

//   if (selectedTab === "Request") {
//     filteredListings = pendingData?.data || [];
//   } else if (selectedTab === "Rented Out") {
//     filteredListings = (rentedOutData?.data || []).filter(
//       (item) => item.orderStatus === "ACCEPTED" || item.orderStatus === "APPROVED"
//     );
//   } else {
//     // "All Listings" tab
//     filteredListings = rentedOutData?.data || [];
//   }

//   // Manage loading and error state based on selected tab
//   const isLoading = selectedTab === "Request" ? isLoadingPending : isLoadingRentedOut;
//   const error = selectedTab === "Request" ? errorPending : errorRentedOut;

//   const toggleAvailability = (id) => {
//     console.log(`Toggle availability for item ID: ${id}`);
//     // TODO: Implement toggle logic if needed
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header with tabs */}
//       <View style={styles.headerBackground}>
//         <HeaderTabs tabs={tabs} selectedTab={selectedTab} onTabSelect={setSelectedTab} />
//       </View>

//       {/* Main content */}
//       {isLoading ? (
//         <View style={styles.centered}>
//           <ActivityIndicator size="large" color="#4863e8" />
//           <Text>Loading items...</Text>
//         </View>
//       ) : error ? (
//         <View style={styles.centered}>
//           <Text style={{ color: "red" }}>Failed to load data.</Text>
//         </View>
//       ) : filteredListings.length === 0 ? (
//         <View style={styles.centered}>
//           <Text>No items found for "{selectedTab}"</Text>
//         </View>
//       ) : (
//         <ScrollView
//           contentContainerStyle={{ paddingBottom: 100 }}
//           showsVerticalScrollIndicator={false}
//         >
//           {filteredListings.map((listing) => (
//             <ItemCard
//               key={listing.id}
//               listing={listing}
//               onToggleAvailability={toggleAvailability}
//             />
//           ))}
//         </ScrollView>
//       )}

//       {/* Add Button */}
//       <AddButton onPress={() => router.push("/screens/AddItemScreen")} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 0, // To allow header background to go to top
//   },
//   headerBackground: {
//     backgroundColor: "#FFC107",
//     paddingTop: 40,
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   emptyText: {
//     textAlign: "center",
//     marginTop: 40,
//     color: "#999",
//     fontSize: 16,
//   },
// }); 


// // screens/BookingsScreen.js
// import { useDeleteItemMutation } from "@/Api/mutation/deleteItemMutation";
// import { useGetPendingRentOutItemsQuery } from "@/Api/query/useGetPendingRentOutItemsQuery";
// import { useGetRentedOutItemsQuery } from "@/Api/query/useGetRentedOutItemsQuery";
// import AddButton from "@/src/components/ListingAddButton";
// import HeaderTabs from "@/src/components/ListingHeader";
// import ItemCard from "@/src/components/ListingItemCard";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from "react-native";

// const tabs = ["All Listings", "Request", "Rented Out"];

// export default function BookingsScreen() {
//   const router = useRouter();
//   const [selectedTab, setSelectedTab] = useState("All Listings");

//   const {
//     data: rentedOutData,
//     isLoading: isLoadingRentedOut,
//     error: errorRentedOut,
//   } = useGetRentedOutItemsQuery();

//   const {
//     data: pendingData,
//     isLoading: isLoadingPending,
//     error: errorPending,
//   } = useGetPendingRentOutItemsQuery();

//   const { mutate: deleteItemMutation, isLoading: isDeleting } = useDeleteItemMutation();

//   const handleDeleteItem = (id:any) => {
//     Alert.alert(
//       "Confirm Deletion",
//       "Are you sure you want to delete this item?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: () => deleteItemMutation(id),
//         },
//       ]
//     );
//   };

//   const toggleAvailability = (id:any) => {
//     console.log(`Toggle availability for item ID: ${id}`);
//     // TODO: Implement availability toggle
//   };

//   let filteredListings = [];

//   if (selectedTab === "Request") {
//     filteredListings = pendingData?.data || [];
//   } else if (selectedTab === "Rented Out") {
//     filteredListings = (rentedOutData?.data || []).filter(
//       (item:any) => item.orderStatus === "ACCEPTED" || item.orderStatus === "APPROVED"
//     );
//   } else {
//     filteredListings = rentedOutData?.data || [];
//   }

//   const isLoading = selectedTab === "Request" ? isLoadingPending : isLoadingRentedOut;
//   const error = selectedTab === "Request" ? errorPending : errorRentedOut;

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerBackground}>
//         <HeaderTabs tabs={tabs} selectedTab={selectedTab} onTabSelect={setSelectedTab} />
//       </View>

//       {isLoading || isDeleting ? (
//         <View style={styles.centered}>
//           <ActivityIndicator size="large" color="#4863e8" />
//           <Text>Loading items...</Text>
//         </View>
//       ) : error ? (
//         <View style={styles.centered}>
//           <Text style={{ color: "red" }}>Failed to load data.</Text>
//         </View>
//       ) : filteredListings.length === 0 ? (
//         <View style={styles.centered}>
//           <Text>No items found for "{selectedTab}"</Text>
//         </View>
//       ) : (
//         <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
//           {filteredListings.map((listing:any) => (
//             <ItemCard
//               key={listing.id}
//               listing={listing}
//               onToggleAvailability={toggleAvailability}
//               onDelete={handleDeleteItem}
//             />
//           ))}
//         </ScrollView>
//       )}

//       <AddButton onPress={() => router.push("/screens/AddItemScreen")} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   headerBackground: {
//     backgroundColor: "#FFC107",
//     paddingTop: 40,
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
// });


// import { useGetPendingRentOutItemsQuery } from "@/Api/query/useGetPendingRentOutItemsQuery";
// import { useGetRentedOutItemsQuery } from "@/Api/query/useGetRentedOutItemsQuery";
// import AddButton from "@/src/components/ListingAddButton";
// import HeaderTabs from "@/src/components/ListingHeader";
// import ItemCard from "@/src/components/ListingItemCard"; // This has delete built-in now
// import { useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
// import PendingRequestCard from "@/src/components/PendingRequestCard";
// import { useAcceptRequestMutation } from "@/Api/mutation/userAcceptRequestMutation";
// import { useRejectRequestMutation } from "@/Api/mutation/useRejectRequestMutation";

// const tabs = ["All Listings", "Request", "Rented Out"];

// export default function BookingsScreen() {
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const [selectedTab, setSelectedTab] = useState("All Listings");

//   const { mutate: acceptRequest } = useAcceptRequestMutation();
// const { mutate: rejectRequest } = useRejectRequestMutation()

//   const {
//     data: rentedOutData,
//     isLoading: isLoadingRentedOut,
//     error: errorRentedOut,
//   } = useGetRentedOutItemsQuery();

//   const {
//     data: pendingData,
//     isLoading: isLoadingPending,
//     error: errorPending,
//   } = useGetPendingRentOutItemsQuery();
//   console.log("pendin items",pendingData)

//   const toggleAvailability = (id:any) => {
//     console.log(`Toggle availability for item ID: ${id}`);
//     // TODO: Implement availability toggle
//   };

//   let filteredListings = [];

//   if (selectedTab === "Request") {
//     filteredListings = pendingData?.data || [];
//   } else if (selectedTab === "Rented Out") {
//     filteredListings = (rentedOutData?.data || []).filter(
//       (item:any) => item.orderStatus === "ACCEPTED" || item.orderStatus === "APPROVED"
//     );
//   } else {
//     filteredListings = rentedOutData?.data || [];
//   }

//   const isLoading = selectedTab === "Request" ? isLoadingPending : isLoadingRentedOut;
//   const error = selectedTab === "Request" ? errorPending : errorRentedOut;

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerBackground}>
//         <HeaderTabs tabs={tabs} selectedTab={selectedTab} onTabSelect={setSelectedTab} />
//       </View>

//       {isLoading ? (
//         <View style={styles.centered}>
//           <ActivityIndicator size="large" color="#4863e8" />
//           <Text>Loading items...</Text>
//         </View>
//       ) : error ? (
//         <View style={styles.centered}>
//           <Text style={{ color: "red" }}>Failed to load data.</Text>
//         </View>
//       ) : filteredListings.length === 0 ? (
//         <View style={styles.centered}>
//           <Text>No items found for "{selectedTab}"</Text>
//         </View>
//       ) : (
//        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
//     {filteredListings.map((listing:any) => (
//       <ItemCard
//         key={listing.id}
//         listing={listing}
//         onToggleAvailability={toggleAvailability}
//         onDeleted={() => {
//           // Refresh the queries to update the list automatically
//           queryClient.invalidateQueries({ queryKey:['pendingRentOutItems']});
//           queryClient.invalidateQueries({ queryKey:['rentedOutItems']});
//         }}
//       />
//     ))}
//   </ScrollView>
//       )}

//       <AddButton onPress={() => router.push("/screens/AddItemScreen")} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   headerBackground: {
//     backgroundColor: "#FFC107",
//     paddingTop: 40,
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
// });


// import { useAcceptRequestMutation } from "@/Api/mutation/userAcceptRequestMutation";
// import { useRejectRequestMutation } from "@/Api/mutation/useRejectRequestMutation";
// import { useGetPendingRentOutItemsQuery } from "@/Api/query/useGetPendingRentOutItemsQuery";
// import { useGetRentedOutItemsQuery } from "@/Api/query/useGetRentedOutItemsQuery";
// import AddButton from "@/src/components/ListingAddButton";
// import HeaderTabs from "@/src/components/ListingHeader";
// import ItemCard from "@/src/components/ListingItemCard"; // This has delete built-in now
// import PendingRequestCard from "@/src/components/PendingRequestCard";
// import { useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

// const tabs = ["All Listings", "Request", "Rented Out"];

// export default function BookingsScreen() {
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const [selectedTab, setSelectedTab] = useState("All Listings");

//   const { mutate: acceptRequest } = useAcceptRequestMutation();
//   const { mutate: rejectRequest } = useRejectRequestMutation();

//   const {
//     data: rentedOutData,
//     isLoading: isLoadingRentedOut,
//     error: errorRentedOut,
//   } = useGetRentedOutItemsQuery();

//   const {
//     data: pendingData,
//     isLoading: isLoadingPending,
//     error: errorPending,
//   } = useGetPendingRentOutItemsQuery();
//   console.log("pending data",pendingData)

//   const toggleAvailability = (id: any) => {
//     console.log(`Toggle availability for item ID: ${id}`);
//     // TODO: Implement availability toggle
//   };

//   let filteredListings: any[] = [];

//   if (selectedTab === "Request") {
//     filteredListings = pendingData?.data || [];
//   } else if (selectedTab === "Rented Out") {
//     filteredListings = (rentedOutData?.data || []).filter(
//       (item: any) => item.orderStatus === "ACCEPTED" || item.orderStatus === "APPROVED"
//     );
//   } else {
//     filteredListings = rentedOutData?.data || [];
//   }

//   const isLoading = selectedTab === "Request" ? isLoadingPending : isLoadingRentedOut;
//   const error = selectedTab === "Request" ? errorPending : errorRentedOut;

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerBackground}>
//         <HeaderTabs tabs={tabs} selectedTab={selectedTab} onTabSelect={setSelectedTab} />
//       </View>

//       {isLoading ? (
//         <View style={styles.centered}>
//           <ActivityIndicator size="large" color="#4863e8" />
//           <Text>Loading items...</Text>
//         </View>
//       ) : error ? (
//         <View style={styles.centered}>
//           <Text style={{ color: "red" }}>Failed to load data.</Text>
//         </View>
//       ) : filteredListings.length === 0 ? (
//         <View style={styles.centered}>
//           <Text>No items found for "{selectedTab}"</Text>
//         </View>
//       ) : (
//         <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
//           {filteredListings.map((listing: any) =>
//             selectedTab === "Request" ? (
//               <PendingRequestCard
//                 key={listing.id}
//                 item={listing}
//                 onAccept={(id: string) => {
//                   acceptRequest(id);
//                 }}
//                 onReject={(id: string) => {
//                   rejectRequest(id);
//                 }}
//               />
//             ) : (
//               <ItemCard
//                 key={listing.id}
//                 listing={listing}
//                 onToggleAvailability={toggleAvailability}
//                 onDeleted={() => {
//                   queryClient.invalidateQueries({ queryKey: ["pendingRentOutItems"] });
//                   queryClient.invalidateQueries({ queryKey: ["rentedOutItems"] });
//                 }}
//               />
//             )
//           )}
//         </ScrollView>
//       )}

//       <AddButton onPress={() => router.push("/screens/AddItemScreen")} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   headerBackground: {
//     backgroundColor: "#FFC107",
//     paddingTop: 40,
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
// });


import { useAcceptRequestMutation } from "@/Api/mutation/userAcceptRequestMutation";
import { useRejectRequestMutation } from "@/Api/mutation/useRejectRequestMutation";
import { useGetPendingRentOutItemsQuery } from "@/Api/query/useGetPendingRentItemsQuery";
import { useGetRentedOutItemsQuery } from "@/Api/query/useGetRentedOutItemsQuery";
import AddButton from "@/src/components/ListingAddButton";
import HeaderTabs from "@/src/components/ListingHeader";
import ItemCard from "@/src/components/ListingItemCard"; // This has delete built-in now
import PendingRequestCard from "@/src/components/PendingRequestCard";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

const tabs = ["All Listings", "Request", "Rented Out"];

export default function BookingsScreen() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("All Listings");

  const { mutate: acceptRequest } = useAcceptRequestMutation();
  const { mutate: rejectRequest } = useRejectRequestMutation();

  const {
    data: rentedOutData,
    isLoading: isLoadingRentedOut,
    error: errorRentedOut,
  } = useGetRentedOutItemsQuery();

  const {
    data: pendingQueryData,
    isLoading: isLoadingPending,
    error: errorPending,
  } = useGetPendingRentOutItemsQuery();
  console.log("pensdkajfslk", pendingQueryData)

  const [localPendingData, setLocalPendingData] = useState<any[]>([]);

  useEffect(() => {
    if (pendingQueryData?.data) {
      setLocalPendingData(pendingQueryData.data);
    }
  }, [pendingQueryData]);

  const toggleAvailability = (id: any) => {
    console.log(`Toggle availability for item ID: ${id}`);
    // TODO: Implement availability toggle
  };

  let filteredListings: any[] = [];

  if (selectedTab === "Request") {
    filteredListings = localPendingData;
  } else if (selectedTab === "Rented Out") {
    filteredListings = (rentedOutData?.data || []).filter(
      (item: any) =>
        item.orderStatus === "ACCEPTED" || item.orderStatus === "APPROVED"
    );
  } else {
    filteredListings = rentedOutData?.data || [];
  }

  const isLoading =
    selectedTab === "Request" ? isLoadingPending : isLoadingRentedOut;
  const error =
    selectedTab === "Request" ? errorPending : errorRentedOut;

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground}>
        <HeaderTabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabSelect={setSelectedTab}
        />
      </View>

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#4863e8" />
          <Text>Loading items...</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={{ color: "red" }}>Failed to load data.</Text>
        </View>
      ) : filteredListings.length === 0 ? (
        <View style={styles.centered}>
          <Text>No items found for "{selectedTab}"</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {filteredListings.map((listing: any) =>
            selectedTab === "Request" ? (
              <PendingRequestCard
                key={listing.id}
                item={listing}
                onAccept={(id: string) => {
                  acceptRequest(id, {
                    onSuccess: () => {
                      setLocalPendingData((prev) =>
                        prev.map((item) =>
                          item.id === id
                            ? { ...item, orderStatus: "APPROVED" }
                            : item
                        )
                      );
                      queryClient.invalidateQueries({
                        queryKey: ["rentedOutItems"],
                      });
                    },
                  });
                }}
                onReject={(id: string) => {
                  rejectRequest(id, {
                    onSuccess: () => {
                      setLocalPendingData((prev) =>
                        prev.map((item) =>
                          item.id === id
                            ? { ...item, orderStatus: "REJECTED" }
                            : item
                        )
                      );
                    },
                  });
                }}
              />
            ) : (
              <ItemCard
                key={listing.id}
                listing={listing}
                onToggleAvailability={toggleAvailability}
                onDeleted={() => {
                  queryClient.invalidateQueries({
                    queryKey: ["pendingRentOutItems"],
                  });
                  queryClient.invalidateQueries({
                    queryKey: ["rentedOutItems"],
                  });
                }}
              />
            )
          )}
        </ScrollView>
      )}

      <AddButton onPress={() => router.push("/screens/AddItemScreen")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBackground: {
    backgroundColor: "#FFC107",
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
