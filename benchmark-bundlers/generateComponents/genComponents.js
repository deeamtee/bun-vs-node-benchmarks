const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Генерация рандомного цвета в формате HEX (#RRGGBB)
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const indexComponentTemplate = (componentName) => (`import ${componentName} from './${componentName}';

export {
  ${componentName}
};
`);

const componentTemplate = (componentName) => (`import styles from './styles.module.css';

const ${componentName} = () => (
  <div className={styles.root}>
    <h2>${componentName}</h2>
  </div>
);

export default ${componentName};
`);

const styleTemplate = () => (`.root {
  background: ${getRandomColor()};
}
`);

function generateReactComponents(componentCount, outputDir) {
  // Создание директории назначения, если она не существует
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  for (let i = 1; i <= componentCount; i++) {
    const componentName = `Component${i}`;
    const componentDirPath = path.join(outputDir, componentName);
    if (!fs.existsSync(componentDirPath)) {
      fs.mkdirSync(componentDirPath);
    }

    // Генерация кода компонента
    const indexCode = indexComponentTemplate(componentName);
    const componentCode = componentTemplate(componentName);
    const cssCode = styleTemplate();
    // Определение пути для создания файла компонента
    const indexPath = path.join(componentDirPath, `index.ts`);
    const componentPath = path.join(componentDirPath, `${componentName}.tsx`);
    const cssFilePath = path.join(componentDirPath, 'styles.module.css');

    // Запись кода компонента в файл
    fs.writeFileSync(indexPath, indexCode, 'utf8');
    fs.writeFileSync(componentPath, componentCode, 'utf8');
    fs.writeFileSync(cssFilePath, cssCode, 'utf8');

    console.log(`Создан компонент ${componentPath}`);
    console.log(`Создан CSS-файл: ${cssFilePath}`);
  }
}

function collectComponents(directoryPath) {
  const files = fs.readdirSync(directoryPath);

  let components = [];

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && path.extname(file) === '.tsx') {
      const componentName = path.basename(file, '.tsx');
      const componentCode = fs.readFileSync(filePath, 'utf8');
      components.push({ name: componentName, code: componentCode });
    } else if (stat.isDirectory()) {
      const nestedComponents = collectComponents(filePath);
      components = components.concat(nestedComponents);
    }
  });

  return components;
}

function generateAppComponent(components, outputFilePath, componentsDirectory) {
  const importStatements = components.map(
    (component) => `import { ${component.name} } from './${componentsDirectory}/${component.name}';`
  );

  const componentNames = components.map((component) => component.name);

  const componentCode = `import './App.css';

${importStatements.join('\n')}

const App = () => (
  <div className="app">
    ${componentNames.map((name) => `<${name} />`).join('\n    ')}
  </div>
);

export default App;
`;

  fs.writeFileSync(outputFilePath, componentCode, 'utf8');
}


async function main() {
  const componentsCount = await askQuestion('Сколько надо создать компонентов: ');

  if (componentsCount) {
    // Пример использования: генерация 5 компонентов в директорию "components"
    generateReactComponents(componentsCount, 'components');

    // Пример использования: сбор компонентов из директории "components" и создание компонента "App" в файле "App.js"
    const componentsDirectory = 'components';
    const outputFilePath = 'App.tsx';

    const components = collectComponents(componentsDirectory);
    generateAppComponent(components, outputFilePath, componentsDirectory);

    console.log('Компонент "App" успешно создан.');
  }

  rl.close();
}

main();

