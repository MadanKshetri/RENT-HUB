import AsyncStorage from "@react-native-async-storage/async-storage";

import { useSignInMutation } from "@/Api/mutation/signInMutation";
import { useAuthStore } from "@/src/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
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

// Validation schema
const signInSchema = Yup.object().shape({
	email: Yup.string()
		.email("Enter a valid email")
		.required("Email is required"),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
});

const LoginScreen = () => {
	const signInMutation = useSignInMutation();
	const router = useRouter();
	const logIn = useAuthStore(state => state.login)
	return (
		<ScrollView keyboardShouldPersistTaps="handled">
			<View style={styles.container}>
				<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
					<Ionicons name="arrow-back" size={24} color="#fff" />
				</TouchableOpacity>
				<Text style={styles.title}> Log In</Text>
				<Formik
					initialValues={{
						email: "",

						password: "",
					}}
					validationSchema={signInSchema}
					onSubmit={(values) => {
						//console.log("Login values:", values);
						signInMutation.mutate(values, {
							onSuccess: async (data) => {
								// console.log("SignIn Success", data);
								//console.log("aayo", data.data.token);

								// console.log(data);

								await AsyncStorage.setItem("token", data.data.token);

								logIn()

								router.push("/");
							},
							onError: (error) => {
								console.log("signIn Failed", error);
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
						<View>
							{/* Email */}
							<TextInput
								style={styles.input}
								placeholder="Email"
								onChangeText={handleChange("email")}
								onBlur={handleBlur("email")}
								value={values.email}
								keyboardType="email-address"
							/>
							{touched.email && errors.email && (
								<Text style={styles.error}>{errors.email}</Text>
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

							{/* Submit Button */}
							<TouchableOpacity
								style={styles.button}
								onPress={() => {
									handleSubmit();
								}}
							>
								<Text style={styles.buttonText}>Sign In</Text>
							</TouchableOpacity>
						</View>
					)}
				</Formik>
				<View style={styles.footer}>
					<Text style={styles.firstText}> Don't have an Account ?</Text>
					<Link href={"/screens/signupScreen"}>
						<Text style={styles.signin}>&nbsp; Create </Text>
					</Link>
				</View>
			</View>
		</ScrollView>
	);
};

export default LoginScreen;

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
		backButton: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: 'rgba(0,0,0,0.3)',
		justifyContent: 'center',
		alignItems: 'center',
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
