// src/components/ProductCard.js
import { Feather } from '@expo/vector-icons'; // Assuming Feather for icons like heart, star, map-pin
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
// Calculate item width for a 2-column grid with horizontal padding of 15px (7.5px on each side)
const ITEM_HORIZONTAL_PADDING = 15;
const ITEM_SPACING = 15; // Space between cards
const ITEM_WIDTH = (width - ITEM_HORIZONTAL_PADDING * 2 - ITEM_SPACING) / 2;

const ProductCard = ({ product, onPress }) => {
  const { name, imageUrl, price, priceUnit, location, rating, reviewsCount, isFeatured } = product;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.productImage} resizeMode="cover" />
        {isFeatured && (
          <View style={styles.featuredTag}>
            <Text style={styles.featuredTagText}>Featured</Text>
          </View>
        )}
        {/* Heart icon for wishlist, positioned absolutely */}
        <TouchableOpacity style={styles.wishlistIcon}>
          <Feather name="heart" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.productName} numberOfLines={2}>{name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>Rp{price.toLocaleString('en-US')}</Text>
          {priceUnit && <Text style={styles.priceUnit}> / {priceUnit}</Text>}
        </View>
        {location && (
          <View style={styles.locationContainer}>
            <Feather name="map-pin" size={12} color="#777" />
            <Text style={styles.locationText}>{location}</Text>
          </View>
        )}
        <View style={styles.ratingReviews}>
          <Feather name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{rating?.toFixed(1)} </Text>
          {reviewsCount !== undefined && <Text style={styles.reviewsCount}>({reviewsCount} Reviews)</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 7.5, // Half of ITEM_SPACING vertically for grid
    marginHorizontal: ITEM_SPACING / 2, // Half of ITEM_SPACING horizontally
    width: ITEM_WIDTH,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    overflow: 'hidden', // Ensures borderRadius crops content
  },
  imageContainer: {
    width: '100%',
    height: ITEM_WIDTH * 0.9, // Make image slightly less than square
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  featuredTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#4CAF50', // Green for "Featured"
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  featuredTagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  wishlistIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 15,
    padding: 5,
  },
  detailsContainer: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    height: 36, // Fixed height for two lines of text
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  priceUnit: {
    fontSize: 12,
    color: '#777',
    fontWeight: '500',
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 12,
    color: '#777',
    marginLeft: 5,
  },
  ratingReviews: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 12,
    color: '#555',
    marginLeft: 4,
  },
  reviewsCount: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
});

export default ProductCard;
