import { ServerUnaryCall, sendUnaryData } from 'grpc';
import { <%= requestType %>, <%= responseType %> } from '<%= pbPath %>';

/**
 * Implements the <%= method %> RPC method.
 */
export default function <%= method %>(
  call: ServerUnaryCall<<%= requestType %>>,
  callback: sendUnaryData<<%= responseType %>>
): void {
  const reply = new <%= responseType %>();
  callback(null, reply);
}
