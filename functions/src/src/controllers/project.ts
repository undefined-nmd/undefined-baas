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
export const getProjects = async (req: Request, res: Response) => {
  try {

    const projectQuerySnapshot = await db.collection('projects').get();
    const projects: any = [];
    projectQuerySnapshot.forEach(
        (doc) => {
            projects.push({
                id: doc.id,
                data: doc.data()
            });
        }
    );

    res.status(200).json({
      data: projects
    });

  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * GET /projects/:id
 */
export const getProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;

    if (!projectId) throw new Error('Team Member ID is required');

    const project = await db.collection('team').doc(projectId).get();
    if (!project.exists){
      throw new Error('Team Member doesn\'t exist.');
    }

    res.status(200).json({
      id: project.id,
      data: project.data(),
    });

  } catch (error) {
    res.status(500).send(error);
  }
};