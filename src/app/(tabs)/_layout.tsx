import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#ffd33d",
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "home-sharp" : "home-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="createListings"
				options={{
					title: " listings",
					headerShown: false,
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "camera-sharp" : "camera-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="bookings"
				options={{
					title: "Bookings",
					headerShown: false,
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "book-sharp" : "book-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="about"
				options={{
					title: " My Profile",
					headerShown: true,
					headerStyle: {
						backgroundColor: "#FFC107", // Yellow header background
						alignItems:"center"
					},
					headerTitleStyle: {
						color: "#333", // Dark text color to match your profileTitle
						fontWeight: "bold",
					},
					headerTintColor: "#333", // Color for back arrow and icons
					headerTitleAlign: "center", 
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "person-sharp" : "person-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
