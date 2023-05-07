'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var AlipaySdk = require('alipay-sdk').default;
var alipaySdk = new AlipaySdk({
  appId: '',
  signType: 'RSA2',
  gateway: 'https://openapi.alipaydev.com/gateway.do',
  alipayPublicKey: '',
  privateKey: ''
});
exports.default = alipaySdk;
//# sourceMappingURL=alipayUtil.js.map