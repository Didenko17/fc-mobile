import { query, collection, where, orderBy, onSnapshot } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { UserContext } from '../App'
import { db } from '../firebaseConfig'
import { useDbData } from '../hooks/useDbData'
import { Expense } from './Expense'
import {MaterialCommunityIcons} from '@expo/vector-icons'

export const Savings = () => {
    const { user } = useContext(UserContext)
    const today = new Date()
    const lastDayInMonth = (new Date(today.getFullYear(), today.getMonth() + 1, 0)).getDate();
    const incomes = useDbData('incomes', ['date', 'desc'], user.uid, ['date', '>=', new Date(today.getFullYear(), today.getMonth(), 1)])
    const [incomesSum, setIncomesSum] = useState(0)
    const [expensesSum, setExpensesSum] = useState(0)
    const [expenses, setExpenses] = useState([]);
    const [mostValExpenses, setMostValExpenses] = useState([]);
    
    const fetchDbData = (collectionName) => {
        const q = query(collection(db, collectionName), where('userId', '==', user.uid), orderBy('date'), where('date', '>=', new Date(today.getFullYear(), today.getMonth(), 1)))
        onSnapshot(q, snapshot => {
            setExpenses(snapshot.docs.map(doc => (
                {
                    ...doc.data(),
                    id: doc.id,
                }
            )))
        })
    }
    useEffect(() => {
        fetchDbData('expenses')
    }, [])
    useEffect(() => {
        if (incomes.length) {
            let sum = 0
            incomes.forEach((item) => {
                sum += (+item.price)
            })
            setIncomesSum(sum)
        }
    }, [incomes])
    useEffect(() => {
        if (expenses.length) {
            const temp = [...expenses].sort((a, b) => b.price - a.price)
            setMostValExpenses([...temp].slice(0,5))
            setTimeout(() => {
                let sum = 0
                expenses.forEach((item) => {
                    sum += (+item.price)
                })
                setExpensesSum(sum)
            })
        }
    }, [expenses])
    return (
        <View 
            style={styles.content}
        >
            <View style={styles.statistics}>
                <View style={styles.plate}>
                    <MaterialCommunityIcons name='cash-plus' size={36} color='#aaa' />
                    <Text style={styles.countItemValue}>{incomesSum}</Text>
                </View>
                <View style={styles.plate}>
                    <MaterialCommunityIcons name='cash-minus' size={36} color='#aaa' />
                    <Text style={styles.countItemValue}>{expensesSum}</Text>
                </View>
                <View style={styles.plate}>
                    <MaterialCommunityIcons name='piggy-bank' size={36} color='#aaa' />
                    <Text style={styles.countItemValue}>{incomesSum - expensesSum}</Text>    
                </View>
                <View style={styles.plate}>
                    <Text style={styles.countItemText}>Доступно в сутки:</Text>
                    <Text style={styles.countItemValue}>{Math.round((incomesSum - expensesSum)/(lastDayInMonth - today.getDate() + 1))}</Text>    
                </View>
            </View>
            <View style={styles.expenses}>
                <Text style={{color: '#aaa', margin: 10, marginTop: 17}}>Самые большие покупки</Text>
                {mostValExpenses.map((item) => (
                    <Expense key={item.id} expense={item} />
                ))}
            </View>
        </View>
    )
} 

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#464752',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
    },
    statistics: {
        height: '45%',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    expenses: {
        width: '100%',
    },
    count: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cacaca',
        width: '100%',
        height: 80,
    },
    countItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    countItemText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
    },
    countItemValue: {
        fontSize: 24,
        color: '#fff',
    },
    plate: {
        width: '50%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        paddingVertical: 20,
        borderRightWidth: 1,
        borderColor: '#aaa',
    }
})