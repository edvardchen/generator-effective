// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var test_import_pb = require('./test_import_pb.js');
var common_pb = require('./common_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_common_CommonObj(arg) {
  if (!(arg instanceof common_pb.CommonObj)) {
    throw new Error('Expected argument of type common.CommonObj');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_common_CommonObj(buffer_arg) {
  return common_pb.CommonObj.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var MockServiceService = exports.MockServiceService = {
  greet: {
    path: '/test.import.MockService/Greet',
    requestStream: false,
    responseStream: false,
    requestType: common_pb.CommonObj,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_common_CommonObj,
    requestDeserialize: deserialize_common_CommonObj,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.MockServiceClient = grpc.makeGenericClientConstructor(MockServiceService);
