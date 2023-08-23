// import { dotenv } from "dotenv";
import { SimpleCrypto } from "simple-crypto-js";

// dotenv.config()
export class Crypto {
  // #simpleCrypto = new SimpleCrypto();

  async EncryptPassword(password) {
    try {
      const simpleCrypto = new SimpleCrypto(password);
      const encrypted = simpleCrypto.encrypt(password);
      return encrypted;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  decodeToken(token) {
    const simpleCrypto = new SimpleCrypto(
      process.env.SALT || "d4563433465c70708c3abad309adf84b576406894bbcaa1ad4"
    );
    const decoded = simpleCrypto.decrypt(token);
    // console.log(decoded);
    return decoded;
  }
}
