import {When } from "@wdio/cucumber-framework";
import {expect} from "chai"

When(/^Inventory app should list (.*)$/,async function(numberOfProducts){
    if(!numberOfProducts) throw Error(`Invalid number of products provided:${numberOfProducts}`)
     let items= await $$(".inventory_item")
     await expect(items.length).to.equal(parseInt(numberOfProducts))   
});