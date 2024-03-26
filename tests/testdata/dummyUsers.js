const user_that_shall_be_able_to_be_created = {
  username: "Tim",
  name: "Honks",
  password: "sk1kr3t",
};

const user_with_too_short_username = {
  username: "Bo",
  name: "Berry",
  password: "j4m15th3g4m3",
};

const user_with_too_short_password = {
  username: "Bonjamin",
  name: "Berry",
  password: "a1",
};


const user_liisa_läntti = {
  username: "LissuLee",
  name: "Liisa Läntti",
  password: "crypt1c"
}

const user_liisa_läntti_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikxpc3N1TGVlIiwiaWQiOiI2NjAxOGNhMmRkMjUxN2Y3YzFjMTViMmMiLCJpYXQiOjE3MTE0NDQ3NjR9.oWdEh68BxYK8m6VihA6HbaD00NryaGH-W-17C0f5kaw";

const user_a_non_existing_userId = "65faa6c65426b5aa97017280";
const user_id_of_root = "21faa6c65426b5aa97017282";
const user_username_root = "root";
const user_password_of_root = "supasekret";

module.exports = {
  user_that_shall_be_able_to_be_created,
  user_with_too_short_password,
  user_with_too_short_username,
  user_a_non_existing_userId,
  user_id_of_root,
  user_username_root,
  user_password_of_root,
  user_liisa_läntti,
  user_liisa_läntti_token
};
