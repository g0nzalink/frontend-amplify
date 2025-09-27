import React, { createContext, useContext } from 'react'
import * as api from '../services/api'

const ApiContext = createContext(api)

export const ApiProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}

export const useApi = () => useContext(ApiContext)