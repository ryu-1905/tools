"use client";

import { QrCode } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

export const navLink = [
  {
    name: "QR Generator",
    path: "/",
    icon: <QrCode />,
  },
  {
    name: "Coming Soon",
    path: "/soon",
    icon: <QrCode />,
  },
];

const Header = () => {
  const pathname = usePathname();

  const createNavLink = () => {
    return navLink.map((link) => (
      <Button
        key={link.path}
        variant={pathname === link.path ? "outline" : "ghost"}
        className="m-1"
      >
        <Link href={link.path} className="flex items-center">
          {link.icon}
          {link.name}
        </Link>
      </Button>
    ));
  };

  return (
    <div className="border-b-5 flex items-center">
      <span className="font-bold text-2xl px-3">TOOLS</span>
      <div className="flex justify-center w-full">{createNavLink()}</div>
    </div>
  );
};

export default Header;
