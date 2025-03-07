const insertEmployeeQuery = (firstName, lastName, roleId, managerId) => `
  INSERT INTO employes (first_name, last_name, roles_id, manager_id) 
  VALUES ('${firstName}', '${lastName}', ${roleId}, ${managerId ? managerId : 'NULL'}) RETURNING *;
`;
export default insertEmployeeQuery;
