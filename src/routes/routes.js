import Dashbord from "../views/dashbord/Dashbord";
import AddTask from "../views/dashbord/AddTask";
import PageNotFound from "../views/components/PageNotFound";

import {
  HomeIcon,
  LogsIcon,
  SettingsIcon,
} from "../views/components/icons";
import Developers from "../views/DevelopersManagment/Developers";

const DevelopersManagementPaths = {
  title: "Developers management",
  isDropdown: false,
  icon: SettingsIcon,
  routes: [
    {
      title: "Developers",
      path: "/",
      component: Developers,
      icon: HomeIcon,
      inMenu: true,
    },
  ],
};

const communPathsCategory = {
  isDropdown: false,
  routes: [
    {
      title: "Tasks",
      path: "/tasks",
      component: Dashbord,
      icon: LogsIcon,
      inMenu: true,
    },
  ],
};
const addTaskPathsCategory = {
  isDropdown: false,
  routes: [
    {
      title: "Add Task",
      path: "/add-task",
      component: AddTask,
      icon: SettingsIcon,
      inMenu: true,
    },
  ],
};

const errorPathsCategory = {
  title: "Errors",
  isDropdown: false,
  routes: [
    {
      title: "Errors",
      path: "/*",
      component: PageNotFound,
      inMenu: false,
    },
  ],
};

const menus = [
DevelopersManagementPaths,
communPathsCategory,
addTaskPathsCategory,
  errorPathsCategory
];

const routes = [
  ...DevelopersManagementPaths.routes,
  ...communPathsCategory.routes,
  ...addTaskPathsCategory.routes,
  ...errorPathsCategory.routes,
];

export { routes, menus };
