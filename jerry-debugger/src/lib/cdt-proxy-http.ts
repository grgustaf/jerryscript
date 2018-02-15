// Copyright JS Foundation and other contributors, http://js.foundation
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { ChromeDevToolsProxyServer, JERRY_DEBUGGER_VERSION, DEVTOOLS_PROTOCOL_VERSION } from './cdt-proxy';
import * as http from 'http';
import * as path from 'path';

export function onHttpRequest(this: ChromeDevToolsProxyServer,
                              request: http.IncomingMessage, response: http.ServerResponse) {
  let url = request.url || '';
  if (url === '/json') {
    url = '/json/list';
  }

  if (request.method !== 'GET' || url.slice(0, 6) !== '/json/') {
    return;
  }

  const cmd = url.slice(6);
  let result = undefined;
  switch (cmd) {
    case 'version':
      result = {
        'Browser': JERRY_DEBUGGER_VERSION,
        'Protocol-Version': DEVTOOLS_PROTOCOL_VERSION,
      };
      break;
    case 'list':
      const urlFrag = `${this.host}:${this.port}/${this.uuid}`;
      // FIXME: linux-specific now: this should be a file:// URL to the jsfile
      const fileUrl = 'file://' + path.resolve(this.jsfile);
      result = [{
        'description': 'zephyr.js instance',
        'devtoolsFrontendUrl': `https://chrome-devtools-frontend.appspot.com/serve_file/' +
          '@60cd6e859b9f557d2312f5bf532f6aec5f284980/inspector.html?experiments=true&v8only=true&ws=${urlFrag}`,
        'id': this.uuid,
        'title': this.jsfile,
        'type': 'node',
        'url': fileUrl,
        'webSocketDebuggerUrl': `ws://${urlFrag}`,
      }];
      break;
    default:
      console.log('Warning: unhandled URL: ' + url);
      response.statusCode = 404;
      break;
  }

  if (result) {
    const json = JSON.stringify(result);
    response.setHeader('Content-Type', 'application/json; charset=UTF-8');
    response.setHeader('Content-Length', json.length);
    response.write(json);
  }
  response.end();
}
