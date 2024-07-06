import {When } from "@wdio/cucumber-framework";
import {expect} from "chai"
import logger from "../../../helpers/logger.js"
When(/^Inventory app should list (.*)$/,async function(numberOfProducts){
   // if(!numberOfProducts) throw Error(`Invalid number of products provided:${numberOfProducts}`)
   const appID = this.appID;
   const testid=this.testID
   logger.info(`${testid} counting the number of products and validating them`)
   if(!numberOfProducts) throw Error("failed error")
     let items= await $$(".inventory_item")
     await expect(items.length).to.equal(parseInt(numberOfProducts))   
});