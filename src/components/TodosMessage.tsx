"use client";
import { useTodos } from "@/context/todo";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const ITEMS_PER_PAGE = 5; // Adjust based on preference

const TodosMessage = () => {
	const { todos, toggleTodoCompleted, handleTodoDelete, handleSelectAll, handleDeleteAll } = useTodos();
	const searchParams = useSearchParams();
	const todosFilter = searchParams.get("todos");

	let filteredTodos = todos;

	if (todosFilter === "active") {
		filteredTodos = filteredTodos.filter((todo) => !todo.completed);
	} else if (todosFilter === "completed") {
		filteredTodos = filteredTodos.filter((todo) => todo.completed);
	}

	// **Pagination Logic**
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);

	// Slice todos based on current page
	const paginatedTodos = filteredTodos.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

	return (
		<section>
			<div className="flex justify-between text-black font-semibold font-mono px-6">
				<button onClick={handleSelectAll}>Select All</button>
				<button onClick={handleDeleteAll}>Delete All</button>
			</div>

			<ul className="flex flex-col justify-center items-center">
				{paginatedTodos.map((todo) => (
					<li
						key={todo.id}
						className="min-h-[4rem] w-full px-6 grid grid-cols-3 items-center border-y border-gray-600 my-3"
					>
						<input
							type="checkbox"
							className="w-5 h-5 cursor-pointer justify-self-start"
							id={`todo-${todo.id}`}
							checked={todo.completed}
							onChange={() => toggleTodoCompleted(todo.id)}
						/>
						<label
							htmlFor={`todo-${todo.id}`}
							className={` ${todo.completed ? "line-through text-red-600 " : ""} justify-self-start`}
						>
							{todo.task}
						</label>
						{todo.completed && (
							<button
								className="p-2 text-sm w-28 inline-block rounded-full text-white bg-blue-600 hover:bg-blue-700 justify-self-end"
								type="button"
								onClick={() => handleTodoDelete(todo.id)}
							>
								Delete Task
							</button>
						)}
					</li>
				))}
			</ul>

			{/* Pagination Controls */}
			<div className="flex justify-between items-center px-6 py-3">
				<button
					onClick={prevPage}
					disabled={currentPage === 1}
					className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
				>
					Previous
				</button>
				<span className="text-lg font-semibold">
					Page {currentPage} of {totalPages}
				</span>
				<button
					onClick={nextPage}
					disabled={currentPage === totalPages}
					className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
				>
					Next
				</button>
			</div>
		</section>
	);
};

export default TodosMessage;
