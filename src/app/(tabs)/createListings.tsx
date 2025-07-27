import { useAcceptRequestMutation } from "@/Api/mutation/userAcceptRequestMutation";
import { useRejectRequestMutation } from "@/Api/mutation/useRejectRequestMutation";
import useAuthUserQuery from "@/Api/query/useAuthQuery";
import { useGetPendingRentOutItemsQuery } from "@/Api/query/useGetPendingRentItemsQuery";
import { useGetRentedOutItemsQuery } from "@/Api/query/useGetRentedOutItemsQuery";
import AddButton from "@/src/components/ListingAddButton";
import HeaderTabs from "@/src/components/ListingHeader";
import ItemCard from "@/src/components/ListingItemCard";
import PendingRequestCard from "@/src/components/PendingRequestCard";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const tabs = ["All Listings", "Request", "Rented Out"];

export default function BookingsScreen() {
	const queryClient = useQueryClient();
	const router = useRouter();
	const [selectedTab, setSelectedTab] = useState("All Listings");
	// New state to track if a 401 error is being handled
	const [isAuthErrorHandled, setIsAuthErrorHandled] = useState(false);
     const{data , isError} =useAuthUserQuery();
	const { mutate: acceptRequest } = useAcceptRequestMutation();
	const { mutate: rejectRequest } = useRejectRequestMutation();

 
	const {
		data: rentedOutData,
		isLoading: isLoadingRentedOut,
		error: errorRentedOut,
	} = useGetRentedOutItemsQuery();

	const {
		data: pendingQueryData,
		isLoading: isLoadingPending,
		error: errorPending,
	} = useGetPendingRentOutItemsQuery();

	const [localPendingData, setLocalPendingData] = useState<any[]>([]);

	// Handle 401 errors and redirect to login
	useEffect(() => {
		const checkForAuthError = (error: unknown) => {
			if (error instanceof AxiosError) {
				if (error.response?.status === 401) {
					setIsAuthErrorHandled(true);
					router.replace("/screens/loginScreen");
					return true;
				}
			} else if (
				error &&
				typeof error === "object" &&
				"status" in error &&
				(error as { status: number }).status === 401
			) {
				setIsAuthErrorHandled(true);
				router.replace("/screens/loginScreen");
				return true;
			}
			return false;
		};

		if (errorRentedOut && checkForAuthError(errorRentedOut)) {
			return;
		}

		if (errorPending && checkForAuthError(errorPending)) {
			return;
		}
	}, [errorRentedOut, errorPending, router]);

	useEffect(() => {
		if (pendingQueryData?.data) {
			setLocalPendingData(pendingQueryData.data);
		}
	}, [pendingQueryData]);

	const toggleAvailability = (id: any) => {
		console.log(`Toggle availability for item ID: ${id}`);
	};

	let filteredListings: any[] = [];

	if (selectedTab === "Request") {
		filteredListings = localPendingData;
	} else if (selectedTab === "Rented Out") {
		filteredListings = (rentedOutData?.data || []).filter(
			(item: any) =>
				item.orderStatus === "ACCEPTED" || item.orderStatus === "APPROVED"
		);
	} else {
		filteredListings = rentedOutData?.data || [];
	}

	const isLoading =
		selectedTab === "Request" ? isLoadingPending : isLoadingRentedOut;
	const error = selectedTab === "Request" ? errorPending : errorRentedOut;

	// --- New rendering logic ---
	if (isAuthErrorHandled) {
		return null;
	}

	return (
		<View style={styles.container}>
			<View style={styles.headerBackground}>
				<HeaderTabs
					tabs={tabs}
					selectedTab={selectedTab}
					onTabSelect={setSelectedTab}
				/>
			</View>

			{isLoading ? (
				<View style={styles.centered}>
					<ActivityIndicator size="large" color="#4863e8" />
					<Text>Loading items...</Text>
				</View>
			) : error ? ( // Simplified error check
				<View style={styles.centered}>
					<Text style={{ color: "red" }}>Failed to load data.</Text>
				</View>
			) : filteredListings.length === 0 ? (
				<View style={styles.centered}>
					<Text>No items found for "{selectedTab}"</Text>
				</View>
			) : (
				<ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
					{filteredListings.map((listing: any) =>
						selectedTab === "Request" ? (
							<PendingRequestCard
								key={listing.id}
								item={listing}
								onAccept={(id: string) => {
									acceptRequest(id, {
										onSuccess: () => {
											setLocalPendingData((prev) =>
												prev.map((item) =>
													item.id === id
														? { ...item, orderStatus: "APPROVED" }
														: item
												)
											);
											queryClient.invalidateQueries({
												queryKey: ["rentedOutItems"],
											});
										},
									});
								}}
								onReject={(id: string) => {
									rejectRequest(id, {
										onSuccess: () => {
											setLocalPendingData((prev) =>
												prev.map((item) =>
													item.id === id
														? { ...item, orderStatus: "REJECTED" }
														: item
												)
											);
										},
									});
								}}
							/>
						) : (
							<ItemCard
								key={listing.id}
								listing={listing}
								onToggleAvailability={toggleAvailability}
								onDeleted={() => {
									queryClient.invalidateQueries({
										queryKey: ["pendingRentOutItems"],
									});
									queryClient.invalidateQueries({
										queryKey: ["rentedOutItems"],
									});
								}}
							/>
						)
					)}
				</ScrollView>
			)}

			<AddButton onPress={() => router.push("/screens/AddItemScreen")} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerBackground: {
		backgroundColor: "#FFC107",
		paddingTop: 40,
		paddingHorizontal: 16,
		paddingBottom: 12,
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
});
// import { useAcceptRequestMutation } from "@/Api/mutation/userAcceptRequestMutation";
// import { useRejectRequestMutation } from "@/Api/mutation/useRejectRequestMutation";
// import { useGetPendingRentOutItemsQuery } from "@/Api/query/useGetPendingRentItemsQuery";
// import { useGetRentedOutItemsQuery } from "@/Api/query/useGetRentedOutItemsQuery";
// import AddButton from "@/src/components/ListingAddButton";
// import HeaderTabs from "@/src/components/ListingHeader";
// import ItemCard from "@/components/ListingItemCard";
// import PendingRequestCard from "@/src/components/PendingRequestCard";
// import { useQueryClient } from "@tanstack/react-query";
// import { AxiosError } from "axios";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import { CircleAlert as AlertCircle, Inbox, Package } from "lucide-react-native";
// import React, { useEffect, useState } from "react";
// import {
// 	ActivityIndicator,
// 	Dimensions,
// 	RefreshControl,
// 	ScrollView,
// 	StyleSheet,
// 	Text,
// 	View,
// } from "react-native";
// import Animated, {
// 	FadeInDown,
// 	FadeInUp,
// 	interpolateColor,
// 	useAnimatedStyle,
// 	useSharedValue,
// 	withSpring
// } from "react-native-reanimated";

// const { width } = Dimensions.get('window');
// const tabs = ["All Listings", "Request", "Rented Out"];

// export default function BookingsScreen() {
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const [selectedTab, setSelectedTab] = useState("All Listings");
//   const [isAuthErrorHandled, setIsAuthErrorHandled] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   const tabProgress = useSharedValue(0);

//   const { mutate: acceptRequest } = useAcceptRequestMutation();
//   const { mutate: rejectRequest } = useRejectRequestMutation();

//   const {
//     data: rentedOutData,
//     isLoading: isLoadingRentedOut,
//     error: errorRentedOut,
//     refetch: refetchRentedOut,
//   } = useGetRentedOutItemsQuery();

//   const {
//     data: pendingQueryData,
//     isLoading: isLoadingPending,
//     error: errorPending,
//     refetch: refetchPending,
//   } = useGetPendingRentOutItemsQuery();

//   const [localPendingData, setLocalPendingData] = useState<any[]>([]);

//   // Animated header background
//   const animatedHeaderStyle = useAnimatedStyle(() => {
//     const backgroundColor = interpolateColor(
//       tabProgress.value,
//       [0, 1, 2],
//       ['#667eea', '#764ba2', '#f093fb']
//     );
//     return { backgroundColor };
//   });

//   useEffect(() => {
//     const tabIndex = tabs.indexOf(selectedTab);
//     tabProgress.value = withSpring(tabIndex, {
//       damping: 15,
//       stiffness: 150,
//     });
//   }, [selectedTab]);

//   // Handle 401 errors and redirect to login
//   useEffect(() => {
//     const checkForAuthError = (error: unknown) => {
//       if (error instanceof AxiosError) {
//         if (error.response?.status === 401) {
//           setIsAuthErrorHandled(true);
//           router.replace("/screens/loginScreen");
//           return true;
//         }
//       } else if (
//         error &&
//         typeof error === "object" &&
//         "status" in error &&
//         (error as { status: number }).status === 401
//       ) {
//         setIsAuthErrorHandled(true);
//         router.replace("/screens/loginScreen");
//         return true;
//       }
//       return false;
//     };

//     if (errorRentedOut && checkForAuthError(errorRentedOut)) {
//       return;
//     }

//     if (errorPending && checkForAuthError(errorPending)) {
//       return;
//     }
//   }, [errorRentedOut, errorPending, router]);

//   useEffect(() => {
//     if (pendingQueryData?.data) {
//       setLocalPendingData(pendingQueryData.data);
//     }
//   }, [pendingQueryData]);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     try {
//       await Promise.all([refetchRentedOut(), refetchPending()]);
//     } catch (error) {
//       console.error('Refresh error:', error);
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   const toggleAvailability = (id: any) => {
//     console.log(`Toggle availability for item ID: ${id}`);
//   };

//   let filteredListings: any[] = [];

//   if (selectedTab === "Request") {
//     filteredListings = localPendingData;
//   } else if (selectedTab === "Rented Out") {
//     filteredListings = (rentedOutData?.data || []).filter(
//       (item: any) =>
//         item.orderStatus === "ACCEPTED" || item.orderStatus === "APPROVED"
//     );
//   } else {
//     filteredListings = rentedOutData?.data || [];
//   }

//   const isLoading =
//     selectedTab === "Request" ? isLoadingPending : isLoadingRentedOut;
//   const error = selectedTab === "Request" ? errorPending : errorRentedOut;

//   if (isAuthErrorHandled) {
//     return null;
//   }

//   const EmptyState = ({ tab }: { tab: string }) => (
//     <Animated.View 
//       entering={FadeInUp.delay(200)}
//       style={styles.emptyStateContainer}
//     >
//       <View style={styles.emptyStateIcon}>
//         {tab === "Request" ? (
//           <Inbox size={48} color="#94A3B8" strokeWidth={1.5} />
//         ) : (
//           <Package size={48} color="#94A3B8" strokeWidth={1.5} />
//         )}
//       </View>
//       <Text style={styles.emptyStateTitle}>
//         {tab === "Request" ? "No Pending Requests" : `No ${tab}`}
//       </Text>
//       <Text style={styles.emptyStateSubtitle}>
//         {tab === "Request" 
//           ? "All caught up! No new rental requests at the moment."
//           : `You don't have any items in ${tab.toLowerCase()} yet.`
//         }
//       </Text>
//     </Animated.View>
//   );

//   const ErrorState = () => (
//     <Animated.View 
//       entering={FadeInUp.delay(200)}
//       style={styles.errorStateContainer}
//     >
//       <View style={styles.errorStateIcon}>
//         <AlertCircle size={48} color="#EF4444" strokeWidth={1.5} />
//       </View>
//       <Text style={styles.errorStateTitle}>Something went wrong</Text>
//       <Text style={styles.errorStateSubtitle}>
//         We couldn't load your data. Pull down to refresh.
//       </Text>
//     </Animated.View>
//   );

//   const LoadingState = () => (
//     <View style={styles.loadingContainer}>
//       <ActivityIndicator size="large" color="#667eea" />
//       <Text style={styles.loadingText}>Loading your items...</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Enhanced Header with Gradient */}
//       <Animated.View style={[styles.headerBackground, animatedHeaderStyle]}>
//         <LinearGradient
//           colors={['rgba(255,255,255,0.1)', 'transparent']}
//           style={styles.headerGradientOverlay}
//         />
//         <View style={styles.headerContent}>
//           <Animated.Text 
//             entering={FadeInDown.delay(100)}
//             style={styles.headerTitle}
//           >
//             My Rentals
//           </Animated.Text>
//           <Animated.Text 
//             entering={FadeInDown.delay(200)}
//             style={styles.headerSubtitle}
//           >
//             Manage your rental items and requests
//           </Animated.Text>
//         </View>
        
//         <HeaderTabs
//           tabs={tabs}
//           selectedTab={selectedTab}
//           onTabSelect={setSelectedTab}
//         />
//       </Animated.View>

//       {/* Content Area */}
//       <View style={styles.contentContainer}>
//         {isLoading ? (
//           <LoadingState />
//         ) : error ? (
//           <ErrorState />
//         ) : filteredListings.length === 0 ? (
//           <EmptyState tab={selectedTab} />
//         ) : (
//           <ScrollView 
//             contentContainerStyle={styles.scrollContainer}
//             showsVerticalScrollIndicator={false}
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 colors={['#667eea']}
//                 tintColor="#667eea"
//                 title="Pull to refresh"
//                 titleColor="#94A3B8"
//               />
//             }
//           >
//             <Animated.View entering={FadeInUp.delay(300)}>
//               {/* Stats Overview */}
//               <View style={styles.statsContainer}>
//                 <View style={styles.statCard}>
//                   <Text style={styles.statNumber}>
//                     {selectedTab === "Request" ? localPendingData.length : filteredListings.length}
//                   </Text>
//                   <Text style={styles.statLabel}>
//                     {selectedTab === "Request" ? "Pending" : "Items"}
//                   </Text>
//                 </View>
//                 <View style={styles.statCard}>
//                   <Text style={styles.statNumber}>
//                     {(rentedOutData?.data || []).filter(
//                       (item: any) => item.orderStatus === "ACCEPTED" || item.orderStatus === "APPROVED"
//                     ).length}
//                   </Text>
//                   <Text style={styles.statLabel}>Active</Text>
//                 </View>
//               </View>

//               {/* Items List */}
//               <View style={styles.itemsContainer}>
//                 {filteredListings.map((listing: any, index: number) => (
//                   <Animated.View
//                     key={listing.id}
//                     entering={FadeInUp.delay(index * 100)}
//                   >
//                     {selectedTab === "Request" ? (
//                       <PendingRequestCard
//                         item={listing}
//                         onAccept={(id: string) => {
//                           acceptRequest(id, {
//                             onSuccess: () => {
//                               setLocalPendingData((prev) =>
//                                 prev.map((item) =>
//                                   item.id === id
//                                     ? { ...item, orderStatus: "APPROVED" }
//                                     : item
//                                 )
//                               );
//                               queryClient.invalidateQueries({
//                                 queryKey: ["rentedOutItems"],
//                               });
//                             },
//                           });
//                         }}
//                         onReject={(id: string) => {
//                           rejectRequest(id, {
//                             onSuccess: () => {
//                               setLocalPendingData((prev) =>
//                                 prev.map((item) =>
//                                   item.id === id
//                                     ? { ...item, orderStatus: "REJECTED" }
//                                     : item
//                                 )
//                               );
//                             },
//                           });
//                         }}
//                       />
//                     ) : (
//                       <ItemCard
//                         listing={listing}
//                         onToggleAvailability={toggleAvailability}
//                         onDeleted={() => {
//                           queryClient.invalidateQueries({
//                             queryKey: ["pendingRentOutItems"],
//                           });
//                           queryClient.invalidateQueries({
//                             queryKey: ["rentedOutItems"],
//                           });
//                         }}
//                       />
//                     )}
//                   </Animated.View>
//                 ))}
//               </View>
//             </Animated.View>
//           </ScrollView>
//         )}
//       </View>

//       {/* Enhanced Add Button with Shadow */}
//       <Animated.View 
//         entering={FadeInUp.delay(500)}
//         style={styles.addButtonContainer}
//       >
//         <AddButton onPress={() => router.push("/screens/AddItemScreen")} />
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8FAFC',
//   },
//   headerBackground: {
//     paddingTop: 50,
//     paddingHorizontal: 20,
//     paddingBottom: 16,
//     borderBottomLeftRadius: 24,
//     borderBottomRightRadius: 24,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.15,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   headerGradientOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     borderBottomLeftRadius: 24,
//     borderBottomRightRadius: 24,
//   },
//   headerContent: {
//     marginBottom: 20,
//   },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     marginBottom: 4,
//     letterSpacing: -0.5,
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     color: 'rgba(255, 255, 255, 0.8)',
//     fontWeight: '400',
//   },
//   contentContainer: {
//     flex: 1,
//     backgroundColor: '#F8FAFC',
//   },
//   scrollContainer: {
//     paddingBottom: 120,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     gap: 12,
//   },
//   statCard: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     padding: 16,
//     borderRadius: 16,
//     alignItems: 'center',
//     shadowColor: '#64748B',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.08,
//     shadowRadius: 8,
//     elevation: 3,
//     borderWidth: 1,
//     borderColor: 'rgba(148, 163, 184, 0.1)',
//   },
//   statNumber: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: 14,
//     color: '#64748B',
//     fontWeight: '500',
//   },
//   itemsContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 16,
//     gap: 12,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 60,
//   },
//   loadingText: {
//     marginTop: 16,
//     fontSize: 16,
//     color: '#64748B',
//     fontWeight: '500',
//   },
//   emptyStateContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 32,
//     paddingVertical: 60,
//   },
//   emptyStateIcon: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#F1F5F9',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   emptyStateTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#1E293B',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   emptyStateSubtitle: {
//     fontSize: 16,
//     color: '#64748B',
//     textAlign: 'center',
//     lineHeight: 24,
//     maxWidth: 280,
//   },
//   errorStateContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 32,
//     paddingVertical: 60,
//   },
//   errorStateIcon: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#FEF2F2',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   errorStateTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#1E293B',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   errorStateSubtitle: {
//     fontSize: 16,
//     color: '#64748B',
//     textAlign: 'center',
//     lineHeight: 24,
//     maxWidth: 280,
//   },
//   addButtonContainer: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     shadowColor: '#667eea',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
// });