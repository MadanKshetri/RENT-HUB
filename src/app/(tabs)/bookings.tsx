// import { useNavigation } from '@react-navigation/native';
// import React, { useState } from 'react';
// import {
//   Button,
//   Dimensions,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// // Get screen width for responsive card sizing
// const {width} = Dimensions.get('window');
// const cardWidth = width - 32; // Full width minus horizontal padding

// // --- Constants for consistent styling ---
// const COLORS = {
//   primary: '#4A90E2', // A vibrant blue
//   accent: '#50E3C2', // A complementary accent green (if needed elsewhere)
//   background: '#F8F9FA', // Lighter background
//   cardBackground: '#FFFFFF',
//   textDark: '#333333',
//   textMedium: '#666666',
//   textLight: '#999999',
//   border: '#E0E0E0',
//   success: '#4CAF50',
//   warning: '#FFC107',
//   danger: '#F44336',
//   info: '#2196F3',
//   inactiveTab: '#E9EEF3',
// };

// const FONT_SIZES = {
//   title: 28,
//   subheading: 20,
//   body: 15,
//   caption: 13,
//   small: 11,
// };

// const SPACING = {
//   s: 8,
//   m: 16,
//   l: 24,
//   xl: 32,
// };

// // --- Mock Data (remains the same) ---
// const bookingsMock = [
//   {
//     id: '1',
//     itemName: 'Power Drill',
//     image: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Drill',
//     startDate: '2025-07-01',
//     endDate: '2025-07-05',
//     status: 'Confirmed',
//     location: 'New York, NY',
//     dailyRate: 15,
//     totalCost: 75,
//     lister: 'John Doe',
//   },
//   {
//     id: '2',
//     itemName: 'Portable Speaker',
//     image: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Speaker',
//     startDate: '2025-07-10',
//     endDate: '2025-07-12',
//     status: 'Upcoming',
//     location: 'Los Angeles, CA',
//     dailyRate: 20,
//     totalCost: 40,
//     lister: 'Jane Smith',
//   },
//   {
//     id: '3',
//     itemName: 'Camera Tripod',
//     image: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=Tripod',
//     startDate: '2025-06-20',
//     endDate: '2025-06-25',
//     status: 'Completed',
//     location: 'Chicago, IL',
//     dailyRate: 10,
//     totalCost: 60,
//     lister: 'Peter Jones',
//   },
//   {
//     id: '4',
//     itemName: 'Mountain Bike',
//     image: 'https://via.placeholder.com/150/FF33DA/FFFFFF?text=Bike',
//     startDate: '2025-07-01',
//     endDate: '2025-07-03',
//     status: 'Cancelled',
//     location: 'Denver, CO',
//     dailyRate: 30,
//     totalCost: 90,
//     lister: 'Alice Brown',
//   },
//   {
//     id: '5',
//     itemName: 'Camping Tent',
//     image: 'https://via.placeholder.com/150/33DAFF/FFFFFF?text=Tent',
//     startDate: '2025-06-28',
//     endDate: '2025-07-02',
//     status: 'Ongoing',
//     location: 'Seattle, WA',
//     dailyRate: 25,
//     totalCost: 100,
//     lister: 'Bob White',
//   },
// ];

// export default function BookingsScreen() {
//   const navigation = useNavigation();
//   const [filter, setFilter] = useState('All');

//   // Helper function to format dates for display
//   const formatDate = dateString => {
//     const options = {year: 'numeric', month: 'short', day: 'numeric'};
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const getStatusFilteredBookings = status => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // Normalize today to start of day

//     return bookingsMock.filter(booking => {
//       const startDate = new Date(booking.startDate);
//       startDate.setHours(0, 0, 0, 0); // Normalize start date to start of day
//       const endDate = new Date(booking.endDate);
//       endDate.setHours(23, 59, 59, 999); // Normalize end date to end of day

//       switch (status) {
//         case 'Upcoming':
//           // A booking is upcoming if its start date is in the future and it's not cancelled
//           return startDate > today && booking.status !== 'Cancelled';
//         case 'Ongoing':
//           // A booking is ongoing if today is between or on the start/end dates and it's not cancelled
//           return (
//             startDate <= today && endDate >= today && booking.status !== 'Cancelled'
//           );
//         case 'Completed':
//           // A booking is completed if its end date has passed and it's not cancelled
//           return endDate < today && booking.status !== 'Cancelled';
//         case 'Cancelled':
//           return booking.status === 'Cancelled';
//         case 'All':
//         default:
//           return true; // Show all bookings
//       }
//     });
//   };

//   const filteredBookings = getStatusFilteredBookings(filter);

//   const filters = ['All', 'Upcoming', 'Ongoing', 'Completed', 'Cancelled'];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>My Bookings</Text>

//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={styles.tabsContainer}
//         contentContainerStyle={styles.tabsContentContainer}>
//         {filters.map(tab => (
//           <TouchableOpacity
//             key={tab}
//             style={[styles.tab, filter === tab && styles.activeTab]}
//             onPress={() => setFilter(tab)}
//             accessibilityRole="button"
//             accessibilityLabel={`Filter by ${tab} bookings`}>
//             <Text
//               style={[styles.tabText, filter === tab && styles.activeTabText]}>
//               {tab}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {filteredBookings.length === 0 ? (
//         <View style={styles.emptyState}>
//           <Text style={styles.emptyText}>
//             You haven’t booked anything yet. Start exploring rentals now!
//           </Text>
//           <Button
//             title="Browse Items"
//             onPress={() => navigation.navigate('')}
//             color={COLORS.primary} // Use primary color for the button
//           />
//         </View>
//       ) : (
//         <ScrollView
//           style={styles.bookingsList}
//           contentContainerStyle={styles.bookingsListContent}>
//           {filteredBookings.map(booking => (
//             <TouchableOpacity
//               key={booking.id}
//               style={styles.bookingCard}
//               onPress={() => navigation.navigate('BookingDetail', {id: booking.id})}
//               accessibilityRole="button"
//               accessibilityLabel={`View details for ${booking.itemName}`}>
//               <Image
//                 source={{uri: booking.image}}
//                 style={styles.bookingImage}
//                 accessibilityIgnoresContainerElements={true}
//               />
//               <View style={styles.bookingInfo}>
//                 <Text style={styles.itemName}>{booking.itemName}</Text>
//                 <Text style={styles.dateText}>
//                   {formatDate(booking.startDate)} -{' '}
//                   {formatDate(booking.endDate)}
//                 </Text>
//                 <Text style={styles.detailText}>Location: {booking.location}</Text>
//                 <Text style={styles.detailText}>
//                   Daily: ${booking.dailyRate} | Total: ${booking.totalCost}
//                 </Text>
//                 <Text style={styles.detailText}>Lister: {booking.lister}</Text>
//                 <View
//                   style={[
//                     styles.statusBadge,
//                     booking.status === 'Confirmed' && styles.statusConfirmed,
//                     booking.status === 'Completed' && styles.statusCompleted,
//                     booking.status === 'Cancelled' && styles.statusCancelled,
//                     (booking.status === 'Upcoming' ||
//                       booking.status === 'Ongoing') &&
//                       styles.statusOngoing,
//                   ]}>
//                   <Text style={styles.statusText}>{booking.status}</Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 0.1, // Changed from 0.25 to 1 to allow content to fill screen
//     backgroundColor: COLORS.background,
//     padding: SPACING.m,
//   },
//   title: {
//     fontSize: FONT_SIZES.title,
//     fontWeight: '700',
//     color: COLORS.textDark,
//     marginBottom: SPACING.l, // Increased bottom margin
//     marginTop: SPACING.m, // Add some top margin
//   },
//   tabsContainer: {
//     flexDirection: 'row',
//     marginBottom: SPACING.m, // Consistent spacing
//   },
//   tabsContentContainer: {
//     paddingHorizontal: SPACING.s / 2, // Slightly reduce horizontal padding for tabs
//   },
//   tab: {
//     paddingVertical: SPACING.s,
//     paddingHorizontal: SPACING.m + 2, // Adjusted padding for better look
//     borderRadius: 25,
//     backgroundColor: COLORS.inactiveTab,
//     marginRight: SPACING.s, // Consistent spacing between tabs
//     justifyContent: 'center',
//     alignItems: 'center',
//     // Removed shadow for inactive tabs for a cleaner look
//   },
//   activeTab: {
//     backgroundColor: COLORS.primary,
//     shadowColor: COLORS.primary, // Shadow for active tab
//     shadowOffset: {width: 0, height: 4},
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 6, // Android shadow
//   },
//   tabText: {
//     color: COLORS.textMedium,
//     fontSize: FONT_SIZES.body,
//     fontWeight: '500',
//   },
//   activeTabText: {
//     color: COLORS.cardBackground, // White text
//     fontWeight: '600',
//   },
//   emptyState: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: SPACING.l,
//     marginTop: SPACING.xl,
//   },
//   emptyText: {
//     fontSize: FONT_SIZES.subheading,
//     color: COLORS.textLight,
//     marginBottom: SPACING.l,
//     textAlign: 'center',
//     lineHeight: SPACING.l, // Improve readability
//   },
//   bookingsList: {
//     flex: 1,
//   },
//   bookingsListContent: {
//     paddingBottom: SPACING.l, // Add padding to the bottom of the scroll view
//   },
//   bookingCard: {
//     flexDirection: 'row',
//     backgroundColor: COLORS.cardBackground,
//     borderRadius: 15,
//     padding: SPACING.m,
//     marginBottom: SPACING.m,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 3}, // Softer shadow
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 5, // Android shadow
//     width: cardWidth,
//     alignSelf: 'center',
//   },
//   bookingImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//     marginRight: SPACING.m,
//     resizeMode: 'cover',
//   },
//   bookingInfo: {
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   itemName: {
//     fontSize: FONT_SIZES.body + 2, // Slightly larger for item name
//     fontWeight: '600',
//     color: COLORS.textDark,
//     marginBottom: SPACING.s / 2,
//   },
//   dateText: {
//     fontSize: FONT_SIZES.caption,
//     color: COLORS.textLight,
//     marginBottom: SPACING.s / 2,
//   },
//   detailText: {
//     fontSize: FONT_SIZES.caption,
//     color: COLORS.textMedium,
//     marginBottom: SPACING.s / 2,
//   },
//   statusBadge: {
//     marginTop: SPACING.s,
//     paddingVertical: SPACING.s / 2,
//     paddingHorizontal: SPACING.s,
//     borderRadius: 15,
//     alignSelf: 'flex-start',
//   },
//   statusText: {
//     fontSize: FONT_SIZES.small,
//     fontWeight: '700',
//     color: COLORS.cardBackground, // White text
//     textTransform: 'uppercase',
//   },
//   statusConfirmed: {
//     backgroundColor: COLORS.success,
//   },
//   statusCompleted: {
//     backgroundColor: COLORS.textLight, // Using a lighter gray for completed
//   },
//   statusCancelled: {
//     backgroundColor: COLORS.danger,
//   },
//   statusOngoing: {
//     backgroundColor: COLORS.warning,
//   },
// });

import { useGetRentedInItemsQuery } from "@/Api/query/useGetRentedInItem";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";

export default function BookingsScreen() {
  // Fetch bookings
  const { data, isLoading, isError, error } = useGetRentedInItemsQuery({
    page: 1,
    limit: 20,
    sortOrder: "desc",
  });
console.log("rentinItems",data)
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading bookings...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "red" }}>
          Error loading bookings: {error.message}
        </Text>
      </View>
    );
  }

  const bookings = data?.data ?? [];

  if (bookings.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No bookings found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.item.assets[0]?.url ? (
            <Image
              source={{ uri: item.item.assets[0].url }}
              style={styles.image}
            />
          ) : (
            <View
              style={[
                styles.image,
                { backgroundColor: "#ddd", justifyContent: "center", alignItems: "center" }
              ]}
            >
              <Text>No Image</Text>
            </View>
          )}
          <View style={styles.details}>
            <Text style={styles.name}>{item.item.name}</Text>
            <Text>{item.item.description}</Text>
            <Text>Rate: {item.item.rate} ({item.item.rateType})</Text>
            <Text>Rent Period:</Text>
            <Text>
              {formatDate(item.rentStart)} - {formatDate(item.rentEnd)}
            </Text>
            <Text>Status: {item.orderStatus}</Text>
            <Text>Total Price: {item.totalPrice}</Text>
          </View>
        </View>
      )}
    />
  );
}

function formatDate(dateString: string) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  details: {
    flex: 1,
    padding: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
