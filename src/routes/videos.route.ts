import { Router } from "express";

import videoController from "../controller/videos.controller";

const router =  Router();

router.get("/", videoController.getAllVideos);

router.get("/:id", videoController.getVideoById);

router.patch("/:id", videoController.deleteVideo);

router.post("/", videoController.createVideo);



export default router;

