import { Kafka } from "kafkajs";
import { config } from "../config";

const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: config.kafka.brokers
});

export const producer = kafka.producer();

export async function startProducer() {
  await producer.connect();
}
