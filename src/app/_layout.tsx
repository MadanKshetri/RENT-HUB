import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

export default function RootLayout() {
	const queryclient = new QueryClient();
	return (
		<QueryClientProvider client={queryclient}>
		<Stack >
			<Stack.Screen
				name="(tabs)"
				options={{
					headerShown: false,

				}}
			/>
			<Stack.Screen
			name = "searchScreen"
			options={{
				headerShown:false,
			}}
			/>
			<Stack.Screen name="product/[id]" options={{ title: "", headerShown: true }} />
			<Stack.Screen name="categoriesScreen" options={{ title: "", headerShown: true }} />
			<Stack.Screen name="AddItemScreen" options={{ title: "", headerShown: true }} />
		</Stack>
		</QueryClientProvider>
	);
}
