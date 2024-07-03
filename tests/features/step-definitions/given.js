import { Given} from "@wdio/cucumber-framework";

Given(/^Login to Inventory app$/,async function(){
    await browser.url("https://www.saucedemo.com/")
    await browser.setTimeout({implicit:2000,pageLoad:20000})
    await $(`#user-name`).setValue("standard_user")
    await $(`#password`).setValue("secret_sauce")
    await $(`#login-button`).click()
});

