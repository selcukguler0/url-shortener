import mysql from "mysql2/promise";

export default async function connection() {
	const connection = await mysql.createConnection('mysql://h7oisbypisk8o5hn895m:pscale_pw_e8YwczN6B7KnH9baltmJLmhENLy9vcHYXJ5QLEIneOM@eu-central.connect.psdb.cloud/generaldb?ssl={"rejectUnauthorized":true}');
	return connection;
}
