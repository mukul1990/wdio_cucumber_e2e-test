import { When } from "@wdio/cucumber-framework";
import { expect } from "chai";
import logger from "../../../helpers/logger.js";
import reporter from "../../../helpers/reporter.js";
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
