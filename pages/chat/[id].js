import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Header from "../../components/Header";
import ChatRoom from "../../components/Inbox/ChatRoom";
import InboxModal from "../../components/Inbox/InboxModal";
import Sidebar from "../../components/Inbox/Sidebar";
import { db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";

function Chat({ chat, messages, id }) {
  const { data: session } = useSession();

  if (!session) return <Header />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, session?.user)}</title>
      </Head>

      <Header />

      <div className="max-w-6xl min-h-[90vh] bg-white flex mx-auto my-4 border border-gray-300 rounded-md">
        <Sidebar />

        <div className="flex-1">
          <ChatRoom chat={chat} messages={messages} chat_id={id} />
        </div>
      </div>
      <InboxModal />
    </div>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const ref = collection(db, "chats", context.query.id, "messages");
  const q = query(ref, orderBy("timestamp", "asc"));
  const messagesSnapshot = await getDocs(q);
  const messages = messagesSnapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));
  const chatsRef = doc(db, "chats", context.query.id);
  const chatsSnap = await getDoc(chatsRef);
  const chat = {
    id: chatsSnap.id,
    ...chatsSnap.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
      id: context.query.id,
    },
  };
}
