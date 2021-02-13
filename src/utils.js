export const crawl = (user, allValues) => {
  if (!allValues) {
    allValues = [];
  }
  for (const key in user) {
    if (typeof user[key] === "object") {
      crawl(user[key], allValues);
    } else {
      allValues.push(`${user[key]} `);
    }
  }
  return allValues;
};

export const getUsersSearchIndex = (data) => {
  return data.map(user => {
    const allValues = crawl(user);
    return { allValues: allValues.toString() };
  });
}