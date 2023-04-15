import { Html, Head, Main, NextScript } from 'next/document'
import { BodyInterfaceWrapper } from 'src/lib/Wrappers'

export default function Document() {
  return (
    <Html>
      <Head />
      <BodyInterfaceWrapper>
        <Main />
        <NextScript />
      </BodyInterfaceWrapper>
    </Html>
  )
}