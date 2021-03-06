import { handleUnaryCall } from 'grpc';
import { <%= requestType %>, <%= responseType %> } from '<%= pbPath %>';

/**
 * Implements the <%= method %> RPC method.
 */
const <%= method %>: handleUnaryCall<<%= requestType %>, <%= responseType %>> = (
  call,
  callback
) => {
  // const { request, metadata } = call;
  const reply = new <%= responseType %>();
  callback(null, reply);
};

export default <%= method %>;
