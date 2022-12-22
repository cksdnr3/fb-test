import { FC } from "react";
import CurrentUserListener from "./CurrentUserListener";

interface Props {}

const FirebaseApp: FC<Props> = () => {
  return <CurrentUserListener />;
};

export default FirebaseApp;
