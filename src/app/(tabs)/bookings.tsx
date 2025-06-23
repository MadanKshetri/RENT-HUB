import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const listingsData = [
  {
    id: 1,
    title: 'trekking shoes',
    rate: 120,
    available: true,
    thumbnail: 'https://makaluetraders.com/wp-content/uploads/2022/06/cedar-trekking-boots-1.jpg',
  },
  {
    id: 2,
    title: 'E-bike',
    rate: 150,
    available: false,
    thumbnail: 'https://oyopasal.com/wp-content/uploads/2024/01/Untitled-3.png',
  },
];

const tabs = ['Active Listings', 'Pending Requests', 'Rented Out'];

export default function bookings() {
  const [selectedTab, setSelectedTab] = useState('Active Listings');
  const [listings, setListings] = useState(listingsData);

  const toggleAvailability = (id) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === id ? { ...listing, available: !listing.available } : listing
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Listings</Text>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={[
              styles.tabButton,
              selectedTab === tab ? styles.activeTab : styles.inactiveTab,
            ]}
          >
            <Text
              style={
                selectedTab === tab
                  ? styles.activeTabText
                  : styles.inactiveTabText
              }
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Listings */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {listings.map((listing) => (
          <View key={listing.id} style={styles.card}>
            <Image source={{ uri: listing.thumbnail }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.listingTitle}>{listing.title}</Text>
              <Text style={styles.rate}>Rs{listing.rate} / day</Text>

              <View style={styles.availability}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: listing.available ? '#4CAF50' : '#F44336' },
                  ]}
                />
                <Text style={styles.statusText}>
                  {listing.available ? 'Available' : 'Unavailable'}
                </Text>
                <Switch
                  value={listing.available}
                  onValueChange={() => toggleAvailability(listing.id)}
                  trackColor={{ false: '#ccc', true: '#4CAF50' }}
                  thumbColor={listing.available ? '#fff' : '#fff'}
                />
              </View>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.editBtn}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#222',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    marginBottom: 16,
    backgroundColor: '#f3f3f3',
    padding: 6,
    borderRadius: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#4863e8',
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  inactiveTabText: {
    color: '#333',
    fontWeight: '500',
  },
  scrollView: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    elevation: 4,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  listingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  rate: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
  availability: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    color: '#444',
    marginRight: 10,
  },
  actions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  editBtn: {
    backgroundColor: '#f1c40f',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  editText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
