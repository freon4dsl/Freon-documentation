import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

// @ts-nocheck
export function remarkExtractHeaders() {
	return (tree, file) => {
		file.data.headers = [];
		let currentHeader = null; // Keep track of the current header object
		let headerCounter = 0;

		const generateId = (text, index) => {
			let id = text.toLowerCase().replace(/ +/g, '-');
			id = id.replace(/[^a-z0-9_-]/g, '');
			id = id.replace(/^[0-9-]/, '');
			id += `-${index}`;
			if (id === '') {
				id = `header-${index}`;
			}

			return id;
		};

		const getHeaderText = (node) => {
			return toString(node);
		};

		// Function to add an ID to a node
		const addIdToNode = (node, id) => {
			node.data = node.data || {};
			node.data.hProperties = node.data.hProperties || {};
			node.data.hProperties.id = id;
		};

		// Visit each heading node in the tree
		visit(tree, 'heading', (node) => {
			// Check if the heading is a h2 or higher level
			const headerText = getHeaderText(node);
			headerCounter++;
			const headerId = generateId(headerText, headerCounter); // Generate a unique ID for the header

			currentHeader = {
				text: headerText,
				id: headerId,
				class: 'myText',
				depth: node.depth
			};

			addIdToNode(node, headerId); // Add the ID to the heading node
			if (node.depth === 2) {
				node.data.hProperties.visible = `{visible[${headerCounter - 1}]}`; // Add a visibility index to the node
				file.data.headers.push(currentHeader); // Add the current header to the headers array
			}
		});

		// Attach the headers to the `file` object
		// if (!file.data.fm) file.data.fm = {};
		// file.data.fm.headers = file.data.headers;
	};
}
