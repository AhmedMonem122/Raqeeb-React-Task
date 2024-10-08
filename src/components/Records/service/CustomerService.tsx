export const RecordsService = {
  getData() {
    return [
      {
        id: 1,
        url: "http://www.jones.com/",
        username: "hughestheresa",
        password: "8(5IFjAx*q",
        leaked_sources: 96,
        created_at: "2020-01-20T14:31:13",
        modified_at: "2021-11-11T03:42:09",
        status: "in progress",
      },
      {
        id: 2,
        url: "http://www.jones.com/sss",
        username: "hughestheresa",
        password: "8(5IFjAx*q",
        leaked_sources: 96,
        created_at: "2020-01-20T14:31:13",
        modified_at: "2021-11-11T03:42:09",
        status: "pending",
      },
      {
        id: 3,
        url: "http://www.jones.com/sss",
        username: "hughestheresa",
        password: "8(5IFjAx*q",
        leaked_sources: 96,
        created_at: "2020-01-20T14:31:13",
        modified_at: "2021-11-11T03:42:09",
        status: "done",
      },
    ];
  },

  getCustomersSmall() {
    return Promise.resolve(this.getData().slice(0, 10));
  },

  getCustomersMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  },

  getrecordsLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  },

  getCustomersXLarge() {
    return Promise.resolve(this.getData());
  },
};
