import { MongoClient } from "mongodb";

const uri =
  process.env.NODE_ENV === "development"
    ? process.env.MONGODB_URI_DEV
    : process.env.MONGODB_URI;

if (!uri) throw new Error("Missing MongoDB connection string");

const options = {
  tls: true,
  tlsAllowInvalidCertificates: process.env.NODE_ENV === "development",
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
