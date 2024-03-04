import React from "react";
import { Button } from "src/components/button";
import { useMe } from "src/hooks/useMe";

export const EditProfile = () => {
  const { data: userData } = useMe();
  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5">
        <input className="input" type="email" placeholder="Email" />
        <input className="input" type="password" placeholder="Password" />
        <Button loading={false} canClick actionText="Save Profile" />
      </form>
    </div>
  );
};
