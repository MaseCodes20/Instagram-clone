import getRecipientEmail from "../../utils/getRecipientEmail";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";

function Chat({ id, users }) {
  const { data: session } = useSession();
  const router = useRouter();
  const userRef = query(
    collection(db, "users"),
    where("email", "==", getRecipientEmail(users, session.user))
  );

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  const [recipientSnapshot] = useCollection(userRef);
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, session.user);

  return (
    <div
      onClick={enterChat}
      className="flex items-center cursor-pointer p-[15px] hover:bg-gray-100"
    >
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

      <p className="truncate break-words md:text-clip pr-5 mr-5">
        {recipient ? recipient?.username : recipientEmail}
      </p>
    </div>
  );
}

export default Chat;
