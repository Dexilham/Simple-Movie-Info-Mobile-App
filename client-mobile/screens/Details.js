import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DetailsInfo from "./DetailsInfo";
import DetailsMore from "./DetailsMore";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function Details({ navigation, route }) {
  // const { itemId, data } = route.params;
  const { itemId, data } = route.params;
  // const { movieId } = route.params;
  console.log(route, "<<< dari details");
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Details Info") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Play Media") {
            iconName = focused ? "play-circle" : "play-circle-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
        tabBarActiveBackgroundColor: "black",
        tabBarInactiveBackgroundColor: "black",
        headerMode: "screen",
        headerTintColor: "green",
        headerStyle: { backgroundColor: "black" },
      })}
    >
      <Tab.Screen
        name="Details Info"
        component={DetailsInfo}
        initialParams={{ itemId: itemId, data: data }}
      />
      <Tab.Screen
        name="Play Media"
        component={DetailsMore}
        initialParams={{ itemId: itemId, data: data }}
      />
    </Tab.Navigator>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // padding: 20,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

/*
<SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>Details Page</Text>
        <Text>Enjoy</Text>
        <Image
          source={{
            uri: "https://blog.kakaocdn.net/dn/btynJ6/btrPVElH9Lt/jLvyZqzXWEPkw6lUc2MPUk/img.gif",
          }}
          style={{ width: 400, height: 200, marginTop: 10, marginBottom: 10 }}
        />
        <Button title={"Tombol"} onPress={() => console.log("kepencet")} />
        <Button
          title={"Detail Lagi"}
          onPress={() => navigation.push("Details")}
        />
        <Button title={"Back"} onPress={() => navigation.goBack()} />
        <Button title={"Back to Home"} onPress={() => navigation.popToTop()} />
      </SafeAreaView>
    </SafeAreaProvider>
*/
