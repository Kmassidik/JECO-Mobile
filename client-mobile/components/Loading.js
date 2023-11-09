import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

const Loading = ({ text }) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size='large' color='#0000ff' />
      {text && <Text>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
