import express from 'express';
import bodyParser from 'body-parser';
import AppDataSource from './db';
import authRoutes from './routes/AuthRoutes';
import groupRoutes from './routes/GroupRoutes';
import messageRoutes from './routes/MessageRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connect to the database
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

app.use('/auth', authRoutes);
app.use('/group', groupRoutes);
app.use('/message',messageRoutes)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
export default app