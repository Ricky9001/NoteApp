import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

const NoteContext = createContext();
const NoteProvider = ({children}) => {
    const [notes, setNotes] = useState([]);

    const findNotes = async () => {
        const result = await AsyncStorage.getItem('notes');
        console.log(result);
        if (result !== null) setNotes(JSON.parse(result));
    }

    useEffect(() => {
        findNotes();
    }, [])

    return (
        <NoteContext.Provider value={{notes, setNotes, findNotes}}>
            {children}
        </NoteContext.Provider>
    )
}

const styles = StyleSheet.create({
    container:{}
})

export const useNotes = () => useContext(NoteContext)

export default NoteProvider;
