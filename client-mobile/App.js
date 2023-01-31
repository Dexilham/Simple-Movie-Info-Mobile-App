import { NavigationContainer } from "@react-navigation/native";

import MainStack from "./navigators/MainStack";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/queries";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </ApolloProvider>
  );
}
