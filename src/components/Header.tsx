// import { Feather } from "@expo/vector-icons";
// import { router } from "expo-router";
// import React, { useEffect, useRef } from "react";
// import {
// 	Animated,
// 	StyleSheet,
// 	Text,
// 	TouchableOpacity,
// 	View,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// const Header = () => {
// 	const insets = useSafeAreaInsets();
// 	const heightAnim = useRef(new Animated.Value(0)).current;

// 	useEffect(() => {
// 		Animated.timing(heightAnim, {
// 			toValue: 100,
// 			duration: 1000,
// 			useNativeDriver: false, // layout animations don't support native driver
// 		}).start();
// 	});

// 	return (
// 		<View style={[styles.container, { paddingTop: insets.top },{width: '100%'}]}>
// 			<View style={styles.topHeader}>
// 				<Text style={styles.logoTxt}>RentHub</Text>
// 				<View style={styles.buttonContainer}></View>
// 			</View>
// 			<View style={styles.slogan}>
// 				<Text style={styles.sloganTxt}> Rent Anything</Text>
// 				<Text style={styles.sloganTxtB}> Earn Easily !</Text>
// 			</View>
// 			<View style={styles.searchBar}>
// 				<TouchableOpacity
					
// 					onPress={() => router.navigate("/searchScreen")}
// 				>
// 					<Feather
// 						name="search"
// 						size={20}
// 						color="#888"
// 						style={styles.searchIcon}
// 					/>

// 					<Text style={{ color: "#888", paddingTop: 5 }}>
// 						search for trekking gears, tripod...
// 					</Text>
// 				</TouchableOpacity>
// 			</View>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		height: 250,
// 		backgroundColor: "#FBAE3C",
// 		justifyContent: "space-between",
// 		paddingHorizontal: 15,
// 		borderBottomRightRadius: 60,
// 		width:'100%'
// 	},
// 	topHeader: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		justifyContent: "space-between",
// 	},
// 	logoTxt: {
// 		fontSize: 24,
// 		fontWeight: "900",
// 		color: "black",
// 		letterSpacing: 2.5,
// 	},

// 	buttonContainer: {
// 		flexDirection: "row",
// 		marginTop: 10,
// 	},
// 	loginButton: {
// 		backgroundColor: "#1E3A8A",
// 		paddingVertical: 8,
// 		paddingHorizontal: 16,
// 		borderRadius: 20,
// 		marginRight: 10,
// 	},
// 	loginText: {
// 		color: "#fff",
// 		fontWeight: "bold",
// 		lineHeight: 15,
// 	},
// 	signupButton: {
// 		backgroundColor: "#3B82F6",
// 		paddingVertical: 8,
// 		paddingHorizontal: 16,
// 		borderRadius: 20,
// 	},
// 	signupText: {
// 		color: "#fff",
// 		fontWeight: "bold",
// 		lineHeight: 15,
// 	},
// 	slogan: {
// 		justifyContent: "center",
// 		alignItems: "center",
// 	},
// 	sloganTxt: {
// 		fontSize: 28,
// 		fontWeight: "900",
// 		color: "#1f2c5c",
// 		letterSpacing: 1.5,
// 	},
// 	sloganTxtB: {
// 		fontSize: 22,
// 		color: "#ffffff",
// 		marginTop: 4,
// 	},

// 	searchBar: {
// 		flexDirection: "column",
// 		gap: 5,
// 		marginBottom: 25,
// 		paddingHorizontal: 12,
// 		backgroundColor: "#fff",
// 		borderRadius: 10,
// 		alignContent:"space-evenly"
// 	},
// 	searchIcon: {
// 		marginTop: 7,
// 	},
// 	txtInput: {
// 		backgroundColor: "white",
// 	},
// });
// export default Header;


import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Header = () => {
    const insets = useSafeAreaInsets();
    // The animation for height doesn't seem to be directly related to the target design.
    // I'm keeping it for now, but it might be removed if it conflicts with the static layout.
    const heightAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: 100, // This value might need adjustment based on final header height
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }, [heightAnim]); // Added heightAnim to dependency array

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.topHeader}>
                <View style={styles.searchBar}>
                    <TouchableOpacity
                        style={styles.searchTouchable}
                        onPress={() => router.navigate("/searchScreen")}
                    >
                        <Feather
                            name="search"
                            size={20}
                            color="#1E3A8A"
                            style={styles.searchIcon}
                        />
                        <Text style={styles.searchPlaceholder}>
                            What are you looking for?
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.iconButton}
                    onPress={() => router.navigate("/AddItemScreen")}

                    >
                        <Feather name="plus" size={24} color="#1E3A8A" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}
                    onPress={() => router.navigate("/(auth)/loginScreen")}
                    >
                        <Feather name="user" size={24} color="#1E3A8A" />
                        {/* <View style={styles.notificationBadge}>
                            <Text style={styles.notificationText}>2</Text>
                        </View> */}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFC107', // Light gray background
        paddingHorizontal: 15,
        paddingBottom: 10, // Added padding at the bottom
    },
    topHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: '100%',
    },
    searchBar: {
        flex: 1, // Take up remaining space
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginRight: 10, // Space between search bar and icons
    },
    searchTouchable: {
        flexDirection: "row",
        alignItems: "center",
    },
    searchIcon: {
        marginRight: 8,
    },
    searchPlaceholder: {
        color: "#555",
        fontSize: 16,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconButton: {
        marginLeft: 15, // Space between icons
        position: 'relative', // For badge positioning
    },
    notificationBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default Header;