import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

export const AddButton = ({onPress}) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                onPress()
            }}
        >
            <View>
                <AntDesign name="pluscircle" size={48} color="#cacaca" />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 24,
        left: '50%',
        transform: [
            { translateX : -24 },
        ],
    }
})