import { useVerifyDocumentMutation } from "@/Api/mutation/postUserVerification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";


type FormData = {
  documentType: string;
  documentNumber: string;
  remarks?: string;
};

export default function AuthVerificationScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const [documentFile, setDocumentFile] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [documentSelfieFile, setDocumentSelfieFile] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const { mutate, isPending } = useVerifyDocumentMutation();

  const pickDocumentFile = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setDocumentFile(result.assets[0]);
    }
  };

  const pickSelfieFile = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setDocumentSelfieFile(result.assets[0]);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("data",data)
    if (!documentFile) {
      Alert.alert("Validation", "Please select a document file.");
      return;
    }

    mutate(
      {
        documentType: data.documentType,
        documentNumber: data.documentNumber,
        remarks: data.remarks,
        documentFile: {
          uri: documentFile.uri,
          name: "document.jpg",
          type: "image/jpeg",
        },
        documentSelfieFile: documentSelfieFile
          ? {
              uri: documentSelfieFile.uri,
              name: "selfie.jpg",
              type: "image/jpeg",
            }
          : undefined,
      },
      {
        onSuccess: async(data) => {
          Alert.alert("Success", "Verification submitted successfully!");
        await AsyncStorage.setItem("token", data.data.token);

        },
        onError: (err: any) => {
          Alert.alert("Error", err?.message || "Failed to submit verification.");
        },
      }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Verify Your Document</Text>

      <Text style={styles.label}>Document Type *</Text>
      <Controller
        control={control}
        name="documentType"
        rules={{ required: "Document type is required." }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="e.g., Passport"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.documentType && <Text style={styles.error}>{errors.documentType.message}</Text>}

      <Text style={styles.label}>Document Number *</Text>
      <Controller
        control={control}
        name="documentNumber"
        rules={{ required: "Document number is required." }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter document number"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.documentNumber && <Text style={styles.error}>{errors.documentNumber.message}</Text>}

      <Text style={styles.label}>Remarks (optional)</Text>
      <Controller
        control={control}
        name="remarks"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Any remarks"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <TouchableOpacity style={styles.fileButton} onPress={pickDocumentFile}>
        <Text>{documentFile ? "Change Document File" : "Select Document File *"}</Text>
      </TouchableOpacity>
      {documentFile && (
        <Image source={{ uri: documentFile.uri }} style={styles.preview} />
      )}

      <TouchableOpacity style={styles.fileButton} onPress={pickSelfieFile}>
        <Text>{documentSelfieFile ? "Change Selfie File" : "Select Selfie File (optional)"}</Text>
      </TouchableOpacity>
      {documentSelfieFile && (
        <Image source={{ uri: documentSelfieFile.uri }} style={styles.preview} />
      )}

      <Button
        title={isPending ? "Submitting..." : "Submit Verification"}
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 4,
  },
  error: {
    color: "red",
  },
  fileButton: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 4,
    alignItems: "center",
  },
  preview: {
    width: 100,
    height: 100,
    marginTop: 8,
    borderRadius: 4,
  },
});
