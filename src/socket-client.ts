import { Manager, Socket } from 'socket.io-client'

let socket: Socket

export const connectToServer = (token: string) => {
  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
    extraHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
  socket?.removeAllListeners()
  socket = manager.socket('/')
  addListeners()
}

const addListeners = () => {
  const serverStatusContent = document.querySelector('#server-status')!
  const serverStatusIcon = document.querySelector('#circle-status')!
  const messageForm = document.querySelector('#form')!
  const messageInput = document.querySelector<HTMLInputElement>('#msg')!

  socket.on('connect', () => {
    serverStatusContent.innerHTML = 'Online'
    serverStatusIcon.classList.add('circle-status-green')
    serverStatusIcon.classList.remove('circle-status-red')
  })

  socket.on('disconnect', () => {
    serverStatusContent.innerHTML = 'Offline'
    serverStatusIcon.classList.add('circle-status-red')
    serverStatusIcon.classList.remove('circle-status-green')
  })

  socket.on('clients-updated', (clients: string[]) => {
    const clientsList = document.querySelector('#clients')!
    let clientsListTemplate = ''

    clients.forEach((client) => {
      clientsListTemplate += `<li>${client}</li>`
    })
    clientsList.innerHTML = clientsListTemplate
  })

  socket.on(
    'message-from-server',
    (payload: { fullName: string; message: string }) => {
      const messagesList = document.querySelector('#messages')!
      messagesList.innerHTML += `<li><b>${payload.fullName}</b>: ${payload.message}</li>`
    }
  )

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault()

    if (messageInput.value.trim().length <= 0) return

    socket.emit('message-from-client', {
      id: socket.id,
      message: messageInput.value
    })

    messageInput.value = ''
  })
}
