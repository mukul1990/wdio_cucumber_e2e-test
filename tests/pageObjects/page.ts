
declare const browser: any;
 class page
{
    constructor()
    {
        
    }

    async navigateTo(path: any)
    {
        await browser.url(path)
        await browser.maximizeWindow()     
    }

    async click(ele:any)//:WebdriverIO.Element)
    {
        await ele.waitForClickable({timeout:5000})
        if(!ele.elementId)
        {
            throw Error(ele.error?.message)
        }
        await ele.click()
    }

    //async typeInto(ele:WebdriverIO.Element,text:string)
    async typeInto(ele:any,text: string)
    {
      await ele.waitForDisplayed({ timeout: 5000 });
      if (!ele.elementId) {
        throw Error(ele.error?.message);
      }

      await ele.setValue(text);
    }
}

export default page;