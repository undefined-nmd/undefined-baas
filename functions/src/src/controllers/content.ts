'use strict';

import {
  Response,
  Request,
} from "express";
import * as admin from 'firebase-admin';

const db = admin.firestore();

/**
 * GET /project
 */
export const getContent = async (req: Request, res: Response) => {
  try {

    const projectQuerySnapshot = await db.collection('content').get();
    const content: any = [];
    projectQuerySnapshot.forEach(
        (doc) => {
            content.push({
                id: doc.id,
                data: doc.data()
            });
        }
    );

    res.status(200).json({
      data: content
    });

  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * GET /projects/:id
 */
export const getContentById = async (req: Request, res: Response) => {
  try {
    const contentId = req.params.id;

    if (!contentId) throw new Error('Team Member ID is required');

    const content = await db.collection('team').doc(contentId).get();
    if (!content.exists){
      throw new Error('Team Member doesn\'t exist.');
    }

    res.status(200).json({
      id: content.id,
      data: content.data(),
    });

  } catch (error) {
    res.status(500).send(error);
  }
};