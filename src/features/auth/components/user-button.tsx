"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "../api/use-current-user";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export const UserButton = () => {
  const { signOut } = useAuthActions();
  const [clickLogout, setClickLogout] = useState(false);
  const { data, isLoading } = useCurrentUser();
  const router = useRouter();

  const handleClick = async () => {
    setClickLogout(true);
    await signOut();
    router.replace("/auth");
  };

  if (isLoading) {
    return (
      <Loader className="size-4 animate-spin text-muted-foreground" />
    );
  }

  if (!data) {
    return null;
  }

  const { name, image } = data;

  const avatarFallback = name!.charAt(0).toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition rounded-md">
          <AvatarImage alt={name} src={image} />
          <AvatarFallback className="bg-sky-500 text-white rounded-md">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        side="right"
        className="w-60"
      >
        <DropdownMenuItem
          onClick={handleClick}
          className="h-10 cursor-pointer"
        >
          <LogOut className="size-4 mr-2 " />
          {clickLogout ? (
            <Loader className="size-4 animate-spin text-muted-foreground" />
          ) : (
            "Logout"
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
