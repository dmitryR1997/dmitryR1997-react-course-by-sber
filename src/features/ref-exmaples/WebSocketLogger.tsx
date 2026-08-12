import { useEffect, useRef } from 'react'

const SOCKET_URL = ''

export const WebSocketLogger = () => {
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    socketRef.current = new WebSocket(SOCKET_URL)

    socketRef.current.addEventListener('message', (event: MessageEvent<string>) => {
      console.log(`Сообщение из сокета: ${event.data}`)
    })

    return () => {
      socketRef.current?.close()
    }
  }, [])

  return null
}
