import { useState, useEffect } from "react";
import {db} from '../../Firebase/config'
import {doc, getDoc} from "firebase/firestore/lite";

export const useFetchDocument = (docCollection) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
        async function loadDocument() {
            if(cancelled) return

            setLoading(true)

            try {
                const docRef = await doc (db, docCollection)
                const docSnap = await getDoc(docRef)

                setDocument(docSnap.data())
                setLoading(false)
            } catch(error) {
                console.log(error)
                setError(error.message)
                
                setLoading(true)
            }
        }
        loadDocument()
    }, [docCollection, cancelled])

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {document, loading, error}
}