import { useGetPendingRentInItemsQuery } from "@/Api/query/useGetPendingRentItemsQuery";
import PendingRequestCard from "@/src/components/RentedInPending";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

export default function Bookings() {
  const { data, isLoading, isError } = useGetPendingRentInItemsQuery();

  if (isLoading) return <ActivityIndicator size="large" color="#007bff" />;
  if (isError) return <Text>Error loading data...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pending Requests</Text>
      <FlatList
        data={data?.data || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PendingRequestCard item={item} />}
        ListEmptyComponent={<Text>No pending requests found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
