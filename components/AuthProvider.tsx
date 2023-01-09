import { User } from "firebase/auth";
import { atom, Provider, useAtom } from "jotai";
import { FC, PropsWithChildren, useEffect } from "react";

interface Props {}

const currentUserAtom = atom<User | null>(null);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  // useEffect(() => {
  //   authApp.onAuthStateChanged((user) => {
  //     setCurrentUser(user);
  //   });
  // }, [setCurrentUser]);

  return <div>{children}</div>;
};

export default AuthProvider;
