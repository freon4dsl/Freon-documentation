import { execSync } from 'node:child_process';

/**
 * Copy all examples from GitHub project `create-freon-languages` to the code-examples folder.
 */
{
	const branch = "#2.0.0"
	for (const languageName of ['CourseSchedule', 'CustomizationsProject', 'Education', 'EducationInterpreter', 'Expressions', 'Insurance', "TyperExample"]) {
		console.log(`Copying ${languageName}`);
		const langRepo = `https://github.com/freon4dsl/create-freon-languages/languages/${languageName}`;
		await execSync(`npx degit -v ${langRepo}/src/${branch} ../code-examples/${languageName}/src/ --force`, { stdio: 'inherit' });
		await execSync(`npx degit -v ${langRepo}/extra/${branch} ../code-examples/${languageName}/ --force`, { stdio: 'inherit' });
	}
	for (const languageName of ['IntegrationExample']) {
		console.log(`Copying ${languageName}`);
		const langRepo = `https://github.com/freon4dsl/IntegrationExample/packages/webapp`; // TODO use flowbite app
		await execSync(`npx degit -v ${langRepo} ../code-examples/${languageName}/webapp/ --force`, { stdio: 'inherit' });
	}
}
