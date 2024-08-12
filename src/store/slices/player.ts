import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "..";

interface Course {
	id: number;
	modules: Array<{
		id: number;
		title: string;
		lessons: Array<{
			id: string;
			title: string;
			duration: string;
		}>;
	}>;
}
export interface PlayerState {
	course: Course | null;
	currentModuleIndex: number;
	currentLessonIndex: number;
}

const initialState: PlayerState = {
	course: null,
	currentModuleIndex: 0,
	currentLessonIndex: 0,
};

export const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		start: (state, action: PayloadAction<Course>) => {
			state.course = action.payload;
		},
		play: (state, action: PayloadAction<[number, number]>) => {
			state.currentModuleIndex = action.payload[0];
			state.currentLessonIndex = action.payload[1];
		},
		next: (state) => {
			const nextLessonIndex = state.currentLessonIndex + 1;
			const nextLesson =
				state.course?.modules[state.currentModuleIndex].lessons[
					nextLessonIndex
				];

			if (nextLesson) {
				state.currentLessonIndex = nextLessonIndex;
			} else {
				const nextModuleIndex = state.currentModuleIndex + 1;
				const nextModule = state.course?.modules[nextModuleIndex];

				if (nextModule) {
					state.currentModuleIndex = nextModuleIndex;
					state.currentLessonIndex = 0;
				}
			}
		},
	},
});

export const player = playerSlice.reducer;
export const { play, next, start } = playerSlice.actions;

export const useCurrentLesson = () => {
	return useAppSelector((state) => {
		const { currentModuleIndex, currentLessonIndex } = state.player;

		const currentModule = state.player.course?.modules[currentModuleIndex];
		const currentLesson = currentModule?.lessons[currentLessonIndex];

		return { currentLesson, currentModule };
	});
};

// {
// 	modules: [
// 		{
// 			id: "1",
// 			title: "Iniciando com React",
// 			lessons: [
// 				{ id: "Jai8w6K_GnY", title: "CSS Modules", duration: "13:45" },
// 				{
// 					id: "w-DW4DhDfcw",
// 					title: "Estilização do Post",
// 					duration: "10:05",
// 				},
// 				{
// 					id: "D83-55LUdKE",
// 					title: "Componente: Header",
// 					duration: "06:33",
// 				},
// 				{
// 					id: "W_ATsETujaY",
// 					title: "Componente: Sidebar",
// 					duration: "09:12",
// 				},
// 				{ id: "Pj8dPeameYo", title: "CSS Global", duration: "03:23" },
// 				{
// 					id: "8KBq2vhwbac",
// 					title: "Form de comentários",
// 					duration: "11:34",
// 				},
// 			],
// 		},
// 		{
// 			id: "2",
// 			title: "Estrutura da aplicação",
// 			lessons: [
// 				{
// 					id: "gE48FQXRZ_o",
// 					title: "Componente: Comment",
// 					duration: "13:45",
// 				},
// 				{ id: "Ng_Vk4tBl0g", title: "Responsividade", duration: "10:05" },
// 				{
// 					id: "h5JA3wfuW1k",
// 					title: "Interações no JSX",
// 					duration: "06:33",
// 				},
// 				{
// 					id: "1G0vSTqWELg",
// 					title: "Utilizando estado",
// 					duration: "09:12",
// 				},
// 			],
// 		},
// 	],
// }
