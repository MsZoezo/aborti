import { randomUUID } from "node:crypto";

export function getUUID() {
    const hexString = randomUUID().replace(/-/g, "");
    
    const base64 = Buffer.from(hexString, "hex").toString("base64url");

    return base64;
}  