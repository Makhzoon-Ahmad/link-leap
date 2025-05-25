import { UserLogInProps } from "@/AppRoutes";
import LinkProvider from "./LinkProvider";
import LinkShortener from "./LinkShortener";
import Navigation from "./Navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSideBar from "./AppSideBar";

const Home = ({ isLoggedIn, setLoggedIn }: UserLogInProps) => {
  return (
    <>
      <SidebarProvider defaultOpen={false}>
        {isLoggedIn && <AppSideBar />}

        {isLoggedIn && <SidebarTrigger className="z-10 mt-2 ml-2 cursor-pointer" variant="secondary"/>}

        <main className="flex-col w-full absolute">
          <Navigation isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
          <LinkProvider>
            <LinkShortener />
          </LinkProvider>
        </main>
      </SidebarProvider>
    </>
  );
};

export default Home;
