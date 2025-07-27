import { useGetItemsQuery } from "@/Api/query/itemsQuery";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, refetch } = useGetItemsQuery({
    search: searchText,
  });

  const items = data?.pages?.flatMap((page) => page.data) || [];

  const handleSearch = (text: string) => {
    setSearchText(text);
    refetch();
  };

  return (
    <View style={styles.container}>
    
      <View style={styles.headerRow}>
        <Link href=".." asChild>
          <TouchableOpacity>
            <Feather name="arrow-left" size={24} color="#1E3A8A" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.heading}>Search Items</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Search by name..."
        value={searchText}
        onChangeText={handleSearch}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#FFC107" />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
			<Link href={`/product/${item.id}`} asChild key={item.id.toString()}>
              <TouchableOpacity style={styles.card}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.status}>
                  Price: {item.rate}/{item.rateType}
                </Text>
              </TouchableOpacity>
            </Link>
          )}
          ListEmptyComponent={
            <Text style={styles.noResult}>No items found.</Text>
          }
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
	marginTop:10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E3A8A",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#FFC107",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E3A8A",
  },
  status: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  noResult: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
    fontSize: 16,
  },
});
