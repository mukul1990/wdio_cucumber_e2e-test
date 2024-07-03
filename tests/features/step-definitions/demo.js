//const { Given, Then, When } = require("@wdio/cucumber-framework");
import { Given, Then, When } from "@wdio/cucumber-framework";
import {expect} from "chai"

Given(/^Open Google$/, async function () {
  await browser.url("https://www.google.com/");
  await browser.setTimeout({implicit:15000,pageLoad:2000});
  await browser.maximizeWindow()
});

When(/^search for (.*)/, async function (searchItem) {
  console.log(`>>searchITem: ${searchItem}`);
  let ele = await $("#APjFqb");
  await ele.setValue(searchItem);
  await browser.keys("Enter");
});

When(/^click for first search result link$/, async function () {
  let ele = await $("<h3>");
  await ele.click();
  await browser.pause(3000);
});

Then(/^Assert that URL is (.*)$/, async function (expectedURL) {
  let actualTitle = await browser.getTitle();
  await browser.url(expectedURL);
  let expectedTitle = await browser.getTitle();
  await expect(expectedTitle).to.equal(actualTitle);
  //await browser.debug()
});

Given(/^A web page is opened$/,async function(){
  await browser.url("/inputs");
  await browser.setTimeout({ implicit: 15000, pageLoad: 20000 });
  await browser.maximizeWindow();
});

When (/^Perform web Interaction$/,async function(){

    /*
    1. Input box
    Actions
    *1. Type into Input box
    *2. Clear the field and type or just addvalue
    *3. click and type
    *4. slow typing
    */
    let ele = await $(`input[type="number"]`);
    //await ele.setValue("12345");
    //await ele.addValue("2345")
    let val=12345
    val=val.toString()
    await ele.click()
    for(let i=0;i<val.length;i++)
        {
            await browser.pause(1000)
            await ele.addValue(val[i])
        }
    await browser.pause(2000)
});