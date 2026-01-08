const mongoose = require("mongoose");

let password = process.argv[2];
let name = process.argv[3];
let number = process.argv[4];

const dbName = "phonebook";
const url = `mongodb+srv://fullstack:${password}@helsinkicourse.h87jboz.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

const phoneNumberSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const PhoneNumber = mongoose.model("PhoneNumber", phoneNumberSchema);


if (name && number) {
  const phoneNumber = new PhoneNumber({
    name: p.name,
    number: p.number,
  });

  phoneNumber
    .save()
    .then((result) => {
      console.log(`Added ${p.name} number ${p.number} to phonebook`);
    })
    .finally(() => {
      mongoose.connection.close();
    });
}
else {
    PhoneNumber.find({}).then(results =>{
        printPhoneNumbers(results)
        mongoose.connection.close()
    })

}

function printPhoneNumbers(list){
    console.log("phonebook:")
    for(let person of list){
        console.log(`${person.name} ${person.number}`)
    }
}