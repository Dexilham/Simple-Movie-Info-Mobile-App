import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function CarouselTop() {
  const width = Dimensions.get("window").width;
  const carouselPic = [
    {
      title: "Aenean leo",
      imgUrl: "https://puui.wetvinfo.com/tv/0/1248814056_1680580/0",
    },
    {
      title: "In turpis",
      imgUrl: "https://puui.wetvinfo.com/tv/0/1244742234_1680580/0",
    },
    {
      title: "Lorem Ipsum",
      imgUrl: "https://puui.wetvinfo.com/tv/0/1244390203_1680580/0",
    },
  ];

  return (
    <Carousel
      loop
      width={width}
      height={width / 2}
      autoPlay={true}
      data={carouselPic}
      scrollAnimationDuration={3000}
      // onSnapToItem={(index) => console.log("current index:", index)}
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            justifyContent: "center",
          }}
        >
          <Text>{item.title}</Text>
          <Image
            source={{
              uri: item.imgUrl,
            }}
            style={{
              width: width,
              height: width,
              marginTop: 10,
              marginBottom: 10,
              resizeMode: "contain",
              backgroundColor: "black",
            }}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
