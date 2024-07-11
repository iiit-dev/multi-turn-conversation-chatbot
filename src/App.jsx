import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react'
import Chatbot from '../Components/Chatbot';
const customTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid black',
            borderRadius: '999999px 0 0 999999px',
            borderRight: '0px dashed green'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: '1px solid black',
            borderRight: '0px dashed green',
            borderRadius: '999999px 0 0 999999px',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '1px solid black',
            borderRight: '0px dashed green',
            borderRadius: '999999px 0 0 999999px',
          },
        },
      },
    },
  },
});
const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <Chatbot />
    </ThemeProvider>
  )
}

export default App