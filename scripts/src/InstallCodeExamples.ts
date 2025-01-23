import { execSync } from 'node:child_process';

/**
 * Copy all examples from github project `create-freon-languages` to the code-examples folder.
 */
{
	for (const languageName of ['CourseSchedule', 'CustomizationsProject', 'Education', 'Expressions', 'Insurance', "TyperExample"]) {
		console.log(`Copying ${languageName}`);
		const langRepo = `https://github.com/freon4dsl/create-freon-languages/languages/${languageName}`;
		await execSync(`npx degit -v ${langRepo}/src/ ../code-examples/${languageName}/src/ --force`, { stdio: 'inherit' });
		await execSync(`npx degit -v ${langRepo}/extra/ ../code-examples/${languageName}/ --force`, { stdio: 'inherit' });
	}
}
