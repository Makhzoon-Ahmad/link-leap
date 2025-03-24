import { Button } from "@/components/ui/button"; 
import { useNavigate } from "react-router-dom";

const Navigation = () => {
    const navigate = useNavigate();
  return (
    <nav className="w-full flex justify-end">
        <Button variant="secondary" className="m-4 mb-0 hover:cursor-pointer" onClick={()=>{
            navigate('/sign')
        }} >Sign Up / Sign In</Button>
    </nav>
  )
}

export default Navigation
