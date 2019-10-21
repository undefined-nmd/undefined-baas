'use strict';

import { Response, Request, } from "express";

/**
 * GET /api
 * List of API examples.
 */
export const getApi = (req: Request, res: Response) => {
    res.status(200).json( { success: true, message: 'Hello' });
};