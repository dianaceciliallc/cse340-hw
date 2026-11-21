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
      FROM service_projects p
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
      FROM service_projects
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

async function getUpcomingProjects(numberOfProjects) {
  try {
    const query = `
      SELECT
        p.project_id,
        p.title,
        p.description,
        p.project_date,
        p.location,
        p.organization_id,
        o.name AS organization_name
      FROM service_projects p
      JOIN organization o ON p.organization_id = o.organization_id
      WHERE p.project_date >= CURRENT_DATE
      ORDER BY p.project_date ASC
      LIMIT $1;
    `;
    const queryParams = [numberOfProjects];
    const result = await db.query(query, queryParams);
    return result.rows;
  } catch (error) {
    console.error('Error fetching upcoming projects:', error.message);
    throw error;
  }
}

async function getProjectDetails(id) {
  try {
    const query = `
      SELECT
        p.project_id,
        p.title,
        p.description,
        p.project_date,
        p.location,
        p.organization_id,
        o.name AS organization_name
      FROM service_projects p
      JOIN organization o ON p.organization_id = o.organization_id
      WHERE p.project_id = $1;
    `;
    const queryParams = [id];
    const result = await db.query(query, queryParams);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Error fetching project details:', error.message);
    throw error;
  }
}

async function getProjectsByCategoryId(categoryId) {
  try {
    const query = `
      SELECT
        p.project_id,
        p.organization_id,
        p.title,
        p.description,
        p.location,
        p.project_date
      FROM service_projects p
      JOIN project_categories pc ON p.project_id = pc.project_id
      WHERE pc.category_id = $1
      ORDER BY p.project_date ASC;
    `;
    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);
    return result.rows;
  } catch (error) {
    console.error('Error fetching projects by category ID:', error.message);
    throw error;
  }
}

export {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
  getProjectsByCategoryId
};