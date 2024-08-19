import { useStore, useCurrentLesson } from "../zustand-store";

export function Header() {
	const { currentModule, currentLesson } = useCurrentLesson();

	const { isLoading } = useStore();

	if (isLoading) {
		return <h1 className="text-2xl font-bold"> Carregando...</h1>;
	}

	return (
		<div className="flex flex-col gap-1">
			<h1 className="text-2xl font-bold"> {currentLesson?.title}</h1>
			<span className="text-small text-zinc-400">
				Módulo "{currentModule?.title}"
			</span>
		</div>
	);
}
