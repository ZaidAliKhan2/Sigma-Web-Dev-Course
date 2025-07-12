const fs = require("fs");


fs.readdir("clutteredFolder/", (err, files)=>{
   files.forEach(file =>{
    let filename = file.split('.');
    let destPath = `${filename[1]}/${filename[0]}.${filename[1]}`;
    console.log(destPath);
     if(filename[1] === "jpg" || filename[1] === "png" || filename[1] === "zip" || filename[1] === "pdf"){
        fs.rename(`clutteredFolder/${filename[0]}.${filename[1]}`, destPath, (err)=>{
          if(err){
            console.log(err)
          }else{
            console.log("Files successfully transferred..")
          }
        })
     }
   })
})
