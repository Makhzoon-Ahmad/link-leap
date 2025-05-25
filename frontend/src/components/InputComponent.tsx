import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { LinkContext } from "./LinkProvider";

const InputComponent = () => {
  const context = useContext(LinkContext)
  
  if(!context) {
    throw new Error("The Component must be within the Link Provider")
  }
  
  const { url, setUrl} = context;
  return (
    <div className="flex justify-center mb-3">
      <Input
        placeholder="Enter Your URL"
        type="url"
        className="w-[350px] text-white"
        value={url}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUrl(e.target.value);
          console.log(url);
        }}
      />
    </div>
  );
};

export default InputComponent;
