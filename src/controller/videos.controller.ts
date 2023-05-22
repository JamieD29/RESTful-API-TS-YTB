import {Request, RequestHandler, Response } from "express";

import Videos from '../models/Videos';

const createVideo: RequestHandler = async (req: Request, res: Response) => {
    let video = await Videos.create({...req.body});
    return res
    .status(200)
    .json({message:"Video created successfully", data: video});
}

const deleteVideo: RequestHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    const deletedVideo:Videos | null = await Videos.findByPk(id);

    await Videos.destroy({where: {id}});

    return res.status(200).json({message:"Video deleted successfully", data: deletedVideo});

}

const getAllVideos: RequestHandler = async (req: Request, res: Response) => {
    const allVideos: Videos[] = await Videos.findAll();
    return res.status(200).json({message:"Videos fetched successfully", data: allVideos});
};

const getVideoById : RequestHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    const video: Videos | null = await Videos.findByPk(id);
    console.log("Luot xem video = "+video?.views);
    return res.status(200).json({message:"Video fetched successfully", data: video});
};

export default {
    createVideo,
    deleteVideo,
    getAllVideos,
    getVideoById
}