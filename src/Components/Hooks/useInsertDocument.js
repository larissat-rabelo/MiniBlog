import { useState, useEffect, useReducer } from "react";
import { db } from "../../Firebase/config";
import { collection, addDoc, Timestamp} from "firebase/firestore/lite";

const initialState = {
    loading: null,
    error: null
}

const insertReducer = (state, action) => {
    switch(action.type) {
        case "LOADING": 
            return {loading: true, error: null}
        
        case "INSERT_DOC":
            return {loading: false, error: null}

        case "ERROR": 
            return {loading: false, error: action.payLoad}
        default:
            return state
    }
}

export const useInsertDocument = (docColletion) => {
    const [response, dispatch] = useReducer(insertReducer, initialState)

    const [cancelled, setCancelled] = useState(false)

    const checkBeforeDispatch = (action) => {
        if(!cancelled) {
            dispatch(action)
        }
    }

    const insertDocument = async (document) => {
        checkBeforeDispatch({
            type: "LOADING",
        })

        try {
            const newDocument = {...document, createAt: Timestamp.now()}

            const insertedDocument = await addDoc (
                collection(db, docColletion),
                newDocument
            )

            checkBeforeDispatch ({
                type: "INSERTED_DOC",
                payLoad: insertedDocument
            })
        } catch (error) {
            checkBeforeDispatch ({
                type: "ERROR",
                payLoad: error.message
            })
        }
    }

    // useEffect(() => {
    //     return () => setCancelled(true)
    // }, [])

    return {insertDocument, response}
}