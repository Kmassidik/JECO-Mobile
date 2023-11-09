import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Card from "../components/Card";
import Heroes from "../components/Heroes";
import { gql, useQuery } from "@apollo/client";
import CategoryItem from "../components/Category";
import Loading from "../components/Loading";

const GET_ITEMS = gql`
  query AllData {
    allItem {
      id
      imgUrl
      name
      price
      Category {
        id
        name
      }
    }
    allCategory {
      id
      name
    }
  }
`;
export default function HomeScreen({ navigation }) {
  const { data, loading } = useQuery(GET_ITEMS);

  const [isLoading, setIsLoading] = useState(true);
  const [isCategory, SetCategory] = useState([]);
  const [isItem, SetItem] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("DONUTS");

  const renderCategoryItem = ({ item }) => (
    <CategoryItem
      item={item}
      isSelected={selectedCategory === item.name}
      onPress={() => setSelectedCategory(item.name)}
    />
  );

  const { width } = Dimensions.get("window");
  const cardWidth = (width - 40) / 2;

  useEffect(() => {
    if (data && !loading) {
      const { allCategory, allItem } = data;
      SetCategory(allCategory);
      const filteredItems = allItem.filter(
        (item) => item.Category.name === selectedCategory
      );
      SetItem(filteredItems);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [data, selectedCategory]);

  if (isLoading) {
    return <Loading text='Loading...' />;
  } else {
    return (
      <ScrollView style={{ backgroundColor: "#F6F7EB" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
          }}>
          {/* heroes */}
          <View
            style={{
              flex: 1,
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 15,
              marginRight: 15,
            }}>
            <Heroes />
          </View>
          {/* category */}
          <View style={{ flex: 2, padding: 20 }}>
            <Text style={styles.categoryHeaderText}>Apa yang kamu cari</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {isCategory.map((item, index) => (
                <View key={index + 1} style={{ marginRight: 15 }}>
                  {renderCategoryItem({ item })}
                </View>
              ))}
            </ScrollView>
          </View>
          {/* content */}
          <View
            style={{
              flex: 3,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 12,
            }}>
            <View style={styles.centeredContent}>
              {isItem.map((item) => (
                <View style={{ width: cardWidth, padding: 5 }} key={item.id}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Detail", {
                        itemId: item.id,
                      })
                    }>
                    <Card
                      imageLink={item.imgUrl}
                      title={item.name}
                      price={item.price}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

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
  categoryHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  centeredContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
