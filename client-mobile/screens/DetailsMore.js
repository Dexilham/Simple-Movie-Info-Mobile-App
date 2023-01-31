import { useQuery } from "@apollo/client";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useState, useRef } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Get_Movie_By_Id } from "../graphql/queries";
// import { Icon } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";

function YouTubeGetID(url) {
  var ID = "";
  url = url
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  } else {
    ID = url;
  }
  return ID;
}

export default function DetailsMore({ navigation, route }) {
  const { itemId } = route.params;
  // console.log(route, "<< dari more");

  const { loading, error, data } = useQuery(Get_Movie_By_Id, {
    variables: { id: Number(itemId) },
  });
  if (loading) return <ActivityIndicator size={"large"} />;

  const movie = data.getMovieById;

  const [playing, setPlaying] = useState(false);
  const [isMute, setMute] = useState(false);
  const controlRef = useRef();
  const onStateChange = (state) => {
    if (state === "ended") {
      setPlaying(false);
      // Alert.alert("video has finished playing!");
    }
    if (state !== "playing") {
      setPlaying(false);
    }
  };
  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  };
  const seekBackAndForth = (control) => {
    console.log("currentTime");
    controlRef.current?.getCurrentTime().then((currentTime) => {
      control === "forward"
        ? controlRef.current?.seekTo(currentTime + 15, true)
        : controlRef.current?.seekTo(currentTime - 15, true);
    });
  };
  const muteVideo = () => setMute(!isMute);
  const ControlIcon = ({ name, onPress }) => (
    <Ionicons onPress={onPress} name={name} size={40} color="#fff" />
  );
  const width = Dimensions.get("window").width;

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Text style={styles.textHead}>{movie.title} Movie Trailer</Text>
          <View style={styles.container}>
            <YoutubePlayer
              height={480}
              width={width}
              ref={controlRef}
              play={playing}
              mute={isMute}
              videoId={YouTubeGetID(movie.trailerUrl)}
              onChangeState={onStateChange}
            />
            <Text style={styles.textTitle}>Synopsis</Text>
            <Text style={styles.textStyle}>{movie.synopsis}</Text>
            <View style={styles.controlContainer}>
              <ControlIcon
                onPress={() => seekBackAndForth("rewind")}
                name="play-back-sharp"
              />
              <ControlIcon
                onPress={togglePlaying}
                name={playing ? "pause" : "play"}
              />
              <ControlIcon
                onPress={() => seekBackAndForth("forward")}
                name="play-forward"
              />
            </View>
            <ControlIcon
              onPress={muteVideo}
              name={isMute ? "ios-volume-high" : "volume-off"}
            />
          </View>

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
    color: "white",
    fontSize: 20,
    marginBottom: 10,
  },
  contentContainer: {
    paddingVertical: 10,
    backgroundColor: "black",
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
