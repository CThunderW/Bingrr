const bcrypt = require("bcrypt");
const knex = require("../db/client");

class User {
  constructor({
    id,
    userName,
    email,
    password,
    passwordDigest,
    createdAt
  } = {}) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.passwordDigest = passwordDigest;
    this.createdAt = createdAt;
  }

  static async find(type, input) {
    const userRaw = await knex("users")
      .where(`${type}`, input)
      .first();
    if (!userRaw) {
      return undefined;
    }
    return new User(userRaw);
  }
  static async findById(id) {
    return knex("users")
      .where("id", id)
      .first();
  }

  static async findByEmail(email) {
    const userRaw = await knex("users")
      .where("email", email)
      .first();

    return new User(userRaw);
  }

  async save() {
    const { userName, email, password } = this;

    const [{ id, createdAt }] = await knex("users")
      .insert({
        userName,
        email,
        passwordDigest: await bcrypt.hash(password, 10)
      })
      .returning("*");

    this.id = id;
    this.createdAt = createdAt;
    console.log(this);

    return this;
  }

  async authenticate(password) {
    return bcrypt.compare(password, this.passwordDigest);
  }
}

module.exports = User;
