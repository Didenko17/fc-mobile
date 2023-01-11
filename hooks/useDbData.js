import { onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../firebaseConfig';
export const useDbData = (collectionName, order, userId, queryArr = null) => {
    const [data, setData] = useState([]);
    const q = queryArr
        ? query(collection(db, collectionName), orderBy(order[0], order[1]), where(queryArr[0], queryArr[1], queryArr[2]),  where('userId', '==', userId))
        : query(collection(db, collectionName), orderBy(order[0], order[1]), where('userId', '==', userId));
    useEffect(() => {
        onSnapshot(q, snapshot => {
            setData(snapshot.docs.map(doc => (
                {
                    ...doc.data(),
                    id: doc.id,
                }
            )))
        })
    }, [])
    return data
}