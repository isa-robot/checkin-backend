import IMailerDestinatariesDTO from "@shared/container/providers/MailsProvider/dtos/IMailerDestinatariesDTO";

class MailerDestinatariesSingleton{

  private suport: IMailerDestinatariesDTO
  private usersNotApproved: IMailerDestinatariesDTO

  private suportIsActive: boolean = false
  private usersNotApprovedIsActive: boolean = false

  public getSuport(){
    return this.suport
  }

  public setSuport(suport: IMailerDestinatariesDTO){
    this.suport = suport
  }

  public getUsersNotApproved(){
    return this.usersNotApproved
  }

  public setUsersNotApproved(usersNotApproved: IMailerDestinatariesDTO){
    this.usersNotApproved = usersNotApproved
  }

  public getSuportIsActive(){
    return this.suportIsActive
  }

  public setSuportIsActive(isActive: boolean){
    this.suportIsActive = isActive
  }

  public getUsersNotApprovedIsActive(){
    return this.usersNotApprovedIsActive
  }

  public setUsersNotApprovedIsActive(isActive: boolean){
    this.usersNotApprovedIsActive = isActive
  }
}

export default new MailerDestinatariesSingleton
