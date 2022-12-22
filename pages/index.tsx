import { useAtomValue } from "jotai";
import DeleteAccount from "../components/DeleteAccount";
import { currentUserAtom } from "../components/firebase-app/CurrentUserListener";
import LinkApps from "../components/LinkApps";
import SetPassword from "../components/SetPassword";
import SigninWithEmailAndPassword from "../components/SigninWithEmailAndPassword";
import SigninWithFacebook from "../components/SigninWithFacebook";
import SigninWithGoogle from "../components/SigninWithGoogle";
import Signout from "../components/Signout";
import SignupWithEmailAndPassword from "../components/SignupWithEmailAndPassword";
import VerifyEmail from "../components/VerfiyEmail";

export default function Home() {
  const currentUser = useAtomValue(currentUserAtom);

  return (
    <div className="flex items-center justify-center mt-32">
      {!currentUser && (
        <div className="w-1/3 space-y-4">
          <SigninWithEmailAndPassword />
          <SignupWithEmailAndPassword />
          <SigninWithGoogle />
          <SigninWithFacebook />
        </div>
      )}

      {currentUser && (
        <div className="w-1/3 space-y-4">
          <Signout />
          <DeleteAccount />
          <SetPassword currentUser={currentUser} />
          <VerifyEmail currentUser={currentUser} />
          <LinkApps />
        </div>
      )}
    </div>
  );
}
