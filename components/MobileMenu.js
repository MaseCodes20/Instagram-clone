import { Menu } from "@headlessui/react";
import {
  HeartIcon,
  HomeIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";

function MobileMenu() {
  const router = useRouter();

  return (
    <div>
      <Menu as="div" className="md:hidden">
        <Menu.Button className="md:hidden flex justify-center items-center content-center">
          <MenuIcon className="h-6 cursor-pointer md:hidden" />
        </Menu.Button>
        <Menu.Items className="origin-top-right absolute right-0 mr-2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className=" rounded-md">
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`flex items-center cursor-pointer px-4 py-2 text-sm ${
                    active && "bg-blue-500 text-white scale-105 rounded-md"
                  }`}
                  onClick={() => router.push("/")}
                >
                  <HomeIcon
                    className={`${active && "text-white"} h-7 menuItem`}
                  />
                  Home
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`flex items-center cursor-pointer px-4 py-2 text-sm ${
                    active && "bg-blue-500 text-white scale-105 rounded-md"
                  }`}
                  onClick={() => router.push("/inbox")}
                >
                  <PaperAirplaneIcon
                    className={`${
                      active && "text-white"
                    } h-7 menuItem rotate-45`}
                  />
                  Inbox
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`flex items-center cursor-pointer px-4 py-2 text-sm ${
                    active && "bg-blue-500 text-white scale-105 rounded-md"
                  }`}
                  onClick={() => router.push("")}
                >
                  <PlusCircleIcon
                    className={`${active && "text-white"} h-7 menuItem`}
                  />
                  <p> Upload </p>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`flex items-center cursor-pointer px-4 py-2 text-sm ${
                    active && "bg-blue-500 text-white scale-105 rounded-md"
                  }`}
                  onClick={() => router.push("")}
                >
                  <UserGroupIcon
                    className={`${active && "text-white"} h-7 menuItem`}
                  />
                  Login
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`flex items-center cursor-pointer px-4 py-2 text-sm ${
                    active && "bg-blue-500 text-white scale-105 rounded-md"
                  }`}
                  onClick={() => router.push("")}
                >
                  <HeartIcon
                    className={`${active && "text-white"} h-7 menuItem`}
                  />
                  Likes
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default MobileMenu;
