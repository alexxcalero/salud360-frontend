import { Mail } from "lucide-react";
import { GenericInputProps } from "./genericInput";
import Input from "./Input";

const MailInput = (props: GenericInputProps) => {
  return <Input leftIcon={<Mail />} type="email" {...props} />;
};

export default MailInput;
