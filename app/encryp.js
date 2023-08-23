import { SimpleCrypto } from "simple-crypto-js";

export class Crypto {
  #hass = null;
  #simpleCrypto = new SimpleCrypto(process.env.SALT);
  constructor() {}
  randon() {
    return SimpleCrypto.generateRandomString(200);
  }
  encryt(data) {
    return btoa(this.#simpleCrypto.encrypt(data));
  }
  async decryt(data) {
    // console.log(data);
    try {
      const simple = new SimpleCrypto(process.env.SALT);
      const decrypted = simple.decrypt(data);
      return decrypted;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  getToken(data) {
    const date = () => {
      const date = new Date(1693261647700);
      const d = date.toUTCString();
      const expires = date.setDate(date.getDate() + 7);
      return expires;
    };
    return this.#simpleCrypto.encrypt({
      id: data["_id"],
      name: data?.name,
      email: data?.email,
      created: Date.parse(new Date()),
      expires: date(),
    });
  }
  async validaPass(pass, data) {
    try {
      const simplo = new SimpleCrypto(pass);
      const valida = simplo?.decrypt(atob(data));
      return valida && { message: 'true' };
    } catch (error) {
      console.error(error);
      return { message: "Pass or Email Incorrect" };
    }
  }
  encryptPass(data) {
    return btoa(this.#hassPass(data));
  }
  #hassPass(data) {
    this.#hass = new SimpleCrypto(data);
    const hassPass = this.#hass.encrypt(data);
    return hassPass;
  }
  async checkExpires(data) {
    // console.log(data);
    const dataPrev = await this.decryt(data.replace("Bearer ", ""));
    const dayActual =  Date.parse(new Date());
    // console.log(dayActual, dayActual>dataPrev.expires);
    // console.log((dataPrev.expires - dataPrev.created));
    if(dayActual>dataPrev.expires){
        return {active:false, message:'inactive'}
    }else{

        return {active:true, message:"active"};
    }
  }
}
