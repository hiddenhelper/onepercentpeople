export default {
  landing: {
    authenticated: [
      {
        text: "Home",
        href: ""
      },
      {
        text: "Pricing",
        href: "/pricing"
      },
      // {
      //   text: "Career",
      //   href: "/career"
      // },
      {
        text: "About",
        href: "/about"
      },
      {
        text: "Dashboard",
        href: "/dashboard"
      }
    ],
    noauth: [
      {
        text: "Home",
        href: ""
      },
      {
        text: "Pricing",
        href: "/pricing"
      },
      // {
      //   text: "Career",
      //   href: "/career"
      // },
      {
        text: "About",
        href: "/about"
      },
      {
        text: "Login",
        href: "/login"
      }
    ],
  },
  dashboard: {
    employer: {
      nav: [

      ],
      sidenav: [
        {
          title: "Main Menu",
          items: [
            {
              text: "Overview",
              href: "/employer",
              icon: "chart-pie-solid"
            },
            {
              text: "Jobs",
              href: "/employer/jobs",
              icon: "briefcase"
            },
            {
              text: "Employees",
              href: "/employer/employees",
              icon: "user-group"
            },
            {
              text: "Applicants",
              href: "/employer/applicants",
              icon: "identification"
            },
            {
              text: "Messages",
              href: "/employer/messages",
              icon: "chat-alt-2"
            },
          ]
        },
        {
          title: "Tools",
          items: [
            {
              text: "Settings",
              href: "/employer/settings",
              icon: "cog"
            },
            {
              text: "Logout",
              href: "/logout",
              icon: '',
            },
          ]
        }
      ]
    },
    talent: {
      nav: [

      ],
      sidenav: [
        {
          title: "Main Menu",
          items: [
            {
              text: "Find Jobs",
              href: "/talent",
              icon: "search"
            },
            // {
            //   text: "My Jobs",
            //   href: "/talent/my-jobs",
            //   icon: "briefcase"
            // },
            {
              text: "Profile",
              href: "/talent/profile",
              icon: "user"
            },
            {
              text: "Messages",
              href: "/talent/messages",
              icon: "chat-alt-2"
            },
          ]
        },
        {
          title: "Tools",
          items: [
            {
              text: "Settings",
              href: "/talent/settings",
              icon: "cog"
            },
            {
              text: "Logout",
              href: "/logout",
              icon: '',
            },
          ]
        }
      ]
    },
  },
};
