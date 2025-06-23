// import { useCategoriesQuery } from "@/Api/query/categoriesQuery";
// import { Feather } from "@expo/vector-icons";
// import React from "react";
// import {
//   ActivityIndicator,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// // Maps category names to Feather icons
// const iconMap: Record<string, string> = {
//   Clothing: "shopping-bag",
//   Cameras: "camera",
//   Electronics: "smartphone",
//   Furniture: "box",
//   Audio: "headphones",
//   Tools: "tool",
// };

// // Maps category names to colors
// const colorMap: Record<string, string> = {
//   Clothing: "#F97316",
//   Cameras: "#8B5CF6",
//   Electronics: "#3B82F6",
//   Furniture: "#10B981",
//   Audio: "#EC4899",
//   Tools: "#6366F1",
// };

// // Individual category item
// const CategoryItem = ({ icon, label, color }) => (
//   <TouchableOpacity style={styles.categoryItem}>
//     <View style={[styles.iconContainer, { backgroundColor: color }]}>
//       <Feather name={icon} size={24} color="#fff" />
//     </View>
//     <Text style={styles.categoryLabel}>{label}</Text>
//   </TouchableOpacity>
// );

// // Main Categories component
// const Categories = () => {
//   const { data, isLoading, error } = useCategoriesQuery();

//   if (isLoading) {
//     return <ActivityIndicator size="large" color="#000" />;
//   }

//   if (error) {
//     return (
//       <Text style={{ color: "red", marginLeft: 15 }}>
//         Failed to load categories
//       </Text>
//     );
//   }

// const categories = data?.categories || [];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.sectionTitle}>Categories</Text>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {categories.map((category) => {
//           const icon = iconMap[category.name] || "tag";
//           const color = colorMap[category.name] || "#9CA3AF"; // default gray
//           return (
//             <CategoryItem
//               key={category.id}
//               icon={icon}
//               label={category.name}
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
//     fontWeight: "bold",
//     marginBottom: 15,
//     marginLeft: 15,
//     color: "#222",
//   },
//   scrollContent: {
//     paddingLeft: 15,
//     paddingRight: 5,
//   },
//   categoryItem: {
//     alignItems: "center",
//     marginRight: 20,
//     width: 70,
//   },
//   iconContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   categoryLabel: {
//     fontSize: 14,
//     color: "#444",
//     textAlign: "center",
//   },
// });

// export default Categories;
// import { useCategoriesQuery } from "@/Api/query/categoriesQuery";
// import { Feather } from "@expo/vector-icons";
// import React from "react";
// import {
//   ActivityIndicator,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// // Icon mapping for known categories
// const iconMap: Record<string, string> = {
//   Clothing: "shopping-bag",
//   Cameras: "camera",
//   Electronics: "smartphone",
//   Furniture: "box",
//   Audio: "headphones",
//   Tools: "tool",
//   Books: "book",
//   Automotive: "truck",
//   Grocery: "shopping-cart",
//   shikhar: "tag", // fallback or your custom icon
// };

// // Color mapping for known categories
// const colorMap: Record<string, string> = {
//   Clothing: "#F97316",
//   Cameras: "#8B5CF6",
//   Electronics: "#3B82F6",
//   Furniture: "#10B981",
//   Audio: "#EC4899",
//   Tools: "#6366F1",
//   Books: "#EAB308",
//   Automotive: "#EF4444",
//   Grocery: "#22C55E",
//   shikhar: "#9CA3AF", // default gray
// };

// // Individual category item component
// const CategoryItem = ({ icon, label, color }) => (
//   <TouchableOpacity style={styles.categoryItem}>
//     <View style={[styles.iconContainer, { backgroundColor: color }]}>
//       <Feather name={icon} size={24} color="#fff" />
//     </View>
//     <Text style={styles.categoryLabel}>{label}</Text>
//   </TouchableOpacity>
// );

// // Main Categories component
// const Categories = () => {
//   const { data, isLoading, error } = useCategoriesQuery();

//   if (isLoading) {
//     return <ActivityIndicator size="large" color="#000" />;
//   }

//   if (error) {
//     return (
//       <Text style={{ color: "red", marginLeft: 15 }}>
//         Failed to load categories
//       </Text>
//     );
//   }

// const categories = data?.categories || [];

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
//           const icon = iconMap[name] || "tag";
//           const color = colorMap[name] || "#9CA3AF"; // default gray
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
//     fontWeight: "bold",
//     marginBottom: 15,
//     marginLeft: 15,
//     color: "#222",
//   },
//   scrollContent: {
//     paddingLeft: 15,
//     paddingRight: 5,
//   },
//   categoryItem: {
//     alignItems: "center",
//     marginRight: 20,
//     width: 70,
//   },
//   iconContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   categoryLabel: {
//     fontSize: 14,
//     color: "#444",
//     textAlign: "center",
//   },
// });

// export default Categories;

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

// // Maps category names to Feather icons
// const iconMap: Record<string, string> = {
//   Clothing: 'shopping-bag',
//   Cameras: 'camera',
//   Electronics: 'smartphone',
//   Furniture: 'box',
//   Audio: 'headphones',
//   Tools: 'tool',
//   Books: 'book',
//   Automotive: 'truck',
//   Grocery: 'shopping-cart',
//   shikhar: 'tag',
// };

// // Maps category names to colors
// const colorMap: Record<string, string> = {
//   Clothing: '#F97316',
//   Cameras: '#8B5CF6',
//   Electronics: '#3B82F6',
//   Furniture: '#10B981',
//   Audio: '#EC4899',
//   Tools: '#6366F1',
//   Books: '#EAB308',
//   Automotive: '#EF4444',
//   Grocery: '#22C55E',
//   shikhar: '#9CA3AF',
// };

// // Category item UI
// const CategoryItem = ({ icon, label, color }) => (
//   <TouchableOpacity style={styles.categoryItem}>
//     <View style={[styles.iconContainer, { backgroundColor: color }]}>
//       <Feather name={icon} size={24} color="#fff" />
//     </View>
//     <Text style={styles.categoryLabel}>{label}</Text>
//   </TouchableOpacity>
// );

// // Main component
// const Categories = () => {
//   const { data, isLoading, error } = useCategoriesQuery();

//   if (isLoading) return <ActivityIndicator size="large" color="#000" />;
//   if (error) return <Text style={{ color: 'red', marginLeft: 15 }}>Failed to load categories</Text>;

// const categories = data?.categories || [];

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
//           const color = colorMap[name] || '#9CA3AF'; // default gray
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


import { useCategoriesQuery } from '@/Api/query/categoriesQuery';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Icons and colors for only the categories in your API response
const iconMap: Record<string, string> = {
  Books: 'book',
  Tools: 'tool',
  Automotive: 'truck',
  Grocery: 'shopping-cart',
  shikhar: 'tag',
};

const colorMap: Record<string, string> = {
  Books: '#EAB308',         // yellow
  Tools: '#6366F1',         // indigo
  Automotive: '#EF4444',    // red
  Grocery: '#22C55E',       // green
  shikhar: '#9CA3AF',       // gray
};

const CategoryItem = ({ icon, label, color }) => (
  <TouchableOpacity style={styles.categoryItem}>
    <View style={[styles.iconContainer, { backgroundColor: color }]}>
      <Feather name={icon} size={24} color="#fff" />
    </View>
    <Text style={styles.categoryLabel}>{label}</Text>
  </TouchableOpacity>
);

const Categories = () => {
  const { data, isLoading, error } = useCategoriesQuery();

  if (isLoading) return <ActivityIndicator size="large" color="#000" />;
  if (error) return <Text style={{ color: 'red', marginLeft: 15 }}>Failed to load categories</Text>;

  const categories = data?.data || [];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const name = category.name;
          const icon = iconMap[name] || 'tag';
          const color = colorMap[name] || '#9CA3AF';
          return (
            <CategoryItem
              key={category.id}
              icon={icon}
              label={name}
              color={color}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15, 
    marginLeft: 15,
    color: '#222',
  },
  scrollContent: {
    paddingLeft: 15,
    paddingRight: 5,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryLabel: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
  },
});

export default Categories;
