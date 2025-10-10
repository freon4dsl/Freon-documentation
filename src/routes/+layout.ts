export const prerender = true;

export const ssr = true;

export const load = async () => {
	return {
		title: "Freon - Language Workbench",
		description: "The Freon Language Workbench is a tool that creates domain specific languages, including a web-based projectional editor",
		tags: [ "DSL", "TypeScript", "forms", "projectional editing", "Svelte"]
	};
};

// todo make sure the metadata at the highest level is in order
