module.exports = {
	mode: "jit",
	purge: {
		enabled: process.env.NODE_ENV === "production",
		safeList: [],
		content: ["./index.html", "./src/**/*.tsx", "./src/**/*.ts"],
	},
	theme: {
		minWidth: {
			40: "10rem",
			60: "15rem",
			80: "20rem",
			100: "25rem",
		},
		maxWidth: {
			120: "30rem",
			160: "40rem",
			200: "50rem",
		},
	},
	variants: {},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			"forest",
			{
				customTheme: {
					primary: "#374151",
					secondary: "#3ec491",
					accent: "#ddb068",
					neutral: "#1F1D35",
					"base-100": "#2C4363",
					info: "#3487CB",
					success: "#3FDE91",
					warning: "#FCBE4A",
					error: "#F36144",
				},
			},
		],
	},
};
