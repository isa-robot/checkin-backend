import {autoInjectable, delay, inject} from "tsyringe";
import AwsBucketService from "@modules/aws-bucket/service/AwsBucketService";
import IAwsBucketService from "@modules/aws-bucket/service/IAwsBucketService";
import {Request, Response} from "express";

@autoInjectable()
class AwsBucketController {

  constructor(@inject(delay(AwsBucketService))
              private service?: IAwsBucketService) {}

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const val = await this.service?.getTerm("CRIANCA");
      return res.status(200).json(val);
    } catch (e) {
      console.info(e);
      return res.status(500).json(e);
    }
  }
}
export default new AwsBucketController();
