import { Given } from "@wdio/cucumber-framework";
import logger from "../../../helpers/logger.js";
import reporter from "../../../helpers/reporter.js";
import sauseHomePage from "../../pageObjects/sause.home.page.js";
import constants from "../../../data/sample/constants.json" assert { type: "json" };
import apiHelper from "../../../helpers/apiResp_goat.js";
import { expect } from "chai";
import fs from "fs"

/*Given(/^As (a|an) (.*) user Login to Inventory web app$/,async function(prefixText,userType,dataTable){
  console.log(JSON.stringify(browser.options.environment))
  console.log(`>>The User Type:${userType}`);
  this.appID = "app1234";
  const testid = this.testID;
  reporter.addStep(this.testID, "info", "Login to Sause App");
  console.log( `>>Given ${testid} has been executed on platform ${process.env.PLATFORM}`);
  logger.info(`${testid} started to login into sause web app`);
  //allure.addStep(`${testid}:started to login into sause webApp`)

  let dt = dataTable.hashes();
  // console.log(`>>type of user:${typeof dt}`)
  // console.log(`>>type of user:${dt.constructor}`)
  // console.log(`>>userType values:${JSON.stringify(dt)}`)
  //console.log('Browser Config:', browser.config);
  await browser.url("https://www.saucedemo.com/");
  await browser.maximizeWindow();
  try {
    console.log(process.env.TEST_STD_USERNAME);
    //let brw=await browser.config.sauseDemoURL
    //await $(`#user-name`).setValue(process.env.TEST_STD_USERNAME);
    await $(`#user-name`).setValue(dt[0].username);
    await $(`#password`).setValue(process.env.TEST_STD_PASSWORD);
    await $(`#login-button`).click();
    let loginError = await $(`.error-message-container.error`).isDisplayed();
    if (loginError) throw new Error("Login failed on second attempt");
  } catch (err) {
    console.log("Error in first login trying");
    await browser.refresh();
    await browser.pause(2000);
    //login to app secod attempt
    await $(`#user-name`).setValue("standard_user");
    await $(`#password`).setValue("secret_sauce");
    await $(`#login-button`).click();
    const secondLoginError = await $(`.error-message-container`).isDisplayed();
    if (secondLoginError) {
      throw new Error("Login failed on second attempt");
    }
  }

  await browser.back();
  await browser.pause(2000);
  await browser.forward();
  //login with another standard_user
  //   await browser.pause(3000);
  //   await browser.reloadSession();
  //   await browser.url("https://www.saucedemo.com/");
  //   await $(`#user-name`).setValue("problem_user");
  //   await $(`#password`).setValue("secret_sauce");
  //   await $(`#login-button`).click();
  //   await browser.debug();
  reporter.addStep(this.testID, "debug", "login is successfull");
});*/

//**Given step definition using POM */
Given(
  /^As (a|an) (.*) user Login to Inventory web app$/,
  async function (prefixText, userType, dataTable) {
    try {
      reporter.addStep(this.testID, "info", "Login to Sause App");
      let dt = dataTable.hashes();
      await sauseHomePage.navigateTo(browser.options.sauseDemoURL);
      await sauseHomePage.LoginToSauseApp(
        this.testID,
        process.env.TEST_STD_USERNAME,
        process.env.TEST_STD_PASSWORD
      );
    } catch (err) {
      err.message = `Failed at login step, ${err.message}`;
      throw err;
    }
  }
);

Given(
  /^Get list of (.*) from https:\/\/reqres.in\/$/,
  async function (endpointRef) {
    if (!endpointRef) {
      throw Error(`Given Endpoint Ref:${endpointRef} is not valid`);
    }
    var testid=this.testID
    try {
      
      reporter.addStep(
        testid,
        "info",
        `Getting the payload for endpoint:${endpointRef}`
      );
      let endpoint = "";
      if (endpointRef.trim().toUpperCase() === "USERS") {
        endpoint = constants.REQRES.GET_USERS;
      }
      if (!endpoint) {
        throw Error(`Error in getting endpoint ${endpoint} from constants.json`);
      }
  
      /**Make a get call by using helper methods API helper */
      let res;
      await browser.call(async function () {
        res = await apiHelper.GET(
          testid,
          "https://reqres.in",
          endpoint,
          constants.REQRES.queryParam
        );
      });
      if (!res || typeof res.status === "undefined") {
        throw new Error(`Invalid response received: ${JSON.stringify(res.body,null,2)}`);
      }
      if (res.status !== 200) {
        expect.fail(
          `failed getting users from:${constants.REQRES.reqresBaseURL}/${endpoint}`
        );
      }
      reporter.addStep(
        testid,
        "info",
        `API response received, data ${JSON.stringify(res.body,null,2)}`
      );
  
    /** Store results in file*/
      let data=JSON.stringify(res.body,undefined,4)
      let fileName=`${process.cwd()}/data/apiRest/apiTest.json`
      fs.writeFileSync(fileName,data)
      reporter.addStep(testid,"info",`API response from ${endpoint} has been written in json file`)
    } catch (err) {
      err.message=`${testid}: Failed at getting API users from reqres, ${err.message}`
      throw err
    }
  });
