import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, Platform } from "react-native";
import { gql, useQuery } from "@apollo/client";
import Loading from "../components/Loading";

const GET_ITEM = gql`
  query detailItem($detailItemByIdId: ID!) {
    detailItemById(id: $detailItemByIdId) {
      id
      name
      description
      price
      imgUrl
      mongoUserId
      categoryId
      Ingredients {
        id
        imageUrl
        name
      }
      Category {
        id
        name
      }
    }
  }
`;

const GET_USER = gql`
  query userDetail($userDetailId: ID) {
    userDetail(id: $userDetailId) {
      _id
      username
      email
      phoneNumber
      address
      role
    }
  }
`;

export default function DetailScreen({ route }) {
  const { itemId } = route.params;
  const { loading, error, data } = useQuery(GET_ITEM, {
    variables: { detailItemByIdId: itemId },
  });

  const userDetailId = data?.detailItemById?.mongoUserId;
  const { loading: userLoading, data: userData, error: userError } = useQuery(GET_USER, {
    variables: { userDetailId },
    skip: !userDetailId,
  });

  const detailItemById = data?.detailItemById;
  const author = userData?.userDetail || {};

  if (loading || userLoading) return <Loading text="Loading..." />;
  if (error || userError) return <Text>Error: {error ? error.message : userError.message};</Text>;

  return (
    <ScrollView style={styles.container}>
      {detailItemById ? (
        <View>
          <Image source={{ uri: detailItemById.imgUrl }} style={styles.image} />
          <Text style={styles.title}>{detailItemById.name}</Text>
          <Text style={styles.description}>{detailItemById.description}</Text>
          <Text style={styles.price}>{`RP. ${detailItemById.price}`}</Text>
          <Text style={styles.ingredientsTitle}>Ingredients:</Text>
          <ScrollView horizontal style={styles.ingredientsContainer}>
            {detailItemById.Ingredients.map((ingredient) => (
              <View style={styles.ingredientItem} key={ingredient.id}>
                <Image source={{ uri: ingredient.imageUrl }} style={styles.ingredientImage} />
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{`Category:`}</Text>
            <Text style={{ color: '#555',}}>{detailItemById.Category.name}</Text>
          </View>
          {author._id && (
            <View style={styles.userDetailContainer}>
              <Text style={styles.userDetailTitle}>Author Details:</Text>
              <Text style={{ color: '#555',}} >{`Username: ${author.username}`}</Text>
              <Text style={{ color: '#555',}}>{`Email: ${author.email}`}</Text>
              <Text style={{ color: '#555',}}>{`Phone Number: ${author.phoneNumber}`}</Text>
              <Text style={{ color: '#555',}}>{`Address: ${author.address}`}</Text>
              <Text style={{ color: '#555'}}>{`Role: ${author.role}`}</Text>
            </View>
          )}
        </View>
      ) : (
        <Text>Data not found</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    marginTop: 8,
    color: '#555',
  },
  price: {
    fontSize: 20,
    marginTop: 16,
    marginBottom:16,
    color: '#E44D26',
  },
  ingredientsContainer: {
    marginTop: 24,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8, 
  },
  ingredientItem: {
    marginHorizontal: 12, 
  },
  ingredientImage: {
    width: 100,
    height: 100,
    borderRadius: 50, 
  },
  ingredientName: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
  categoryContainer: {
    marginTop: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userDetailContainer: {
    marginTop: 16,
    marginBottom:50
  },
  userDetailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
