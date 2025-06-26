
// import { useCategoriesQuery } from '@/Api/query/categoriesQuery';
// import { Feather } from '@expo/vector-icons';
// import React from 'react';
// import {
//   ActivityIndicator,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// // Icons and colors for only the categories in your API response
// const iconMap: Record<string, string> = {
//   Books: 'book',
//   Tools: 'tool',
//   Automotive: 'truck',
//   Grocery: 'shopping-cart',
//   shikhar: 'tag',
// };

// const colorMap: Record<string, string> = {
//   Books: '#EAB308',         // yellow
//   Tools: '#6366F1',         // indigo
//   Automotive: '#EF4444',    // red
//   Grocery: '#22C55E',       // green
//   shikhar: '#9CA3AF',       // gray
// };

// const CategoryItem = ({ icon, label, color }) => (
//   <TouchableOpacity style={styles.categoryItem}>
//     <View style={[styles.iconContainer, { backgroundColor: color }]}>
//       <Feather name={icon} size={24} color="#fff" />
//     </View>
//     <Text style={styles.categoryLabel}>{label}</Text>
//   </TouchableOpacity>
// );

// const Categories = () => {
//   const { data, isLoading, error } = useCategoriesQuery();

//   if (isLoading) return <ActivityIndicator size="large" color="#000" />;
//   if (error) return <Text style={{ color: 'red', marginLeft: 15 }}>Failed to load categories</Text>;

//   const categories = data?.data || [];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.sectionTitle}>Categories</Text>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {categories.map((category) => {
//           const name = category.name;
//           const icon = iconMap[name] || 'tag';
//           const color = colorMap[name] || '#9CA3AF';
//           return (
//             <CategoryItem
//               key={category.id}
//               icon={icon}
//               label={name}
//               color={color}
//             />
//           );
//         })}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 15,
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 15, 
//     marginLeft: 15,
//     color: '#222',
//   },
//   scrollContent: {
//     paddingLeft: 15,
//     paddingRight: 5,
//   },
//   categoryItem: {
//     alignItems: 'center',
//     marginRight: 20,
//     width: 70,
//   },
//   iconContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   categoryLabel: {
//     fontSize: 14,
//     color: '#444',
//     textAlign: 'center',
//   },
// });

// export default Categories;


// import { useCategoriesQuery } from '@/Api/query/categoriesQuery'; // Assuming this path is correct
// import { Feather } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React from 'react';

// import {
//   ActivityIndicator,
//   Dimensions,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// // Icons for categories - these will be black on a white background now
// const iconMap = {
//   Watches: 'watch',
//   Bags: 'shopping-bag',
//   Beauty: 'feather', // Using  'feather' as a generic beauty icon, you can pick a more suitable one
//   Clothing: 't-shirt', // Using 't-shirt' as a generic clothing icon
//   Accessories: 'headphones', // Using 'headphones' as a generic accessory icon
//   Shoes: 'package', // Using 'package' as a generic shoe icon
//   Lifestyle: 'heart', // Using 'heart' as a generic lifestyle icon
//   More: 'more-horizontal', // For the 'More' option
//   // Add more mappings as per your API response categories
//   Books: 'book',
//   Tools: 'tool',
//   Automotive: 'truck',
//   Grocery: 'shopping-cart',
//   shikhar: 'tag', // Assuming 'shikhar' is a valid category from your API
// };

// const router = useRouter();


// // Get screen width for responsive item sizing

// const { width } = Dimensions.get('window');
// const itemMargin = 12; // Adjusted margin around each item for better spacing
// const numColumns = 4; // Number of columns in the grid
// // Calculate width for each item, accounting for total margins
// const itemWidth = (width - (itemMargin * (numColumns + 1))) / numColumns; 

// const CategoryItem = ({ icon, label }) => (
//   <TouchableOpacity style={[styles.categoryItem, { width: itemWidth }]}
//   onPress={() => {
//       // Assuming 'router' is imported from 'expo-router' in categories.tsx
//       // and a route for `categories` screen exists.
//       router.navigate({
//         pathname: '/categoriesScreen', // Or whatever your route name is for this new screen
//         params: { category: label }, // Pass the category name as a parameter
//       });
//     }}
//   >
//     <View style={styles.iconContainer}>
//       {/* Icon color is now a consistent dark gray as per UI */}
//       <Feather name={icon} size={28} color="#555" />
//     </View>
//     <Text style={styles.categoryLabel}>{label}</Text>
//   </TouchableOpacity>
// );

// const Categories = () => {
//   const { data, isLoading, error } = useCategoriesQuery();

//   if (isLoading) return <ActivityIndicator size="large" color="#000" style={styles.loadingIndicator} />;
//   if (error) return <Text style={styles.errorText}>Failed to load categories</Text>;

//   // Ensure data and data.data exist, default to empty array
//   const categories = data?.data || [];

//   // Filter out any categories that don't have a mapped icon if necessary,
//   // or ensure your iconMap covers all possible category names from API.
//   // For demonstration, we'll just use a default 'tag' icon if not found.

//   return (
    
//     <View style={styles.container}>
//       <View style={styles.titleContainer}>
//         <Text style={styles.sectionTitle}>Categories</Text>
//         <TouchableOpacity>
//           <Text style={styles.seeMoreText}>See more</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.categoriesGrid}>
//         {categories.map((category) => {
//           const name = category.name;
//           // Use the icon from the map, or a default 'tag' icon
//           const icon = iconMap[name] || 'tag'; 
//           return (
//             <CategoryItem
//               key={category.id}
//               icon={icon}
//               label={name}
//             />
//           );
//         })}
//         {/*
//           If you always want a "More" category regardless of API data, uncomment this:
//           <CategoryItem
//             key="more-category"
//             icon={iconMap['More']}
//             label="More"
//           />
//         */}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 15,
//     // The horizontal padding is now handled by marginHorizontal on the grid items
//     // and a compensating negative margin on the categoriesGrid itself to ensure alignment.
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//     paddingHorizontal: 15, // Added padding to align with other sections
//   },
//   sectionTitle: {
//     fontSize: 20, 
//     fontWeight: 'bold',
//     color: '#222',
//   },
//   seeMoreText: {
//     fontSize: 14,
//     color: '#888', 
//     fontWeight: '600',
//   },
//   loadingIndicator: {
//     marginTop: 20,
//   },
//   errorText: {
//     color: 'red',
//     marginLeft: 15,
//     marginTop: 20,
//     textAlign: 'center',
//   },
//   categoriesGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'flex-start', // Align items to the start
//     marginHorizontal: -itemMargin / 2, // Compensate for item margins to make it flush
//     paddingHorizontal: itemMargin / 2, // Add back half the margin for overall padding
    
//   },
//   categoryItem: {
//   backgroundColor: '#F9FAFB', // Light card background
//   borderRadius: 12,
//   paddingVertical: 12,
//   paddingHorizontal: 8,
//   alignItems: 'center',
//   marginBottom: itemMargin,
//   marginHorizontal: itemMargin / 2,
//   width: itemWidth,
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 2 },
//   shadowOpacity: 0.08,
//   shadowRadius: 4,
//   elevation: 3,
//   borderWidth: 1,
//   borderColor: '#E5E7EB', // Light border to separate from white background
//   transition: 'transform 0.1s ease-in-out',
// },

//   iconContainer: {
//     width: 20, // Slightly smaller icon container for a more compact look
//     height: 20,
//     borderRadius: 25, // Make it circular
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//     backgroundColor: 'transparent', // No background color for icon container, icons directly on white
//   },
//   categoryLabel: {
//     fontSize: 14, 
//     color: '#111827', 
//     textAlign: 'center',
//     marginTop: 5, 
//     fontWeight: '600', 
//   },
// });

// export default Categories;


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
const ITEM_WIDTH = 90; // Fixed width for each category item
const ITEM_MARGIN_HORIZONTAL = 8; // Horizontal margin between items

const CategoryItem = ({ icon, label }) => (
  <TouchableOpacity
    style={[styles.categoryItem, { width: ITEM_WIDTH, marginHorizontal: ITEM_MARGIN_HORIZONTAL }]}
    onPress={() => {
      router.navigate({
        pathname: '/categoriesScreen',
        params: { category: label },
      });
    }}
  >
    <View style={styles.iconContainer}>
      <Feather name={icon} size={28} color="#555" />
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
          return <CategoryItem key={item.id} icon={icon} label={name} />;
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
    marginVertical: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
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
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginBottom: 5, // Keep a small vertical margin if desired
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  categoryLabel: {
    fontSize: 14,
    color: '#111827',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '600',
  },
});

export default Categories;
