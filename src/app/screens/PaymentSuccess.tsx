// screens/PaymentSuccessScreen.tsx
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function PaymentSuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.successText}>🎉 Payment Successful!</Text>
      <Text style={styles.message}>Thank you for your payment. Your rental is confirmed.</Text>
      <Button title="Go to My Bookings" onPress={() => navigation.navigate("BookingsScreen")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f0fdf4",
  },
  successText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#16a34a",
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});
