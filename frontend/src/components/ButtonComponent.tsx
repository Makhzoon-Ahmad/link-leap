import { Button } from "@/components/ui/button";
import { ReactNode, useContext, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LinkContext } from "./LinkProvider";
import { QRCode } from "react-qrcode-logo";

interface ButtonProps {
  children: ReactNode;
}



const ButtonComponent = ({ children }: ButtonProps) => {
  const context = useContext(LinkContext);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [lastOriginalUrl, setLastOriginalUrl] = useState<string | null>(null);
  const QRref = useRef<HTMLElement>(null);

  if (!context) {
    throw new Error("The Component must be within the Link Provider");
  }

  const { url, setUrl } = context;
  async function shortenUrl(url: string) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/v1/shortenLink`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: token }), // ✅ only add if token exists
    },
    body: JSON.stringify({ url }),
  });

  return res.json();
}
  const mutation = useMutation({
    mutationFn: shortenUrl,
    onSuccess: (data) => {
      if (!data.success) {
        alert(data.message);
      }
      setShortUrl(data.shortUrl);
    },
    onError: (error) => {
      // console.log(error)
      alert(error);
    },
  });
  function handleSubmit() {
    if (!url.trim()) return;
    mutation.mutate(url);
    setLastOriginalUrl(url);
    setUrl("");
  }

  function qrDownload() {
    if (!QRref.current) return;
    const canvas = QRref.current.querySelector("canvas"); //qrdiv.querySelector    ========>>>>> QRref = woh div jisme qr hai
    if (!canvas) return;

    const url = canvas.toDataURL("image/png"); //qr image aagayi canvas mai jo bhi pixels the ==== > toDataUrl ( encode karta hai pixels ko base64 png mai )
    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.png";
    link.click(); // a.click()
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
      {shortUrl && (
        <div className="text-white text-sm border-1 border-slate-400 rounded-md w-[350px] mt-3 flex justify-center">
          <a href={shortUrl} className="py-2">
            {shortUrl}
          </a>
        </div>
      )}
      {shortUrl && lastOriginalUrl && (
        <div
          ref={QRref as React.RefObject<HTMLDivElement>}
          className="text-white text-sm border-1 border-slate-400 rounded-2xl w-[350px] mt-3 flex justify-center items-center py-10 flex-col"
        >
          <QRCode value={lastOriginalUrl} />
          <Button
            variant="secondary"
            className="hover: cursor-pointer w-[170px] mt-4"
            onClick={qrDownload}
          >
            Download QR
          </Button>
        </div>
      )}
    </div>
  );
};

export default ButtonComponent;
