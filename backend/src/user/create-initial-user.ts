import bcrypt = require("bcryptjs");
import postgres from "postgres";

const saltOrRounds = 10;

export async function createAdminUser() {
  const sql = postgres()
  const userRepository = await sql`SELECT * FROM users;`;
  console.log('CHECKING FOR ADMIN')

  if(userRepository.length < 1){
    console.log('ADMIN NOT FOUND, CREATING ADMIN...')
    const salt = bcrypt.genSaltSync(saltOrRounds)
    const password = await bcrypt.hash("password", salt)

    const id = (
      await sql`
        INSERT INTO users (name, email, password, blocked, role) VALUES ( ${"admin"}, ${"admin@admin.com"}, ${password}, ${false}, ${"ADMIN"}) RETURNING id
        ;`
    )[0].id;
    console.log('ADMIN CREATED WITH ID: ', id)
  } else {
    console.log("ADMIN NOT CREATED")
  }
}