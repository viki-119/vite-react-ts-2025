// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { loadMicroApp, MicroApp } from 'qiankun';
// import { microApps } from '../../micro-app-config';

// const MicroAppContainer: React.FC = () => {
//   const location = useLocation();
//   const [microApp, setMicroApp] = React.useState<MicroApp | null>(null);

//   useEffect(() => {
//     // 根据当前路径查找对应的微应用配置
//     const currentPath = location.pathname;
//     const app = microApps.find(app => currentPath.startsWith(app.activeRule as string));

//     if (app) {
//       // 如果找到对应的微应用配置，则加载微应用
//       const microApp = loadMicroApp({
//         name: app.name,
//         entry: app.entry,
//         container: app.container,
//       });
//       setMicroApp(microApp);
//     }

//     return () => {
//       // 组件卸载时卸载微应用
//       if (microApp) {
//         microApp.unmount();
//       }
//     };
//   }, [location.pathname]);

//   return <div id="subapp-container"></div>;
// };

// export default MicroAppContainer;
