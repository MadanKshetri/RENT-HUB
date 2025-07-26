import { useKycMutation } from '@/Api/mutation/kycVerifyMutation';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, CircleCheck as CheckCircle, CreditCard, FileText, Upload, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DocumentFile {
  uri: string;
  name: string;
  type: string;
}

const documentTypes = [
  { id: 'passport', label: 'Passport', icon: FileText },
  { id: 'driving_license', label: 'Driving License', icon: CreditCard },
  { id: 'citizenship', label: 'National ID', icon: User },
];

export default function KYCVerification() {
  const [currentStep, setCurrentStep] = useState(1);
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [documentFile, setDocumentFile] = useState<DocumentFile | null>(null);
  const [selfieFile, setSelfieFile] = useState<DocumentFile | null>(null);
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});


  const kycMutation = useKycMutation(); 

  const validateStep = (step: number) => {
    const newErrors: {[key: string]: string} = {};

    if (step === 1) {
      if (!documentType) newErrors.documentType = 'Please select a document type';
      if (!documentNumber.trim()) newErrors.documentNumber = 'Document number is required';
      if (documentNumber.length < 5) newErrors.documentNumber = 'Document number must be at least 5 characters';
    }

    if (step === 2) {
      if (!documentFile) newErrors.documentFile = 'Document file is required';
      if (!selfieFile) newErrors.selfieFile = 'Selfie is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        setDocumentFile({
          uri: asset.uri,
          name: asset.name,
          type: asset.mimeType || 'application/octet-stream',
        });
        setErrors({ ...errors, documentFile: '' });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const takeDocumentPhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Camera permission is needed to take photos');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        setDocumentFile({
          uri: asset.uri,
          name: 'document_photo.jpg',
          type: 'image/jpeg',
        });
        setErrors({ ...errors, documentFile: '' });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const takeSelfie = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Camera permission is needed to take photos');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        cameraType: ImagePicker.CameraType.front,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        setSelfieFile({
          uri: asset.uri,
          name: 'selfie_photo.jpg',
          type: 'image/jpeg',
        });
        setErrors({ ...errors, selfieFile: '' });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take selfie');
    }
  };
//  const submitKYC = () => {
//     if (!validateStep(2)) return;

//     const formData = new FormData();
//     formData.append('documentType', documentType);
//     formData.append('documentNumber', documentNumber);

//     if (documentFile) {
//       formData.append('documentFile', {
//         uri: documentFile.uri,
//         name: documentFile.name,
//         type: documentFile.type,
//       } as any);
//     }

//     if (selfieFile) {
//       formData.append('documentSelfieFile', {
//         uri: selfieFile.uri,
//         name: selfieFile.name,
//         type: selfieFile.type,
//       } as any);
//     }

//     if (remarks.trim()) {
//       formData.append('remarks', remarks);
//     }

//     kycMutation.mutate(formData, {
//       onSuccess: () => {
//         setCurrentStep(4); // Go to success screen
//       },
//       onError: (error: any) => {
//         const message = error?.response?.data?.message || 'Verification failed';
//         Alert.alert('Error', message);
//       },
//     });
//   };

// const submitKYC = () => {
//   if (!validateStep(2)) return;

//   const formData = new FormData();

//   // Required fields
//   formData.append('documentType', documentType);
//   formData.append('documentNumber', documentNumber);

//   if (documentFile) {
//     formData.append('doc', {
//       uri: documentFile.uri,
//       name: documentFile.name,
//       type: documentFile.type,
//     } as any);
//   }

//   // Optional selfie file
//   if (selfieFile) {
//     formData.append('docSelfie', {
//       uri: selfieFile.uri,
//       name: selfieFile.name,
//       type: selfieFile.type,
//     } as any);
//   }

//   // Optional remarks
//   if (remarks.trim()) {
//     formData.append('remarks', remarks);
//   }

//   kycMutation.mutate(formData, {
//     onSuccess: (res) => {
//       console.log("✅ KYC Verified:", res?.data);
//       Alert.alert("Success", "Your KYC has been submitted successfully.");
//       setCurrentStep(4); // or redirect
//     },
//     onError: (error: any) => {
//       console.log("❌ KYC Upload Error:", error?.response?.data);
//       const message = error?.response?.data?.message || 'Verification failed. Try again.';
//       Alert.alert("Error", message);
//     }
//   });
// };

const submitKYC = () => {
  if (!validateStep(2)) return;

  const formData = new FormData();

  console.log("📄 Submitting KYC with values:");
  console.log("documentType:", documentType);
  console.log("documentNumber:", documentNumber);
  console.log("doc:", documentFile);
  console.log("docSelfie:", selfieFile);
  console.log("remarks:", remarks);

  formData.append("documentType", documentType);
  formData.append("documentNumber", documentNumber);

  if (documentFile?.uri && documentFile?.name && documentFile?.type) {
    formData.append("doc", {
      uri: documentFile.uri,
      name: documentFile.name,
      type: documentFile.type,
    } as any);
  } else {
    Alert.alert("Error", "Document file is required.");
    return;
  }

  if (selfieFile?.uri && selfieFile?.name && selfieFile?.type) {
    formData.append("docSelfie", {
      uri: selfieFile.uri,
      name: selfieFile.name,
      type: selfieFile.type,
    } as any);
  }

  if (remarks?.trim()) {
    formData.append("remarks", remarks);
  }

  kycMutation.mutate(formData, {
    onSuccess: (res) => {
      console.log("✅ KYC Verified:", res?.data);
      Alert.alert("Success", "Your KYC has been submitted successfully.");
      setCurrentStep(4);
    },
    onError: (error: any) => {
      console.log("❌ KYC Upload Error:", error?.response?.data);
      const message = error?.response?.data?.message || 'Verification failed. Try again.';
      Alert.alert("Error", message);
    },
  });
};

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3].map((step) => (
        <View key={step} style={styles.stepContainer}>
          <View style={[
            styles.stepCircle,
            currentStep >= step ? styles.stepCircleActive : styles.stepCircleInactive
          ]}>
            <Text style={[
              styles.stepText,
              currentStep >= step ? styles.stepTextActive : styles.stepTextInactive
            ]}>
              {step}
            </Text>
          </View>
          {step < 3 && (
            <View style={[
              styles.stepLine,
              currentStep > step ? styles.stepLineActive : styles.stepLineInactive
            ]} />
          )}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Document Information</Text>
      <Text style={styles.stepDescription}>
        Select your document type and enter the document number
      </Text>

      <View style={styles.section}>
        <Text style={styles.label}>Document Type *</Text>
        <View style={styles.documentTypeGrid}>
          {documentTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.documentTypeCard,
                  documentType === type.id && styles.documentTypeCardSelected,
                  errors.documentType && styles.documentTypeCardError
                ]}
                onPress={() => {
                  setDocumentType(type.id);
                  setErrors({ ...errors, documentType: '' });
                }}
              >
                <IconComponent 
                  size={32} 
                  color={documentType === type.id ? '#3B82F6' : '#6B7280'} 
                />
                <Text style={[
                  styles.documentTypeText,
                  documentType === type.id && styles.documentTypeTextSelected
                ]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {errors.documentType && (
          <Text style={styles.errorText}>{errors.documentType}</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Document Number *</Text>
        <TextInput
          style={[
            styles.input,
            errors.documentNumber && styles.inputError
          ]}
          value={documentNumber}
          onChangeText={(text) => {
            setDocumentNumber(text);
            setErrors({ ...errors, documentNumber: '' });
          }}
          placeholder="Enter document number"
          placeholderTextColor="#9CA3AF"
        />
        {errors.documentNumber && (
          <Text style={styles.errorText}>{errors.documentNumber}</Text>
        )}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Upload Documents</Text>
      <Text style={styles.stepDescription}>
        Take a photo or upload your document and an optional selfie
      </Text>

      <View style={styles.section}>
        <Text style={styles.label}>Document Photo/File *</Text>
        {documentFile ? (
          <View style={styles.filePreview}>
            {documentFile.type.startsWith('image/') ? (
              <Image source={{ uri: documentFile.uri }} style={styles.previewImage} />
            ) : (
              <View style={styles.filePlaceholder}>
                <FileText size={48} color="#6B7280" />
                <Text style={styles.fileName}>{documentFile.name}</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => setDocumentFile(null)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.uploadOptions}>
            <TouchableOpacity style={styles.uploadButton} onPress={takeDocumentPhoto}>
              <Camera size={24} color="#3B82F6" />
              <Text style={styles.uploadButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
              <Upload size={24} color="#3B82F6" />
              <Text style={styles.uploadButtonText}>Upload File</Text>
            </TouchableOpacity>
          </View>
        )}
        {errors.documentFile && (
          <Text style={styles.errorText}>{errors.documentFile}</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Selfie *</Text>
        {selfieFile ? (
          <View style={styles.filePreview}>
            <Image source={{ uri: selfieFile.uri }} style={styles.previewImageSmall} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => setSelfieFile(null)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={[
            styles.selfieButton,
            errors.selfieFile && styles.selfieButtonError
          ]} onPress={takeSelfie}>
            <Camera size={24} color="#3B82F6" />
            <Text style={styles.uploadButtonText}>Take Selfie</Text>
          </TouchableOpacity>
        )}
        {errors.selfieFile && (
          <Text style={styles.errorText}>{errors.selfieFile}</Text>
        )}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Review & Submit</Text>
      <Text style={styles.stepDescription}>
        Review your information and add any additional remarks
      </Text>

      <View style={styles.reviewSection}>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Document Type:</Text>
          <Text style={styles.reviewValue}>
            {documentTypes.find(type => type.id === documentType)?.label}
          </Text>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Document Number:</Text>
          <Text style={styles.reviewValue}>{documentNumber}</Text>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Document File:</Text>
          <Text style={styles.reviewValue}>{documentFile?.name}</Text>
        </View>
        {selfieFile && (
          <View style={styles.reviewItem}>
            <Text style={styles.reviewLabel}>Selfie:</Text>
            <Text style={styles.reviewValue}>Included</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Additional Remarks (Optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={remarks}
          onChangeText={setRemarks}
          placeholder="Add any additional information..."
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.successContent}>
      <CheckCircle size={80} color="#10B981" />
      <Text style={styles.successTitle}>Verification Submitted!</Text>
      <Text style={styles.successDescription}>
        Your KYC verification has been submitted successfully. You will receive an email confirmation shortly.
      </Text>
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FFC107', '#FFB300']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>KYC Verification</Text>
        <Text style={styles.headerSubtitle}>
          {currentStep < 4 ? 'Verify your identity to continue' : 'Verification Complete'}
        </Text>
      </LinearGradient>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {currentStep < 4 && renderStepIndicator()}
          {renderStepContent()}
        </ScrollView>
      </KeyboardAvoidingView>

      {currentStep < 4 && (
        <View style={styles.footer}>
          <View style={styles.buttonRow}>
            {currentStep > 1 && (
              <TouchableOpacity
                style={[styles.button, styles.buttonSecondary]}
                onPress={prevStep}
                disabled={loading}
              >
                <Text style={styles.buttonSecondaryText}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonPrimary,
                currentStep === 1 && styles.buttonFullWidth
              ]}
              onPress={currentStep === 3 ? submitKYC : nextStep}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonPrimaryText}>
                  {currentStep === 3 ? 'Submit Verification' : 'Continue'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#1E3A8A',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#1E3A8A',
  },
  stepCircleInactive: {
    backgroundColor: '#E5E7EB',
  },
  stepText: {
    fontSize: 16,
    fontWeight: '600',
  },
  stepTextActive: {
    color: '#FFFFFF',
  },
  stepTextInactive: {
    color: '#6B7280',
  },
  stepLine: {
    width: 40,
    height: 2,
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: '#3B82F6',
  },
  stepLineInactive: {
    backgroundColor: '#E5E7EB',
  },
  stepContent: {
    paddingBottom: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  documentTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  documentTypeCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  documentTypeCardSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  documentTypeCardError: {
    borderColor: '#EF4444',
  },
  documentTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E3A8A',
    marginTop: 8,
    textAlign: 'center',
  },
  documentTypeTextSelected: {
    color: '#3B82F6',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  textArea: {
    height: 100,
  },
  uploadOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  uploadButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E3A8A',
    marginTop: 8,
  },
  selfieButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  filePreview: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  previewImageSmall: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  filePlaceholder: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  fileName: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  removeButton: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
  },
  reviewSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  reviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  reviewLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  reviewValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
  },
  successContent: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 24,
    marginBottom: 12,
  },
  successDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFullWidth: {
    flex: 1,
  },
  buttonPrimary: {
    backgroundColor: '#FFC107',
  },
  buttonSecondary: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonPrimaryText: {
    color: '#1E3A8A',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondaryText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 8,
  },
});