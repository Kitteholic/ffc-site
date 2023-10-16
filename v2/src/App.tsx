import type { Component } from 'solid-js';

import { For, Show, createSignal } from 'solid-js'
import { createMutable } from 'solid-js/store'
import './styles.css'

type Message = {
  content: string,
  author: "Rozebur" | "Cozy_Cat" | "SoulSella" | "Kitari",
  server: boolean,
  connected: boolean
}

type Blog = {
  content: string,
  date: string
}

const store = createMutable({
  showMessages: false,
  messagesRead: false,
  sendAttempt: false,
  showHistory: false,
  messages: {
    messageList1: [
      {
        author: "Cozy_Cat",
        content: "null",
        connected: true,
        server: true
      },
      {
        author: "Rozebur",
        content: "welcome back CC. it's been a bit since you've messaged here.",
        connected: true,
        server: false
      },
      {
        author: "Cozy_Cat",
        content: "oh hey roze, i was thinking about the question you posed last time i was online. it was quite interesting.",
        connected: true,
        server: false
      },
      {
        author: "Rozebur",
        content: "and what question might that be? if you don't mind reminding me of course.",
        connected: true,
        server: false
      },
      {
        author: "Cozy_Cat",
        content: "i'm talking about the one you mentioned about a week back. you know, the one with the ethical ramifications.",
        connected: true,
        server: false
      },
      {
        author: "Rozebur",
        content: "cmon, you can't expect me to remember everything i've said throughout the week. -_-",
        connected: true,
        server: false
      },
      {
        author: "Cozy_Cat",
        content: "i'll PM you about it later, alright? i've got a couple things to wrap up for the day first, but i'll be back.",
        connected: true,
        server: false
      },
      {
        author: "Rozebur",
        content: "i'm sorry man, i won't be able to talk later. i'm going to the meetup, remember?",
        connected: true,
        server: false
      },
      {
        author: "SoulSella",
        content: "null",
        connected: true,
        server: true
      },
      {
        author: "SoulSella",
        content: "Hey guys!",
        connected: true,
        server: false
      },
      {
        author: "Rozebur",
        content: "null",
        connected: false,
        server: true
      },
      {
        author: "SoulSella",
        content: "...Seriously?",
        connected: true,
        server: false
      },
      {
        author: "Cozy_Cat",
        content: "you know he hates you, right?",
        connected: true,
        server: false
      }
    ] as Message[]
  },
  history: {
    messageList1: [
      {
        author: "Kitari",
        content: "null",
        connected: true,
        server: true
      },
    ]as Message[]
  },
  blogs: [
    {
      content: "ummmm... hi? i don't really know how this blog thing works, but i guess i'll just post whatever i feel like on here",
      date: "21/04/XX"
    },
    {
      content: "hello again... this site is kinda confusing, can someone in the chatroom help me out? i'm trying to figure out how to visit other blogs",
      date: "23/04/XX"
    },
    {
      content: "how do i log into the chatroom?",
      date: "23/04/XX"
    },
    {
      content: "it's not working for me",
      date: "23/04/XX"
    },
    {
      content: "wait there's a code?? i had no idea i needed one to use the chatroom",
      date: "23/04/XX"
    },
    {
      content: "thanks!! and sorry for the trouble",
      date: "23/04/XX"
    },
    {
      content: "when are they adding an option to delete blogs omg",
      date: "24/04/XX"
    },

  ] as Blog[]
})

const action = {
  sHHistory() {
    if (store.showHistory) {
      store.showHistory = false
    } else if (store.showMessages) {
      store.showMessages = false
      store.showHistory = true
    } else {
      store.showHistory = true
    }
    
    
  },
  sHMessages() {
    if (store.showMessages) {
      store.showMessages = false
    } else if (store.showHistory) {
      store.showHistory = false
      store.showMessages = true
    } else {
      store.showMessages = true
    }
  }
}

const App: Component = () => {
  const time = new Date()
  return (
    <>
      <div class="screensaver">
        <p class="connection">You are currently connected to Extended Area Network 34B "Cat Communications" on July 30, 20XX.</p>
        <div style="display: grid; justify-content: center; padding: 10vh 2vw">
          <div style="place-self: start; text-align: center; height: 158px; width: 158px;" class="box">
            <div style="padding-top: 15px;">
              fearful<br /><br />cats<br /><br />live<br /><br />here
            </div>
          </div>
        </div>
        <div class="welcome">
          WELCOME.
        </div>
        <div class='box' style="margin: 4vh 0">
          My Personal Blog:

          <div class="blogs">
            <For
              each={store.blogs}
              children={(blog, i) => <p><span style="color: white">[BLOG {i() + 1}, {blog.date}]:</span> {blog.content}</p>}
            />
          </div>
        </div>
        <div style="display: inline;">
          <div style="display: flex">
            <div class="view" onClick={() => action.sHMessages()} >{store.showMessages ? "Hide" : "View"} Messages</div>
            <div class="view" onClick={() => action.sHHistory()} >{store.showHistory ? "Hide" : "View"} History</div>
          </div>
          <Show
            when={store.showMessages || store.showHistory}
            children={<Console />}
          />
          
        </div>
      </div>
    </>
  );
};

function Console() {
  if (store.showHistory) {
    return (
      <div>


        <div class="console" style=" padding-top: 5vh; padding-bottom: 1vh">
          <For
            each={store.history.messageList1}
            children={(message) => <MessageDecoder message={message} />}
          />
        </div>
      </div>
    )
  } else {
    return (
      <div>


        <div class="console" style=" padding-top: 5vh; padding-bottom: 1vh">
          <Show
            when={!store.messagesRead}
            children={
              <h1 class="newMessages">You have <i>{store.messages.messageList1.length}</i> unread messages!</h1>
            }
          />

          <For
            each={store.messages.messageList1}
            children={(message) => <MessageDecoder message={message} />}
          />

        </div>
        <div style={"display: flex"}>
          <Show
            when={!store.messagesRead}
            children={
              <div class="view" onClick={() => store.messagesRead = true}>Mark as Read</div>
            }
          />

          <div class="arrow">{">"}</div>
          <Show
            when={!store.sendAttempt}
            children={
              <input class="consoleInput" />
            }
            fallback={
              <input disabled placeholder='ERROR 23: AUTHORIZATION EXPIRED' class="consoleInput" />
            }
          />

          <div class="view" onClick={() => store.sendAttempt = true}>Send</div>
        </div>

      </div>

    )
  }
}

const MessageDecoder = (props: { message: Message }) => {
  const message = props.message
  if (message.server) {
    if (message.connected) {
      return (<p class="speakerServer"> + User [{message.author}] has connected!</p>)
    } else {
      return (<p class="speakerServer"> - User [{message.author}] has disconnected!</p>)
    }
  } else {
    switch (message.author) {
      case 'Cozy_Cat':
        return (<p class="speakerBlue" textContent={"> " + message.content} />)
      case 'Rozebur':
        return (<p class="speakerRed" textContent={"> " + message.content} />)
      case 'SoulSella':
        return (<p class="speakerYellow" textContent={"> " + message.content} />)
      case 'Kitari':
        return (<p class="speakerLime" textContent={"> " + message.content} />)
      default:
        return (<p textContent={"error"} />)
    }
  }
}


export default App;
