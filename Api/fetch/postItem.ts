// import { api } from "../api";

// export default async function postItemsFetch(data: {
//   rateType: string;
//   photos: string[]; // Image URIs from expo-image-picker
//   description: string;
//   name: string;
//   rate: number;
//   categoryId: string;
//   deposit: number;
//   location: { address: string };
// }) {
//   const formData = new FormData();

//   formData.append("name", data.name);
//   formData.append("rate", data.rate.toString());
//   formData.append("rateType", data.rateType);
//   formData.append("categoryId", data.categoryId);
//   formData.append("deposit", data.deposit.toString());
//   formData.append("description", data.description);

//   // Location fields (note: use correct key names)
//   formData.append("address", data.location.address);
// formData.append("latitude", "27");
// formData.append("longitude", "85");
// formData.append("radius", "10");

//   // Image upload
//   data.photos.forEach((uri, index) => {
//     const fileName = uri.split("/").pop() || `photo_${index}.jpg`;
//     const ext = fileName.split(".").pop()?.toLowerCase();
//     const mimeType = ext === "png" ? "image/png" : "image/jpeg";

//     formData.append("photos", {
//       uri,
//       name: fileName,
//       type: mimeType,
//     } as any);
//   });

//   const response = await api.post("/item", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data.data;
// }

import mime from "mime";
import { api } from "../api";

export default async function postItemsFetch(data: {
	rateType: string;
	photos: string[];
	description: string;
	name: string;
	rate: number;
	categoryId: string;
	deposit: number;
	location: {
		address: string;
		latitude: number;
		longitude: number;
		radius: number;
	};
}) {
	const formData = new FormData();

	formData.append("name", data.name);
	formData.append("rate", data.rate.toString());
	formData.append("rateType", data.rateType);
	formData.append("categoryId", data.categoryId);
	formData.append("deposit", data.deposit.toString());
	formData.append("description", data.description);

	// ✅ Flattened location fields
	formData.append(
		"location",
		JSON.stringify({
			address: data.location.address,
			latitude: data.location.latitude,
			longitude: data.location.longitude,
			radius: data.location.radius,
		})
	);

	// Image upload'
	{
		console.log("Photos to upload:", data.photos);
	}
	// data.photos.forEach((uri, index) => {
	//   const fileName = uri.split("/").pop() || `photo_${index}.jpg`;
	//   const ext = fileName.split(".").pop()?.toLowerCase();
	//   const mimeType = ext === "png" ? "image/png" : "image/jpeg";

	//   formData.append("photos", {
	//     uri,
	//     name: fileName,
	//     type: mimeType,
	//   } as any);
	// });
	data.photos.forEach((uri, index) => {
		const fileName = uri.split("/").pop() || `photo_${index}.jpg`;
		const mimeType = mime.getType(fileName) || "image/jpeg";

		formData.append("photos", {
			uri,
			name: fileName,
			type: mimeType,
		  } as any);
	});

	const response = await api.post("/item", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return response.data.data;
}
