import { useSignUpMutation } from "@/Api/mutation/signUpMutation";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import * as Yup from "yup";
// import { useSignupMutation } from "@/api/muatation/userMutation";

// Validation schema
const signUpSchema = Yup.object().shape({
	fullName: Yup.string()
		.min(2, "Name must be at least 2 characters")
		.required("Name is required"),
	email: Yup.string()
		.email("Enter a valid email")
		.required("Email is required"),
	phone: Yup.string()
		.matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
		.required("Phone number is required"),
	address: Yup.string().required("Address is required"),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Passwords must match")
		.required("Confirm Password is required"),
});

const SignUpScreen = () => {
	const signUpMutation = useSignUpMutation();
	return (
		<ScrollView keyboardShouldPersistTaps="handled">
			<View style={styles.container}>
				<Text style={styles.title}>Create your First RentHub Account</Text>
				<Formik
					initialValues={{
						fullName: "",
						email: "",
						phone: "",
						address: "",
						password: "",
						confirmPassword: "",
					}}
					validationSchema={signUpSchema}
					onSubmit={(values) => {
						

						signUpMutation.mutate(values, {
							onSuccess: (data) => {
								console.log("SignUP Success", data);
								alert("Signup succesfully")
								router.push("/(auth)/loginScreen")
								
							},
							onError: (error) => {
								//	console.log(error)
								//console.log(axios);

								console.log("signUp Failed", error);
							},
						});

						//console.log(values);
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
						<View>
							{/* Full Name */}
							<TextInput
								style={styles.input}
								placeholder="Full Name"
								onChangeText={handleChange("fullName")}
								onBlur={handleBlur("fullName")}
								value={values.fullName}
							/>
							{touched.fullName && errors.fullName && (
								<Text style={styles.error}>{errors.fullName}</Text>
							)}

							{/* Email */}
							<TextInput
								style={styles.input}
								placeholder="Email"
								onChangeText={handleChange("email")}
								onBlur={handleBlur("email")}
								value={values.email}
								// keyboardType="email-address"
							/>
							{touched.email && errors.email && (
								<Text style={styles.error}>{errors.email}</Text>
							)}

							{/* Phone */}
							<TextInput
								style={styles.input}
								placeholder="Phone"
								onChangeText={handleChange("phone")}
								onBlur={handleBlur("phone")}
								value={values.phone}
								keyboardType="numeric"
							/>
							{touched.phone && errors.phone && (
								<Text style={styles.error}>{errors.phone}</Text>
							)}

							{/* Address */}
							<TextInput
								style={styles.input}
								placeholder="Address"
								onChangeText={handleChange("address")}
								onBlur={handleBlur("address")}
								value={values.address}
							/>
							{touched.address && errors.address && (
								<Text style={styles.error}>{errors.address}</Text>
							)}

							{/* Password */}
							<TextInput
								style={styles.input}
								placeholder="Password"
								secureTextEntry
								onChangeText={handleChange("password")}
								onBlur={handleBlur("password")}
								value={values.password}
							/>
							{touched.password && errors.password && (
								<Text style={styles.error}>{errors.password}</Text>
							)}

							{/* Confirm Password */}
							<TextInput
								style={styles.input}
								placeholder="Confirm Password"
								secureTextEntry
								onChangeText={handleChange("confirmPassword")}
								onBlur={handleBlur("confirmPassword")}
								value={values.confirmPassword}
							/>
							{touched.confirmPassword && errors.confirmPassword && (
								<Text style={styles.error}>{errors.confirmPassword}</Text>
							)}

							{/* Submit Button */}
							<TouchableOpacity
								style={styles.button}
								onPress={() => {
									handleSubmit();
								}}
							>
								<Text style={styles.buttonText}>Sign Up</Text>
							</TouchableOpacity>
						</View>
					)}
				</Formik>
				<View style={styles.footer}>
					<Text style={styles.firstText}> Already have an Account ?</Text>
					<Link href={"/(auth)/loginScreen"}>
						<Text style={styles.signin}>&nbsp; Sign In </Text>
					</Link>
				</View>
			</View>
		</ScrollView>
	);
};

export default SignUpScreen;

// Styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 26,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
		color: "orange",
		marginTop: 20,
	},
	input: {
		borderWidth: 1,
		borderColor: "#aaa",
		borderRadius: 8,
		padding: 12,
		marginVertical: 8,
	},
	error: {
		color: "red",
		marginLeft: 5,
		fontSize: 12,
	},
	button: {
		backgroundColor: "orange",
		padding: 14,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 16,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
	},
	footer: {
		flexDirection: "row",
		textAlign: "center",
		justifyContent: "center",
		marginTop: 5,
	},
	firstText: {},
	signin: {
		color: "blue",
		fontWeight: "bold",
	},
});
