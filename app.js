const express = require('express');
const createTbales = require('./db/setup');
const pool = require('./db/index');

const profileRouter = require('./Router/ProfileRouter');
const userRouter = require('./Router/UserRouter');
const recordRouter = require('./Router/RecordRouter');
const courseRouter = require('./Router/CourseRouter');
const categoryRouter = require('./Router/CategoryRouter');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()) // для парсинга json в теле запроса

app.use('/api', profileRouter)
app.use('/api', userRouter)
app.use('/api', recordRouter)
app.use('/api', courseRouter)
app.use('/api', categoryRouter)

async function initializeApp() {
    try{
        await createTbales(pool);

        app.listen(PORT, () => {;
            console.log(`Server is running on port ${PORT}`)
        }); 
    }catch (error) {
        console.error('Error initializing app:', error.message);
    }    
}

initializeApp();