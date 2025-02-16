import React, { useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Button, ScrollView, SafeAreaView } from 'react-native';
import { styles, textStyles } from '../styles';
import { useDarkMode } from '../contexts/DarkModeContext'; // Make sure to import useDarkMode
import SettingsToggle from '../components/SettingsToggle';
import * as Notifications from 'expo-notifications';
import { settingStyles } from '../styles/index';


function Setting() {
  useEffect(() => {
    // Request permission to send notifications (this will prompt the user)
    Notifications.requestPermissionsAsync().then(({ status }) => {
      if (status === 'granted') {
        // Schedule a notification for 5 seconds from now
        scheduleNotification();
      } else {
        console.warn('Permission to receive notifications was denied');
      }
    });

    // Clean up any scheduled notifications when the component unmounts
    return () => {
      Notifications.cancelAllScheduledNotificationsAsync();
    };
  }, []);

  const scheduleNotification = () => {
    // Set the content and trigger for the notification
    console.log('here');
    const notificationContent = {
      title: 'Hello!',
      body: 'This is a basic Expo notification.',
    };

    const trigger = {
      seconds: 5, // Notify after 5 seconds
    };

    // Schedule the notification
    Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger,
    });
  };

  useEffect(() => {
    // ... existing permission request logic

    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      // Handle notification in foreground
      console.log('Notification received in foreground:', notification.request.content.title);
      // Play a sound, display an alert, or update UI here
    });

    return () => Notifications.removeNotificationSubscription(notificationListener);
  }, []);

  const { isDarkMode, toggleSwitch } = useDarkMode(); // Use the useDarkMode hook

  const backgroundColor = isDarkMode ? 'black' : '#f4f4f4';
  const textColor = isDarkMode ? 'white' : 'black';


  return (
      <ScrollView style={[settingStyles.container, { backgroundColor}]}>
        <Text style={[textStyles.titleText, { color: textColor }]}>Settings</Text>
        <View style={settingStyles.sections}>
          <SettingsToggle
            name="Dark Mode"
            value={isDarkMode}
            mode={isDarkMode}
            onValueChange={toggleSwitch}
            icon='moon'
            iconColor='white'
            iconBackgroundColor='orange'
            last={false}
          ></SettingsToggle>
          <SettingsToggle
            name="Discord Option"
            value={false}
            mode={isDarkMode}
            onValueChange={() => {}}
            icon='message-circle'
            iconColor='white'
            iconBackgroundColor='blue'
            last={false}
          ></SettingsToggle>
              <SettingsToggle
            name="Test Option"
            value={false}
            mode={isDarkMode}
            onValueChange={() => {}}
            icon='activity'
            iconColor='white'
            iconBackgroundColor='red'
            last={true}
          ></SettingsToggle>
        </View>
        {/* <View style={settingStyles.sections}>
        <SettingsToggle
            name="Discord Option"
            value={false}
            mode={isDarkMode}
            onValueChange={() => {}}
            icon='message-circle'
            iconColor='white'
            iconBackgroundColor='blue'
          ></SettingsToggle>
        </View> */}
        <Button title="Schedule Notification" onPress={scheduleNotification} />
      </ScrollView>
  );
}

export default Setting;
