import { FirebaseError } from "firebase/app";
import {
  AuthErrorCodes,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useAtomValue } from "jotai";
import { FC, useCallback } from "react";
import { currentUserAtom } from "./firebase-app/CurrentUserListener";

interface Props {}

const DeleteAccount: FC<Props> = () => {
  const currentUser = useAtomValue(currentUserAtom);

  const handleClickDeleteAccount = useCallback(() => {
    if (!currentUser) {
      return;
    }

    deleteUser(currentUser)
      .then(console.log)
      .catch((error: FirebaseError) => {
        if (error.code === AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN) {
          const password = prompt("enter password");

          if (!password || !currentUser.email) {
            return;
          }

          const credential = EmailAuthProvider.credential(
            currentUser.email,
            password
          );

          reauthenticateWithCredential(currentUser, credential).then(
            currentUser.delete
          );
        }
      });
  }, [currentUser]);

  return (
    <div className="border text-center p-1" onClick={handleClickDeleteAccount}>
      delete account
    </div>
  );
};

export default DeleteAccount;
