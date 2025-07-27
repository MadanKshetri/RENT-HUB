import { useLogoutMutation } from "@/Api/mutation/useLogoutMutation";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const SignOutItem = () => {
  const [showModal, setShowModal] = useState(false);
  const { mutate: logout, isPending } = useLogoutMutation();
    const router = useRouter();


  const handleConfirmLogout = () => {
  logout(undefined, {
    onSuccess: () => {
      console.log("_____________________________________________________________  ")
      console.log("Logout data",logout)
      router.replace("/");
    },
  });
};

  return (
    <>
      {/* Sign Out menu item */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => setShowModal(true)} // Show modal
      >
        <Feather name="log-out" size={24} color="#555" />
        <View style={styles.menuItemTextContainer}>
          <Text style={styles.menuItemTitle}>Sign Out</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#ccc" />
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal
        transparent
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalMessage}>Are you sure you want to log out?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={[styles.button, styles.cancelButton]}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirmLogout}
                style={[styles.button, styles.confirmButton]}
                disabled={isPending}
              >
                <Text style={styles.buttonText}>
                  {isPending ? "Logging out..." : "Logout"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SignOutItem;
const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  menuItemTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  menuItemTitle: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  confirmButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
