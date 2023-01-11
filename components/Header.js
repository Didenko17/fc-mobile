import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

export const Header = ({username, onLogout}) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Hi, {username}</Text>
            <TouchableOpacity onPress={() => onLogout()} style={styles.button}>
                <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
      borderBottomWidth: 1,
      width: '100%',
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      borderBottomColor: '#161658',
      marginTop: '15%',
    },
    button: {
        width: 70,
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    buttonText: {
        color: '#2272f2',
    },
    headerText: {
        fontSize: 24,
    }
});