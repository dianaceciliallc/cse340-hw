import db from './db.js';

export async function getAllProjects() {
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