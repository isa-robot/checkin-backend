import getMailerConfig from "@messages/services/getMailerConfig";

const initMailer = () => {
  setTimeout(() => {
    getMailerConfig()
  }, 600)
}
export default initMailer
