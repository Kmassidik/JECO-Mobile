import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CategoryItem = ({ item, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        {
          backgroundColor: isSelected ? "#e0e0e0" : "white",
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.categoryText,
          { fontWeight: isSelected ? "bold" : "normal" },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    color: "e0e0e0",
  },
  categoryText: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default CategoryItem;
