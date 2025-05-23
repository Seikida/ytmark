"use client";

import { HistoryIcon, ListVideoIcon, ThumbsUpIcon } from "lucide-react";
import { 
    SidebarGroup, 
    SidebarGroupContent, 
    SidebarMenu, 
    SidebarMenuButton, 
    SidebarMenuItem,
    SidebarGroupLabel 
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useClerk, useAuth, useUser } from "@clerk/nextjs";

const items = [
    {
        title: "History",
        url: "/playlist/history",
        icon: HistoryIcon,
        auth: true
    },
    {
        title: "Liked videos",
        url: "/playlist/liked",
        icon: ThumbsUpIcon,
        auth: true
    },
    {
        title: "All playlists",
        url: "/playlists",
        icon: ListVideoIcon,
        auth: true
    }
];

export const PersonalSection = () => {

    const { isSignedIn } = useAuth();
    const clerk = useClerk();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>You</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item, i) => (
                        <SidebarMenuItem key={i}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                asChild
                                isActive={false} // TODO: Change to look at current pathname
                                onClick={(e) => {
                                    if (!isSignedIn && item.auth) {
                                        e.preventDefault();
                                        return clerk.openSignIn();
                                    }
                                }}
                            >
                                <Link href={item.url} className="flex items-center gap-4">
                                    <item.icon />
                                    <span className="text-sm">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}