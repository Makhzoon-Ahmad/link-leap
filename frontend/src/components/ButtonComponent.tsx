import { Button } from "@/components/ui/button";
import { ReactNode, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LinkContext } from "./LinkProvider";
interface ButtonProps {
  children: ReactNode;
}

const ButtonComponent = ({ children }: ButtonProps) => {
  const context = useContext(LinkContext);
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  if (!context) {
    throw new Error("The Component must be within the Link Provider");
  }

  const { url, setUrl } = context;
  async function shortenUrl(url: string) {
    const res = await fetch("http://localhost:3000/api/v1/shortenLink", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    if(!res.ok) throw new Error('Failed to Shorten URL');
    return res.json();
  }
  const mutation = useMutation({
    mutationFn: shortenUrl,
    onSuccess: (data) => {
      setShortUrl(data.shortUrl)
      
    },
  });
  function handleSubmit() {
    if (!url.trim()) return;
    mutation.mutate(url);
    setUrl("");
  }
  return (
    <div className="flex flex-col justify-center items-center ">
      <Button
        variant="secondary"
        className="hover: cursor-pointer w-[350px] "
        onClick={handleSubmit}
        disabled={mutation.isPending}
      >
        {children}
      </Button>
      {shortUrl && <div className="text-white text-sm border-1 border-slate-400 rounded-md w-[350px] mt-3 flex justify-center" >
          <a href={shortUrl} className="py-2">{shortUrl}</a>
        </div>}

    </div>
  );
};

export default ButtonComponent;
