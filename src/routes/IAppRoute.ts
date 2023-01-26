import { Router } from 'express';

export interface IAppRoute {
  router: Router;
  initializeRoutes(): void;
}
