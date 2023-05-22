import { Router } from "express";

import videoController from "../controller/videos.controller";

const router =  Router();
//router.get("/", videoController.getAllVideos);

router.get("/", videoController.paginationVideos);

router.get("/:id", videoController.getVideoById);

router.patch("/:id", videoController.deleteVideo);

router.post("/", videoController.createVideo);

router.put("/:id", videoController.updateVideoViews);



export default router;

