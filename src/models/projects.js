import db from './db.js';

async function getAllProjects() {
  try {
    const query = `
      SELECT 
        p.project_id,
        p.title,
        p.description,
        p.location,
        p.project_date,
        o.name AS organization_name
      FROM service_project p
      JOIN organization o ON p.organization_id = o.organization_id
      ORDER BY p.project_date ASC;
    `;
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    throw error;
  }
}

async function getProjectsByOrganizationId(organizationId) {
  try {
    const query = `
      SELECT
        project_id,
        organization_id,
        title,
        description,
        location,
        project_date
      FROM service_project
      WHERE organization_id = $1
      ORDER BY project_date ASC;
    `;
    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);
    return result.rows;
  } catch (error) {
    console.error('Error fetching projects by organization ID:', error.message);
    throw error;
  }
}

export { getAllProjects, getProjectsByOrganizationId };