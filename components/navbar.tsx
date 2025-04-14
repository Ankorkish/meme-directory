"use client"

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useState } from "react"; // Import useState to manage menu state

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeroUINavbar
      position="sticky"
      className="max-w-7xl mx-auto"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:basis-1/4" justify="start">
        <NavbarBrand>
          <NextLink href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <p className="font-bold text-inherit">
              LEIME | ANDRII KORKISHKO</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex basis-1/2" justify="center">
        <ul className="flex gap-8 justify-center">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
                onClick={closeMenu} // Close menu on navigation
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="sm:basis-1/4" justify="end">
        <NavbarItem className="hidden sm:flex">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarMenuToggle className="lg:hidden" />
      </NavbarContent>

      <NavbarMenu className="pt-6">
        {siteConfig.navItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "w-full text-lg py-2 data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              href={item.href}
              onClick={closeMenu} 
            >
              {item.label}
            </NextLink>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem className="mt-6 flex justify-between">
          <p className="text-sm">Theme</p>
          <ThemeSwitch />
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroUINavbar>
  );
};