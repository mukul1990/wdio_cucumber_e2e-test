import page from "../pageObjects/page.js";
import report from "../../helpers/reporter.js";
class LoginPage extends page {
  constructor() {
    super();
  }

  get userName() {
    return $("#Email");
  }

  get passWord() {
    return $("#Password");
  }

  get loginButton() {
    return $(".button-1");
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
    report.addStep(testid, "info", `Login has been Initiated to ${url}`);
    url = url.trim();
    username = username.trim();

    try {
      await this.navigateTo(url);
      await this.typeInto(await this.userName,username);
      await this.typeInto(await this.passWord,password);
      await this.click(await this.loginButton);
      report.addStep(testid,"info",`Login to ${url} app is successful`)
    } catch (err) {
      err.message = `Login to ${url} app is failed, ${err.message}`;
      throw err;
    } 
  }
}

export default new LoginPage()