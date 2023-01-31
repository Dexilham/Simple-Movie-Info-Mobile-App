import { useQuery } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import CarouselTop from "../components/CarouselTop";
import { Get_Movies } from "../graphql/queries";

export default function Home({ navigation }) {
  const { loading, error, data } = useQuery(Get_Movies);
  if (loading) return <ActivityIndicator size={"large"} />;

  const movies = data.getMovies;
  // console.log(movies);

  const item = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() => {
        navigation.navigate("Details", {
          // screen: "DetailsInfo",
          itemId: item.id,
          data: item,
          // screen: "DetailsInfo",
          // params: { itemId: item.id },
        });
      }}
    >
      <Image source={{ uri: item.imgUrl }} style={styles.cardImage} />
      <Text style={styles.cardBody}>{item.title}</Text>
    </TouchableOpacity>
  );
  console.log(item, "<< item");
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* start carousel */}
        <View>
          <CarouselTop />
        </View>
        {/* end carousel */}
        <Text style={{ color: "white" }}>Welcome to IVETV!</Text>

        {/* <Image
          source={{
            uri: "https://blog.kakaocdn.net/dn/btynJ6/btrPVElH9Lt/jLvyZqzXWEPkw6lUc2MPUk/img.gif",
          }}
          style={{ width: 400, height: 200, marginTop: 10, marginBottom: 10 }}
        /> */}
        <Text style={{ color: "white", fontSize: 20 }}>New Movies</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <FlatList
            horizontal={true}
            data={movies}
            renderItem={item}
            keyExtractor={(item) => item.id}
          />
        </View>
        <Image
          source={{
            uri: "https://media.tenor.com/yyYPqL6fagUAAAAC/coca-cola-commercial.gif",
          }}
          style={{ width: 400, height: 200, marginTop: 10, marginBottom: 10 }}
        />

        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "black",
    borderRadius: 10,
    width: 150,
    height: 300,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  cardImage: {
    flex: 6,
    height: 120,
    width: "100%",
    resizeMode: "cover",
    overflow: "hidden",
  },
  cardBody: {
    flex: 2,
    color: "white",
    textAlign: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
  },
});
