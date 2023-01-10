import { FirebaseError } from "firebase/app";
import { AuthErrorCodes, createUserWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, FC, FormEvent, useCallback, useState } from "react";
import { auth } from "../firebase/app";

interface Props {}

const SignupWithEmailAndPassword: FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ message: "", code: "" });

  const handleChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  );

  const handleChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    []
  );

  const handleSubmitSignupWithEmailAndPassword = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("signup success:", userCredential);
        })
        .catch((error: FirebaseError) => {
          setError({ code: error.code, message: error.code });
        });
    },
    [email, password]
  );

  return (
    <form
      className="border rounded p-4 space-y-2"
      onSubmit={handleSubmitSignupWithEmailAndPassword}
    >
      <h3>Signup with email and password</h3>
      <input
        type="text"
        autoComplete="off"
        className="border p-2 w-full"
        value={email}
        onChange={handleChangeEmail}
      />
      <input
        type="password"
        autoComplete="off"
        className="border p-2 w-full"
        value={password}
        onChange={handleChangePassword}
      />

      <button className="border p-2" type="submit">
        Signup
      </button>
      <div className="text-red-400">
        Signup failed with {error.message.slice(5)}
      </div>
    </form>
  );
};

export default SignupWithEmailAndPassword;
