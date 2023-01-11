import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import { addDoc, collection } from "firebase/firestore"
import { useContext, useState } from "react"
import { View, TextInput, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from "react-native"
import { db } from "../firebaseConfig"
import { useDbData } from "../hooks/useDbData"
import { AddButton } from "./AddButton"
import { Expense } from "./Expense"
import { Fontisto } from '@expo/vector-icons'; 
import { UserContext } from "../App"

export const Expenses = ({ navigation }) => {
    const { user } = useContext(UserContext)
    const expenses = useDbData('expenses', ['date', 'desc'], user.uid)
    const [modalVisible, setModalVisible] = useState(false)
    const [date, setDate] = useState(new Date())
    const [category, setCategory] = useState('')
    const [isDateSelected, setIsDateSelected] = useState(false)
    const [expenseName, setExpenseName] = useState('')
    const [price, setPrice] = useState()

    const formatDate = (str) => {
        const temp = str.split('/')
        return [temp[1],temp[0], temp[2]].join('.')
    }

    const onDateChange = (event, selectedDate) => {
        setDate(selectedDate);
        setIsDateSelected(true)
    };
    

    const showDatepicker = (mode) => {
        DateTimePickerAndroid.open({
          value: date,
          onChange: onDateChange,
          mode: 'date',
          is24Hour: true,
        });
    };

    const openModal = () => {
        setModalVisible(true)
    }

    const addRow = async () => {
        const response = await addDoc(collection(db, "expenses"), {
            name: expenseName,
            price: +price,
            date,
            category,
            userId: user.uid,
        });
        setExpenseName('');
        setCategory('')
        setPrice(null)
        setModalVisible(false)
    }
    return (
        <>
            <SafeAreaView style={styles.container}>
                {!modalVisible ? (
                    <>
                        <ScrollView style={styles.scrollView}>
                        {
                            expenses?.map((item) => (
                                <Expense key={item.id} expense={item}/>
                            ))
                        }
                        </ScrollView>
                        <AddButton onPress={openModal}/> 
                    </>   
                ) : (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View style={styles.modal}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setExpenseName}
                            value={expenseName}
                            placeholder="Название"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setCategory}
                            value={category}
                            placeholder="Категория"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setPrice}
                            value={price}
                            keyboardType="numeric"
                            placeholder="Сумма"
                        />
                        <Pressable style={{...styles.input, ...styles.date}} onPress={showDatepicker}>
                            <Fontisto name="date" size={26} color="#999" />
                        </Pressable>
                        {
                            isDateSelected ? (
                                <View style={styles.selectedDate}>
                                    <Text style={{color: '#cacaca'}}>{formatDate(date.toLocaleDateString())}</Text>
                                </View>
                            ) : ''
                        }
                        <Pressable
                            style={styles.add}
                            onPress={addRow}
                            disabled={!isDateSelected || !price || !expenseName || !category}>
                            <Text style={{fontSize: 18, color: '#777'}}>Добавить</Text>
                        </Pressable>
                        </View>
                    </View>
                )}
        </SafeAreaView>
        </>
    )
} 

const styles = StyleSheet.create({
    content: {
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
    },
    scrollView: {
        backgroundColor: '#464752',
    },
    modalWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        // backgroundColor: '#464752',
        padding: 20,
    },
    input: {
        backgroundColor: '#cacaca',
        padding: 6,
        width: 300,
        borderRadius: 6,
        marginTop: 20,
    },
    date: {
        padding: 5,
        width: '100%',
        alignItems: 'center',
    },
    selectedDate: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    add: {
        padding: 6,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#cacaca',
        borderRadius: 6,
    }
})