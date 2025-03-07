const insertRoleQuery = (title, salary, departmentId) => `
  INSERT INTO roles (title, salary, departments_id) 
  VALUES ('${title}', ${salary}, ${departmentId}) RETURNING *;
`;
export default insertRoleQuery;
