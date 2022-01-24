import Sidebar from "../components/Inbox/Sidebar";
import Header from "../components/Header";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import ChatScreen from "../components/Inbox/ChatScreen";
import InboxModal from "../components/Inbox/InboxModal";

function Inbox() {
  const { data: session } = useSession();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (session) {
      setDoc(
        doc(db, "users", session.user.uid),
        {
          email: session.user.email,
          lastSeen: serverTimestamp(),
          photoURL: session.user.image,
          username: session.user.username,
        },
        { merge: true }
      );
    }
  }, [session][db]);

  useEffect(() => {
    onSnapshot(collection(db, "chats"), (snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          lastSeen: serverTimestamp(),
          photoUrl: doc.image,
        }))
      );
    });
  }, []);

  if (!session) return <Header />;

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Header />

      <div className="max-w-6xl min-h-[90vh] bg-white flex mx-auto my-4 border border-gray-300 rounded-md">
        <div>
          <Sidebar chats={chats} id={chats.id} />
        </div>

        <div className="flex-1">
          {/* Chat Screen */}
          <ChatScreen />
        </div>
      </div>
      <InboxModal />
    </div>
  );
}

export default Inbox;
