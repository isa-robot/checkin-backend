import ICreateResourceDTO from "@security/resources/dtos/ICreateResourceDTO";

export default [{
  name: "Monitoramento",
  to: "/monitoramento",
  icon: "monitoring",
},
{
  name: "Diário",
  to: "/diario",
  icon: "diary",
},
{
  name: "Painel",
  to: "/painel",
  icon: "monitoring",
},
{
  name: "Cadastros",
  to: "/cadastros",
  icon: "register",
}] as ICreateResourceDTO[]
