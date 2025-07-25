// import mime from "mime";
// import { api } from "../api";

// export default async function postItemsFetch(data: {
// 	rateType: string;
// 	photos: string[];
// 	description: string;
// 	name: string;
// 	rate: number;
// 	categoryId: string;
// 	deposit: number;
// 	location: {
// 		address: string;
// 		latitude: number;
// 		longitude: number;
// 		radius: number;
// 	};
// }) {
// 	const formData = new FormData();

// 	formData.append("name", data.name);
// 	formData.append("rate", data.rate.toString());
// 	formData.append("rateType", data.rateType);
// 	formData.append("categoryId", data.categoryId);
// 	formData.append("deposit", data.deposit.toString());
// 	formData.append("description", data.description);

// 	// ✅ Flattened location fields
// 	formData.append(
// 		"location",
// 		JSON.stringify({
// 			address: data.location.address,
// 			latitude: data.location.latitude,
// 			longitude: data.location.longitude,
// 			radius: data.location.radius,
// 		})
// 	);

// 	// Image upload'
// 	{
// 		console.log("Photos to upload:", data.photos);
// 	}
// 	// data.photos.forEach((uri, index) => {
// 	//   const fileName = uri.split("/").pop() || `photo_${index}.jpg`;
// 	//   const ext = fileName.split(".").pop()?.toLowerCase();
// 	//   const mimeType = ext === "png" ? "image/png" : "image/jpeg";

// 	//   formData.append("photos", {
// 	//     uri,
// 	//     name: fileName,
// 	//     type: mimeType,
// 	//   } as any);
// 	// });
// 	data.photos.forEach((uri, index) => {
// 		const fileName = uri.split("/").pop() || `photo_${index}.jpg`;
// 		const mimeType = mime.getType(fileName) || "image/jpeg";

// 		formData.append("photos", {
// 			uri,
// 			name: fileName,
// 			type: mimeType,
// 		  } as any);
// 	});

// 	const response = await api.post("/item", formData, {
// 		headers: {
// 			"Content-Type": "multipart/form-data",
// 		},
// 	});

// 	return response.data.data;
// }
// import mime from "mime";
// import { api } from "../api";

// export default async function postItemsFetch(data: {
// 	rateType: string;
// 	photos: string[]; // File URIs
// 	description?: string;
// 	name: string;
// 	rate: number;
// 	categoryId: string;
// 	location: {
// 		address: string;
// 		latitude: number;
// 		longitude: number;
// 		radius: number;
// 	};
// 	attributes?: Record<string, any>[]; // Optional
// }) {
// 	const formData = new FormData();

// 	// Basic fields
// 	formData.append("name", data.name);
// 	formData.append("rate", data.rate.toString());
// 	formData.append("rateType", data.rateType);
// 	formData.append("categoryId", data.categoryId);

// 	if (data.description) {
// 		formData.append("description", data.description);
// 	}

// 	// Location as JSON
// 	formData.append(
// 		"location",
// 		JSON.stringify({
// 			address: data.location.address,
// 			latitude: data.location.latitude,
// 			longitude: data.location.longitude,
// 			radius: data.location.radius,
// 		})
// 	);

// 	// Photos as files
// 	data.photos.forEach((uri, index) => {
// 		const fileName = uri.split("/").pop() || `photo_${index}.jpg`;
// 		const mimeType = mime.getType(fileName) || "image/jpeg";

// 		formData.append("photos", {
// 			uri,
// 			name: fileName,
// 			type: mimeType,
// 		} as any);
// 	});

// 	// Attributes if provided
// 	formData.append("attributes", JSON.stringify(data.attributes || []));

// 	// Make the request
// 	const response = await api.post("/item", formData, {
// 		headers: {
// 			"Content-Type": "multipart/form-data",
// 		},
// 	});

// 	return response.data.data;
// }

import mime from "mime";
import { api } from "../api";

export default async function postItemsFetch(data: {
	rateType: string;
	photos: string[];
	description?: string;
	name: string;
	rate: number;
	categoryId: string;
	location: {
		address: string;
		latitude: number;
		longitude: number;
		radius: number;
	};
	attributes?: { attributeId: string; value: string }[];
}) {
	const formData = new FormData();

	formData.append("name", data.name);
	formData.append("rate", data.rate.toString());
	formData.append("rateType", data.rateType);
	formData.append("categoryId", data.categoryId);
	if (data.description) {
		formData.append("description", data.description);
	}
	formData.append("location", JSON.stringify(data.location));

	data.photos.forEach((uri, index) => {
		const name = uri.split("/").pop() ?? `photo_${index}.jpg`;
		const type = mime.getType(uri) ?? "image/jpeg";

		console.log(`Appending photo #${index}:`, { uri, name, type });

		formData.append("photos", {
			uri: uri,
			name: name,
			type: type,
		} as any);
	});

	if (data.attributes?.length) {
		data.attributes.forEach((attr, index) => {
			formData.append(`attributes[${index}][attributeId]`, attr.attributeId);
			formData.append(`attributes[${index}][value]`, attr.value);
		});
	}

	console.log("🚀 Posting FormData:");
	for (const pair of formData.entries()) {
		if (typeof pair[1] === "object") {
			console.log(pair[0], JSON.stringify(pair[1], null, 2));
		} else {
			console.log(pair[0], pair[1]);
		}
	}

	const response = await api.post("/item", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return response.data.data;
}
