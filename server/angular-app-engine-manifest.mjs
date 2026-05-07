
export default {
  basePath: 'https://github.com/KodenStark/ConnectED.git',
  allowedHosts: [],
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
