import Page from "../pageObjects/page.js";
import reporter from "../../helpers/reporter.js";
class HomePage extends Page {
  constructor() {
    super();
  }

  //**Page Objects */

  get usernameInputBox() {
    return $(`#user-name`);
  }

  get passwordInputBox() {
    return $(`#password`);
  }

  get loginBtn() {
    return $(`#login-button`);
  }

  async enterUsername(testid: string, username: string) {
    try {
      if (!username) {
        throw Error(`Given UserName ${username} is not valid`);
      }
      username = username.trim();
      await this.typeInto(await this.usernameInputBox, username);
      reporter.addStep(
        testid,
        "info",
        `username ${username} entered Successfully`
      );
    } catch (err) {
      err.message = `Error Entering Username: ${username},${err.message}`;
      throw err;
    }
  }

  async enterUserpassword(testid: string, password: string) {
    try {
      if (!password) {
        throw Error(`Given password ${password} is not valid`);
      }
      password = password.trim();
      await this.typeInto(await this.passwordInputBox, password);
      reporter.addStep(testid, "info", `password entered Successfully`);
    } catch (err) {
      err.message = `Error in Entering Password: ${password}, ${err.message}`;
      throw err;
    }
  }

  async clickLoginBtn(testid: string) {
    try {
      await this.click(await this.loginBtn);
      reporter.addStep(testid, "info", `Login button clicked Successfully`);
    } catch (err) {
      err.message = `Error in clicking login Button, ${err.message}`;
      throw err;
    }
  }

  async LoginToSauseApp(testid:string,username:string,password:string)
  {
    try {
        await this.enterUsername(testid,username)
        await this.enterUserpassword(testid,password)
        await this.clickLoginBtn(testid)
    } catch (err) {
        throw err
    }
  }
}
export default new HomePage();
