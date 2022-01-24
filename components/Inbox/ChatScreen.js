import { PaperAirplaneIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { inboxModalState } from "../../atoms/modalAtom";

function ChatScreen() {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useRecoilState(inboxModalState);

  return (
    <div className="min-h-[90vh] w-full flex-col items-center justify-center relative bg-white rounded-r-md">
      <div className="text-center top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 absolute">
        <div className="h-48 w-48 border-8 border-black mb-4 mx-auto rounded-full relative">
          <PaperAirplaneIcon className="h-40 rotate-45 mb-10 p-4 top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4  absolute" />
        </div>

        <h1 className="text-[20px] font-semibold">Your Messages</h1>
        <p>Send private photos and messages to a friend or group</p>
        <button
          onClick={() => setShowModal((prev) => !prev)}
          className="p-2 m-2 bg-[#458eff] text-white rounded-lg"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

export default ChatScreen;
