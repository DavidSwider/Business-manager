const insertDepartmentQuery = (name) => `
  INSERT INTO departments (dept_name) VALUES ('${name}') RETURNING *;
`;
export default insertDepartmentQuery;
