import { Ionicons } from '@expo/vector-icons'; // For icons
import React, { useState } from 'react';
import {
    LayoutAnimation,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View,
} from 'react-native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledBeforeCreate) {
    UIManager.setLayoutAnimationEnabledBeforeCreate(true);
  }
}

// Define the color palette
const Colors = {
  primary: "#FFC107", // Amber
  secondary: "#1E3A8A", // Dark Blue
  background: "#F8F9FA", // Light Gray
  text: "#333333", // Dark Gray
  lightText: "#666666", // Medium Gray
  error: "#D32F2F", // Red
  placeholder: "#999999", // Lighter Gray
};

// Sample FAQ data
const faqData = [
  {
    id: '1',
    question: 'How do I list my property for rent?',
    answer: 'To list your property, navigate to the "List Property" section, fill in all required details including photos, description, and rental terms, then submit for review. Our team will verify the listing before it goes live.',
  },
  {
    id: '2',
    question: 'What are the fees for using RentHub?',
    answer: 'RentHub offers a free basic listing option. Premium features, such as boosted visibility and advanced tenant screening, are available through subscription plans. Please refer to our "Pricing" page for detailed information.',
  },
  {
    id: '3',
    question: 'How do I search for properties?',
    answer: 'You can search for properties using the search bar on the home screen. Filter by location, price range, property type, and number of bedrooms/bathrooms to refine your results.',
  },
  {
    id: '4',
    question: 'Is my personal information secure?',
    answer: 'Yes, RentHub uses industry-standard encryption and security protocols to protect your personal information. We are committed to maintaining the privacy and security of our users.',
  },
  {
    id: '5',
    question: 'How do I contact customer support?',
    answer: 'You can contact our customer support team via the "Help & Support" section in the app, or by emailing us at support@renthub.com. We aim to respond to all inquiries within 24 hours.',
  },
  {
    id: '6',
    question: 'Can I schedule a viewing through the app?',
    answer: 'Yes, for most listings, you can request to schedule a viewing directly through the app. The property owner or agent will then contact you to confirm the details.',
  },
  {
    id: '7',
    question: 'What if I forget my password?',
    answer: 'If you forget your password, click on "Forgot Password" on the login screen. You will be prompted to enter your registered email address to receive a password reset link.',
  },
];

const FAQItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    // Animate the layout changes
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.faqItemContainer}>
      <TouchableOpacity onPress={toggleExpand} style={styles.faqQuestionButton}>
        <Text style={styles.faqQuestionText}>{question}</Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={Colors.primary}
        />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.faqAnswerContainer}>
          <Text style={styles.faqAnswerText}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {faqData.map((faq) => (
          <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 50, // Adjust for status bar
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  scrollViewContent: {
    paddingBottom: 20, // Give some space at the bottom
  },
  faqItemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden', // Ensures rounded corners clip content
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  faqQuestionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background, // Use background color for subtle separator
  },
  faqQuestionText: {
    flex: 1, // Allow text to take available space
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginRight: 10,
  },
  faqAnswerContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: Colors.background, // Slightly different background for answer
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  faqAnswerText: {
    fontSize: 16,
    color: Colors.lightText,
    lineHeight: 24,
  },
});

export default App;
