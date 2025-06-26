import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const horizontalContainerPadding = 15; // This is the padding on the left and right of the entire FlatList visible area
const itemSpacing = 10; // Gap between slides

// Calculate the width of each slide.
// This width takes into account the total horizontal space available for one slide,
// which is the screen width minus the container padding on both sides.
// If we want a marginRight on each item, and pagingEnabled snaps to the item's width,
// we need to make the item's visual width (slideVisualWidth) such that
// (slideVisualWidth + itemSpacing) equals the effective page size for FlatList.
const slideVisualWidth = width - (horizontalContainerPadding * 2);

// getItemLayout is crucial for `pagingEnabled` to correctly calculate scroll positions
// when items have margins or specific widths.
// It tells FlatList the total length (width) of each item including its margin.
const getItemLayout = (data, index) => ({
  length: slideVisualWidth + itemSpacing, // Length of each item including its right margin
  offset: (slideVisualWidth + itemSpacing) * index, // Cumulative offset
  index,
});

const promotionSlides = [
  {
    id: '1',
    title: 'Rent-Hub , Rent Anything Earn Easily',
    subtitle: 'Best Seller!',
    buttonText: 'Shop Now!',
    image: 'https://www.satoriadventuresnepal.com/pagegallery/trekking-equipments24.jpg',
  },
  {
    id: '2',
    title: 'New Arrivals: Fresh Styles!',
    subtitle: 'Limited Time!',
    buttonText: 'Explore Now!',
    image: 'https://www.satoriadventuresnepal.com/pagegallery/trekking-equipments24.jpg',
  },
  {
    id: '3',
    title: 'Unlock Exclusive Deals!',
    subtitle: 'For Members!',
    buttonText: 'Join Us!',
    image: 'https://placehold.co/400x250/3B82F6/ffffff?text=Promotion+3',
  },
];

const PromotionSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % promotionSlides.length;
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem = ({ item, index }) => (
    <View style={[
      styles.slide,
      { width: slideVisualWidth }, // Each slide has the calculated visual width
      // Apply marginRight to all slides except the last one
      index < promotionSlides.length - 1 ? { marginRight: itemSpacing } : null,
    ]}>
      <Image
        source={{ uri: item.image }}
        style={styles.slideImage}
        resizeMode="cover"
        onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
      />
      <View style={styles.overlay}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.subtitle}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{item.buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.sliderContainer}>
      <FlatList
        ref={flatListRef}
        data={promotionSlides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled // Enable snapping to pages
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={getItemLayout} // Tell FlatList about item dimensions for paging
        // contentContainerStyle only needs the horizontal padding that matches the container
        contentContainerStyle={{ paddingHorizontal: horizontalContainerPadding }}
      />
      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {promotionSlides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    marginVertical: 15,
    // The horizontal padding is now directly on this container, making the FlatList's visible area smaller
  },
  slide: {
    // Width is set dynamically in renderItem
    height: 180,
    borderRadius: 15,
    overflow: 'hidden',
    // marginRight is applied conditionally in renderItem
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  slideImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F7BC19',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  badge: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  badgeText: {
    color: '#FF6F61',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#FF6F61',
    fontSize: 14,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  paginationDot: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: '#E0E0E0', // Light gray for inactive
  marginHorizontal: 4,
},
paginationDotActive: {
  backgroundColor: '#FFA500', // Branded orange for active
  width: 10,
  height: 10,
},
});

export default PromotionSlider;
