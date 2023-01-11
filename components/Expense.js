import { StyleSheet, View, Text } from "react-native"

export const Expense = ({expense}) => {
    const formatDate = (str) => {
        const temp = str.split('/')
        return [temp[1],temp[0], temp[2]].join('.')
    }
    return (
        <View style={styles.expenseItem}>
            <View>
                <Text style={styles.nameText}>{expense.name}</Text>      
                <Text style={styles.dateText}>{expense.category}: {formatDate(expense.date.toDate().toLocaleDateString())}</Text>           
            </View>
            <View>
                <Text style={styles.priceText}>- {expense.price}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    expenseItem: {
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