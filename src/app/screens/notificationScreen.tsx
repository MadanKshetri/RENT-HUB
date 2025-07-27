// import { useGetActivityQuery } from "@/Api/query/useGetActivityQuery";
// import { Feather } from "@expo/vector-icons";
// import { Link } from "expo-router";
// import React from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from "react-native";
// const ActivityScreen = () => {
//   const { data, isLoading, isError, error } = useGetActivityQuery({
//     page: 1,
//     limit: 20,
//     sortOrder: "desc",
//   });

//   if (isLoading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#1E3A8A" />
//       </View>
//     );
//   }

//   if (isError) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.errorText}>Failed to load activities</Text>
//       </View>
//     );
//   }

//   const renderItem = ({ item }: any) => (
//     <View style={styles.card}>
//       <View style={styles.header}>
//         <Feather name="bell" size={20} color="#1E3A8A" />
//         <Text style={styles.title}>{item.title}</Text>
//       </View>
//       <Text style={styles.description}>{item.description}</Text>
//       <Text style={styles.meta}>
//         <Text style={styles.label}>Item:</Text> {item.item?.name}
//       </Text>
//       <Text style={styles.meta}>
//         <Text style={styles.label}>By:</Text> {item.createdBy?.name}
//       </Text>
//       <Text style={styles.timestamp}>
//         {new Date(item.createdAt).toLocaleString()}
//       </Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//         <View style={styles.headerRow}>
//             <Link href=".." asChild>
//                       <TouchableOpacity>
//                         <Feather name="arrow-left" size={24} color="#1E3A8A" />
//                       </TouchableOpacity>
//                     </Link>
//       <Text style={styles.screenTitle}>Notifications</Text>
//       </View>
//       <FlatList
//         data={data?.data || []}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </SafeAreaView>
//   );
// };

// export default ActivityScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: "#F8FAFC",
//     paddingHorizontal: 16,
//     backgroundColor:"#FFC107"

//   },
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//     gap: 10,
//     marginTop: 15,
//   },
//   screenTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#1E3A8A",
//     marginVertical: 16,
//   },
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorText: {
//     color: "red",
//     fontSize: 16,
//   },
//   card: {
//     backgroundColor: "#FFF",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#1E3A8A",
//     marginLeft: 8,
//   },
//   description: {
//     fontSize: 14,
//     color: "#374151",
//     marginBottom: 8,
//   },
//   meta: {
//     fontSize: 13,
//     color: "#6B7280",
//   },
//   label: {
//     fontWeight: "600",
//     color: "#111827",
//   },
//   timestamp: {
//     fontSize: 12,
//     color: "#9CA3AF",
//     marginTop: 6,
//     textAlign: "right",
//   },
// });
import { useGetActivityQuery } from "@/Api/query/useGetActivityQuery";
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import { CircleAlert as AlertCircle, ArrowLeft, Bell, CircleCheck as CheckCircle, Info, Package, Settings, User } from 'lucide-react-native';
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width } = Dimensions.get('window');

const colors = {
  primary: "#FFC107",
  secondary: "#1E3A8A",
  background: "#F8F9FA",
  text: "#333333",
  lightText: "#666666",
  error: "#D32F2F",
  placeholder: "#999999",
  white: "#FFFFFF",
  success: "#4CAF50",
  warning: "#FF9800",
  info: "#2196F3",
  shadow: "rgba(0, 0, 0, 0.1)",
};

const ActivityScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  
  const { data, isLoading, isError, error, refetch } = useGetActivityQuery({
    page: 1,
    limit: 20,
    sortOrder: "desc",
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const getNotificationIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'success':
        return <CheckCircle size={20} color={colors.success} />;
      case 'warning':
        return <AlertCircle size={20} color={colors.warning} />;
      case 'error':
        return <AlertCircle size={20} color={colors.error} />;
      case 'info':
        return <Info size={20} color={colors.info} />;
      default:
        return <Bell size={20} color={colors.secondary} />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'error':
        return colors.error;
      case 'info':
        return colors.info;
      default:
        return colors.secondary;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={[colors.primary, '#FFD54F']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Link href=".." asChild>
              <TouchableOpacity style={styles.backButton}>
                <ArrowLeft size={24} color={colors.white} />
              </TouchableOpacity>
            </Link>
            <Text style={styles.screenTitle}>Notifications</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading notifications...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={[colors.primary, '#FFD54F']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Link href=".." asChild>
              <TouchableOpacity style={styles.backButton}>
                <ArrowLeft size={24} color={colors.white} />
              </TouchableOpacity>
            </Link>
            <Text style={styles.screenTitle}>Notifications</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={styles.errorContainer}>
          <AlertCircle size={48} color={colors.error} />
          <Text style={styles.errorTitle}>Failed to load notifications</Text>
          <Text style={styles.errorSubtext}>Please check your connection and try again</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const notifications = data?.data || [];

  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity 
      style={[
        styles.notificationCard,
        index === 0 && styles.firstCard
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>
          <View style={[
            styles.iconBackground,
            { backgroundColor: `${getNotificationColor(item.type)}15` }
          ]}>
            {getNotificationIcon(item.type)}
          </View>
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.headerSection}>
            <Text style={styles.notificationTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.timeAgo}>
              {formatTimeAgo(item.createdAt)}
            </Text>
          </View>
          
          <Text style={styles.description} numberOfLines={3}>
            {item.description}
          </Text>
          
          {(item.item?.name || item.createdBy?.name) && (
            <View style={styles.metaContainer}>
              {item.item?.name && (
                <View style={styles.metaItem}>
                  <Package size={14} color={colors.lightText} />
                  <Text style={styles.metaText} numberOfLines={1}>
                    {item.item.name}
                  </Text>
                </View>
              )}
              
              {item.createdBy?.name && (
                <View style={styles.metaItem}>
                  <User size={14} color={colors.lightText} />
                  <Text style={styles.metaText} numberOfLines={1}>
                    {item.createdBy.name}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
      
      {!item.read && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Bell size={64} color={colors.placeholder} />
      <Text style={styles.emptyTitle}>No notifications yet</Text>
      <Text style={styles.emptySubtext}>
        When you have new notifications, they'll appear here
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primary, '#FFD54F']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Link href=".." asChild>
            <TouchableOpacity style={styles.backButton}>
              <ArrowLeft size={24} color={colors.white} />
            </TouchableOpacity>
          </Link>
          <Text style={styles.screenTitle}>Notifications</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
        
        {notifications.length > 0 && (
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{notifications.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {notifications.filter(n => !n.read).length}
              </Text>
              <Text style={styles.statLabel}>Unread</Text>
            </View>
          </View>
        )}
      </LinearGradient>

      <View style={styles.listContainer}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={renderEmptyState}
        />
      </View>
    </SafeAreaView>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: 0.5,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 12,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
  },
  statLabel: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.9,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  listContainer: {
    flex: 1,
    marginTop: -12,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.error,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    color: colors.lightText,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  notificationCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  firstCard: {
    marginTop: 4,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  iconBackground: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 8,
    lineHeight: 22,
  },
  timeAgo: {
    fontSize: 12,
    color: colors.lightText,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: colors.lightText,
    lineHeight: 20,
    marginBottom: 12,
  },
  metaContainer: {
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: colors.lightText,
    fontWeight: '500',
    flex: 1,
  },
  unreadIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.lightText,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});