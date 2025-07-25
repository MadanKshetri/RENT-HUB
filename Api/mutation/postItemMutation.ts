// // src/hooks/usePostItemMutation.ts
// import { useMutation } from "@tanstack/react-query";
// import postItemsFetch from "../fetch/postItem";

// // Define the expected input shape based on your postItemsFetch params
// type PostItemInput = {
// 	name: string;
// 	rate: number;
// 	rateType: string;
// 	photos: string[]; // Image URIs from expo-image-picker	
// 	categoryId: string;
// 	deposit: number;
// 	description: string;
// 	location: {
// 		address: string;
// 		latitude: number;
// 		longitude: number;
// 		radius?: number;
// 	};
// };

// export const usePostItemMutation = () => {
// 	return useMutation({
// 		mutationFn: (data: PostItemInput) => postItemsFetch(data),
// 	});
// };

// src/hooks/usePostItemMutation.ts
import { useMutation } from "@tanstack/react-query";
import postItemsFetch from "../fetch/postItem";

// Define the expected input shape matching the latest postItemsFetch signature
type PostItemInput = {
	name: string;
	rate: number;
	rateType: string;
	photos: string[]; // File URIs from expo-image-picker
	categoryId: string;
	description?: string;
	location: {
		address: string;
		latitude: number;
		longitude: number;
		radius: number; // REQUIRED
	};
	attributes?: Record<string, any>[]; // OPTIONAL
};

export const usePostItemMutation = () => {
	return useMutation({
		mutationFn: (data: PostItemInput) => postItemsFetch(data),
	});
};

