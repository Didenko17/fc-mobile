import { useContext, useState } from "react"
import { View, StyleSheet, Text, TextInput, Modal, Pressable, SafeAreaView, ScrollView } from "react-native"
import { DateTimePickerAndroid} from '@react-native-community/datetimepicker'
import { useDbData } from "../hooks/useDbData"
import { AddButton } from "./AddButton"
import { Income } from "./Income"
import { Fontisto } from '@expo/vector-icons'; 
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { UserContext } from "../App"

export const Incomes = ({ navigation }) => {
    const { user } = useContext(UserContext)
    const incomes = useDbData('incomes', ['date', 'desc'], user.uid)
    const [modalVisible, setModalVisible] = useState(false)
    const [date, setDate] = useState(new Date())
    const [isDateSelected, setIsDateSelected] = useState(false)
    const [incomeName, setIncomeName] = useState('')
    const [price, setPrice] = useState()

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
        const response = await addDoc(collection(db, "incomes"), {
            name: incomeName,
            price: +price,
            date,
            userId: user.uid,
        });
        setModalVisible(false)
        setIncomeName('');
        setPrice(null)
    }
    const formatDate = (str) => {
        const temp = str.split('/')
        return [temp[1],temp[0], temp[2]].join('.')
    }
    return (
        <>
            <SafeAreaView style={styles.container}>
                {!modalVisible ? (
                    <>
                        <ScrollView style={styles.scrollView}>
                            {
                                incomes?.map((item) => (
                                    <Income key={item.id} income={item}/>
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
                            onChangeText={setIncomeName}
                            value={incomeName}
                            placeholder="Название"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setPrice}
                            value={price}
                            keyboardType="numeric"
                            placeholder="Сумма"
                        />
                        <Pressable style={{...styles.input, ...styles.date}} onPress={showDatepicker} title="Show date picker!">
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
                            disabled={!isDateSelected || !price || !incomeName}>
                            <Text style={{fontSize: 18, color: '#777'}}>Добавить</Text>
                        </Pressable>
                        </View>
                    </View>
                )}
                {/* </Modal> */}
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
        height: '100%',
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