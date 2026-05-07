
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://github.com/KodenStark/ConnectED.git',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/KodenStark/ConnectED.git"
  },
  {
    "renderMode": 2,
    "route": "/KodenStark/ConnectED.git/login"
  },
  {
    "renderMode": 2,
    "route": "/KodenStark/ConnectED.git/community"
  },
  {
    "renderMode": 0,
    "route": "/KodenStark/ConnectED.git/community/*"
  },
  {
    "renderMode": 2,
    "route": "/KodenStark/ConnectED.git/groupchat"
  },
  {
    "renderMode": 0,
    "route": "/KodenStark/ConnectED.git/groupchat/*"
  },
  {
    "renderMode": 2,
    "route": "/KodenStark/ConnectED.git/news"
  },
  {
    "renderMode": 2,
    "route": "/KodenStark/ConnectED.git/profile"
  },
  {
    "renderMode": 2,
    "route": "/KodenStark/ConnectED.git/new-user"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5808, hash: '009723e18b93508b1291003ddc2dbf1a35ef0f133040adc7676072942b737332', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1178, hash: '616511c0878dc8f5afe29eaf60508ea6c253aed597675d10a5d5a7a21797799b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 381, hash: '45320b9c0d1139cc8fb4777131e1b54bba9fab656e7c96bf41a67406d095407b', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'community/index.html': {size: 387, hash: '5df14832559f5d62be42cd2798874c85ef3fd4313a638dddf9201d2b4f26557e', text: () => import('./assets-chunks/community_index_html.mjs').then(m => m.default)},
    'news/index.html': {size: 372, hash: '85d988636e7c7a42db921156828b0e9622ccdfe03f49735d49c0b01157327761', text: () => import('./assets-chunks/news_index_html.mjs').then(m => m.default)},
    'groupchat/index.html': {size: 387, hash: 'b9d69c34d78a3f615614973abb678cdcb493ffe053fd2603aecb88639d3a11f1', text: () => import('./assets-chunks/groupchat_index_html.mjs').then(m => m.default)},
    'index.html': {size: 360, hash: '03176fcf21f28ce3ebecaf1d1869f5c5868c3a86cabf0a7c97934eea4c449e61', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 24314, hash: '36edbd4ba78c37c0b6506b23e8c61cbfb95fec657e65216deb1752c265994747', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'new-user/index.html': {size: 19761, hash: '08374c6be3e43111cf44e61540a14aa8a6c103f8e5859220c5d3b06b988658de', text: () => import('./assets-chunks/new-user_index_html.mjs').then(m => m.default)},
    'styles-4LR3LMKK.css': {size: 232790, hash: 'XT8BGZwl4Do', text: () => import('./assets-chunks/styles-4LR3LMKK_css.mjs').then(m => m.default)}
  },
};
