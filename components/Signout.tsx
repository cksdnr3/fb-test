import { signOut } from "firebase/auth";
import { FC, useCallback } from "react";
import { auth } from "../firebase/app";

interface Props {}

const Signout: FC<Props> = () => {
  const handleClickSignout = useCallback(() => {
    signOut(auth);
  }, []);

  return (
    <div className="border text-center p-1" onClick={handleClickSignout}>
      sign out
    </div>
  );
};

export default Signout;
