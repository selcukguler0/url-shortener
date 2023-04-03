import Head from "next/head";
import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
	const [url, setUrl] = useState<string>("");

	const shortUrl = async () => {
		const res = await fetch("/api/shortUrl", {
			method: "POST",
			body: JSON.stringify({ url }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		await navigator.clipboard.writeText(data.url);
		notify();
		console.log(data);
	};
	const notify = () => toast("Url Copied to Clipboard!");
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ToastContainer />
			<div className="h-full leading-normal tracking-normal text-indigo-400 m-6 bg-cover bg-fixed">
				{/*Nav*/}
				<div className="w-full container mx-auto">
					<div className="w-full flex items-center justify-between">
						<a
							className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
							href="#">
							Short
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
								Ez
							</span>
						</a>
						<div className="flex w-1/2 justify-end content-center">
							<a
								className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
								href="https://github.com/selcukguler0">
								<FaGithub />
							</a>
							<a
								className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
								href="https://www.linkedin.com/in/selçukgüler">
								<FaLinkedin />
							</a>
						</div>
					</div>
				</div>
				{/*Main*/}
				<div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row justify-center items-center">
					{/*Left Col*/}
					<div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
						<h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
							Start{" "}
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
								Shorting{" "}
							</span>
							url(s)!
						</h1>
						<p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
							Easy and simple
						</p>
						<form className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
							<div className="mb-4">
								<label
									className="block text-blue-300 py-2 font-bold mb-2"
									htmlFor="url">
									Enter your url
								</label>
								<input
									onChange={(e) => setUrl(e.target.value)}
									value={url}
									className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
									id="url"
									type="text"
									placeholder="selcukguler.com"
								/>
							</div>
							<div className="flex items-center justify-between pt-4">
								<button
									onClick={shortUrl}
									className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
									type="button">
									{"Let's Short!"}
								</button>
							</div>
						</form>
					</div>
				</div>
				{/*Footer*/}
			</div>
		</>
	);
}
