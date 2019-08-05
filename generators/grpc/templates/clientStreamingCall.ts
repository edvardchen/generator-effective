import { handleClientStreamingCall } from 'grpc';
import { <%= requestType %>, <%= responseType %> } from '<%= pbPath %>';

/**
 * Implements the <%= method %> RPC method.
 */
const <%= method %>: handleClientStreamingCall<<%= requestType %>, <%= responseType %>> = (
  call,
  callback
) => {
  // const { request, metadata } = call;
  call
    .on('data', (data: <%= requestType %>) => {})
    .on('end', () => {
      const reply = new <%= responseType %>();
      callback(null, reply);
    });
};

export default <%= method %>;
