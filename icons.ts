import type lucideNames from 'lucide-react/dynamicIconImports'
const dynamicIconImports = import.meta.glob<(typeof lucideNames)[keyof typeof lucideNames]>('./node_modules/lucide-react/dist/esm/icons/*.js');
export type IconName = keyof typeof lucideNames;
export const icons = Object.fromEntries(Object.entries(dynamicIconImports).map(([path, module]) => [path.split('/').splice(-1)[0].replace('.js', '') as IconName, module])) as unknown as typeof lucideNames;
export const iconNames = Object.keys(icons) as [IconName, ...(IconName[])];
