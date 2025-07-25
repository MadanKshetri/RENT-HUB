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
// 	name: yup.string().required("Item name is required"),
// 	rate: yup
// 		.number()
// 		.typeError("Rate must be a number")
// 		.required("Rate is required"),
// 	rateType: yup.string().required("Rate type is required"),
// 	categoryId: yup.string().required("Category is required"),
// 	description: yup.string(), // optional
// 	address: yup.string().required("Address is required"),
// });

// const CreateListingScreen = () => {
// 	const { data, isLoading } = useCategoriesQuery();
// 	console.log("category Data", data);
// 	const { mutate, isPending } = usePostItemMutation();
// 	const insets = useSafeAreaInsets();
// 	const [mainImage, setMainImage] = useState<string | null>(null);
// 	const [photos, setPhotos] = useState<string[]>([]);
// 	const [categoryAttributes, setAttributes] = useState<
// 		{
// 			name: string;
// 			type: string;
// 			isRequired: boolean;
// 			options?: { label: string; value: string }[];
// 			value?: string; // user input
// 		}[]
// 	>([]);

// 	const handlePickImage = async () => {
// 		const result = await ImagePicker.launchImageLibraryAsync({
// 			mediaTypes: ImagePicker.MediaTypeOptions.Images,
// 			allowsMultipleSelection: true,
// 			quality: 1,
// 			selectionLimit: 5,
// 		});

// 		if (!result.canceled && result.assets) {
// 			const uris = result.assets.map((asset) => asset.uri);
// 			if (!mainImage && uris.length > 0) setMainImage(uris[0]);
// 			setPhotos((prev) => [
// 				...prev,
// 				...uris.filter((uri) => uri !== mainImage),
// 			]);
// 		}
// 	};

// 	const handleDeleteImage = (uri: string) => {
// 		if (mainImage === uri) setMainImage(null);
// 		setPhotos((prev) => prev.filter((photo) => photo !== uri));
// 	};

// 	const handleAddAttribute = () => {
// 		setAttributes((prev) => [...prev, { key: "", value: "" }]);
// 	};

// 	const handleRemoveAttribute = (index: number) => {
// 		setAttributes((prev) => prev.filter((_, i) => i !== index));
// 	};

// 	const handleAttributeChange = (
// 		index: number,
// 		field: "key" | "value",
// 		text: string
// 	) => {
// 		setAttributes((prev) => {
// 			const updated = [...prev];
// 			updated[index][field] = text;
// 			return updated;
// 		});
// 	};

// 	return (
// 		<ScrollView
// 			contentContainerStyle={{
// 				padding: 20,
// 				paddingTop: insets.top + 20,
// 				gap: 16,
// 				backgroundColor: "#f9f9f9",
// 			}}
// 			showsVerticalScrollIndicator={false}
// 		>
// 			<Formik
// 				initialValues={{
// 					name: "",
// 					rate: "",
// 					rateType: "",
// 					categoryId: "",
// 					description: "",
// 					address: "",
// 				}}
// 				validationSchema={validationSchema}
// 				onSubmit={(values, { resetForm }) => {
// 					if (!mainImage) {
// 						Alert.alert("Missing Images", "Please select a main image.");
// 						return;
// 					}

// 					const payload = {
// 						...values,
// 						rate: Number(values.rate),
// 						photos: [mainImage, ...photos],
// 						location: {
// 							address: values.address,
// 							latitude: 27,
// 							longitude: 85,
// 							radius: 10,
// 						},
//             attributes: categoryAttributes
//   .filter((attr) => attr.value)
//   .map((attr) => ({
//     key: attr.name,
//     value: attr.value,
//   })),

// 					};

// 					console.log(data);
// 					for (let attr of categoryAttributes) {
// 						if (attr.isRequired && !attr.value) {
// 							Alert.alert("Missing Attribute", `Please enter ${attr.name}`);
// 							return;
// 						}
// 					}

// 					mutate(payload, {
// 						onSuccess: () => {
// 							console.log("✅ Item posted successfully:", data.name);
// 							Alert.alert("Success", "Item posted successfully!");
// 							setMainImage(null);
// 							setPhotos([]);
// 							resetForm();
// 						},
// 						onError: (err: any) => {
// 							console.error(
// 								"Error posting item:",
// 								err?.response?.data || err.message
// 							);
// 							Alert.alert("Error", err?.message || "Failed to post item.");
// 						},
// 					});
// 				}}
// 			>
// 				{({
// 					handleChange,
// 					handleBlur,
// 					handleSubmit,
// 					values,
// 					errors,
// 					touched,
// 					resetForm,
// 				}) => (
// 					<Animated.View entering={FadeInUp.delay(100)}>
// 						<FormLabel label="Item Name" />
// 						<StyledInput
// 							value={values.name}
// 							onChangeText={handleChange("name")}
// 							onBlur={handleBlur("name")}
// 							error={touched.name && errors.name}
// 						/>

// 						<FormLabel label="Rate" />
// 						<StyledInput
// 							value={values.rate}
// 							onChangeText={handleChange("rate")}
// 							onBlur={handleBlur("rate")}
// 							keyboardType="numeric"
// 							error={touched.rate && errors.rate}
// 						/>

// 						<FormLabel label="Rate Type" />
// 						<StyledPicker
// 							selectedValue={values.rateType}
// 							onValueChange={handleChange("rateType")}
// 						>
// 							<Picker.Item label="Select Rate Type" value="" />
// 							<Picker.Item label="Hourly" value="hourly" />
// 							<Picker.Item label="Daily" value="daily" />
// 							<Picker.Item label="Weekly" value="weekly" />
// 							<Picker.Item label="Monthly" value="monthly" />
// 						</StyledPicker>
// 						{touched.rateType && errors.rateType && (
// 							<Text style={styles.errorText}>{errors.rateType}</Text>
// 						)}

// 						<FormLabel label="Category" />
// 						{isLoading ? (
// 							<ActivityIndicator color="#ff9900" />
// 						) : (
// 							<StyledPicker
// 								selectedValue={values.categoryId}
// 								onValueChange={(itemValue) => {
// 									handleChange("categoryId")(itemValue);

// 									const selectedCategory = data?.data.find(
// 										(cat) => cat.id === itemValue
// 									);
// 									if (selectedCategory?.attributes) {
// 										const parsedAttributes = selectedCategory.attributes.map(
// 											(attr) => ({
// 												...attr,
// 												value: "", // default input value
// 											})
// 										);
// 										setAttributes(parsedAttributes);
// 									} else {
// 										setAttributes([]);
// 									}
// 								}}
// 							>
// 								<Picker.Item label="Select Category" value="" />
// 								{Array.isArray(data?.data) &&
// 									data.data.map((cat: any) => (
// 										<Picker.Item key={cat.id} label={cat.name} value={cat.id} />
// 									))}
// 							</StyledPicker>
// 						)}
// 						{touched.categoryId && errors.categoryId && (
// 							<Text style={styles.errorText}>{errors.categoryId}</Text>
// 						)}
// 						{setAttributes.length > 0 && (
// 							<>
// 								<FormLabel label="Attributes" />
// 								{setAttributes.map((attr, index) => (
// 									<View key={index} style={{ marginBottom: 12 }}>
// 										<Text style={{ marginBottom: 4, fontWeight: "500" }}>
// 											{attr.key}
// 										</Text>
// 										<TextInput
// 											placeholder={`Enter ${attr.key}`}
// 											value={attr.value}
// 											onChangeText={(text) => {
// 												setAttributes((prev) => {
// 													const updated = [...prev];
// 													updated[index].value = text;
// 													return updated;
// 												});
// 											}}
// 											style={[styles.input]}
// 										/>
// 									</View>
// 								))}
// 							</>
// 						)}

// 						<FormLabel label="Description" />
// 						<StyledInput
// 							value={values.description}
// 							onChangeText={handleChange("description")}
// 							onBlur={handleBlur("description")}
// 							multiline
// 							style={{ height: 100, textAlignVertical: "top" }}
// 							error={touched.description && errors.description}
// 						/>

// 						<FormLabel label="Address" />
// 						<StyledInput
// 							value={values.address}
// 							onChangeText={handleChange("address")}
// 							onBlur={handleBlur("address")}
// 							error={touched.address && errors.address}
// 						/>

// 						{categoryAttributes.length > 0 && (
// 							<>
// 								<FormLabel label="Category Attributes" />
// 								{categoryAttributes.map((attr, index) => (
// 									<View key={index} style={{ marginBottom: 12 }}>
// 										<Text style={{ fontWeight: "500", marginBottom: 4 }}>
// 											{attr.name}
// 											{attr.isRequired ? " *" : ""}
// 										</Text>

// 										{attr.type === "select" && attr.options?.length > 0 ? (
// 											<View style={styles.pickerContainer}>
// 												<Picker
// 													selectedValue={attr.value}
// 													onValueChange={(val) => {
// 														const updated = [...categoryAttributes];
// 														updated[index].value = val;
// 														setAttributes(updated);
// 													}}
// 												>
// 													<Picker.Item label="Select an option" value="" />
// 													{attr.options.map((opt) => (
// 														<Picker.Item
// 															key={opt.value}
// 															label={opt.label}
// 															value={opt.value}
// 														/>
// 													))}
// 												</Picker>
// 											</View>
// 										) : (
// 											<TextInput
// 												placeholder={`Enter ${attr.name}`}
// 												value={attr.value}
// 												onChangeText={(text) => {
// 													const updated = [...categoryAttributes];
// 													updated[index].value = text;
// 													setCategoryAttributes(updated);
// 												}}
// 												style={styles.input}
// 											/>
// 										)}
// 									</View>
// 								))}
// 							</>
// 						)}

// 						<TouchableOpacity
// 							onPress={handleAddAttribute}
// 							style={{
// 								backgroundColor: "#007bff",
// 								padding: 10,
// 								borderRadius: 8,
// 								marginBottom: 16,
// 							}}
// 						>
// 							<Text style={{ color: "#fff", fontWeight: "600" }}>
// 								+ Add Attribute
// 							</Text>
// 						</TouchableOpacity>

// 						<FormLabel label="Photos" />
// 						<TouchableOpacity
// 							onPress={handlePickImage}
// 							style={styles.imageButton}
// 						>
// 							<Feather name="image" size={20} color="#fff" />
// 							<Text style={styles.imageButtonText}> Pick Images</Text>
// 						</TouchableOpacity>

// 						{mainImage && (
// 							<View style={styles.imageWrapper}>
// 								<Image
// 									source={{ uri: mainImage }}
// 									style={[styles.imagePreview, { width: 120, height: 120 }]}
// 								/>
// 								<TouchableOpacity
// 									style={styles.deleteIcon}
// 									onPress={() => handleDeleteImage(mainImage)}
// 								>
// 									<Feather name="trash" size={16} color="#fff" />
// 								</TouchableOpacity>
// 							</View>
// 						)}

// 						<ScrollView
// 							horizontal
// 							showsHorizontalScrollIndicator={false}
// 							style={{ marginTop: 16 }}
// 						>
// 							{photos.map((uri, index) => (
// 								<View key={index} style={styles.imageWrapper}>
// 									<Image source={{ uri }} style={styles.imagePreview} />
// 									<TouchableOpacity
// 										style={styles.deleteIcon}
// 										onPress={() => handleDeleteImage(uri)}
// 									>
// 										<Feather name="trash" size={16} color="#fff" />
// 									</TouchableOpacity>
// 								</View>
// 							))}
// 						</ScrollView>

// 						<TouchableOpacity
// 							style={styles.submitButton}
// 							onPress={handleSubmit}
// 							disabled={isPending}
// 						>
// 							{isPending ? (
// 								<ActivityIndicator color="#fff" />
// 							) : (
// 								<Text style={styles.submitButtonText}>Submit Listing</Text>
// 							)}
// 						</TouchableOpacity>
// 					</Animated.View>
// 				)}
// 			</Formik>
// 		</ScrollView>
// 	);
// };

// const FormLabel = ({ label }) => <Text style={styles.label}>{label}</Text>;

// const StyledInput = ({ error, ...props }) => (
// 	<>
// 		<TextInput
// 			{...props}
// 			style={[styles.input, props.style]}
// 			placeholderTextColor="#999"
// 		/>
// 		{error && <Text style={styles.errorText}>{error}</Text>}
// 	</>
// );

// const StyledPicker = ({ children, ...props }) => (
// 	<View style={styles.pickerContainer}>
// 		<Picker {...props}>{children}</Picker>
// 	</View>
// );

// export default CreateListingScreen;

// const styles = StyleSheet.create({
// 	label: {
// 		fontWeight: "600",
// 		fontSize: 16,
// 		marginBottom: 4,
// 		color: "#333",
// 	},
// 	input: {
// 		borderWidth: 1,
// 		borderColor: "#ddd",
// 		borderRadius: 10,
// 		paddingHorizontal: 14,
// 		paddingVertical: 10,
// 		fontSize: 16,
// 		backgroundColor: "#fff",
// 	},
// 	pickerContainer: {
// 		borderWidth: 1,
// 		borderColor: "#ddd",
// 		borderRadius: 10,
// 		overflow: "hidden",
// 		backgroundColor: "#fff",
// 	},
// 	imageButton: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		backgroundColor: "#ff9900",
// 		padding: 12,
// 		borderRadius: 10,
// 		marginTop: 8,
// 	},
// 	imageButtonText: {
// 		color: "#fff",
// 		fontWeight: "600",
// 		fontSize: 16,
// 		marginLeft: 8,
// 	},
// 	imagePreview: {
// 		width: 80,
// 		height: 80,
// 		borderRadius: 10,
// 	},
// 	imageWrapper: {
// 		marginRight: 12,
// 		position: "relative",
// 	},
// 	deleteIcon: {
// 		position: "absolute",
// 		top: -8,
// 		right: -8,
// 		backgroundColor: "#e63946",
// 		borderRadius: 999,
// 		padding: 4,
// 		zIndex: 2,
// 	},
// 	submitButton: {
// 		backgroundColor: "#28a745",
// 		paddingVertical: 14,
// 		borderRadius: 12,
// 		alignItems: "center",
// 		marginTop: 20,
// 	},
// 	submitButtonText: {
// 		color: "#fff",
// 		fontSize: 18,
// 		fontWeight: "700",
// 	},
// 	errorText: {
// 		color: "red",
// 		fontSize: 14,
// 		marginTop: 4,
// 		marginBottom: 6,
// 	},
// });


import { usePostItemMutation } from "@/Api/mutation/postItemMutation";
import { useCategoriesQuery } from "@/Api/query/categoriesQuery";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("Item name is required"),
  rate: yup
    .number()
    .typeError("Rate must be a number")
    .required("Rate is required"),
  rateType: yup.string().required("Rate type is required"),
  categoryId: yup.string().required("Category is required"),
  description: yup.string(), // optional
  address: yup.string().required("Address is required"),
});

const CreateListingScreen = () => {
  const { data, isLoading } = useCategoriesQuery();
  const { mutate, isPending } = usePostItemMutation();
  const insets = useSafeAreaInsets();

  const [mainImage, setMainImage] = useState<string | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);

  // Attributes of selected category, each with shape:
  // { id, name, type, isRequired, options?, value? }
  const [categoryAttributes, setCategoryAttributes] = useState<
    {
      id: string;
      name: string;
      type: string;
      isRequired: boolean;
      options?: { label: string; value: string }[];
      value?: string;
    }[]
  >([]);

  // const handlePickImage = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsMultipleSelection: true,
  //     quality: 1,
  //     selectionLimit: 5,
  //     base64:false
  //   });

  //   if (!result.canceled && result.assets) {
  //         console.log("Picked assets:", result.assets); // <-- Add this line

  //     const uris = result.assets.map((asset) => asset.uri);
  //     if (!mainImage && uris.length > 0) setMainImage(uris[0]);
  //     setPhotos((prev) => [...prev, ...uris.filter((uri) => uri !== mainImage)]);
  //   }
  // };


  const handlePickImage = async () => {


//  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//   if (status !== "granted") {
//     Alert.alert("Permission Required", "Permission to access media library is required!");
//     return;
//   }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: true,
    quality: 1,
    selectionLimit: 5,
    base64: false,
  });
console.log("uri",result.assets)
  if (!result.canceled && result.assets) {
    console.log("Picked assets:", result.assets);

    const uris = result.assets
      .map((asset) => asset.uri)
      .filter((uri) => uri.startsWith("file://"));

    if (!mainImage && uris.length > 0) setMainImage(uris[0]);
    setPhotos((prev) => [...prev, ...uris.filter((uri) => uri !== mainImage)]);
  }
};


  const handleDeleteImage = (uri: string) => {
    if (mainImage === uri) setMainImage(null);
    setPhotos((prev) => prev.filter((photo) => photo !== uri));
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        paddingTop: insets.top + 20,
        gap: 16,
        backgroundColor: "#f9f9f9",
      }}
      showsVerticalScrollIndicator={false}
    >
      <Formik
        initialValues={{
          name: "",
          rate: "",
          rateType: "",
          categoryId: "",
          description: "",
          address: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          if (!mainImage) {
            Alert.alert("Missing Images", "Please select a main image.");
            return;
          }

          // Validate required attributes
          for (let attr of categoryAttributes) {
            if (attr.isRequired && (!attr.value || attr.value.trim() === "")) {
              Alert.alert("Missing Attribute", `Please enter ${attr.name}`);
              return;
            }
          }

          // Prepare payload with attributes as array of { key, value }
          const payload = {
            ...values,
            rate: Number(values.rate),
            photos: [mainImage, ...photos],
            location: {
              address: values.address,
              latitude: 27, // Replace with real coordinates from a location picker if available
              longitude: 85,
              radius: 10,
            },
            attributes: categoryAttributes
              .filter((attr) => attr.value && attr.value.trim() !== "")
              .map((attr) => ({
                attributeId : attr.id,
                value: attr.value,
              })),
          };``
           if (!values.rateType) {
  Alert.alert("Error", "Please select a rate type.");
  return;
}
if (!mainImage) {
  Alert.alert("Error", "Please select at least one photo.");
  return;
}
if (!values.rate || Number(values.rate) <= 0) {
  Alert.alert("Error", "Rate must be greater than 0.");
  return;
}

          console.log("Values", values)
          mutate(payload, {
            onSuccess: () => {
              Alert.alert("Success", "Item posted successfully!");
              setMainImage(null);
              setPhotos([]);
              resetForm();
              setCategoryAttributes([]);
            }, 
            onError: (err: any) => {
              console.dir(err,{depth:null})
              console.log("mad-------------------------------------")
              Alert.alert("Error", err?.message || "Failed to post item.");
                 
          
            },
          });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <Animated.View entering={FadeInUp.delay(100)}>
            <FormLabel label="Item Name" />
            <StyledInput
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              error={touched.name && errors.name}
            />

            <FormLabel label="Rate" />
            <StyledInput
              value={values.rate}
              onChangeText={handleChange("rate")}
              onBlur={handleBlur("rate")}
              keyboardType="numeric"
              error={touched.rate && errors.rate}
            />

            <FormLabel label="Rate Type" />
            <StyledPicker
              selectedValue={values.rateType}
              onValueChange={handleChange("rateType")}
            >
              <Picker.Item label="Select Rate Type" value="" />
              <Picker.Item label="Hourly" value="hourly" />
              <Picker.Item label="Daily" value="daily" />
              <Picker.Item label="Weekly" value="weekly" />
              <Picker.Item label="Monthly" value="monthly" />
            </StyledPicker>
            {touched.rateType && errors.rateType && (
              <Text style={styles.errorText}>{errors.rateType}</Text>
            )}

            <FormLabel label="Category" />
            {isLoading ? (
              <ActivityIndicator color="#ff9900" />
            ) : (
              <StyledPicker
                selectedValue={values.categoryId}
                onValueChange={(itemValue) => {
                  handleChange("categoryId")(itemValue);

                  // Find selected category and set attributes with blank values
                  const selectedCategory = data?.data.find(
                    (cat:any) => cat.id === itemValue
                  );
                  if (selectedCategory?.attributes) {
                    const attrs = selectedCategory.attributes.map((attr:any) => ({
                      ...attr,
                      value: "",
                    }));
                    setCategoryAttributes(attrs);
                  } else {
                    setCategoryAttributes([]);
                  }
                }}
              >
                <Picker.Item label="Select Category" value="" />
                {Array.isArray(data?.data) &&
                  data.data.map((cat: any) => (
                    <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                  ))}
              </StyledPicker>
            )}
            {touched.categoryId && errors.categoryId && (
              <Text style={styles.errorText}>{errors.categoryId}</Text>
            )}

            {categoryAttributes.length > 0 && (
              <>
                <FormLabel label="Category Attributes" />
                {categoryAttributes.map((attr, index) => (
                  <View key={attr.id} style={{ marginBottom: 12 }}>
                    <Text style={{ fontWeight: "500", marginBottom: 4 }}>
                      {attr.name}
                      {attr.isRequired ? " *" : ""}
                    </Text>

                    {attr.type === "select" && attr.options?.length > 0 ? (
                      <View style={styles.pickerContainer}>
                        <Picker
                          selectedValue={attr.value}
                          onValueChange={(val) => {
                            const updated = [...categoryAttributes];
                            updated[index].value = val;
                            setCategoryAttributes(updated);
                          }}
                        >
                          <Picker.Item label="Select an option" value="" />
                          {attr.options.map((opt) => (
                            <Picker.Item
                              key={opt.value}
                              label={opt.label}
                              value={opt.value}
                            />
                          ))}
                        </Picker>
                      </View>
                    ) : (
                      <TextInput
                        placeholder={`Enter ${attr.name}`}
                        value={attr.value}
                        onChangeText={(text) => {
                          const updated = [...categoryAttributes];
                          updated[index].value = text;
                          setCategoryAttributes(updated);
                        }}
                        style={styles.input}
                      />
                    )}
                  </View>
                ))}
              </>
            )}

            <FormLabel label="Description" />
            <StyledInput
              value={values.description}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              multiline
              style={{ height: 100, textAlignVertical: "top" }}
              error={touched.description && errors.description}
            />

            <FormLabel label="Address" />
            <StyledInput
              value={values.address}
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              error={touched.address && errors.address}
            />

            <FormLabel label="Photos" />
            <TouchableOpacity onPress={handlePickImage} style={styles.imageButton}>
              <Feather name="image" size={20} color="#fff" />
              <Text style={styles.imageButtonText}> Pick Images</Text>
            </TouchableOpacity>

            {mainImage && (
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: mainImage }}
                  style={[styles.imagePreview, { width: 120, height: 120 }]}
                />
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => handleDeleteImage(mainImage)}
                >
                  <Feather name="trash" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            )}

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 16 }}
            >
              {photos.map((uri, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri }} style={styles.imagePreview} />
                  <TouchableOpacity
                    style={styles.deleteIcon}
                    onPress={() => handleDeleteImage(uri)}
                  >
                    <Feather name="trash" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => handleSubmit()}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Submit Listing</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        )}
      </Formik>
    </ScrollView>
  );
};

const FormLabel = ({ label }: { label: string }) => (
  <Text style={styles.label}>{label}</Text>
);

const StyledInput = ({
  error,
  ...props
}: React.ComponentProps<typeof TextInput> & { error?: string }) => (
  <>
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      placeholderTextColor="#999"
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </>
);

const StyledPicker = ({
  children,
  ...props
}: React.ComponentProps<typeof Picker>) => (
  <View style={styles.pickerContainer}>
    <Picker {...props}>{children}</Picker>
  </View>
);

export default CreateListingScreen;

const styles = StyleSheet.create({
  label: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff9900",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  imageButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  imageWrapper: {
    marginRight: 12,
    position: "relative",
  },
  deleteIcon: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#e63946",
    borderRadius: 999,
    padding: 4,
    zIndex: 2,
  },
  submitButton: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
    marginBottom: 6,
  },
});
 
