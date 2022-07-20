/*
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-07-20 09:29:05
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-07-20 09:29:11
 * @Description: 
 */

const fs = require('fs');
const crypto = require('crypto');

try {
  fs.writeFileSync('master-key.txt', crypto.randomBytes(96).toString('base64'));
} catch (err) {
  console.error(err);
}