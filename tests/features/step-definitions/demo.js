//const { Given, Then, When } = require("@wdio/cucumber-framework");
import { Given, Then, When } from "@wdio/cucumber-framework";
import {expect} from "chai"

Given(/^Open Google$/, async function () {
  await browser.url("https://www.google.com/");
  await browser.pause(3000);
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
