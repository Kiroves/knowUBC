import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Home({ setComp }) {
  const [activeTab, setActiveTab] = useState("Science"); 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Text style={styles.title}>knowUBC</Text>
        <TouchableOpacity onPress={() => setComp("Notifications")}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        {["Science", "Climate", "University"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.button, activeTab === tab && styles.activeButton]} 
            onPress={() => setActiveTab(tab)} 
          >
            <Text style={styles.buttonText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Trending</Text>
        <View style={styles.placeholderBox}></View>

        <Text style={styles.sectionTitle}>Latest</Text>
        <View style={styles.placeholderBox}></View>
        <View style={styles.placeholderBox}></View>
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setComp("Home")}>
          <Ionicons name="home-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setComp("Notifications")}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#40B4E5",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    flex: 1,
    paddingVertical: 30,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#E0E7EF", 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#E0E7EF',
  },
  activeButton: {
    backgroundColor: "#97D4E9", 
    borderColor: "#97D4E9", 
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  placeholderBox: {
    backgroundColor: "#ccc",
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2, // Added elevation for a subtle shadow effect
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E7EF", // Matching the navbar border with the theme
    backgroundColor: "#fff",
  },
});
