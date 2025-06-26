// src/components/ItemCard.tsx
import { Link } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text } from 'react-native';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const itemMargin = 12;
const itemWidth = (screenWidth - itemMargin * (numColumns + 1)) / numColumns;

const ItemCard = ({ item }: { item: any }) => {
  return (
    <Link href={`/product/${item.id}`} asChild>
      <Pressable style={styles.itemCard}>
        {item.assets?.[0]?.url && (
          <Image
            source={{ uri: item.assets[0].url }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>
          ₹{item.rate}/{item.rateType}
        </Text>
      </Pressable>
    </Link>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  itemCard: {
    width: itemWidth,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    margin: itemMargin / 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 120,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  price: {
    fontSize: 14,
    color: '#555',
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
});
