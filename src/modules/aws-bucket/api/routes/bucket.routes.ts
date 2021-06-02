import {Router} from "express";
import AwsBucketController from "@modules/aws-bucket/api/controller/AwsBucketController";

const bucketRoutes = Router();

bucketRoutes.get("/files", AwsBucketController.list.bind(AwsBucketController));

export default bucketRoutes;
