import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const fetchedHeroesData = [
  {
    id: 1,
    name: "Hero 1",
    imageLink:
      "https://api.vold.dev.fleava.com/pictures/5b39cd517169294aba251f43/images/thumbnails/large_8d8f458b-1861-4f79-bec0-0d6af53464f5.jpg",
  },
  {
    id: 2,
    name: "Hero 2",
    imageLink:
      "https://api.vold.dev.fleava.com/pictures/5b39cd517169294aba251f43/images/thumbnails/large_8d8f458b-1861-4f79-bec0-0d6af53464f5.jpg",
  },
  {
    id: 3,
    name: "Hero 3",
    imageLink:
      "https://api.vold.dev.fleava.com/pictures/5b39cd517169294aba251f43/images/thumbnails/large_8d8f458b-1861-4f79-bec0-0d6af53464f5.jpg",
  },
];

const Heroes = () => {
  const renderItem = ({ item }) => (
    <View style={styles.container} key={item.id}>
      <Image source={{ uri: item.imageLink }} style={styles.heroImage} />
    </View>
  );

  return (
    <SwiperFlatList
      data={fetchedHeroesData} // Use your hero data
      renderItem={renderItem}
      index={0} // Starting index
      autoplay
      autoplayDelay={5} // Autoplay delay in seconds
      autoplayLoop // Enable autoplay loop
      autoplayLoopKeepAnimation // Keep animation during loop
      showPagination={true} // Show pagination dots
    />
  );
};

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: 150,
    backgroundColor: "white",
    overflow: "hidden",
  },
  heroImage: {
    width: width,
    height: 150,
    overflow: "hidden", // Hide any overflow due to border radius
    resizeMode: "cover",
  },
});

export default Heroes;
