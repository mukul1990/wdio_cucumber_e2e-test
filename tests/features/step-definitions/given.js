import { Given} from "@wdio/cucumber-framework";
import logger from "../../../helpers/logger.js"

Given(/^As (a|an) (.*) user Login to Inventory web app$/,async function(prefixText,userType,dataTable){

    console.log(`>>The User Type:${userType}`)
    this.appID="app1234"
    const testid=this.testID
    console.log(`>>Given ${testid} has been executed on platform ${process.env.PLATFORM}`)
    logger.info(`${testid} started to login into sause web app`)
    let dt=dataTable.hashes()
    // console.log(`>>type of user:${typeof dt}`)
    // console.log(`>>type of user:${dt.constructor}`)
    // console.log(`>>userType values:${JSON.stringify(dt)}`)
    //console.log('Browser Config:', browser.config);
    await browser.url("https://www.saucedemo.com/");
    await browser.maximizeWindow()
    try {
    console.log(process.env.TEST_STD_USERNAME)
    //let brw=await browser.config.sauseDemoURL
      //await $(`#user-name`).setValue(process.env.TEST_STD_USERNAME);
      await $(`#user-name`).setValue(dt[0].username);
      await $(`#password`).setValue(process.env.TEST_STD_PASSWORD);
      await $(`#login-button`).click();
      let loginError  = await $(`.error-message-container.error`).isDisplayed();
        if (loginError ) 
            throw new Error('Login failed on second attempt');
     
  } catch (err) {
      console.log("Error in first login trying")
      await browser.refresh()
      await browser.pause(2000)
      //login to app secod attempt
      await $(`#user-name`).setValue("standard_user");
      await $(`#password`).setValue("secret_sauce");
      await $(`#login-button`).click();
      const secondLoginError = await $(`.error-message-container`).isDisplayed();
        if (secondLoginError) {
            throw new Error('Login failed on second attempt');
        }
  }
 
  await browser.back()
  await browser.pause(2000)
  await browser.forward()
  //login with another standard_user
//   await browser.pause(3000);
//   await browser.reloadSession();
//   await browser.url("https://www.saucedemo.com/");
//   await $(`#user-name`).setValue("problem_user");
//   await $(`#password`).setValue("secret_sauce");
//   await $(`#login-button`).click();
//   await browser.debug();
});

