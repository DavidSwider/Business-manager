const insertRoleQuery = (title: string, salary: number, departmentId: number): string => `
  INSERT INTO roles (title, salary, departments_id) 
  VALUES ('${title}', ${salary}, ${departmentId}) RETURNING *;
`;

export default insertRoleQuery;
