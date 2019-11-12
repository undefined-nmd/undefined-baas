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
export const getServices = async (req: Request, res: Response) => {
  try {

    const serviceQuerySnapshot = await db.collection('services').get();
    const services: any = [];
    serviceQuerySnapshot.forEach(
        (doc) => {
            services.push({
                id: doc.id,
                data: doc.data()
            });
        }
    );

    res.status(200).json({
      data: services
    });

  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * GET /projects/:id
 */
export const getService = async (req: Request, res: Response) => {
  try {
    const serviceId = req.params.id;

    if (!serviceId) throw new Error('Team Member ID is required');

    const service = await db.collection('team').doc(serviceId).get();
    if (!service.exists){
      throw new Error('Team Member doesn\'t exist.');
    }

    res.status(200).json({
      id: service.id,
      data: service.data(),
    });

  } catch (error) {
    res.status(500).send(error);
  }
};