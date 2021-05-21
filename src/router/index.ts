import {Routes} from './type'
const getRoutes = (modulesFiles:any) => modulesFiles.keys().reduce((modules:any, modulePath:any) => [...modules, ...modulesFiles(modulePath).default], []);
const modules:Routes= getRoutes((require as any).context('./modules', true, /\.ts$/));
export default modules;
