import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Package,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    title: "Products",
    icon: Package,
    url: "/products",
  },
  {
    title: "Other Pages",
    icon: LogOut,
    type: "dropdown",
    children: [
      {
        title: "Login",
        url: "/login",
      },
      {
        title: "Register",
        url: "/register",
      },
      {
        title: "Profile",
        url: "/profile",
      },
    ],
  },
];

function MenuItem({ item }: { item: typeof menuItems[0] }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.type === "dropdown" && item.children && item.children.length > 0;

  return (
    <SidebarMenuItem>
      {hasChildren ? (
        <>
          <SidebarMenuButton
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer"
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{item.title}</span>
            <ChevronRight
              className={`ml-auto h-4 w-4 shrink-0 transition-transform ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </SidebarMenuButton>
          {isOpen && (
            <SidebarMenuSub>
              {item.children!.map((child) => (
                <SidebarMenuSubItem key={child.title}>
                  <Link to={child.url} className="flex items-center gap-2 px-2 py-1 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                    <span className="truncate">{child.title}</span>
                  </Link>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </>
      ) : (
        <SidebarMenuButton>
          <Link to={item.url!} className="flex items-center gap-2">
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{item.title}</span>
          </Link>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            B
          </div>
          BLIP ERP
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <MenuItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
