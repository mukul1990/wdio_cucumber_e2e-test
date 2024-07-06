import {config as baseConfig} from "./wdio.conf.ts"
console.log('Base Config:', baseConfig);
export const config=Object.assign(baseConfig,{
    environment:"TEST",
    sauseDemoURL:"https://www.saucedemo.com/",
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
console.log('Config:', config);
//module.exports={config}