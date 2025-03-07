const getEmployeesQuery = () => `
  SELECT employes.id, employes.first_name, employes.last_name, roles.title, 
         roles.salary, departments.dept_name AS department, 
         CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employes
  JOIN roles ON employes.roles_id = roles.id
  JOIN departments ON roles.departments_id = departments.id
  LEFT JOIN employes AS manager ON employes.manager_id = manager.id;
`;
export default getEmployeesQuery;
