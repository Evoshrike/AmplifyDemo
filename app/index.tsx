import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import TabOneScreen from "./Screens/Screen One";
import TabTwoScreen from "./Screens/two";
import { RootStackParamList } from "@/config/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Amplify } from 'aws-amplify';
import { AuthUser, getCurrentUser }  from '@aws-amplify/auth';

import awsExports from '../src/aws-exports.js';
import { registerRootComponent } from "expo";
import { useEffect, useState } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

enableScreens();
Amplify.configure(awsExports);

const App = () => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    getCurrentUser()
      .then((user) => setUser(user))
      .catch(() => setUser(null));
  }, []);
  
  
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
  
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home" component={TabOneScreen} />
        ) : (
          <Stack.Screen name="Login" component={TabTwoScreen} />
        )}
       
      </Stack.Navigator>
    
  )};

  export default withAuthenticator(App);