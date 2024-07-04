import { Then} from "@wdio/cucumber-framework";
import {expect} from "chai"
Then(/^Validate all products have valid price$/,async function(){
  //get price list
  let itemsPrice = await $$(`.inventory_item_price`);
  let arr = [];
  for (let i = 0; i < itemsPrice.length; i++) {
    let price = await itemsPrice[i].getText();
    arr.push(price);
  }

  console.log(arr);
  //convert string into number
  let priceNumArr = arr.map((ele) => +ele.replace("$", ""));
  console.log(`<<price in numbers:${priceNumArr}`);

  //assert if any price value is less than or equal to zero
  let invalidPriceVal = priceNumArr.filter((ele) => ele <= 0);
  await expect(invalidPriceVal.length).to.equal(0);
});