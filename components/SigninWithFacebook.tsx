import { FirebaseError } from "firebase/app";
import {
  AuthErrorCodes,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useAtomValue } from "jotai";
import { FC, useCallback } from "react";
import { auth } from "../firebase/app";
import { currentUserAtom } from "./firebase-app/CurrentUserListener";

interface MyError extends FirebaseError {
  customData: {
    email: string;
    _tokenResponse: {
      oauthAccessToken: string;
      providerId: string;
    };
  };
}

const isMyError = (e: any): e is MyError => {
  return Object.hasOwn(e, "customData");
};

export type ProviderId = "google.com" | "password" | "facebook.com";

export function getProviderForProviderId(providerId: string) {
  if (providerId === "facebook.com") {
    return new FacebookAuthProvider();
  }

  return new GoogleAuthProvider();
}

interface Props {}

const facebookAuthProvider = new FacebookAuthProvider();

const SigninWithFacebook: FC<Props> = () => {
  const currentUser = useAtomValue(currentUserAtom);

  const handleClickFacebookButton = useCallback(() => {
    signInWithPopup(auth, facebookAuthProvider)
      .then(console.log)
      .catch((error: MyError) => {
        console.log(JSON.stringify(error));

        if (error.code === AuthErrorCodes.NEED_CONFIRMATION) {
          // Step 2.
          // User's email already exists.
          // The pending Facebook credential.
          const pendingCred = FacebookAuthProvider.credentialFromError(error);

          // The provider account's email address.
          const email = error.customData.email;
          // Get sign-in methods for this email.
          fetchSignInMethodsForEmail(auth, email).then((methods) => {
            // Step 3.
            // If the user has several sign-in methods,
            // the first method in the list will be the "recommended" method to use.

            if (methods[0] === "password") {
              // Asks the user their password.
              // In real scenario, you should handle this asynchronously.
              const password = prompt("enter password"); // TODO: implement promptUserForPassword.

              if (!password || !email) {
                return;
              }

              if (!pendingCred) {
                return;
              }

              signInWithEmailAndPassword(auth, email, password).then(
                (result) => {
                  return linkWithCredential(result.user, pendingCred);
                }
              );
              // .then(function () {
              //   // Facebook account successfully linked to the existing Firebase user.
              //   goToApp();
              // });
              return;
            }

            // All the other cases are external providers.
            // Construct provider object for that provider.
            // TODO: implement getProviderForProviderId.
            const provider = getProviderForProviderId(methods[0]);

            // At this point, you should let the user know that they already have an account
            // but with a different provider, and let them validate the fact they want to
            // sign in with this provider.
            // Sign in to provider.
            // Note: browsers usually block popup triggered asynchronously,
            // so in real scenario you should ask the user to click on a "continue" button
            // that will trigger the signInWithPopup.

            signInWithPopup(auth, provider).then((result) => {
              // Remember that the user may have signed in with an account that has a different email
              // address than the first one. This can happen as Firebase doesn't control the provider's
              // sign in flow and the user is free to login using whichever account they own.
              // Step 4b.
              // Link to Facebook credential.
              // As we have access to the pending credential, we can directly call the link method.
              //

              if (!pendingCred) {
                return;
              }

              linkWithCredential(result.user, pendingCred).then(function () {
                console.log("success!!!");
                // Facebook account successfully linked to the existing Firebase user.
                // goToApp();
              });
            });
          });
        }
      });
  }, []);

  return (
    <div className="border rounded p-4">
      <h2>Signin with facebook</h2>
      <button onClick={handleClickFacebookButton} className="border p-2">
        F
      </button>
    </div>
  );
};

export default SigninWithFacebook;
