/* eslint strict: 0, no-unused-vars: 0, no-undef: 0 */

'use strict';

function init() {
  let errorName;

  try {
    const { pathname } = window.location;
    const errorCode = parseInt(pathname.substring(1, pathname.length), 10);

    const errorCategory = Math.floor(errorCode / 100);
    const errorNumber = errorCode % 100;

    switch (errorCategory) {
      case 4:
        errorName = errorNames400[errorNumber];
        break;
      case 5:
        errorName = errorNames500[errorNumber];
        break;
      default:
        errorName = 'Unknown Error';
        break;
    }

    errorName = `${errorCode} ${errorName}`;
  } catch (exception) {
    errorName = 'Invalid Error Code';
  }

  const titleElement = document.getElementById('title');
  titleElement.innerText = errorName;
  titleElement.style.opacity = 1;

  const descriptionElement = document.getElementById('description');
  descriptionElement.innerText = errorName;
  descriptionElement.style.opacity = 1;
}

const errorNames400 = [
  'Bad Request', 'Unauthorized', 'Payment Required', 'Forbidden', 'Not Found',
  'Method Not Allowed', 'Not Acceptable', 'Proxy Authentication Required',
  'Request Timeout', 'Conflict', 'Gone', 'Length Required', 'Precondition Failed',
  'Payload Too Large', 'URI Too Long', 'Unsupported Media Type',
  'Range Not Satisfiable', 'Expectation Failed', 'I\'m a teapot',
  'Misdirected Request', 'Unprocessable Entity', 'Locked', 'Failed Dependency',
  'Upgrade Required', 'Precondition Required', 'Too Many Requests',
  'Request Header Fields Too Large', 'Unavailable For Legal Reasons'
];

const errorDescriptions400 = [

];

const errorNames500 = ['Internal Server Error', 'Not Implemented', 'Bad Gateway',
  'Service Unavailable', 'Gateway Timeout', 'HTTP Version Not Supported',
  'Variant Also Negotiates', 'Insufficient Storage', 'Loop Detected',
  'Not Extended', 'Network Authentication Required'
];
