import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WeatherScreen } from "../../../screens";

const ApplicationStack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <ApplicationStack.Navigator initialRouteName={'WeatherScreen'}>
            <ApplicationStack.Screen options={{headerShown:false}} name="WeatherScreen" component={WeatherScreen} />
        </ApplicationStack.Navigator>
    );
}

export {
    AppStack
}

