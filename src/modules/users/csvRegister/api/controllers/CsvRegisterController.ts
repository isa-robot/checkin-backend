import {Request, Response} from 'express'
import fs from 'fs'
import CsvRegisterService from "@users/csvRegister/services/CsvRegisterService";


class CsvRegisterController {
  async create(req: Request, res: Response) {
    try {
      const csvRegisterService = new CsvRegisterService()
      //@ts-ignore
      const readableStream = csvRegisterService.createReadableStream(req.files.usersCsv[0].filename)
      const users = await csvRegisterService.csvToJson(readableStream);
      const registerResult = await csvRegisterService.registerUsers(users);

      if(registerResult) {
        return res.json(registerResult)
      }

      return res.json({})
    }catch(e) {
      return res.status(e.statusCode ? e.statusCode : 301).json(e.message)
    }
  }
}
export default new CsvRegisterController();
