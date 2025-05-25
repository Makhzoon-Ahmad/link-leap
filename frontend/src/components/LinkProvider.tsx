import { useState } from "react";
import { createContext } from "react";
type LinkContextType = {
    url: string;
    setUrl: (url: string) => void;
  };

export const LinkContext = createContext<LinkContextType | undefined>(undefined) ;    
const LinkProvider = ({ children }: { children: React.ReactNode}) => {
  const [url, setUrl] = useState<string>("");
  return (
    <LinkContext.Provider value={{ url, setUrl }}>
      {children}
    </LinkContext.Provider>
  );
};

export default LinkProvider;
