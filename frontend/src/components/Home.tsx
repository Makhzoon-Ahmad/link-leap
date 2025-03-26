import { UserLogInProps } from "@/AppRoutes";
import LinkProvider from "./LinkProvider";
import LinkShortener from "./LinkShortener";
import Navigation from "./Navigation";

const Home = ({isLoggedIn, setLoggedIn}: UserLogInProps) => {
  return (
    <>
      <Navigation isLoggedIn= {isLoggedIn} setLoggedIn = {setLoggedIn}/>
      <LinkProvider>
        <LinkShortener />
      </LinkProvider>
    </>
  );
};

export default Home;
