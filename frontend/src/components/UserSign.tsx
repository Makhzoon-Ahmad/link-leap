import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

type ApiResponse =  { 
    message: string,
    success: boolean
}

type UserData = {
  signUp: {
    email: string;
    password: string;
  };
  signIn: {
    email: string;
    password: string;
  };
};

const UserSign = () => {
  const [userData, setUserData] = useState<UserData>({
    signUp: {
      email: "",
      password: "",
    },
    signIn: {
      email: "",
      password: "",
    },
  });
 
  const signUpMutation = useMutation({
    mutationFn : handleSignUp,
    onSuccess: (data)=>{
      if(!data.success){
        alert(data.message)
      }
      alert(data.message)
      setUserData((prev) => ({
        ...prev,
        signUp: {
          email: '',
          password : ''
        }
      })
    )
    },
    onError: (error)=>{
      alert(error);
    }
  })

  async function handleSignUp(userData: UserData["signUp"]): Promise<ApiResponse>{
    const BASE_URL  =import.meta.env.VITE_BASE_URL;
    const response = await fetch(`${BASE_URL}/api/v1/signup`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email : userData["email"],
        password : userData["password"]
      })
    });
    const result = await response.json();
    return result;
  }
  const handleChange = (
    type: "signUp" | "signIn",
    field: "email" | "password",
    value: string
  ) => {
    setUserData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };
  const navigate = useNavigate();
  return (
    <div className="h-full flex justify-center items-center">
      <Button
        variant="secondary"
        className="absolute top-4 right-4 hover:cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        Go Back
      </Button>
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
            <label htmlFor="email" className="text-gray-300">
              Email
            </label>
            <Input
              type="email"
              className="my-2 text-white placeholder:text-gray-300"
              placeholder="example@gmail.com"
              id="email"
              name="email"
              required
              value={userData["signIn"]['email']}
              onChange={(e)=> {
                
                handleChange("signIn", "email" , e.target.value);
              }}
            ></Input>
            <label htmlFor="password" className="text-gray-300">
              Password
            </label>
            <Input
              className="my-2 text-white placeholder:text-gray-300"
              placeholder="password"
              id="password"
              name="password"
              required
              value={userData["signIn"]['password']}
              onChange={(e)=> {
                
                handleChange("signIn", "password" , e.target.value);
              }}
            ></Input>
            <Button
              variant="secondary"
              className="w-full mt-14 hover:cursor-pointer"
              
            >
              Sign In
            </Button>
          </TabsContent>
          <TabsContent value="Sign Up" className="text-white">
            <label htmlFor="email" className="text-gray-300">
              Email
            </label>
            <Input
              type="email"
              className="my-2 text-white placeholder:text-gray-300"
              placeholder="example@gmail.com"
              id="email"
              name="email"
              required
              value={userData["signUp"]['email']}
              onChange={(e)=> {
                
                handleChange("signUp", "email" , e.target.value);
              }}
            ></Input>
            <label htmlFor="password" className="text-gray-300">
              Password
            </label>
            <Input
              className="my-2 text-white placeholder:text-gray-300"
              placeholder="password"
              id="password"
              name="password"
              required
              value={userData["signUp"]['password']}
              onChange={(e)=> {
                
                handleChange("signUp", "password" , e.target.value);
              }}
            ></Input>
            <Button
              variant="secondary"
              className="w-full mt-14 hover:cursor-pointer"
              onClick={()=>{
                signUpMutation.mutate(userData.signUp);
              }}
              disabled = {signUpMutation.isPending ? true: false}
            >
              Sign Up
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserSign;
