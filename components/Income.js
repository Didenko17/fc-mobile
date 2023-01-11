import { StyleSheet, View, Text } from "react-native"

export const Income = ({income}) => {
    const formatDate = (str) => {
        const temp = str.split('/')
        return [temp[1],temp[0], temp[2]].join('.')
    }
    return (
        <View style={styles.incomeItem}>
            <View>
                <Text style={styles.nameText}>{income.name}</Text>      
                <Text style={styles.dateText}>{formatDate(income.date.toDate().toLocaleDateString())}</Text>           
            </View>
            <View>
                <Text style={styles.priceText}>+ {income.price}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    incomeItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#aaa',
        height: 60,
        width: '100%',
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nameText: {
        fontSize: 20,
        color:'#fff',
    },
    dateText: {
        fontSize: 10,
        color:'#fff',
    },
    priceText: {
        fontSize: 24,
        color:'#fff',
    }
})