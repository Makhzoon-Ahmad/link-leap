import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const UserSign = () => {
    const navigate = useNavigate();
  return (
    <div className="h-full flex justify-center items-center">
        <Button variant="secondary" className="absolute top-4 right-4 hover:cursor-pointer" onClick={()=>{
            navigate("/")
        }}>Go Back</Button>
      <div className="w-[600px] border-1 border-gray-500 rounded-xl p-4">
        <Tabs defaultValue="Sign In" className="w-full">
          <TabsList className="w-full  p-[1.4px] ">
            <TabsTrigger
              value="Sign In"
              className="hover:cursor-pointer data-[state=active]:bg-[#101720] data-[state=active]:text-white"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="Sign Up"
              className="hover:cursor-pointer data-[state=active]:bg-[#101720] data-[state=active]:text-white"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Sign In" className="text-white">
            {/* <span className="block">Please Enter Your Email and Password!</span> */}
            <label htmlFor="email" className="text-gray-300">Email</label>
            <Input type="email" className="my-2 text-white placeholder:text-gray-300" placeholder="example@gmail.com" id="email" name="email" required></Input>
            <label htmlFor="password" className="text-gray-300">Password</label>
            <Input className="my-2 text-white placeholder:text-gray-300" placeholder="password" id="password" name="password" required></Input>
            <Button variant="secondary" className="w-full mt-14 hover:cursor-pointer">Sign In</Button>
          </TabsContent>
          <TabsContent value="Sign Up" className="text-white">
          <label htmlFor="email" className="text-gray-300">Email</label>
            <Input type="email" className="my-2 text-white placeholder:text-gray-300" placeholder="example@gmail.com" id="email" name="email" required></Input>
            <label htmlFor="password" className="text-gray-300">Password</label>
            <Input className="my-2 text-white placeholder:text-gray-300" placeholder="password" id="password" name="password" required></Input>
            <Button variant="secondary" className="w-full mt-14 hover:cursor-pointer">Sign Up</Button>
        
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserSign;
