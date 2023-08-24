'use client';

import { useState, useEffect, createContext } from 'react';
import Database from 'tauri-plugin-sql-api';
import { Snippet } from '../types';

const SnippetsContext = createContext(null);

const SnippetsContextProvider = ({ children }) => {
    const [databaseInstance, setDatabaseInstance] = useState(null);
    const [snippets, setSnippets] = useState<Array<Snippet>>([]);
    const [oldSnippets, setOldSnippets] = useState<Array<Snippet>>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const openDatabase = async (): Promise<void> => {
            const db = await Database.load('sqlite:test.db');
            try {
                db.execute('CREATE TABLE IF NOT EXISTS snippets (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)');
            } catch (error) {
                console.log(error);
            }
            setDatabaseInstance(db);
        }
        openDatabase();
    }, []);

    return (
        <SnippetsContext.Provider value={{ db: databaseInstance, snippets, setSnippets, oldSnippets, searchTerm, setOldSnippets, setSearchTerm }}>
            {children}
        </SnippetsContext.Provider>
    );
};

export { SnippetsContext, SnippetsContextProvider };
