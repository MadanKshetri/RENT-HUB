import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

export default function RootLayout() {
	const queryclient = new QueryClient();
	return (
		<QueryClientProvider client={queryclient}>
			<Stack>
				<Stack.Screen
					name="(tabs)"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="screens/loginScreen"
					options={{
						headerShown: false,
						title:""
					}}
				/>
                 <Stack.Screen
					name="screens/signupScreen"
					options={{
						headerShown: true,
					}}
				/>

				<Stack.Screen
					name="screens/AddItemScreen"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="product/[id]"
					options={{ title: "", headerShown: false }}
				/>
				<Stack.Screen
					name="screens/SearchScreen"
					options={{ title: "", headerShown: false }}
				/>
				<Stack.Screen
					name="screens/signOutScreen"
					options={{ title: "", headerShown: true }}
				/>
				<Stack.Screen
					name="screens/categoriesScreen"
					options={{ title: "", headerShown: true }}
				/>
				<Stack.Screen
					name="screens/PaymentWebView"
					options={{ title: "", headerShown: true }}
				/>
				<Stack.Screen
					name="screens/PaymentSuccess"
					options={{ title: "", headerShown: true }}
				/>
				<Stack.Screen
					name="screens/KycVerifyScreen"
					options={{ title: "", headerShown: true }}
				/>
               <Stack.Screen
					name="screens/notificationScreen"
					options={{ title: "", headerShown: false }}
				/>

				<Stack.Screen
					name="screens/khalti-return"
					options={{ title: "", headerShown: true }}
				/>
				<Stack.Screen
					name="FaqScreen"
					options={{ title: "", headerShown: true }}
				/>

			</Stack>
		</QueryClientProvider>
	);
}
