import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons'; 

const NotificationItem = ({ title }) => (
  <View style={styles.notificationItem}>
    <Text style={styles.notificationText}>{title}</Text>
  </View>
);

export default function NotificationsScreen({ setComp }) { 
  const [nowExpanded, setNowExpanded] = useState(true);
  const [earlierExpanded, setEarlierExpanded] = useState(true);
  const [selectedTab, setSelectedTab] = useState('Science');

  const notifications = {
    Science: [
      "New Research Grant Opportunity: The UBC Faculty of Science has announced a new research grant opportunity for undergraduate students. Applications are due by October 15th.",
      "Science Club Meeting: Join the UBC Science Club for our first meeting of the semester on September 30th at 5 PM in Room 101, Biological Sciences Building.",
      "Guest Lecture: Don't miss the guest lecture by Dr. Jane Smith on 'Climate Change and Its Impact on Marine Ecosystems' on October 5th at 3 PM in the Lecture Theatre, Earth Sciences Building."
    ],
    Climate: [
      "Climate Action Workshop: Participate in the UBC Climate Action Workshop this Saturday, October 1st, at 10 AM. Learn how to make your lifestyle more sustainable!",
      "Green Spaces Initiative: UBC is launching a new initiative to increase green spaces on campus. Share your ideas at our open forum on October 12th in the UBC Conference Centre.",
      "Climate Change Research Symposium: Attend the UBC Climate Change Research Symposium on October 20th to explore innovative solutions to climate challenges. Register now!"
    ],
    University: [
      "New Student Orientation: Welcome to UBC! Join us for the New Student Orientation on September 27th at 9 AM to learn about campus resources and meet other new students.",
      "Exam Schedule Announcement: The final exam schedule for the Winter 2024 semester has been released. Check the UBC website for details.",
      "Tuition Payment Reminder: Reminder: Tuition payments for the Winter semester are due by October 15th. Make sure to settle your account to avoid late fees."
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <View style={styles.buttonRow}>
        {Object.keys(notifications).map(tab => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.button, selectedTab === tab && styles.activeButton]} 
            onPress={() => setSelectedTab(tab)}>
            <Text style={[styles.buttonText, selectedTab === tab && styles.activeButtonText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity 
          style={styles.sectionHeader} 
          onPress={() => setNowExpanded(!nowExpanded)}
        >
          <Icon 
            name={nowExpanded ? "chevron-down" : "chevron-right"} 
            size={24} 
            color="#000"
          />
          <Text style={styles.sectionHeaderText}>Now</Text>
        </TouchableOpacity>
        {nowExpanded && notifications[selectedTab].map((notification, index) => (
          <NotificationItem key={index} title={notification} />
        ))}
        
        <TouchableOpacity 
          style={styles.sectionHeader} 
          onPress={() => setEarlierExpanded(!earlierExpanded)}
        >
          <Icon 
            name={earlierExpanded ? "chevron-down" : "chevron-right"} 
            size={24} 
            color="#000"
          />
          <Text style={styles.sectionHeaderText}>Earlier</Text>
        </TouchableOpacity>
        {earlierExpanded && notifications[selectedTab].map((notification, index) => (
          <NotificationItem key={index} title={`Earlier: ${notification}`} />
        ))}
      </ScrollView>
      <View style={styles.bottomNav}>
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
    backgroundColor: '#40B4E5',
    padding: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  scrollView: {
    flex: 1,
    marginBottom: 60,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#E0E7EF',
    borderRadius: 8,
    marginVertical: 5,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
  },
  notificationItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  notificationText: {
    fontSize: 16,
    color: '#555',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E7EF',
    elevation: 3,
  },
  button: {
    backgroundColor: "#E0E7EF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#E0E7EF',
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
    textAlign: "center",
  },
  activeButton: {
    backgroundColor: "#97D4E9",
    borderColor: '#97D4E9',
  },
  activeButtonText: {
    color: "#fff",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    marginBottom: 10,
  }
});
