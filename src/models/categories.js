import db from './db.js';

async function getAllCategories() {
  try {
    const query = `
      SELECT category_id, category_name
      FROM categories
      ORDER BY category_name ASC;
    `;
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    throw error;
  }
}

async function getCategoryById(categoryId) {
  try {
    const query = `
      SELECT category_id, category_name
      FROM categories
      WHERE category_id = $1;
    `;
    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Error fetching category by ID:', error.message);
    throw error;
  }
}

async function getCategoriesByProjectId(projectId) {
  try {
    const query = `
      SELECT c.category_id, c.category_name
      FROM categories c
      JOIN project_categories pc ON c.category_id = pc.category_id
      WHERE pc.project_id = $1
      ORDER BY c.category_name ASC;
    `;
    const queryParams = [projectId];
    const result = await db.query(query, queryParams);
    return result.rows;
  } catch (error) {
    console.error('Error fetching categories by project ID:', error.message);
    throw error;
  }
}

export {
  getAllCategories,
  getCategoryById,
  getCategoriesByProjectId
};