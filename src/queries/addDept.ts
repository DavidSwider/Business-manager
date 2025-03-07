const insertDepartmentQuery = (name: string): string => `
  INSERT INTO departments (dept_name) VALUES ('${name}') RETURNING *;
`;

export default insertDepartmentQuery;
