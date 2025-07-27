import { default as React } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// export default function PendingRequestCard({ item, onAccept, onReject }: any) {
// 	const product = item?.item;
// 	const renter = item?.renter;
// 	const imageUrl = product?.assets?.[0]?.url;

// 	console.log("Image URL:", product?.assets?.[0]);
// 	// Get first image from assets array

// 	return (
// 		<View style={styles.card}>
// 			{imageUrl ? (
// 				<Image
// 					source={{ uri: imageUrl }}
// 					style={styles.image}
// 					resizeMode="cover"
// 				/>
// 			) : (
// 				<View style={[styles.image, styles.placeholder]}>
// 					<Text>No Image</Text>
// 				</View>
// 			)}

// 			<View style={styles.details}>
// 				<Text style={styles.title}>{product?.name || "Unnamed Item"}</Text>
// 				<Text style={styles.description}>
// 					{product?.description || "No description available."}
// 				</Text>
// 				<Text style={styles.requestedBy}>
// 					Requested by: {renter?.name || "Unknown User"}
// 				</Text>

// 				<View style={styles.actions}>
// 					<TouchableOpacity
// 						style={styles.acceptButton}
// 						onPress={() => onAccept(item.id)}
// 					>
// 						<Text style={styles.buttonText}>Accept</Text>
// 					</TouchableOpacity>
// 					<TouchableOpacity
// 						style={styles.rejectButton}
// 						onPress={() => onReject(item.id)}
// 					>
// 						<Text style={styles.buttonText}>Reject</Text>
// 					</TouchableOpacity>
// 				</View>
// 			</View>
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	card: {
// 		margin: 12,
// 		backgroundColor: "#fff",
// 		borderRadius: 10,
// 		flexDirection: "row",
// 		overflow: "hidden",
// 		shadowColor: "#000",
// 		shadowOpacity: 0.1,
// 		shadowOffset: { width: 0, height: 2 },
// 		elevation: 3,
// 	},
// 	image: {
// 		width: 100,
// 		height: 100,
// 	},
// 	placeholder: {
// 		justifyContent: "center",
// 		alignItems: "center",
// 		backgroundColor: "#eee",
// 	},
// 	details: {
// 		flex: 1,
// 		padding: 10,
// 		justifyContent: "space-between",
// 	},
// 	title: {
// 		fontSize: 16,
// 		fontWeight: "600",
// 	},
// 	description: {
// 		fontSize: 14,
// 		color: "#666",
// 		marginVertical: 4,
// 	},
// 	requestedBy: {
// 		fontSize: 12,
// 		color: "#888",
// 		fontStyle: "italic",
// 	},
// 	actions: {
// 		flexDirection: "row",
// 		marginTop: 8,
// 	},
// 	acceptButton: {
// 		backgroundColor: "#4CAF50",
// 		padding: 8,
// 		borderRadius: 5,
// 		marginRight: 8,
// 	},
// 	rejectButton: {
// 		backgroundColor: "#f44336",
// 		padding: 8,
// 		borderRadius: 5,
// 	},
// 	buttonText: {
// 		color: "#fff",
// 		fontWeight: "bold",
// 	},
// });

export default function PendingRequestCard({ item, onAccept, onReject }: any) {
  const product = item?.item;
  const renter = item?.renter;
  const imageUrl = product?.assets?.[0]?.url;

  const status = item?.orderStatus;

  return (
    <View style={styles.card}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text>No Image</Text>
        </View>
      )}

      <View style={styles.details}>
        <Text style={styles.title}>{product?.name || "Unnamed Item"}</Text>
        <Text style={styles.description}>{product?.description || "No description available."}</Text>
        <Text style={styles.requestedBy}>Requested by: {renter?.name || "Unknown User"}</Text>

        {/* Status Logic */}
        {status?.toUpperCase() === "PENDING" ? (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.acceptButton} onPress={() => onAccept(item.id)}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton} onPress={() => onReject(item.id)}>
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        ) : status?.toUpperCase() === "APPROVED" ? (
          <Text style={styles.approvedText}>Waiting for Payment</Text>
        ) : status?.toUpperCase( ) === "REJECTED" ? (
          <Text style={styles.rejectedText}>Request Rejected</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  details: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  requestedBy: {
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
  },
  actions: {
    flexDirection: "row",
    marginTop: 8,
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  rejectButton: {
    backgroundColor: "#f44336",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  approvedText: {
    color: "#007bff",
    fontWeight: "600",
    marginTop: 8,
  },
  rejectedText: {
    color: "#ff4444",
    fontWeight: "600",
    marginTop: 8,
  },
});

// import { Calendar, CircleCheck as CheckCircle, Clock, DollarSign, User, Circle as XCircle } from 'lucide-react-native';
// import React from 'react';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Animated, { FadeInUp } from 'react-native-reanimated';

// interface PendingRequestCardProps {
//   item: any;
//   onAccept: (id: string) => void;
//   onReject: (id: string) => void;
// }

// const PendingRequestCard: React.FC<PendingRequestCardProps> = ({ item, onAccept, onReject }) => {
//   const formatDate = (dateString: string) => {
//     if (!dateString) return 'Not specified';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       month: 'short', 
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   const isProcessed = item.orderStatus === 'APPROVED' || item.orderStatus === 'REJECTED';

//   return (
//     <Animated.View entering={FadeInUp} style={styles.container}>
//       <View style={styles.card}>
//         {/* Request Header */}
//         <View style={styles.header}>
//           <View style={styles.avatarContainer}>
//             <View style={styles.avatar}>
//               <User size={20} color="#667eea" strokeWidth={2} />
//             </View>
//             <View style={styles.requestInfo}>
//               <Text style={styles.requesterName}>
//                 {item.requesterName || item.renterName || 'Anonymous User'}
//               </Text>
//               <View style={styles.timeContainer}>
//                 <Clock size={12} color="#64748B" strokeWidth={1.5} />
//                 <Text style={styles.requestTime}>
//                   {formatDate(item.createdAt || item.requestDate)}
//                 </Text>
//               </View>
//             </View>
//           </View>
          
//           {!isProcessed && (
//             <View style={styles.urgencyBadge}>
//               <Text style={styles.urgencyText}>New</Text>
//             </View>
//           )}
          
//           {isProcessed && (
//             <View style={[
//               styles.statusBadge, 
//               { backgroundColor: item.orderStatus === 'APPROVED' ? '#10B981' : '#EF4444' }
//             ]}>
//               <Text style={styles.statusText}>
//                 {item.orderStatus === 'APPROVED' ? 'Approved' : 'Rejected'}
//               </Text>
//             </View>
//           )}
//         </View>

//         {/* Item Details */}
//         <View style={styles.itemSection}>
//           <View style={styles.itemHeader}>
//             <Image 
//               source={{ 
//                 uri: item.image || item.itemImage || 'https://images.pexels.com/photos/276267/pexels-photo-276267.jpeg?auto=compress&cs=tinysrgb&w=400'
//               }}
//               style={styles.itemImage}
//               resizeMode="cover"
//             />
//             <View style={styles.itemDetails}>
//               <Text style={styles.itemTitle} numberOfLines={2}>
//                 {item.itemName || item.title || 'Rental Item'}
//               </Text>
//               <View style={styles.priceRow}>
//                 <DollarSign size={14} color="#10B981" strokeWidth={2} />
//                 <Text style={styles.itemPrice}>
//                   ${item.price || item.dailyRate || '0'}<Text style={styles.priceUnit}>/day</Text>
//                 </Text>
//               </View>
//             </View>
//           </View>

//           {/* Rental Period */}
//           <View style={styles.periodContainer}>
//             <Calendar size={16} color="#667eea" strokeWidth={1.5} />
//             <Text style={styles.periodText}>
//               {formatDate(item.startDate)} - {formatDate(item.endDate)}
//             </Text>
//             <Text style={styles.durationText}>
//               ({item.duration || '1'} days)
//             </Text>
//           </View>

//           {/* Total Amount */}
//           <View style={styles.totalContainer}>
//             <Text style={styles.totalLabel}>Total Amount:</Text>
//             <Text style={styles.totalAmount}>
//               ${item.totalAmount || (item.price * (item.duration || 1))}
//             </Text>
//           </View>
//         </View>

//         {/* Message */}
//         {item.message && (
//           <View style={styles.messageContainer}>
//             <Text style={styles.messageLabel}>Request Message:</Text>
//             <Text style={styles.messageText}>{item.message}</Text>
//           </View>
//         )}

//         {/* Action Buttons */}
//         {!isProcessed && (
//           <View style={styles.actionContainer}>
//             <TouchableOpacity 
//               style={styles.rejectButton}
//               onPress={() => onReject(item.id)}
//               activeOpacity={0.8}
//             >
//               <XCircle size={18} color="#FFFFFF" strokeWidth={2} />
//               <Text style={styles.rejectButtonText}>Decline</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={styles.acceptButton}
//               onPress={() => onAccept(item.id)}
//               activeOpacity={0.8}
//             >
//               <CheckCircle size={18} color="#FFFFFF" strokeWidth={2} />
//               <Text style={styles.acceptButtonText}>Accept</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 16,
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 20,
//     shadowColor: '#64748B',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 5,
//     borderWidth: 1,
//     borderColor: 'rgba(148, 163, 184, 0.08)',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   avatarContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#EEF2FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   requestInfo: {
//     flex: 1,
//   },
//   requesterName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1E293B',
//     marginBottom: 2,
//   },
//   timeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   requestTime: {
//     fontSize: 12,
//     color: '#64748B',
//     marginLeft: 4,
//     fontWeight: '500',
//   },
//   urgencyBadge: {
//     backgroundColor: '#EF4444',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },
//   urgencyText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   statusBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   itemSection: {
//     marginBottom: 16,
//   },
//   itemHeader: {
//     flexDirection: 'row',
//     marginBottom: 12,
//   },
//   itemImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 12,
//     marginRight: 12,
//   },
//   itemDetails: {
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   itemTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1E293B',
//     marginBottom: 8,
//     lineHeight: 22,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   itemPrice: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#10B981',
//     marginLeft: 4,
//   },
//   priceUnit: {
//     fontSize: 12,
//     fontWeight: '500',
//     color: '#059669',
//   },
//   periodContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8FAFC',
//     padding: 12,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   periodText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#475569',
//     marginLeft: 8,
//     marginRight: 8,
//   },
//   durationText: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//   },
//   totalContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#EEF2FF',
//     padding: 12,
//     borderRadius: 12,
//   },
//   totalLabel: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#475569',
//   },
//   totalAmount: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#667eea',
//   },
//   messageContainer: {
//     backgroundColor: '#F8FAFC',
//     padding: 12,
//     borderRadius: 12,
//     marginBottom: 16,
//   },
//   messageLabel: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#64748B',
//     marginBottom: 4,
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   messageText: {
//     fontSize: 14,
//     color: '#475569',
//     lineHeight: 20,
//   },
//   actionContainer: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   rejectButton: {
//     flex: 1,
//     backgroundColor: '#EF4444',
//     paddingVertical: 14,
//     borderRadius: 12,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#EF4444',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   rejectButtonText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#FFFFFF',
//     marginLeft: 6,
//   },
//   acceptButton: {
//     flex: 1,
//     backgroundColor: '#10B981',
//     paddingVertical: 14,
//     borderRadius: 12,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#10B981',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   acceptButtonText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#FFFFFF',
//     marginLeft: 6,
//   },
// });

// export default PendingRequestCard;
