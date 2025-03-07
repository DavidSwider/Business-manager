const getRolesQuery = (): string => `
  SELECT roles.id, roles.title, roles.salary,departments_id, dept_name AS departments
  FROM roles
  JOIN departments ON roles.departments_id = departments.id;
`;

export default getRolesQuery;
