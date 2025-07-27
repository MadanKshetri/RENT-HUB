
// import { useGetPendingRentInItemsQuery } from "@/Api/query/useGetPendingRentItemsQuery";
// import PendingRequestCard from "@/src/components/RentedInPending";
// import React, { useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   RefreshControl,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";

// // Define your theme colors
// const Colors = {
//   primary: "#FFC107",
//   secondary: "#1E3A8A",
//   background: "#F8F9FA",
//   text: "#333333",
//   lightText: "#666666",
//   error: "#D32F2F",
//   placeholder: "#999999",
// };

// export default function Bookings() {
//   const [refreshing, setRefreshing] = useState(false);

//   const {
//     data,
//     isLoading,
//     isError,
//     refetch, // ✅ React Query refetch function
//   } = useGetPendingRentInItemsQuery();

//   const onRefresh = async () => {
//     try {
//       setRefreshing(true);
//       await refetch();
//     } catch (error) {
//       console.error("Refresh error:", error);
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   if (isLoading && !refreshing) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color={Colors.secondary} />
//         <Text style={styles.loadingText}>Loading pending requests...</Text>
//       </View>
//     );
//   }

//   if (isError) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.errorText}>
//           Failed to load requests. Please try again.
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View>
//     <View style={styles.container}>
//       <Text style={styles.header}>Pending Requests</Text>
//        </View>
//       <FlatList
//         data={data?.data || []}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => <PendingRequestCard item={item} />}
//         contentContainerStyle={styles.listContentContainer}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyStateContainer}>
//             <Text style={styles.emptyStateText}>
//               No pending requests at the moment.
//             </Text>
//             <Text style={styles.emptyStateSubText}>
//               Check back later or initiate a new rental!
//             </Text>
//           </View>
//         }
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background ,
//     paddingHorizontal: 15,
//     paddingTop: 20,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: Colors.background,
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: Colors.lightText,
//   },
//   errorText: {
//     fontSize: 16,
//     color: Colors.error,
//     textAlign: "center",
//   },
//   header: {
//     fontSize: 26,
//     fontWeight: "700",
//     color: Colors.secondary,
//     marginBottom: 20,
//     textAlign: "left",
//   },
//   listContentContainer: {
//     paddingBottom: 20,
//   },
//   emptyStateContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 50,
//   },
//   emptyStateText: {
//     fontSize: 18,
//     color: Colors.lightText,
//     marginBottom: 8,
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   emptyStateSubText: {
//     fontSize: 14,
//     color: Colors.placeholder,
//     textAlign: "center",
//   },
// });
import { useGetPendingRentInItemsQuery } from "@/Api/query/useGetPendingRentItemsQuery";
import PendingRequestCard from "@/src/components/RentedInPending";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { CircleAlert as AlertCircle, Calendar, Filter, Inbox, RefreshCw } from "lucide-react-native";
import React, { useState } from "react";
import {
  Animated,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// Enhanced color system
const Colors = {
  primary: "#FFC107",
  primaryLight: "#FFD54F",
  primaryDark: "#FF8F00",
  secondary: "#1E3A8A",
  secondaryLight: "#3B82F6",
  accent: "#FFC107",
  background: "#F8F9FA",
  surface: "#FFFFFF",
  surfaceElevated: "#FFFFFF",
  text: "#333333",
  textSecondary: "#666666",
  textLight: "#999999",
  error: "#D32F2F",
  errorLight: "#FEE2E2",
  success: "#4CAF50",
  warning: "#FF9800",
  border: "#E2E8F0",
  borderLight: "#F1F5F9",
  gradient: ["#FFC107", "#FF8F00"],
  shadow: "rgba(0, 0, 0, 0.1)",
};

interface SkeletonCardProps {
  style?: any;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ style }) => {
  const animatedValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={[styles.skeletonCard, style]}>
      <Animated.View style={[styles.skeletonLine, styles.skeletonTitle, { opacity }]} />
      <Animated.View style={[styles.skeletonLine, styles.skeletonText, { opacity }]} />
      <Animated.View style={[styles.skeletonLine, styles.skeletonTextShort, { opacity }]} />
      <View style={styles.skeletonFooter}>
        <Animated.View style={[styles.skeletonBadge, { opacity }]} />
        <Animated.View style={[styles.skeletonButton, { opacity }]} />
      </View>
    </View>
  );
};

const LoadingSkeleton: React.FC = () => (
  <View style={styles.skeletonContainer}>
    {[1, 2, 3, 4].map((key) => (
      <SkeletonCard key={key} style={{ marginBottom: 16 }} />
    ))}
  </View>
);

export default function Bookings() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetPendingRentInItemsQuery();

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleRetry = () => {
    refetch();
  };

  const filteredData = data?.data?.filter(item => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <LinearGradient
        colors={Colors.gradient}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <BlurView intensity={20} style={styles.headerBlur}>
          <View style={styles.headerContent}>
            <View style={styles.titleSection}>
              <Text style={styles.headerTitle}>Pending Requests</Text>
              <Text style={styles.headerSubtitle}>
                {data?.data?.length || 0} active requests
              </Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => {}}
              >
                <Filter size={20} color={Colors.surface} />
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </LinearGradient>
      
      {/* <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Colors.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search requests..."
            placeholderTextColor={Colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View> */}
    </View>
  );

  if (isLoading && !refreshing) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <LoadingSkeleton />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.errorContainer}>
          <View style={styles.errorContent}>
            <View style={styles.errorIconContainer}>
              <AlertCircle size={48} color={Colors.error} />
            </View>
            <Text style={styles.errorTitle}>Something went wrong</Text>
            <Text style={styles.errorMessage}>
              Failed to load requests. Please check your connection and try again.
            </Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <RefreshCw size={20} color={Colors.surface} style={styles.retryIcon} />
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyStateContent}>
        <View style={styles.emptyIconContainer}>
          <LinearGradient
            colors={[Colors.primaryLight, Colors.primary]}
            style={styles.emptyIconGradient}
          >
            <Inbox size={40} color={Colors.surface} />
          </LinearGradient>
        </View>
        <Text style={styles.emptyStateTitle}>No pending requests</Text>
        <Text style={styles.emptyStateDescription}>
          No pending requests at the moment. Check back later or initiate a new rental!
        </Text>
        <TouchableOpacity style={styles.emptyStateAction} onPress={onRefresh}>
          <Calendar size={16} color={Colors.primary} style={styles.emptyActionIcon} />
          <Text style={styles.emptyStateActionText}>Check for updates</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={searchQuery ? filteredData : (data?.data || [])}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={[styles.cardWrapper, { marginTop: index === 0 ? 8 : 0 }]}>
            <PendingRequestCard item={item} />
          </View>
        )}
        contentContainerStyle={styles.listContentContainer}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
            progressBackgroundColor={Colors.surface}
          />
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        bounces={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    marginBottom: 16,
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  headerBlur: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  titleSection: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.secondary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.secondary,
    opacity: 0.9,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.secondary,
    fontWeight: '500',
  },
  listContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  // Loading skeleton styles
  skeletonContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  skeletonCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  skeletonLine: {
    backgroundColor: Colors.borderLight,
    borderRadius: 4,
  },
  skeletonTitle: {
    height: 20,
    width: '70%',
    marginBottom: 12,
  },
  skeletonText: {
    height: 16,
    width: '100%',
    marginBottom: 8,
  },
  skeletonTextShort: {
    height: 16,
    width: '60%',
    marginBottom: 16,
  },
  skeletonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skeletonBadge: {
    height: 24,
    width: 80,
    borderRadius: 12,
    backgroundColor: Colors.borderLight,
  },
  skeletonButton: {
    height: 36,
    width: 100,
    borderRadius: 18,
    backgroundColor: Colors.borderLight,
  },
  // Error state styles
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorContent: {
    alignItems: 'center',
    maxWidth: 300,
  },
  errorIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.errorLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  retryIcon: {
    marginRight: 8,
  },
  retryButtonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  // Empty state styles
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyStateContent: {
    alignItems: 'center',
    maxWidth: 280,
  },
  emptyIconContainer: {
    marginBottom: 32,
  },
  emptyIconGradient: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyStateDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  emptyStateAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyActionIcon: {
    marginRight: 8,
  },
  emptyStateActionText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});