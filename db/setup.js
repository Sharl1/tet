async function createTables(pool) {
    try{
        const createProfileTable = `
        CREATE TABLE IF NOT EXISTS Profile (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            surname VARCHAR(50) NOT NULL,
            patronymic VARCHAR(50) NOT NULL,
            old INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        const createUserTables = ` 
        CREATE TABLE IF NOT EXISTS Users (
            id SERIAL PRIMARY KEY,
            role VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
        const createCategoryTable = `
        CREATE TABLE IF NOT EXISTS Category (
            id SERIAL UNIQUE,
            category_name VARCHAR(50) PRIMARY KEY,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        const createCourseTable = `
        CREATE TABLE IF NOT EXISTS Course (
            id SERIAL UNIQUE,
            course_name VARCHAR(50) NOT NULL PRIMARY KEY,
            teacher BIGINT REFERENCES Users(id) ON DELETE CASCADE,
            object VARCHAR(50) NOT NULL,
            description TEXT NOT NULL,
            photo TEXT,
            duration INTEGER NOT NULL,
            category VARCHAR(50) REFERENCES Category(category_name) ON DELETE CASCADE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        const createRecordTable = `
        CREATE TABLE IF NOT EXISTS Record (
            id SERIAL PRIMARY KEY,
            users BIGINT REFERENCES Users(id) ON DELETE CASCADE,
            course_id BIGINT REFERENCES Course(id) ON DELETE CASCADE,
            course_name VARCHAR(50) REFERENCES Course(course_name) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await pool.query(createProfileTable);
        console.log('Profile table created. ');

        await pool.query(createUserTables);
        console.log('User table creates. ');

        await pool.query(createCategoryTable);
        console.log('Category table creates. ');

        await pool.query(createCourseTable);
        console.log('Course table creates. ');

        await pool.query(createRecordTable);
        console.log('Record table creates. ');
    } catch (error) {
        console.error('Error creating tables:', error.message);
    }
    
}

module.exports = createTables;