import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAtomValue } from "jotai";
import { FC, useCallback } from "react";
import { auth } from "../firebase/app";
import { currentUserAtom } from "./firebase-app/CurrentUserListener";

interface Props {}

const googleAuthProvider = new GoogleAuthProvider();

const SigninWithGoogle: FC<Props> = () => {
  const currentUser = useAtomValue(currentUserAtom);

  const handleClickGoogleButton = useCallback(() => {
    signInWithPopup(auth, googleAuthProvider)
      .then(console.log)
      .catch((e) => console.log(JSON.stringify(e)));
  }, []);

  return (
    <div className="border rounded p-4 space-y-2">
      <h3>Sign in with google</h3>
      <button className="border p-2" onClick={handleClickGoogleButton}>
        G
      </button>
    </div>
  );
};

export default SigninWithGoogle;
