import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export const request = async (url) => {
	const response = await axios.get(url, {
		headers: {
			Authorization: `token ${GITHUB_TOKEN}`,
		},
	});
	return response.data;
};
