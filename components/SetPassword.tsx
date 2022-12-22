import {
  EmailAuthProvider,
  linkWithCredential,
  updatePassword,
  User,
} from "firebase/auth";
import { ChangeEvent, FC, FormEvent, useCallback, useState } from "react";

interface Props {
  currentUser: User;
}

const SetPassword: FC<Props> = ({ currentUser }) => {
  const [password, setPassword] = useState("");

  const handleChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    []
  );

  const hasPasswordAuth = currentUser.providerData.some(
    (user) => user.providerId === "password"
  );

  const handleSubmitSetPassword = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (!currentUser.email?.length || !password.length) {
        return;
      }

      const emailAuthCredential = EmailAuthProvider.credential(
        currentUser.email,
        password
      );

      if (hasPasswordAuth) {
        updatePassword(currentUser, password)
          .then(console.log)
          .catch((e) => console.log(JSON.stringify(e)));
        return;
      }

      linkWithCredential(currentUser, emailAuthCredential)
        .then(console.log)
        .catch((error) => console.log(JSON.stringify(error)));
    },
    [currentUser, hasPasswordAuth, password]
  );

  return (
    <form
      className="border rounded p-4 space-y-2"
      onSubmit={handleSubmitSetPassword}
    >
      <h3 className="font-bold">
        {hasPasswordAuth ? "Change password" : "Set password"}
      </h3>

      <input
        type="password"
        autoComplete="off"
        value={password}
        className="border p-2 w-full"
        onChange={handleChangePassword}
      />
      <button className="border p-2" type="submit">
        {hasPasswordAuth ? "Change" : "Set"}
      </button>
    </form>
  );
};

export default SetPassword;
