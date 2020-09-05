import React from 'react'
import { ThemeProvider } from './src/context/ThemeContext'

/** To provide the root with the ThemeContext */
export const wrapRootElement = ({ element }) => <ThemeProvider>{element}</ThemeProvider>