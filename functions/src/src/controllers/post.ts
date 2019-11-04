'use strict';

import {
  Response,
  Request,
} from "express";
import * as admin from 'firebase-admin';

const db = admin.firestore();

/**
 * GET /posts
 */
export const getPosts = async (req: Request, res: Response) => {
  try {

    const postsQuerySnapshot = await db.collection('posts').get();
    const posts: any = [];
    postsQuerySnapshot.forEach(
        (doc) => {
            posts.push({
                id: doc.id,
                data: doc.data(),
            });
        }
    );
    res.status(200).json({
        data: posts,
    });

    //t
    // let postRef = await db.collection('posts');
    // let postList = []
    // let posts = postRef.get()
    //     .then(snapshot => {
    //       snapshot.forEach(doc => {
    //         postList.push({
    //             data: doc.data()
    //         });
    //       });
    //
    //     })
    //     .catch(err => {
    //       console.log('Error getting documents', err);
    //     });
    //et



  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * GET /posts/:id
 */
export const getPost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    if (!postId) throw new Error('Team Member ID is required');

    const post = await db.collection('team').doc(postId).get();
    if (!post.exists){
      throw new Error('Team Member doesn\'t exist.');
    }

    res.status(200).json({
      id: post.id,
      data: post.data(),
    });

  } catch (error) {
    res.status(500).send(error);
  }
};
