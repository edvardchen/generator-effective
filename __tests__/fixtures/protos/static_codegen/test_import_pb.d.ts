// package: test.import
// file: test_import.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class ImportMessage extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ImportMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ImportMessage): ImportMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ImportMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ImportMessage;
  static deserializeBinaryFromReader(message: ImportMessage, reader: jspb.BinaryReader): ImportMessage;
}

export namespace ImportMessage {
  export type AsObject = {
  }
}

