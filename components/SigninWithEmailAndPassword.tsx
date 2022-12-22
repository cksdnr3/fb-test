import { signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, FC, FormEvent, useCallback, useState } from "react";
import { auth } from "../firebase/app";

interface Props {}

const SigninWithEmailAndPassword: FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  );

  const handleChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    []
  );

  const handleSubmitSigninWithEmailAndPassword = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      signInWithEmailAndPassword(auth, email, password)
        .then(console.log)
        .catch((error) => console.log(JSON.stringify(error)));
    },
    [email, password]
  );

  return (
    <form
      className="border rounded p-4 space-y-2"
      onSubmit={handleSubmitSigninWithEmailAndPassword}
    >
      <h3>Signin with email and password</h3>
      <input
        value={email}
        autoComplete="off"
        className="border p-2 w-full"
        onChange={handleChangeEmail}
      />
      <input
        type="password"
        autoComplete="off"
        value={password}
        className="border p-2 w-full"
        onChange={handleChangePassword}
      />
      <button className="border p-2" type="submit">
        sign in
      </button>
    </form>
  );
};

export default SigninWithEmailAndPassword;
