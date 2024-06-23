// theme.ts
import { extendTheme, ThemeConfig } from '@chakra-ui/react'

// 기본 배경색을 변경하는 글로벌 스타일 설정
const styles = {
  global: {
    'html, body': {
      // backgroundColor: 'gray.50'
    },
  },
}

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  styles,
  components: {
    // Button: buttonTheme,
  },
})

export default theme
