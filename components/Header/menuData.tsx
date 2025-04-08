import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 3,
    title: "Services",
    path: "/service",
    newTab: false,
  },
  {
    id: 33,
    title: "Support",
    path: "/contact",
    newTab: false,
  },
  {
    id: 4,
    title: "GuideLines",
    path: "/Guidelines",
    newTab: false,
  },
  {
    id: 5,
    title: "Pages",
    newTab: false,
    submenu: [
      {
        id: 51,
        title: "About Page",
        path: "/about",
        newTab: false,
      },
      {
        id: 52,
        title: "Contact Page",
        path: "/contact",
        newTab: false,
      },
      {
        id: 53,
        title: "Services Page",
        path: "/service",
        newTab: false,
      },
      {
        id: 54,
        title: "GuideLines Page",
        path: "/Guidelines",
        newTab: false,
      },
      {
        id: 55,
        title: "Sign In Page",
        path: "/signin",
        newTab: false,
      },
      {
        id: 56,
        title: "Sign Up Page",
        path: "/signup",
        newTab: false,
      },
      {
        id: 57,
        title: "profile Page",
        path: "/profile",
        newTab: false,
      },
      {
        id: 58,
        title: "Error Page",
        path: "/error",
        newTab: false,
      },
      {
        id: 58,
        title: "dashboard page",
        path: "/dashboard",
        newTab: false,
      },
      {
        id: 59,
        title: "tips page",
        path: "/Health_&_wellness",
        newTab: false,
      },
    ],
  },
];
export default menuData;
