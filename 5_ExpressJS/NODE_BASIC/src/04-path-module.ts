//build and read file path

import path from "node:path";

//const filePath = projectRoot + "/uploads" + filename


// this uses the correct separator for the current os 
//path.join
//in mac users/projects/...
//in window C:\Users\Projects

//This give the project root
const projectRoot = process.cwd();
console.log(projectRoot);

const userId = "42"
const originalName = "profile.photo.png"

//imp -> path.join -> creates a path STRING
// it will not create the folder
// it does not check whether the file exist or not

const uploadFilePath = path.join(
    projectRoot, 
    "uploads", 
    "users", 
    userId, 
    originalName
)


console.log(uploadFilePath)



//return final part of the path
// in this case -> will return -> profile.photo.png
const fileName = path.basename(uploadFilePath)
const fileExt = path.extname(uploadFilePath)
const parentFolder = path.dirname(uploadFilePath)

console.log(fileName)
console.log(fileExt)
console.log(parentFolder)


