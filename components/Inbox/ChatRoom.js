import { async } from "@firebase/util";
import {
  EmojiHappyIcon,
  HeartIcon,
  InformationCircleIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";
import Message from "./Message";
import Moment from "react-moment";

function ChatRoom({ chat, messages }) {
  const {
    data: { user },
  } = useSession();
  const router = useRouter();
  const [input, setInput] = useState("");
  const endOfMessageRef = useRef(null);
  console.log(user);

  const chatRef = query(
    collection(db, "chats", router.query.id, "messages"),
    orderBy("timestamp", "asc")
  );

  const [messagesSnapshot] = useCollection(chatRef);

  const showMessage = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          chat={chat}
          key={message.id}
          user={message.data().user}
          userImg={message.data().photoURL}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const scrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    setDoc(
      doc(db, "users", user.uid),
      {
        lastseen: serverTimestamp(),
      },
      { merge: true }
    );

    addDoc(collection(db, "chats", router.query.id, "messages"), {
      timestamp: serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.image,
      username: user.username,
    });

    setInput("");
    scrollToBottom();
  };

  // Recipient Data
  const userRef = query(
    collection(db, "users"),
    where("email", "==", getRecipientEmail(chat.users, user))
  );

  const [recipientSnapshot] = useCollection(userRef);
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <div className="h-[90vh] w-full flex flex-col bg-white rounded-r-md">
      <div className="flex justify-between min-h-[70px] items-center px-5 bg-white border-b-[2px] border-gray-300 rounded-tr-md">
        {/* Perons You are Chatting with Image and Username */}
        <div className="flex items-center">
          {recipient ? (
            <img
              src={recipient?.photoURL}
              className="rounded-full h-12 w-12 object-contain border p-1 mr-3 "
              alt=""
            />
          ) : (
            <p className="rounded-full text-center font-bold text-2xl h-12 w-12 object-contain border p-1 mr-3 bg-blue-400">
              {recipientEmail?.[0]}
            </p>
          )}
          <div className="flex flex-col">
            <h2 className="font-bold pl-3">
              {recipient ? recipient?.username : recipientEmail}
            </h2>

            <div className="flex items-center content-center pl-3">
              {recipientSnapshot ? (
                <>
                  <p>Last active:</p>
                  <div className="ml-2">
                    <Moment fromNow className="pr-5 text-sm">
                      {recipient?.lastSeen?.toDate()}
                    </Moment>
                  </div>
                </>
              ) : (
                <>
                  <p>Last active:</p>
                  <div className="ml-2">"Unavailable"</div>
                </>
              )}
            </div>
          </div>
        </div>
        <InformationCircleIcon className="h-8" />
      </div>
      {/* Messages field */}
      <div className="flex-1 p-7 bg-white overflow-y-scroll scrollbar-hide">
        {showMessage()}
        <div ref={endOfMessageRef} className="mt-20" />
      </div>

      {/* Input */}
      <div className="min-h-[100px] sticky bottom-0 z-[10] bg-white rounded-br-md">
        <form className="flex items-center justify-center border-[1px] border-gray-400 rounded-3xl m-2 my-5 p-2 sticky bottom-0">
          <EmojiHappyIcon className="h-8" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message..."
            className="flex-1 bg-transparent placeholder-black focus:ring-0 shadow-none focus:shadow-none outline-none focus:outline-none border-none focus:border-none"
          />
          <button hidden disabled={!input} onClick={sendMessage}>
            send message
          </button>
          <PhotographIcon className="h-8" />
          <HeartIcon className="h-8" />
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;
