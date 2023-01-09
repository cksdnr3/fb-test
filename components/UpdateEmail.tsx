import { updateEmail, User } from "firebase/auth";
import { ChangeEvent, FC, FormEvent, useCallback, useState } from "react";

interface Props {
  currentUser: User;
}

const UpdateEmail: FC<Props> = ({ currentUser }) => {
  const [email, setEmail] = useState("");

  const handleChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      if (!currentUser) {
        return;
      }

      e.preventDefault();

      updateEmail(currentUser, email).then(console.log).catch(console.log);
    },
    [currentUser, email]
  );

  return (
    <form className="border rounded p-4 space-y-2" onSubmit={handleSubmit}>
      <h3 className="font-bold">Update email</h3>

      <input
        autoComplete="off"
        value={email}
        className="border p-2 w-full"
        onChange={handleChangeEmail}
      />

      <button className="border p-2" type="submit">
        update email
      </button>
    </form>
  );
};

export default UpdateEmail;
