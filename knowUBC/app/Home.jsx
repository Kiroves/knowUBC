import React, { useState, useEffect } from "react";
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
  const [news, setNews] = useState({});
  const [category, setCategory] = useState("science");

  // Fetch news data with a category query parameter and JSON content-type header
  useEffect(() => {
    fetch(`https://xkktkpkff8.execute-api.us-west-2.amazonaws.com/prod/news?category=${category}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Error fetching news:", error));
  }, [category]);

  const handleCategoryPress = (selectedCategory) => {
    setCategory(selectedCategory);
  };

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
        <TouchableOpacity
          style={[
            styles.button,
            category === "science" && styles.activeButton, // Highlight active button
          ]}
          onPress={() => handleCategoryPress("science")}
        >
          <Text
            style={[
              styles.buttonText,
              category === "science" && styles.activeButtonText,
            ]}
          >
            Science
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, category === "climate" && styles.activeButton]}
          onPress={() => handleCategoryPress("climate")}
        >
          <Text
            style={[
              styles.buttonText,
              category === "climate" && styles.activeButtonText,
            ]}
          >
            Climate
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            category === "university" && styles.activeButton,
          ]}
          onPress={() => handleCategoryPress("university")}
        >
          <Text
            style={[
              styles.buttonText,
              category === "university" && styles.activeButtonText,
            ]}
          >
            University
          </Text>
        </TouchableOpacity>
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
    backgroundColor: "#97D4E9",
    paddingTop: 40,
  },
  activeButton: {
    backgroundColor: "#007BFF",
    color: "white",
  },
  activeButtonText: {
    color: "#fff", // Active button text color (white)
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
    marginBottom: 10,
    maxHeight: 60,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  placeholderBox: {
    backgroundColor: "#ccc",
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
  },
});
