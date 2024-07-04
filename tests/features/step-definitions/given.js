import { Given} from "@wdio/cucumber-framework";

Given(/^Login to Inventory app$/,async function(){
  try {
      await browser.url("https://www.saucedemo.com/");
      await $(`#user-name`).setValue("standard_userr");
      await $(`#password`).setValue("secret_sauce");
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

