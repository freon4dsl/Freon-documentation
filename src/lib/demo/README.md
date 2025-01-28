# To create a packaged Freon editor

In main git project ('Freon'):

1. copy the file MockServer.ts to weblib-starter/src
2. change the server in weblib-starter/src/starter.ts to be the MockServer
3. make sure the sample project is DocuProject
4. build the editor ('npm run build-dev')
5. copy weblib-starter/public/build/dist/bundle.js to Freon-documentation/src/lib/demo,
6. and rename it to insurance-packaged.mjs
7. copy the folder with test files called 'DocuProject' from Freon/packages/server/modelstore/ to the same location
