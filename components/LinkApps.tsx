import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  linkWithPopup,
  unlink,
} from "firebase/auth";
import { useAtom } from "jotai";
import { FC, useCallback } from "react";
import { currentUserAtom } from "./firebase-app/CurrentUserListener";

interface Props {}

const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();

const OAuthCandidate = ["google.com", "facebook.com"];

const LinkApps: FC<Props> = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  const handleClickLinkWith = useCallback(
    (oauth: string) => {
      if (!currentUser) return;

      let provider = googleAuthProvider;

      if (oauth === "facebook.com") {
        provider = facebookAuthProvider;
      }

      linkWithPopup(currentUser, provider)
        .then((userCredential) => {
          setCurrentUser(userCredential.user);
        })
        .catch((e) => console.log(JSON.stringify(e)));
    },
    [currentUser, setCurrentUser]
  );

  const handleClickUnlinkWith = useCallback(
    (oauth: string) => {
      if (!currentUser) {
        return;
      }

      unlink(currentUser, oauth)
        .then(setCurrentUser)
        .catch((e) => console.log(JSON.stringify(e)));
    },
    [currentUser, setCurrentUser]
  );

  return (
    <div className="space-y-2">
      <h3 className="font-bold">Link apps</h3>
      {currentUser && (
        <>
          {OAuthCandidate.map((oauth) => {
            if (
              currentUser.providerData.some((user) => user.providerId === oauth)
            ) {
              return (
                <div
                  key={oauth}
                  className="border p-2"
                  onClick={() => handleClickUnlinkWith(oauth)}
                >
                  <div>Disconnect {oauth}</div>
                </div>
              );
            }

            return (
              <div
                key={oauth}
                className="border p-2"
                onClick={() => handleClickLinkWith(oauth)}
              >
                <div>Connect {oauth}</div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default LinkApps;
