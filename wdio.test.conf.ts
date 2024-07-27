import {config as baseConfig} from "./wdio.conf.ts"
import {platform} from "../E2E_wdio_automation/data/global.js"
//console.log('Base Config:', baseConfig);
export const config=Object.assign(baseConfig,{
    environment:platform,
    sauseDemoURL:"https://www.saucedemo.com/",
    reqresBaseURL:"https://reqres.in/",
    nopCommerceURL:"https://admin-demo.nopcommerce.com/",
    sqlConfig:{
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:"AdventureWorksDW2019",
        server:"DESKTOP",
        options:{
            encrypt:false,
            trustServerCertificate:false,
            trustedConnection:true
        },
    }
})
//console.log('Config:', config);
//module.exports={config}