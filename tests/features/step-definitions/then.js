import { Then} from "@wdio/cucumber-framework";
import {expect} from "chai"
import logger from "../../../helpers/logger.js"
import reporter from "../../../helpers/reporter.js";
import fs from "fs"
import custList from "../../pageObjects/nopCommerce.custlist.page.js"

Then(/^Validate all products have valid price$/,async function(){
  //get price list

  const appID = this.appID;
  const testid=this.testID
  logger.info(`${testid} started validating the products price`)
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

Then(/^Verify if all users exist in customer list$/,async function(){
  /**1. Navigate/Select customer options from left Menu */
    try {
      await browser.url(`${browser.options.nopCommerceURL}/Admin/Customer/List`)
      reporter.addStep(this.testID,"info",`Navigate to CutomerList Screen`)
    /**2. Read API response from data/folder */
      let fileName=`${process.cwd()}/data/apiRest/apiTest.json`
      let data=fs.readFileSync(fileName,"utf8")
      let dataObj=JSON.parse(data)
    /** 3. For each user object in API response */
      let numOfObj=dataObj.data.length
      let arr=[]
      for(let i=0;i<numOfObj;i++)
      {
        let obj={}
        let firstname=dataObj.data[i].first_name
        let lastname=dataObj.data[i].last_name
        let custNotFound= custList.searchNameAndConfirm(this.testID,firstname,lastname)
        if(custNotFound)
        {
          obj["firstname"]=firstname
          obj["lastName"]=lastname
          arr.push(obj)
        }
      }
    /** 4. In case user doesn't exist write error to Log file */
      if(arr.length>1)
      {
        let filePath=`${process.cwd()}/results/custNotFoundList.json`
        let data=JSON.stringify(arr,undefined,4)
        fs.writeFileSync(filePath,data)
      }
    } catch (err) {
      err.message=`${this.testID}: failed at checking users in nopcommerce site, ${err.message}`
      throw err
    }
})