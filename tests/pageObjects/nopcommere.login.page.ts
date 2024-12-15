import page from "../pageObjects/page.js";
import report from "../../helpers/reporter.js";
declare const browser: any;
class LoginPage extends page {
  constructor() {
    super();
  }

  get userName() {
    return browser.$("#Email");
  }

  get passWord() {
    return browser.$("#Password");
  }

  get loginButton() {
    return browser.$(".button-1");
  }

  async loginToNopCommerceWeb(
    testid: string,
    url: string,
    username: string,
    password: string
  ) {
    if (!url || !username || !password) {
      throw Error(`Invalid Parameters are provided`);
    }
    report.addStep(testid, "info", `Login has been Initiated to browser.${url}`);
    url = url.trim();
    username = username.trim();

    try {
      await this.navigateTo(url);
      await this.typeInto(await this.userName,username);
      await this.typeInto(await this.passWord,password);
      await this.click(await this.loginButton);
      report.addStep(testid,"info",`Login to browser.${url} app is successful`)
    } catch (err) {
      err.message = `Login to browser.${url} app is failed, browser.${err.message}`;
      throw err;
    } 
  }
}

export default new LoginPage()