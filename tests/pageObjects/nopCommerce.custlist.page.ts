import page from "../pageObjects/page.js"
import report from "../../helpers/reporter.js"


class CustList extends page
{
    constructor()
    {
        super()
    }
    /**Page Objects */
    get firstName(){return $("input[name='SearchFirstName']")}

    get lastName(){return $("input[name='SearchLastName']")}

    get searchBtn(){return $(".btn-search")}

    get noResultMessage(){return $("td='No data available in table'");}

    /** Page Actions*/

    async searchNameAndConfirm(testid:string,firstname:string,lastname:string):Promise<boolean>
    {
        if(!firstname||!!lastname){ throw Error(`Invalid ${firstname} or ${lastname} to search`)}
        let nameNotExist=false
        firstname=firstname.trim()
        lastname=lastname.trim()
        report.addStep(testid,"info",`Searching User:${firstname} and ${lastname}`)
        try {
            await this.typeInto(await this.firstName,firstname)
            await this.typeInto(await this.lastName,lastname)
            await this.click(await this.searchBtn)
            await browser.pause(1000)
            let isNotDisplayed=await this.noResultMessage.isDisplayed();
            if(isNotDisplayed){nameNotExist=true}
        } catch (err) {
            err.message=`Failed searching given ${firstname} and ${lastname} on customer page, ${err}`
            throw err
        }
        return nameNotExist
    }

}

export default new CustList()

export function isDisplayed() {
    throw new Error("Function not implemented.")
}
