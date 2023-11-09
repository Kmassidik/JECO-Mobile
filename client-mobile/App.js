import { NavigationContainer } from "@react-navigation/native";
import TabStacks from "./navigators/TabStacks";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://a565-114-124-183-142.ngrok-free.app",
  // uri: "https://api.devkmassidik.online/",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <TabStacks />
      </NavigationContainer>
    </ApolloProvider>
  );
}
