// components/ItemCard.js
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const ItemCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.assets?.[0]?.url }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.price}>Rs. {item.rate} / {item.rateType}</Text>
      {/* <Text style={styles.location}>{item. || 'Pokhara'}</Text> Adjust as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    height: 120,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 8,
  },
  price: {
    fontSize: 14,
    color: 'green',
    marginHorizontal: 8,
  },
  location: {
    fontSize: 12,
    color: '#777',
    margin: 8,
  },
});

export default ItemCard;
