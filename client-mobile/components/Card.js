import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
const Card = ({ imageLink, title, price }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardImage}>
        <Image
          source={{ uri: imageLink }}
          style={styles.image}
          resizeMode='cover'
        />
        <View style={styles.cardPrice}>
          <Text style={styles.priceText}>Rp.{price}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16,
  },
  cardImage: {
    position: "relative",
    maxHeight: 150,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cardPrice: {
    position: "absolute",
    bottom: 8,
    right: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    borderRadius: 5,
    backgroundColor: "#c89b3f",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    fontSize: 12,
    marginTop: -2,
  },
  cardContent: {
    position: "relative",
    padding: 5,
    margin: 5,
    height:49
  },
  cardTitle: {
    textAlign: "center",
    fontSize: 14,
    letterSpacing:2,
    fontWeight: "bold",
    color:"#914132"
  },
});

export default Card;
