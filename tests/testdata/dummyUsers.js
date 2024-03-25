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

const user_a_non_existing_userId = "65faa6c65426b5aa97017280";
const user_id_of_root = "21faa6c65426b5aa97017282";
const user_username_root = "root";

module.exports = {
  user_that_shall_be_able_to_be_created,
  user_with_too_short_password,
  user_with_too_short_username,
  user_a_non_existing_userId,
  user_id_of_root,
  user_username_root
};
