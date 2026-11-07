import crypto from "node:crypto"

// built in node js module system

// security related tasks
//  creating random UUID, IDs
// creating secrure token 
// hashing data
// verify 
// to verify of the data was not changed. 
// encrypt/descript. 

console.log(crypto.randomUUID())

console.log(crypto.randomBytes(16).toString('hex'))

//Hashing -> one way cryptographic
const text = 'Hello'
const hash = crypto.createHash("sha256").update(text).digest("hex")
console.log(hash)

//Hashmap
const secretKey = "my-super-secret-key"
const message = "user_id=1"

const signature = crypto.createHmac('sha256',secretKey).update(message).digest('hex');
console.log(signature)


const signatureVerify = crypto.createHmac("sha256", secretKey).update(message).digest('hex');

console.log("Signature is valid or not? ", signature === signatureVerify)