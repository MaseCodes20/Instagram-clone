import { PencilAltIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import * as EmailValidator from "email-validator";
import { addDoc, collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import Chat from "./Chat";
import { useState } from "react";
import { modalState } from "../../atoms/modalAtom";
import { useRecoilState } from "recoil";

function Sidebar() {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useRecoilState(modalState);

  const userChatRef = query(
    collection(db, "chats"),
    where("users", "array-contains", session.user.email)
  );

  const [chatsSnapshot] = useCollection(userChatRef);

  return (
    <div className="flex-[0.45] flex-col min-w-[300px] max-w-[350px] min-h-[90vh] overflow-y-scroll scrollbar-hide bg-white rounded-l-md border-r border-gray-300 ">
      <div className="flex justify-center items-center w-[350px] min-h-[70px] border-b-[2px] border-gray-300 sticky top-0 z-1">
        <div className="flex-1">
          {/* User Thats logged in */}
          <h2 className="font-bold pl-3 text-center">
            {session.user?.username}
          </h2>
        </div>

        <div className="pr-5">
          <PencilAltIcon
            onClick={() => setShowModal((prev) => !prev)}
            className="h-8 hover:cursor-pointer hover:scale-110"
          />
        </div>
      </div>

      {/* Messages section */}
      <div className="py-2 font-bold bg-white">
        <div className="pl-5">
          <h1>Messages</h1>
        </div>

        <div className=" bg-white">
          {/* List of Chats */}
          {chatsSnapshot?.docs.map((chat) => (
            <Chat key={chat.id} id={chat.id} users={chat.data().users} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
