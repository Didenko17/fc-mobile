import { View, Button, StyleSheet, Text } from "react-native";
import { UserContext } from "../App";
import FontAwesome from '@expo/vector-icons/FontAwesome'


export const SignUpScreen = ({promptAsync}) => {
    return(
        <UserContext.Consumer>
            {({login}) => ( 
            <View style={styles.container}>
                <View style={styles.greeting}>
                    <Text>Добро пожаловать!</Text>
                    <Text>Войдите для использования приложения.</Text>
                </View>
                <FontAwesome.Button name="google" backgroundColor="#2272f2" style={{fontFamily: "Roboto"}} onPress={async () => await login()}>
                    Войти с помощью Google
                </FontAwesome.Button>
            </View>
            )}
        </UserContext.Consumer>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    greeting: {
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 20,
    }
});