// components/HeaderTabs.js
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HeaderTabs({ tabs, selectedTab, onTabSelect }) {
	return (
		<View style={styles.headerWrapper}>
			<Text style={styles.title}>My Listings</Text>

			<View style={styles.tabsContainer}>
				{tabs.map((tab: any) => (
					<TouchableOpacity
						key={tab}
						onPress={() => onTabSelect(tab)}
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
		</View>
	);
}

const styles = StyleSheet.create({
	headerWrapper: {
		backgroundColor: "#FFC107",
		borderRadius: 12,
		padding: 5,
		marginBottom: 16,
	},

	title: {
		fontSize: 24,
		fontWeight: "700",
		marginBottom: 20,
		color: "#1E3A8A",
	},
	tabsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
		backgroundColor: "#",
		padding: 6,
		borderRadius: 12,
	},
	tabButton: {
		flex: 1,
		paddingVertical: 10,
		borderRadius: 8,
		alignItems: "center",
	},
	activeTab: {
		backgroundColor: "#FFC107",
	},
	inactiveTab: {
		backgroundColor: "transparent",
	},
	activeTabText: {
		color: "#1E3A8A",
		fontWeight: "600",
	},
	inactiveTabText: {
		color: "#1E3A8A",
		fontWeight: "500",
	},
});
