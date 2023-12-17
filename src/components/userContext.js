import React, { createContext, useState, useEffect,useContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('');


useEffect(() => {
  try {
    const storedValue = localStorage.getItem('therapistId');
    if (storedValue) {
      setUserId(JSON.parse(storedValue));
    }
  } catch (error) {
    console.error('Error retrieving userId:', error);
  }
},[]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
export{UserProvider,UserContext};




export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};