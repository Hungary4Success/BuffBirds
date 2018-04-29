/* eslint strict: 0, no-unused-vars: 0, no-undef: 0 */

'use strict';

function init() {
  let errorName;
  let errorDescription;


  const { pathname } = window.location;
  let errorCode = parseInt(pathname.substring(1, pathname.length), 10);
  if (pathname === '/') errorCode = 404;

  const errorCategory = Math.floor(errorCode / 100);
  const errorNumber = errorCode % 100;

  switch (errorCategory) {
    case 4:
      if (errorNumber > errorNames400.length - 1) {
        throw new Error('Invalid error code');
      }

      errorName = `${errorCode} - ${errorNames400[errorNumber]}`;
      errorDescription = errorDescriptions400[errorNumber];
      break;
    case 5:
      if (errorNumber > errorNames500.length - 1) {
        throw new Error('Invalid error code');
      }

      errorName = `${errorCode} - ${errorNames500[errorNumber]}`;
      errorDescription = errorDescriptions500[errorNumber];
      break;
    default:
      errorName = 'Invalid Error Code';
      errorDescription = 'Please specify an error code in the range 400 <= n <= 418';
      errorDescription += ' or 500 <= n <= 511';
      break;
  }

  const titleElement = document.getElementById('title');
  titleElement.innerText = errorName;
  titleElement.style.opacity = 1;

  const descriptionElement = document.getElementById('description');
  descriptionElement.innerText = errorDescription;
  descriptionElement.style.opacity = 1;
}

const errorNames400 = [
  'Bad Request', 'Unauthorized', 'Payment Required', 'Forbidden', 'Not Found',
  'Method Not Allowed', 'Not Acceptable', 'Proxy Authentication Required',
  'Request Timeout', 'Conflict', 'Gone', 'Length Required', 'Precondition Failed',
  'Payload Too Large', 'URI Too Long', 'Unsupported Media Type',
  'Range Not Satisfiable', 'Expectation Failed', 'I\'m a teapot'
];

const errorDescriptions400 = [
  'The request could not be understood by the server due to malformed syntax. ',
  'The request requires user authentication.',
  'This code is reserved for future use.',
  'The server understood the request, but is refusing to fulfill it.',
  'The server has not found anything matching the Request-URI.',
  'The method specified in the Request-Line is not allowed for the resource identified by the Request-URI.',
  'The resource identified by the request is only capable of generating response entities'
  + ' which have content characteristics not acceptable according to the accept headers sent in the request.',
  'This code is similar to 401 (Unauthorized), but indicates that the client must first authenticate itself with the proxy.',
  'The client did not produce a request within the time that the server was prepared to wait.',
  'The request could not be completed due to a conflict with the current state of the resource.',
  'The requested resource is no longer available at the server and no forwarding address is known.',
  'The server refuses to accept the request without a defined Content- Length.',
  'The precondition given in one or more of the request-header fields evaluated to false when it was tested on the server.',
  'The server is refusing to process a request because the request entity is larger than the server is willing or able to process.',
  'The server is refusing to service the request because the Request-URI is longer than the server is willing to interpret.',
  'The server is refusing to service the request because the entity of the request is in a format'
  + ' not supported by the requested resource for the requested method.',
  'A server SHOULD return a response with this status code if a request included a Range request-header field,'
  + ' and none of the range-specifier values in this field overlap the current extent of the selected resource',
  'The expectation given in an Expect request-header field could not be met by this server.',
  'I\'m a teapot!'
];


const errorNames500 = ['Internal Server Error', 'Not Implemented', 'Bad Gateway',
  'Service Unavailable', 'Gateway Timeout', 'HTTP Version Not Supported',
  'Variant Also Negotiates', 'Insufficient Storage', 'Loop Detected', 'Not in Use',
  'Not Extended', 'Network Authentication Required'
];

const errorDescriptions500 = [
  'The server encountered an unexpected condition which prevented it from fulfilling the request.',
  'The server does not support the functionality required to fulfill the request.',
  'The server, while acting as a gateway or proxy, received an invalid response'
  + ' from the upstream server it accessed in attempting to fulfill the request.',
  'The server is currently unable to handle the request due to a temporary overloading or maintenance of the server.',
  'The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server specified by the URI.',
  'The server does not support, or refuses to support, the HTTP protocol version that was used in the request message.',
  'This indicates that the server has an internal configuration error.',
  'The method could not be performed on the resource because the server is unable to store'
  + ' the representation needed to successfully complete the request.',
  'This indicates that the server terminated an operation because it encountered an infinite loop while processing a request.',
  'This error code is not in use.',
  'This status code, while used by many servers, is not specified in any RFCs.',
  'The policy for accessing the resource has not been met in the request.',
  'This indicates that the client needs to authenticate to gain network access.'
];
