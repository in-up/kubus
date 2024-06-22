// theme.ts
import { extendTheme } from '@chakra-ui/react'
import { buttonTheme } from './components/Button'

const theme = extendTheme({
  components: {
    // Button: buttonTheme,
  },
})

export default theme
