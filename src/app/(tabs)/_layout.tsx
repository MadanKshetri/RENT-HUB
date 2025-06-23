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
					title: "search",
                    headerShown:false,  
                    tabBarIcon:({color, focused })=>(
                        <Ionicons
                        name={focused ? "search-sharp" : "search-outline"}
                        color={color}
                        size={24}
                        />
                    )
				}}
			/>
			<Tabs.Screen
				name="createListings"
				options={{
					title: "Create listings",
                    headerShown:false,
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
					title: "Profile",
					headerShown:false,
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
