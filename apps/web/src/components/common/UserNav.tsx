import { useClerk } from "@clerk/clerk-react";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export function UserNav({
  image,
  name,
  email,
}: {
  image: string;
  name: string;
  email: string;
}) {
  const { signOut } = useClerk();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>
              <img src={"/images/profile.png"} alt={name} />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-black">
              {name}
            </p>
            <p className="text-xs leading-none text-black">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="hover:cursor-pointer hover:bg-gray-200"
        >
          <LogOut className="mr-2 h-4 w-4 text-black" />
          <span className="text-black">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
