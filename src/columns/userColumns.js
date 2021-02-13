export const userColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email"
  },
  {
    title: "City",
    key: "city",
    render: record => {
      return record.address.city;
    }
  },
  {
    title: "Company",
    key: "company",
    render: record => {
      return record.company.name;
    }
  },
];
