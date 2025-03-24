import LinkProvider from "./LinkProvider";
import LinkShortener from "./LinkShortener";
import Navigation from "./Navigation";

const Home = () => {
  return (
    <>
      <Navigation />
      <LinkProvider>
        <LinkShortener />
      </LinkProvider>
    </>
  );
};

export default Home;
