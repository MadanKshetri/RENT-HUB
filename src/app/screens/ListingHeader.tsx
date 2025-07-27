import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface HeaderTabsProps {
  tabs: string[];
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HeaderTabs: React.FC<HeaderTabsProps> = ({ tabs, selectedTab, onTabSelect }) => {
  const tabWidth = (width - 60) / tabs.length; // Account for padding
  const selectedIndex = tabs.indexOf(selectedTab);
  
  const indicatorPosition = useSharedValue(selectedIndex * tabWidth);
  
  React.useEffect(() => {
    indicatorPosition.value = withSpring(selectedIndex * tabWidth, {
      damping: 15,
      stiffness: 150,
    });
  }, [selectedIndex, tabWidth]);

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorPosition.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Animated.View style={[styles.indicator, indicatorStyle, { width: tabWidth }]} />
        {tabs.map((tab, index) => {
          const isSelected = selectedTab === tab;
          
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, { width: tabWidth }]}
              onPress={() => onTabSelect(tab)}
              activeOpacity={0.7}
            >
              <Animated.Text
                style={[
                  styles.tabText,
                  isSelected && styles.selectedTabText,
                ]}
              >
                {tab}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 4,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  indicator: {
    position: 'absolute',
    top: 4,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  selectedTabText: {
    color: '#1E293B',
  },
});

export default HeaderTabs;