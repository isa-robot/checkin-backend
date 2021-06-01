import { container } from "tsyringe";

import IAwsBucketService from "@modules/aws-bucket/service/IAwsBucketService";
import AwsBucketService from "@modules/aws-bucket/service/AwsBucketService";

container.register<IAwsBucketService>(
  "AwsBucketService",
  AwsBucketService
);
