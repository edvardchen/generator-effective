import { handleBidiStreamingCall } from 'grpc';
import { <%= requestType !== responseType ? requestType + ', ' + responseType : requestType %> } from '<%= pbPath %>';

/**
 * Implements the <%= method %> RPC method.
 */
const <%= method %>: handleBidiStreamingCall<<%= requestType %>, <%= responseType %>> = call => {
  // const { request, metadata } = call;
  call
    .on('data', (data: <%= requestType %>) => {
      const reply = new <%= responseType %>();
      call.write(reply);
    })
    .on('end', () => {
      call.end();
    });
};

export default <%= method %>;
