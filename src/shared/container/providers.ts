import  { container } from "tsyringe";

import SignatureProvider from "@modules/signature/providers/SignatureProvider";
import ISignatureProvider from "@modules/signature/providers/ISignatureProvider";

container.register<ISignatureProvider>(
  "SignatureProvider",
  SignatureProvider
);
