import * as express from "express";
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as path from 'path';

import * as apiController from './controllers/api';
import * as postController from './controllers/post';
import * as projectController from './controllers/project';
import * as teamController from './controllers/team';

// Create Express server
const app = express();
app.use(cors({ origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/api', apiController.getApi);
app.get('/api/posts', postController.getPosts);
app.get('/api/posts/:id', postController.getPost);
app.get('/api/projects',projectController.getProjects);
app.get('/api/projects/:id',projectController.getProject);
app.get('/api/team', teamController.getTeam);
app.get('/api/team/:id', teamController.getTeamMember);

// 404
app.get('*', (req: express.Request, res: express.Response) => {
    res.status(404).json( { success: false, message: 'The resources doesn\'t exists!' });
});

// Export the default app
export default app;