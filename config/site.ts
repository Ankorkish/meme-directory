export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Meme-directory",
  description: "Store your memes here :)",
  navItems: [
    {
      label: "TableView",
      href: "/",
    },
    {
      label: "ListView",
      href: "/list-view",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
};
