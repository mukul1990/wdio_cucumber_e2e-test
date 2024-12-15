//import { describe,it } from "@wdio/globals";
import {browser} from "@wdio/globals"
describe('demo', async() => {
    it('demo', async() => {
        await browser.url('https://the-internet.herokuapp.com/')
        await browser.saveScreenshot('screenshot/demo.png')
        await $("ul li a[href*='tinym']").scrollIntoView()
        await browser.saveScreenshot('screenshot/demo1.png')
    })
})