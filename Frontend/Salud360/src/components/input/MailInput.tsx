import { Mail } from "lucide-react";
import { type InputProps } from "./Input";
import Input from "./Input";

const MailInput = (props: InputProps) => {
  return <Input leftIcon={<Mail />} type="email" {...props} />;
};

export default MailInput;
