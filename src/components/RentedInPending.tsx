// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from "axios";
// import React from "react";
// import {
//   Alert,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from "react-native";
// import { router } from "expo-router";




// const API_BASE_URL = "http://192.168.1.83:5000"; // 🔁 Replace with your actual API base URL

// export default function PendingRequestCard({ item }: { item: any }) {
//   const statusColor = {
//     PENDING: "#f0ad4e",
//     REJECTED: "#d9534f",
//     APPROVED: "#5cb85c",
//   };

//   // 🔁 Initiate Khalti payment request
//  const handleKhaltiPayment = async () => {
//   try {
//     const token = await AsyncStorage.getItem("token"); // 👈 Get token

//     if (!token) {
//       Alert.alert("Error", "User not authenticated.");
//       return;
//     }

//    const handleKhaltiPayment = async () => {
//   try {
//     const token = await AsyncStorage.getItem("token");

//     if (!token) {
//       Alert.alert("Error", "User not authenticated.");
//       return;
//     }

//     const response = await axios.post(
//       `${API_BASE_URL}/payment/verify/khalti`,
//       {
//         provider: "khalti",
//         rentOrderId: item.id,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     const paymentUrl = response.data?.data?.url;

//        if (paymentUrl) {
//         // ✅ Using expo-router to push to PaymentWebView screen
//         router.push({
//           pathname: "/screens/PaymentWebView",
//           params: { paymentUrl },
//         });
//       } else {
//         Alert.alert("Error", "Payment URL not found.");
//       }
//     } catch (error) {
//       console.error("Khalti Payment Error:", error);
//       Alert.alert("Error", "Failed to initiate Khalti payment.");
//     }
//   };
// };



//   return (
//     <View style={styles.card}>
//       <Image
//         source={{ uri: item?.item?.assets?.[0]?.url }}
//         style={styles.image}
//         resizeMode="cover"
//       />
//       <View style={styles.details}>
//         <Text style={styles.title}>{item.item.name}</Text>
//         <Text>Description: {item.item.description}</Text>
//         <Text>Rate: Rs. {item.item.rate} / {item.item.rateType}</Text>
//         <Text>Rent Start: {item.rentStart}</Text>
//         <Text>Rent End: {item.rentEnd}</Text>
//         <Text>Total Price: Rs. {item.totalPrice}</Text>
//         <Text>Owner: {item.owner.name}</Text>

//         <View style={[styles.statusBadge, { backgroundColor: statusColor[item.orderStatus] }]}>
//           <Text style={styles.statusText}>{item.orderStatus}</Text>
//         </View>

//         {item.orderStatus.toUpperCase() === "APPROVED" && (
//           <TouchableOpacity style={styles.paymentButton} onPress={handleKhaltiPayment}>
//             <Text style={styles.paymentText}>Proceed to Payment</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 10,
//     marginVertical: 8,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//     marginRight: 12,
//   },
//   details: {
//     flex: 1,
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   statusBadge: {
//     marginTop: 6,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 5,
//     alignSelf: "flex-start",
//   },
//   statusText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   paymentButton: {
//     marginTop: 10,
//     backgroundColor: "#5cb85c",
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//   },
//   paymentText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });


import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { useRouter } from "expo-router"; // Correctly imported from 'expo-router'
import React from "react";
import {
  Alert, // Correctly imported from 'react-native'
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// Define your API base URL
const API_BASE_URL = "http://192.168.1.83:5000"; // 🔁 Replace with your actual API base URL if different

/**
 * PendingRequestCard component displays details of a pending or approved rent request.
 * It includes an option to proceed to Khalti payment if the request is approved.
 *
 * @param {object} props - The component props.
 * @param {object} props.item - The item object containing details of the rent request.
 * @param {object} props.item.item - Details about the rented item (name, description, rate, assets, etc.).
 * @param {string} props.item.rentStart - The start date of the rent.
 * @param {string} props.item.rentEnd - The end date of the rent.
 * @param {number} props.item.totalPrice - The total price for the rent.
 * @param {object} props.item.owner - Details about the item owner (name).
 * @param {string} props.item.orderStatus - The current status of the rent order (e.g., "PENDING", "APPROVED", "REJECTED").
 */
export default function PendingRequestCard({ item }) {
  console.log("Itemssns",item)
  // Initialize expo-router hook for navigation
  const router = useRouter();

  // Define colors for different order statuses
  const statusColor = {
    PENDING: "#f0ad4e", // Orange for pending
    REJECTED: "#d9534f", // Red for rejected
    APPROVED: "#5cb85c", // Green for approved
  };

  /**
   * Handles the Khalti payment process.
   * This asynchronous function retrieves the user's authentication token,
   * sends a payment verification request to the backend, and if successful,
   * navigates the user to the Khalti payment web view.
   * It includes robust error handling for various scenarios.
   */
  const handleKhaltiPayment = async () => {
    try {
      // 1. Retrieve the authentication token from AsyncStorage
      const token = await AsyncStorage.getItem("token");

      // 2. If no token is found, alert the user and stop the process
      if (!token) {
        Alert.alert("Authentication Error", "User not authenticated. Please log in again.");
        return; // Exit the function
      }

      // 3. Make a POST request to the backend API to initiate Khalti payment verification
      const response = await axios.post(
        `${API_BASE_URL}/payment/verify/khalti`, // API endpoint
        {
          provider: "khalti", // Specify Khalti as the payment provider
          rentOrderId: item.id, // Pass the ID of the current rent order
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the bearer token for authentication
            'Content-Type': 'application/json', // Set content type for the request body
          },
        }
      );

      // 4. Extract the payment URL from the API response
      // Use optional chaining to safely access nested properties (response.data.data.url)
      const paymentUrl = response.data?.data?.url;

      // 5. Check if a payment URL was successfully received
      if (paymentUrl) {
        // If a URL is present, navigate to the PaymentWebView screen using expo-router
        // Pass the paymentUrl as a parameter so the web view can load it
        router.push({
          pathname: "/screens/PaymentWebView",
          params: { paymentUrl },
        });
      } else {
        // If no payment URL is found in the response, alert the user
        Alert.alert("Payment Error", "Payment URL not found in the response. Please try again.");
      }
    } catch (error) {
      // 6. Catch and handle any errors that occur during the payment initiation process
      console.error("Khalti Payment Initiation Error:", error); // Log the detailed error for debugging purposes

      // Provide a user-friendly alert message based on the type of error
      if (axios.isAxiosError(error)) {
        // If it's an Axios-specific error (e.g., network issues, server response errors)
        // Extract the error message from the response data or use the generic error message
        const errorMessage = error.response?.data?.message || error.message;
        Alert.alert("Network Error", `Failed to initiate Khalti payment: ${errorMessage}.`);
      } else {
        // Handle any other unexpected errors that are not Axios-related
        Alert.alert("Unexpected Error", "An unexpected error occurred during payment initiation. Please try again.");
      }
    }
  };

  return (
    <View style={styles.card}>
      {/* Display the item image */}
      <Image
        source={{ uri: item?.item?.assets?.[0]?.url }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.details}>
        {/* Display item and rent details */}
        <Text style={styles.title}>{item.item.name}</Text>
        <Text>Description: {item.item.description}</Text>
        <Text>Rate: Rs. {item.item.rate} / {item.item.rateType}</Text>
        <Text>Rent Start: {item.rentStart}</Text>
        <Text>Rent End: {item.rentEnd}</Text>
        <Text>Total Price: Rs. {item.totalPrice}</Text>
        <Text>Owner: {item.owner.name}</Text>

        {/* Display the order status badge with dynamic background color */}
        <View style={[styles.statusBadge, { backgroundColor: statusColor[item.orderStatus] }]}>
          <Text style={styles.statusText}>{item.orderStatus}</Text>
        </View>

        {/* Show the "Proceed to Payment" button only if the order status is "APPROVED" */}
        {item.orderStatus.toUpperCase() === "APPROVED" && (
          <TouchableOpacity style={styles.paymentButton} onPress={handleKhaltiPayment}>
            <Text style={styles.paymentText}>Proceed to Payment</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// StyleSheet for the component's visual styling
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.2, // iOS shadow
    shadowRadius: 3, // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  statusBadge: {
    marginTop: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignSelf: "flex-start", // Aligns the badge to the start of its container
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
  },
  paymentButton: {
    marginTop: 10,
    backgroundColor: "#5cb85c", // Green background for the button
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  paymentText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: 'center', // Center the text within the button
  },
});
