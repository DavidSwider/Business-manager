const updateEmployeeQuery = (roleId, employeeId) => `
  UPDATE employes 
  SET roles_id = ${roleId}
  WHERE id = ${employeeId} RETURNING *;
`;
export default updateEmployeeQuery;
