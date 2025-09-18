import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import { config } from "../config";

const account = config.azure.storageAccount!;
const accountKey = config.azure.storageKey!;
const container = config.azure.container;

const cred = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net`, cred);

export async function uploadBufferToAzure(buffer: Buffer, blobName: string) {
  const containerClient = blobServiceClient.getContainerClient(container);
  await containerClient.createIfNotExists();
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadData(buffer, { blobHTTPHeaders: { blobContentType: "image/jpeg" }});
  return blockBlobClient.url;
}
