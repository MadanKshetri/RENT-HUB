// screens/PaymentWebView.tsx
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";


export default function PaymentWebView({ route }: any) {
const { paymentUrl } = useLocalSearchParams<{ paymentUrl: string }>();

  return (
    <View style={styles.container}>
      <WebView source={{ uri: paymentUrl }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


