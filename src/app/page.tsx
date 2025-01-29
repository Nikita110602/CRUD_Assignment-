"use client";
import AddTodo from "@/components/AddTodo";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import TodosMessage from "@/components/TodosMessage";
import axios from "axios";
import Footer from "@/components/ui/Footer";

type Props = {};

const Page = (props: Props) => {
	const router = useRouter();

	const logout = async () => {
		try {
			await axios.get("/api/users/logout");
			router.push("/login");
		} catch (error: any) {
			console.log("Error logging out:", error.message);
		}
	};

	return (
		<div className="flex flex-col min-h-screen bg-black">
			<main className="p-5 inset-0 mx-auto md:w-[75vh] flex-grow">
				<div className="flex justify-end p-2">
					<button onClick={logout} className="bg-blue-600 rounded-md p-2">
						Logout
					</button>
				</div>
				<h1 className="font-bold text-2xl flex flex-col justify-center items-center border-b my-5 py-5 bg-black text-white">
					Add Employee Task
				</h1>
				<Navbar />
				<AddTodo />
				<TodosMessage />
			</main>
			<Footer />
		</div>
	);
};

export default Page;
