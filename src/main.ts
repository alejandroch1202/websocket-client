import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>

    <h1>Websocket - Client</h1>

    <div class="status-container">
      <div id="circle-status" class="circle-status-red"></div>
      <p id="server-status">Offline</p>
    </div>

    <div>
      <input id="jwt" placeholder="json web token" />
      <button id="connect">Connect</button>
    </div>

    <ul id="clients"></ul>
    
    <form id="form">
      <input id="msg" placeholder="Message" />
      <button id="send">Send</button>
    </form>

    <div>
    <h3>Messages</h3>
    <ul id="messages"></ul>
    </div>

  </div>
`

// connectToServer()

const jwtInput = document.querySelector<HTMLInputElement>('#jwt')!
const jwtButton = document.querySelector<HTMLButtonElement>('#connect')!

jwtButton.addEventListener('click', () => {
  if (jwtInput.value.trim() === '') return alert('Enter a valid jwt')

  connectToServer(jwtInput.value)
})
