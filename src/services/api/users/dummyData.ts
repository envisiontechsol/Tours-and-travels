export const userDataDummy = {
  ok: true,
  data: [
    {
      userId: "cmjzy5n6b001d608848ko312m",
      role: "ADMIN",
      permissions: [
        {
          module: "users",
          label: "Users",
          icon: "users",
          actions: ["view"],
        },
        {
          module: "manageLocation",
          label: "Manage Location",
          icon: "map-pin",
          actions: ["view"],
        },
        {
          module: "managePackage",
          label: "Manage Package",
          icon: "package",
          actions: ["view"],
        },
        {
          module: "manageBookings",
          label: "Manage Bookings",
          icon: "calendar",
          actions: ["view"],
        },
      ],
    },
    {
      userId: "cmjznw9l1000660884rc3prkm",
      role: "ADMIN",
      permissions: [
        {
          module: "users",
          label: "Users",
          icon: "users",
          actions: ["view", "add"],
        },
        {
          module: "managePackage",
          label: "Manage Package",
          icon: "package",
          actions: ["view", "edit"],
        },
        {
          module: "manageBookings",
          label: "Manage Bookings",
          icon: "calendar",
          actions: ["view"],
        },
      ],
    },
    {
      userId: "cmjznrww20000rhnibib9kihn",
      role: "SUPER_ADMIN",
      permissions: [
        {
          module: "users",
          label: "Users",
          icon: "users",
          actions: ["view", "add", "edit", "delete"],
        },
        {
          module: "manageLocation",
          label: "Manage Location",
          icon: "map-pin",
          actions: ["view", "add", "edit", "delete"],
        },
        {
          module: "managePackage",
          label: "Manage Package",
          icon: "package",
          actions: ["view", "add", "edit", "delete"],
        },
        {
          module: "manageBookings",
          label: "Manage Bookings",
          icon: "calendar",
          actions: ["view", "add", "edit", "delete"],
        },
      ],
    },
    {
      userId: "cmji43m8s0000l4gk1xkrmptm",
      role: "ADMIN",
      permissions: [
        {
          module: "users",
          label: "Users",
          icon: "users",
          actions: ["view", "add", "edit", "delete"],
        },
        {
          module: "managePackage",
          label: "Manage Package",
          icon: "package",
          actions: ["view", "edit"],
        },
        {
          module: "manageBookings",
          label: "Manage Bookings",
          icon: "calendar",
          actions: ["view", "edit"],
        },
      ],
    },
  ],
  page: 1,
  pageSize: 20,
  total: 4,
  totalPages: 1,
  hasPrev: false,
  hasNext: false,
};
