import { GetServerSideProps } from "next";
import { RowDataPacket } from "mysql2";
import sql from "../libs/dbConnection";

export default function redirect() {
	return null;
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
	query,
}) => {
	const hash = query.to;
	const connection = await sql();
	const [rows] = (await connection.execute(
		"SELECT redirectTo FROM UrlShortener_Links WHERE hash = ?",
		[hash]
	)) as RowDataPacket[];

	const link = rows[0].redirectTo;

	res.setHeader("Location", link);
	res.statusCode = 302;
	res.end();
	return { props: {} };
};