import { Button } from "@/components/ui";
import { ROUTES } from "@/constants";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle";
import { Navigation } from "./Navigation";

export const Header = () => {
  return (
    <header className="bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex h-16 items-center justify-between">
          {/* Logo  */}
          <Link href={ROUTES.HOME} className="text-bold text-2xl">
            Yash<span className="text-primary text-5xl">.</span>
          </Link>

          {/* Navigation */}
          <Navigation />

          {/* Call to Action and Theme Toggle */}
          <div className="flex items-center gap-4">
            <Button className="rounded-full">CTA</Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
