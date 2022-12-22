import { User } from "firebase/auth";
import { atom, useAtom } from "jotai";
import { FC, useCallback, useEffect } from "react";
import { auth } from "../../firebase/app";

export const currentUserAtom = atom<User | null>(null);

const CurrentUserListener: FC = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  const listenCurrentUser = useCallback(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, [setCurrentUser]);

  useEffect(() => {
    listenCurrentUser();
  }, [listenCurrentUser]);

  return null;
};

export default CurrentUserListener;
