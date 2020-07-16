// import { inject, injectable } from "tsyringe";
//
// import AppError from "@errors/AppError";
// import IMailerRepository from "@shared/container/providers/Nodemailer/repositories/IMailerRepository";
// import GmailMailer from "@establishments/infra/typeorm/entities/Establishment";
//
// interface Request {
//   name: string;
//   email: string;
//   cnpj: string;
//   phone: string;
//   city: string;
//   active: boolean;
// }
//
// @injectable()
// class CreateMailerGmailConfigService {
//   constructor(
//     @inject("IMailerRepository")
//     private gmailMailerRepository: IMailerRepository
//   ) { }
//
//   public async execute({
//                          host,
//                          email,
//                          cnpj,
//                          phone,
//                          city,
//                          active,
//                        }: Request): Promise<GmailMailer> {
//   //   const checkCnpjUsed = await this.establishmentsRepository.findByCnpj(cnpj);
//   //
//   //   if (checkCnpjUsed) {
//   //     throw new AppError("CNPJ já utilizado", 400);
//   //   }
//   //
//   //   const checkNameUsed = await this.establishmentsRepository.findByName(name);
//   //
//   //   if (checkNameUsed) {
//   //     throw new AppError("Nome já utilizado", 400);
//   //   }
//   //
//   //   const establishment = await this.establishmentsRepository.create({
//   //     name,
//   //     email,
//   //     cnpj,
//   //     phone,
//   //     city,
//   //     active,
//   //   });
//   //
//   //   return establishment;
//   // }
// }
//
// export default CreateEstablishmentService;
