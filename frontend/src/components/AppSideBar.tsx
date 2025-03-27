import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
const AppSideBar = () => {
    const navigate= useNavigate();
  return (
    <Sidebar >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Links</SidebarGroupLabel>
          <SidebarGroupContent>
            <Button variant="default" className="w-full" onClick={() => {
                navigate('/links');
            }}>Get All Links</Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSideBar;
