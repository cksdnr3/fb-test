import { sendEmailVerification, User } from "firebase/auth";
import { FC, useCallback } from "react";

interface Props {
  currentUser: User;
}

const VerifyEmail: FC<Props> = ({ currentUser }) => {
  console.log(currentUser);
  const handleClickVerifyEmail = useCallback(() => {
    console.log("send");
    sendEmailVerification(currentUser)
      .then((res) => {
        console.log("suuccess:", res);
      })
      .catch(console.log);
  }, [currentUser]);

  if (currentUser.emailVerified) {
    return null;
  }

  return (
    <div className="border text-center p-1" onClick={handleClickVerifyEmail}>
      Verify email
    </div>
  );
};

export default VerifyEmail;
