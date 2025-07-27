// components/LoginPromptModal.tsx
import { useRouter } from "expo-router";
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuthStore } from '../store/authStore';




const LoginPromptModal = () => {
  const showLoginPrompt = useAuthStore((state:any) => state.showLoginPrompt);
  const login = useAuthStore((state:any) => state.login);
  const dismissPrompt = useAuthStore((state:any) => state.dismissPrompt);
  const router = useRouter();

  const handleLogin = () => {
    dismissPrompt(); // Optionally hide modal
    router.push("/screens/loginScreen"); 
  };

  return (
    <Modal visible={showLoginPrompt} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Login Required</Text>
          <Text style={styles.message}>
            Please log in to access full features of the app.
          </Text>
          <View style={styles.buttons}>
            <Pressable style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginText}>Login</Text>
            </Pressable>
            <Pressable style={styles.skipBtn} onPress={dismissPrompt}>
              <Text style={styles.skipText}>Skip</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LoginPromptModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  loginBtn: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  skipBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  skipText: {
    color: '#333',
  },
});
