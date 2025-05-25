import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "./ui/button";

const fetchUserLinks = async ()=>{
    const token = localStorage.getItem("token");
    if(!token){
        throw new Error("No token found");
    }
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const response = await fetch(`${BASE_URL}/api/v1/links`, {
        method: "GET",
        headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json"
        }
    });
    if(!response.ok){
        throw new Error(response.statusText)
    }

    const data = await response.json();
    return data;
}
const UserLinks = () => {
    const [enabled, setEnabled] = useState(false);

    const { data: links, isLoading, error } = useQuery({
        queryKey: ["userLinks"],
        queryFn: fetchUserLinks,
        enabled,
    });

    return (
        <div>
            <Button variant="secondary" className="mt-2 ml-2" onClick={() => setEnabled(true)} disabled={isLoading}>
                {isLoading ? "Loading..." : "Fetch My Links"}
            </Button>

            {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

            <ul>
                {links?.map((link: any) => (
                    <li key={link.id}>
                        <a href={link.shortLink} target="_blank" rel="noopener noreferrer">
                            {link.shortLink}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserLinks;
