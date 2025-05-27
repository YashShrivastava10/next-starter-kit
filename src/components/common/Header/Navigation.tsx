"use client";

import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui";
import { ROUTES } from "@/constants";
import { Menu } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Home", href: ROUTES.HOME },
  { label: "Route 2", href: ROUTES.ROUTE2 },
  { label: "Route 3", href: ROUTES.ROUTE3 },
  { label: "Route 4", href: ROUTES.ROUTE4 },
];

export const Navigation = () => {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <nav className="bg-primary/30 hidden list-none items-center rounded-full px-2 py-2 sm:flex">
        {navItems.map((item, index) => (
          <Link
            href={item.href}
            key={item.label}
            className={`relative px-4 py-2 text-sm font-medium text-neutral-500 ${(pathname === item.href || hovered === index) && "text-primary-foreground"}`}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            {hovered === index && (
              <motion.span
                layoutId="hovered-nav-item"
                className="bg-primary absolute inset-0 h-full w-full rounded-full"
              />
            )}
            {pathname === item.href && (
              <motion.span
                layoutId="selected-nav-item"
                className="bg-primary absolute inset-0 h-full w-full rounded-full"
              />
            )}
            <li className="relative z-10">{item.label}</li>
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild className="block sm:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center hover:bg-transparent dark:hover:bg-transparent"
          >
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetTitle className="sr-only">Yoo</SheetTitle>
        <SheetContent className="flex flex-col gap-4 px-8 py-16">
          <nav className="mt-30 flex list-none flex-col items-center justify-center gap-6">
            {navItems.map((item) => (
              <SheetClose asChild key={item.label}>
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium text-neutral-500 ${pathname === item.href && "text-primary-foreground"}`}
                >
                  {pathname === item.href && (
                    <motion.span
                      layoutId="selected-nav-item"
                      className="bg-primary absolute inset-0 h-full w-full rounded-full"
                    />
                  )}
                  <li className="relative z-10">{item.label}</li>
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};
