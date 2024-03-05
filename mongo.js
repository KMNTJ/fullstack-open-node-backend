const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://tuomasnurminen:${password}@harkat0.fdrywo4.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Harkat0`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const phoneNumberSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const PhoneNumber = mongoose.model("PhoneNumber", phoneNumberSchema);

const saveNumber = (newName, newNumber) => {
  const phoneNumber = new PhoneNumber({
    name: newName,
    number: newNumber,
  });
  phoneNumber.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
};

const listAllNumbers = () => {
  console.log("phonebook:");
  PhoneNumber.find({}).then((result) => {
    result.forEach((numberInfo) => {
      console.log(`${numberInfo.name} ${numberInfo.number}`);
    });
    mongoose.connection.close();
  });
};

if (process.argv.length == 3) {
  listAllNumbers();
}

if (process.argv.length == 5) {
  process.argv.map((x) => console.log(x));
  const newName = process.argv[3];
  const newNumber = process.argv[4];
  saveNumber(newName, newNumber);
}
