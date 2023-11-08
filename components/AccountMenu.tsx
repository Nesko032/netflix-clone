import { signOut } from "next-auth/react";
import React from "react";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <>
      <div className="absolute right-0 top-14 flex w-56 flex-col border-2 border-gray-800 bg-black py-5">
        <div className="flex flex-col gap-3">
          <div className="group/item flex w-full flex-row items-center gap-3 px-3">
            <img
              src="/images/default-red.png"
              alt=""
              className="w-8 rounded-md"
            />
            <p className="text-sm text-white group-hover/item:underline">
              Username
            </p>
          </div>
          <hr className="my-4 h-px border-0 bg-gray-600" />
          <div
            className="px-3 text-center text-sm  text-white hover:underline"
            onClick={() => signOut()}
          >
            Sign out of Netflix
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountMenu;
