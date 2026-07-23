const fs = require('fs');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '..');
const destinationRoot = '/home/roham/working-directory/rotodo/pwa';

copyDirectory(
    path.join(workspaceRoot, 'projects', 'rotodo'),
    path.join(destinationRoot , 'projects', 'rotodo')
);

createAnguarJson();
copyFile('package.json');
copyFile('package-lock.json');
copyFile('tsconfig.json');
copyFile('tsconfig.base.json');
copyFile('.npmrc'); // اگر وجود داشته باشد

console.log('✅ Mini Workspace synced successfully.');

function createAnguarJson()
{
    const angularJson = JSON.parse(
    fs.readFileSync(path.join(workspaceRoot, 'angular.json'), 'utf8')
);

    const miniAngularJson = {
        ...angularJson,
        projects: {
            rotodo: angularJson.projects.rotodo
        }
    };

    fs.writeFileSync(
        path.join(destinationRoot, 'angular.json'),
        JSON.stringify(miniAngularJson, null, 2)
    );

    console.log('angular.json generated.');
}

function copyFile(fileName) {

    const source = path.join(workspaceRoot, fileName);

    if (!fs.existsSync(source)) {
        return;
    }

    if (!fs.existsSync(destinationRoot)) {
        fs.mkdirSync(destinationRoot, { recursive: true });
    }

    fs.copyFileSync(
        source,
        path.join(destinationRoot, fileName)
    );
}

function copyDirectory(source, destination) {

    if (!fs.existsSync(source)) {
        return;
    }

    fs.rmSync(destination, {
        recursive: true,
        force: true
    });

    fs.mkdirSync(path.dirname(destination), {
        recursive: true
    });

    fs.cpSync(source, destination, {
        recursive: true
    });
}