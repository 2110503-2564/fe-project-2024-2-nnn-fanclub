import axios from "axios";
import { createHash } from "node:crypto";

export default async function gravatarProfile(email: string) {
  let emailHash = createHash("sha256");
  emailHash.write(email);
  emailHash.end();
  const hash = emailHash.read();
  
  return hash.toString("hex");
}
