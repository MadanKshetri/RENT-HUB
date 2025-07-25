import { useAuthStore } from '@/src/store/authStore';
import React from 'react';
import { Button, Text, View } from 'react-native';

export default function ProfileScreen() {
  // Use destructuring to access state and actions
  const { user, logout } = useAuthStore();

  return (
    <View style={{ padding: 20 }}>
      {user ? (
        <>
          <Text style={{ fontSize: 18 }}>Welcome, {user.name}!</Text>
          <Text style={{ marginBottom: 10 }}>{user.email}</Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <Text>You are not logged in.</Text>
      )}
    </View>
  );
}
