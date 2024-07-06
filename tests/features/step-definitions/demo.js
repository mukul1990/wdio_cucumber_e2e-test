//const { Given, Then, When } = require("@wdio/cucumber-framework");
import { Given, Then, When } from "@wdio/cucumber-framework";
import {expect} from "chai"
//import {config} from `${process.cwd()}/wdio.conf.ts`
Given(/^Open Google page$/, async function () {
  await browser.url("https://www.google.com/");
 // await browser.setTimeout({implicit:15000,pageLoad:2000});
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

browser.waitUntil(async function(){
   return await browser.getTitle()==="WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO"
  ,{timeout:60000,interval:7000,timeoutMsg:`failed loading wdio web page :{${await browser.getTitle()}}`}
})
  let expectedTitle = await browser.getTitle();
  await expect(expectedTitle).to.equal(actualTitle);
  //await browser.debug()
});

Then(/^URL should match (.*)$/,async function(expectedURL){
  let actualURL= await browser.getUrl()
  await expect(expectedURL).to.equal(actualURL)
})

Given(/^A web page is opened$/,async function(){
  await browser.url("/tables");
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

When (/^Perform table Interaction$/,async function(){

  let rows=await $$(`//table[@id='table1']//tbody//tr`)
  let columns=await $$(`//table[@id='table1']//tbody//tr[1]//td`)
  console.log(rows.length)
  console.log(columns.length)
  expect(rows.length).to.equal(4)
  expect(columns.length).to.equal(6)
  //get the whole table data
  let arr=[]
  for (let i=0;i<rows.length;i++)
    {
      let persObj={
        lastName:"",
        firstName:"",
        email:"",
        due:"",
        website:"",
        action:""
      }
      for(let j=0;j<columns.length;j++)
        {
          let cellValue= await $(`//table[@id='table1']//tbody//tr[${i+1}]//td[${j+1}]`).getText()
          let firstname= await $(`//table[@id='table1']//tbody//tr[${i+1}]//td[2]`).getText()
          if(firstname==="Jason")
            {
          if(j===0)persObj.lastName=cellValue
          if(j===1)persObj.firstName=cellValue
          if(j===2)persObj.email=cellValue
          if(j===3)persObj.due=cellValue
          if(j===4)persObj.website=cellValue
          if (j === 5) persObj.action = cellValue;
            }
      }
      if(persObj.firstName)
      arr.push(persObj)
    }
    console.log(JSON.stringify(arr))
});

Given(/^Open amazon website$/,async function(){
  await browser.url("https://www.myntra.com/")
  await browser.setTimeout({ implicit: 15000, pageLoad: 20000 });
  
  //Scroll down
  await browser.execute(()=>{
    window.scrollBy(0,window.innerHeight)
  })

  await browser.pause(3000)
//scroll top
  await browser.execute(()=>{
    window.scrollBy(0,-window.innerHeight)
  })

  await browser.pause(3000)
  //Scroll down invisible portion
  await browser.execute(()=>{
    window.scrollTo(0,document.body.scrollHeight)
  })

  await browser.pause(3000)
  //Scroll Top invisible portion
  await browser.execute(()=>{
    window.scrollTo(0,document.body.scrollTop)
  })

  await browser.pause(3000)
})