import { Request, Response, NextFunction } from 'express';
import {get, controller, use, bodyValidator, post} from './decorators';

function requiredAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  } else {
    res.status(403);
    res.send('Not Permitted');
  }
}

@controller('')
class RootController {

  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(
        `
        <div>
          <div>You are logged in</div>
          <a href="/auth/logout">Logout</a>
        </div>
        `
      )
    } else {
      res.send(
        `
        <div>
          <div>You are not logged in</div>
          <a href="/auth/login">Login</a>
        </div>
        `
      )
    }
  };

  @get('/protected')
  @use(requiredAuth)
  getProtected(req: Request, res: Response) {
    res.send('Welcome')
  }
}