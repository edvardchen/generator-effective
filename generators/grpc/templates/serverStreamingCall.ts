import { handleServerStreamingCall } from 'grpc';
import { <%= requestType %>, <%= responseType %> } from '<%= pbPath %>';

/**
 * Implements the <%= method %> RPC method.
 */
const <%= method %>: handleServerStreamingCall<<%= requestType %>, <%= responseType %>> = (
  call
) => {
  // const { request, metadata } = call;
  const reply = new <%= responseType %>();
  call.write(reply);
  call.end();
};

export default <%= method %>;
