import { collection, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import Moment from "react-moment";
import { db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";

function Message({ user, message, chat, userImg }) {
  const { data: loggedIN } = useSession();

  console.log(message);
  return (
    <div>
      {user === loggedIN.user.email ? (
        <div className="messageElement ml-auto">
          <img src={userImg} alt="" className="h-7 rounded-full mr-2" />
          <div className="flex-col messageElement sender">
            <p className="">{message.message}</p>
            <Moment fromNow className="text-[10px] ml-auto">
              {message?.timestamp}
            </Moment>
          </div>
        </div>
      ) : (
        <div className="messageElement">
          <img src={userImg} alt="" className="h-7 rounded-full mr-2" />
          <div className="flex-col messageElement reciever">
            <p className="">{message.message}</p>
            <Moment fromNow className="text-[10px] ml-auto">
              {message?.timestamp}
            </Moment>
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
