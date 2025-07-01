
import { useCategoriesQuery } from '@/Api/query/categoriesQuery'; // Assuming this path is correct
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const iconMap = {
  Accessories: 'headphones',
  Shoes: 'package',
  Lifestyle: 'heart',
  More: 'more-horizontal',
  Books: 'book',
  Tools: 'tool',
  Automotive: 'truck',
  Grocery: 'shopping-cart',
  shikhar: 'tag',
};

const router = useRouter();

// Define a fixed width for each item in the horizontal list
// You can adjust this value based on your design preference
const ITEM_WIDTH = 70; // Fixed width for each category item
const ITEM_MARGIN_HORIZONTAL = 6; // Horizontal margin between items

const CategoryItem = ({ icon, label, categoryId }) => (
  <TouchableOpacity
    style={[styles.categoryItem, { width: ITEM_WIDTH, marginHorizontal: ITEM_MARGIN_HORIZONTAL }]}
    onPress={() => {
      console.log("Key where is",categoryId)
      router.navigate({
        pathname: '/categoriesScreen',
        params: {categoryId},
        
      });
    }}
  >
    <View style={styles.iconContainer}>
      <Feather name={icon} size={22} color="#1E3A8A"/>
    </View>
    <Text style={styles.categoryLabel}>{label}</Text>
  </TouchableOpacity>
);

const Categories = () => {
  const { data, isLoading, error } = useCategoriesQuery();

  if (isLoading) return <ActivityIndicator size="large" color="#000" style={styles.loadingIndicator} />;
  if (error) return <Text style={styles.errorText}>Failed to load categories</Text>;

  const categories = data?.data || [];

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
      
      </View>
      <FlatList // Use FlatList here
        data={categories}
        renderItem={({ item }) => {
          const name = item.name;
          const icon = iconMap[name] || 'tag';
          return <CategoryItem key={item.id} icon={icon} label={name} categoryId={item.id}  />;
        }}
        keyExtractor={(item) => item.id.toString()} // Ensure keyExtractor returns a string
        horizontal // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hide the scroll indicator
        contentContainerStyle={styles.flatListContentContainer} // Style for the content inside FlatList
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  seeMoreText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginLeft: 15,
    marginTop: 20,
    textAlign: 'center',
  },
  flatListContentContainer: {
    paddingHorizontal: 15 - ITEM_MARGIN_HORIZONTAL, // Adjust padding to visually align with title
    // This helps in aligning the first and last item if they have margins
  },
  categoryItem: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
    marginBottom: 5, // Keep a small vertical margin if desired
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FFC107',
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'FFF4CC',
  },
  categoryLabel: {
    fontSize: 14,
    color: '#1E3A8A',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '600',
  },
});

export default Categories;
