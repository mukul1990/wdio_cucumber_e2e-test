import { When } from "@wdio/cucumber-framework";
import { expect } from "chai";
import logger from "../../../helpers/logger.js";
import reporter from "../../../helpers/reporter.js";
import nopcommereLoginPage from "../../pageObjects/nopcommere.Login.page.js";
When(
  /^Inventory app should (.*)\s?list (.*)$/,
  async function (negativeCheck, numberOfProducts) {
    // if(!numberOfProducts) throw Error(`Invalid number of products provided:${numberOfProducts}`)
    var testid = undefined;
    try {
      if (!numberOfProducts)
        throw Error(`Invalid product Count is provided:${numberOfProducts}`);
      const appID = this.appID;
      testid = this.testID;
      logger.info(
        `${testid} counting the number of products and validating them`
      );
      if (!numberOfProducts) throw Error("failed error");
      let items = await $$(".inventory_item");
      try {
        await expect(items.length).to.equal(parseInt(numberOfProducts));
      } catch (err) {
        //logger.error(`${testid}:Known bug-Product count mismatch`)
        reporter.addStep(testid,"error","Known bug-Product count mismatch",true,"JIRA-123");
      }
    } catch (err) {
      console.log(`the type of err:${typeof err}`);
      console.log(`>> The name property:${err.name}`);
      console.log(`>>The message property:${err.message}`);
      err.message = `${this.testID}:failed when comparing product count, ${err.message}`;
      throw err;
      logger.error(err.message);
    }
  }
);

When(/^As an (.*) user login to nopcommerce site$/,async function(user){

  if(!user){throw Error(`Given ${user} is not valid`)}
  user=user.trim().toUpperCase()
  try {
    reporter.addStep(this.testID,"info",`Login to nocommerce website app`)
    await nopcommereLoginPage.loginToNopCommerceWeb(this.testID,browser.options.nopCommerceURL,
      process.env[`TEST_NOP_${user}_USERNAME`],
      process.env[`TEST_NOP_${user}_PASSWORD`],
    )
  } catch (err) {
    err.message=`${this.testID}:failed at nocommerce login step, ${err.message}`
    throw err
  }
})