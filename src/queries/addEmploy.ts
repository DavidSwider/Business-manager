const insertEmployeeQuery = (firstName: string, lastName: string, roleId: number, managerId: number | null): string => `
  INSERT INTO employes (first_name, last_name, roles_id, manager_id) 
  VALUES ('${firstName}', '${lastName}', ${roleId}, ${managerId ? managerId : 'NULL'}) RETURNING *;
`;

export default insertEmployeeQuery;
