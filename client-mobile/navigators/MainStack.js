import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import Home from "../screens/Home";
import Details from "../screens/Details";

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "green",
        headerStyle: { backgroundColor: "black" },
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ title: "IVETV" }} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
