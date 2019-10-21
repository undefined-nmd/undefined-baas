'use strict';

import {
  Response,
  Request,
} from "express";
import * as admin from 'firebase-admin';

const db = admin.firestore();

/**
 * GET /team
 */
export const getTeam = async (req: Request, res: Response) => {
  try {

    const teamQuerySnapshot = await db.collection('team').get();
    const team: any = [];
    teamQuerySnapshot.forEach(
        (doc) => {
            team.push({
                id: doc.id,
                data: doc.data()
            });
        }
    );

    res.status(200).json({
      data: team
    });

  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * GET /team/:id
 */
export const getTeamMember = async (req: Request, res: Response) => {
  try {
    const teamMemberId = req.params.id;

    if (!teamMemberId) throw new Error('Team Member ID is required');

    const teamMember = await db.collection('team').doc(teamMemberId).get();
    if (!teamMember.exists){
      throw new Error('Team Member doesn\'t exist.');
    }

    res.status(200).json({
      id: teamMember.id,
      data: teamMember.data(),
    });

  } catch (error) {
    res.status(500).send(error);
  }
};