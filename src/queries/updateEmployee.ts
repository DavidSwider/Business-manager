const updateEmployeeQuery = (roleId: number, employeeId: number): string => `
  UPDATE employes 
  SET roles_id = ${roleId}
  WHERE id = ${employeeId} RETURNING *;
`;

export default updateEmployeeQuery;
