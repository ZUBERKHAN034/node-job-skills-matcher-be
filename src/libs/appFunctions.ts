import fs from 'fs';

class AppFunctions {
  /**
   * Loads environment variable types based on the given condition.
   *
   * @return {void} This function does not return a value
   */
  public loadEnvTypes(): void {
    const envFilePath = `${__dirname}/../../../.env`;
    const loadedEnvFileContents = fs.readFileSync(envFilePath, 'utf-8');

    const definedEnvVariableNames = loadedEnvFileContents
      .split('\n')
      .filter((line) => line.trim() !== '' && !line.startsWith('#'))
      .map((line) => line.split('=')[0]);

    // Generate the type definition for defined environment variables
    const envTypeDefinition = definedEnvVariableNames.map((variableName) => `${variableName}: string;`).join('\n');

    // Write the type definition to a TypeScript declaration file
    const typeDefinitionFilePath = `${__dirname}/../../../env.d.ts`;
    fs.writeFileSync(
      typeDefinitionFilePath,
      `declare global {\n  namespace NodeJS {\n    interface ProcessEnv {\n${envTypeDefinition}\n    }\n  }\n}\n\nexport {};`,
    );

    // eslint-disable-next-line no-console
    console.debug('DEV ENVIRONMENT INTERFACE GENERATED 🚀');
  }
}

export default new AppFunctions();
