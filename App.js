import { StyleSheet, Text, View, Button } from 'react-native';
import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithCredential,  signOut } from 'firebase/auth';
import { auth, clientId } from './firebaseConfig';
import { useAuthRequest } from 'expo-auth-session/build/providers/Google';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUpScreen } from './components/SignUpScreen';
import { HomeTabs } from './components/HomeTabs';

const Stack = createNativeStackNavigator();

export const UserContext = createContext(null);

export default function App() {
  const [user, setUser] = useState(auth.currentUser)
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: "id_token",
      clientId: clientId,
    },
  );
  const logout = async () => {
    await signOut(auth).then(() => {
        setUser(null)
      }).catch((error) => {
        console.log(error)
      });
  }
  useEffect(() => {
    if (user === null) {
        (async() => {
        if (response?.type === 'success') {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        await signInWithCredential(auth, credential);
        setUser(auth.currentUser)
        }
        })()
    }
  }, [response]);
  return (
    <UserContext.Provider
      value={{
        user,
        login: promptAsync,
        logout,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUp">
            {user ? (
              <Stack.Screen name="Home" component={HomeTabs} options={{headerShown: false}}/>
            ) : (
              <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            )
            }
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
    // return (
    //   <View style={styles.container}>
    //     <Text>I love Angelina!</Text>
    //     <Button
    //       title="Login"
    //       onPress={() => {
    //         promptAsync();
    //       }}
    //     />
    //   </View>
    // )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
