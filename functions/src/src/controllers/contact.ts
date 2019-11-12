'use strict';

import {Request, Response,} from "express";
import * as admin from 'firebase-admin';

const db = admin.firestore();

/**
 * GET /project
 */
export const postMessage = async (req: Request, res: Response) => {
    try {

       await db.collection("messages").add({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        })
            .then(function (docRef) {
                res.status(200).json({
                    name: req.body.name,
                    email: req.body.email,
                    message: req.body.message,
                });
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });



    } catch (error) {
        res.status(500).send(error);
    }
};
