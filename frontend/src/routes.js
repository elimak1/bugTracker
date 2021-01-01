/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserPage from "views/UserProfile/UserPage.js";
import Users from "views/UserPage/Users";
import Projects from "views/ProjectPage/Projects";
import Tickets from "views/TicketPage/Tickets";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserPage,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Manage users",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Users,
    layout: "/admin"
  },
  {
    path: "/projects",
    name: "Projects",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Projects,
    layout: "/admin"
  },
  {
    path: "/tickets",
    name: "Tickets",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Tickets,
    layout: "/admin"
  },
];

export default dashboardRoutes;
