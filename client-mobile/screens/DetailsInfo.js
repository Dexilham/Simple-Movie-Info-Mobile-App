import { useQuery } from "@apollo/client";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Get_Movie_By_Id } from "../graphql/queries";

export default function DetailsInfo({ navigation, route }) {
  const { itemId } = route.params;
  // console.log(route, "<< dari info");

  const { loading, error, data } = useQuery(Get_Movie_By_Id, {
    variables: { id: Number(itemId) },
  });
  if (loading) return <ActivityIndicator size={"large"} />;

  const movie = data.getMovieById;
  // console.log(movie, "<<< movie");

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Text style={styles.textHead}>{movie.title}</Text>
          <Image
            source={{
              uri: movie.imgUrl,
            }}
            style={{
              flex: 1,
              width: 400,
              height: 600,
              resizeMode: "cover",
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          <Text style={styles.textTitle}>Synopsis</Text>
          <Text style={styles.textStyle}>{movie.synopsis}</Text>
          <Text style={styles.textTitle}>Rating</Text>
          <Text style={styles.textStyle}>{movie.rating}</Text>
          <Text style={styles.textTitle}>Genre</Text>
          <Text style={styles.textStyle}>{movie.Genre.name}</Text>
          <Text style={styles.textTitle}>Published by</Text>
          <Text style={styles.textStyle}>{movie.User.username}</Text>

          <Text style={styles.textTitle}>Casts:</Text>
          {movie.Casts.map((cast) => {
            return (
              <View style={styles.container} key={cast.id}>
                <Text style={styles.textStyle}>{cast.name}</Text>
                <Image
                  source={{
                    uri: cast.profilePict,
                  }}
                  style={{
                    flex: 1,
                    width: 200,
                    height: 300,
                    resizeMode: "cover",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                />
              </View>
            );
          })}

          <Button
            title={"Back to Home"}
            onPress={() => navigation.popToTop()}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </ScrollView>
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
  textStyle: {
    color: "white",
  },
  textTitle: {
    color: "yellow",
  },
  textHead: {
    color: "yellow",
    fontSize: 20,
  },
  contentContainer: {
    paddingVertical: 10,
    backgroundColor: "black",
  },
});
