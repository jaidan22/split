export const endpoints = {
  paths: [
    {
      title: "sign up",
      method: "POST",
      path: "/api/auth/signup",
      body: {
        username: "username",
        name: "username",
        email: "username@gmail.com",
        password: "password",
      },
    },
    {
      title: "login",
      method: "POST",
      path: "/api/auth/login",
      body: {
        username: "username",
        password: "password",
      },
    },
    {
      title: "get Lended data",
      method: "GET",
      path: "/api/lended",
    },
    {
      title: "get owed data",
      method: "GET",
      path: "/api/owed",
    },
    {
      title: "get peers",
      method: "GET",
      path: "/api/peers",
    },
    {
      title: "get simplified data",
      method: "POST",
      path: "/api/debts/simplified",
      body: {
        netDebt: [
          {
            name: "u1",
            netDebt: 30,
          },
          {
            name: "u2",
            netDebt: 20,
          },
          {
            name: "u3",
            netDebt: 10,
          },
          {
            name: "u4",
            netDebt: 0,
          },
          {
            name: "u5",
            netDebt: -5,
          },
          {
            name: "u6",
            netDebt: -15,
          },
          {
            name: "u7",
            netDebt: -40,
          },
        ],
      },
    },
    {
      title: "get users with transaction history",
      method: "GET",
      path: "/api/previous",
    },
    {
      title: "get debts b/w users",
      method: "GET",
      path: "/api/debts/bw/:username",
    },
    {
      title: "create group",
      method: "POST",
      path: "/api/group",
      body: {
        groupname: "groupname",
        users: ["test11", "test4", "test1", "test5"],
      },
    },
    {
      title: "add member to a group",
      method: "PUT",
      path: "/api/group/addUser",
      body: {
        users: ["test2", "test3", "test4"],
        id: "group id",
      },
    },
    {
      title: "dlt member from group",
      method: "PUT",
      path: "/api/group/dltUser",
      body: {
        users: "test2",
        id: "group id",
      },
    },
  ],
};
