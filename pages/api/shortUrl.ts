// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import generateRandomString from "@/libs/generateRandomString";
import connection from "@/libs/dbConnection";

type Data = {
	message?: string;
	url?: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const now = Date.now();
	const hash = now + "-" + generateRandomString(6);
	try {
		const sql = await connection();

		const [rows, fields] = await sql.execute(
			"INSERT INTO UrlShortener_Links (hash, redirectTo) VALUES (?, ?)",
			[hash, req.body.url]
		);
		return res
			.status(200)
			.json({ url: `${process.env.NEXT_PUBLIC_API_URL}redirect?to=${hash}` });
	} catch (e) {
		//return
		return res.status(500).json({ message: "Internal server error!" });
	}
}
