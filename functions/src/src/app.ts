import * as express from "express";
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as path from 'path';

import * as apiController from './controllers/api';
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
app.get('/api/team', teamController.getTeam);

// 404
app.get('*', (req: express.Request, res: express.Response) => {
    res.status(404).json( { success: false, message: 'The resources doesn\'t exists!' });
});

// Export the default app
export default app;