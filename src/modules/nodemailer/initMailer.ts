import getMailerConfig from "@nodemailer/services/getMailerConfig";

const initMailer = () => {
  setTimeout(() => {
    getMailerConfig()
  }, 2000)
}
export default initMailer
