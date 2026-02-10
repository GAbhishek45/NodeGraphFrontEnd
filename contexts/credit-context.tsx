'use client';

import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';




const CreaditContext = createContext<AuthContextType | undefined>(undefined);
export function CreaditContextProvider({ children }: { children: React.ReactNode }) {
    //   const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [credits, setCredits] = useState(0)

    //   Load user from localStorage on mount
    useEffect(() => {
        // const storedUser = localStorage.getItem('user');
        // if (storedUser) {
        //   try {
        //     setUser(JSON.parse(storedUser));
        //   } catch (error) {
        //     console.error('Failed to parse stored user:', error);
        //     localStorage.removeItem('user');
        //   }
        // }
        // setIsLoading(false);
        const refectchUser = async () => {
            setIsLoading(true);

            let res = await axios.get('/api/auth/refetch');

            console.log("Response", res);
            // setUser(res);
            setCredits(res.data.credits);
        }

        refectchUser();

    }, []);




    return (
        <CreaditContext.Provider value={{ credits }}>
            {children}
        </CreaditContext.Provider>
    );
}
