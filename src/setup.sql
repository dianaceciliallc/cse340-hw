-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Service Projects Table
-- ========================================
CREATE TABLE service_projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,
    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

-- ========================================
-- Categories Table
-- ========================================
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================================
-- Project Categories Junction Table
-- ========================================
CREATE TABLE project_categories (
    project_id INT REFERENCES service_projects(project_id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename) VALUES 
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- ========================================
-- Insert sample data: Service Projects
-- ========================================
INSERT INTO service_projects (organization_id, title, description, location, project_date) VALUES 
(1, 'Community Park Cleanup', 'Cleaning up trash and planting new trees in the central park.', 'Central Park, Lima', '2026-06-15'),
(1, 'Roof Repair Initiative', 'Repairing community center roofing before the rainy season.', 'Community Center', '2026-07-10'),
(2, 'Urban Garden Workshop', 'Teaching locals how to grow organic vegetables in small spaces.', 'Greenhouse Sector B', '2026-06-20'),
(2, 'Compost Bin Distribution', 'Assembling and distributing compost bins for neighborhood households.', 'Local Market Square', '2026-07-05'),
(3, 'Food Drive Logistics', 'Sorting and packing non-perishable food items for local shelters.', 'Community Warehouse', '2026-06-25');

-- ========================================
-- Insert sample data: Categories
-- ========================================
INSERT INTO categories (category_name) VALUES 
('Education & Tutoring'),
('Environment & Sustainability'),
('Health & Wellness');

-- ========================================
-- Insert sample data: Project Categories Relations
-- ========================================
INSERT INTO project_categories (project_id, category_id) VALUES 
(1, 2), 
(2, 2), 
(3, 1), 
(4, 2), 
(5, 3);