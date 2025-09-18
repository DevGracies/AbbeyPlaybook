import { prisma } from "../config/prisma";
import { producer } from "./kafka.service";

export async function createPlaybook({ title, content, authorId }: { title: string, content: string, authorId: string }) {
  const pb = await prisma.playbook.create({ data: { title, content, authorId }});
  // publish event
  await producer.send({ topic: "playbook-events", messages: [{ value: JSON.stringify({ type: "playbook_created", payload: { id: pb.id, authorId } }) }] });
  return pb;
}

export async function listPlaybooks({ authorId, feed, userId }: { authorId?: string, feed?: boolean, userId?: string | null }) {
  if (authorId) {
    return prisma.playbook.findMany({ where: { authorId }, orderBy: { createdAt: "desc" }});
  }
  if (feed && userId) {
    // get list of ids user follows
    const follows = await prisma.follow.findMany({ where: { followerId: userId }});
    const followingIds = follows.map(f => f.followingId);
    return prisma.playbook.findMany({ where: { authorId: { in: followingIds }}, orderBy: { createdAt: "desc" }});
  }
  return prisma.playbook.findMany({ orderBy: { createdAt: "desc" }});
}

export async function toggleLove(playbookId: string, userId: string) {
  const existing = await prisma.playbookLove.findUnique({ where: { userId_playbookId: { userId, playbookId }}}).catch(() => null);
  if (existing) {
    await prisma.playbookLove.delete({ where: { id: existing.id }});
    await producer.send({ topic: "playbook-events", messages: [{ value: JSON.stringify({ type: "playbook_unloved", payload: { playbookId, userId } }) }]});
  } else {
    await prisma.playbookLove.create({ data: { playbookId, userId }});
    await producer.send({ topic: "playbook-events", messages: [{ value: JSON.stringify({ type: "playbook_loved", payload: { playbookId, userId } }) }]});
  }
  // return updated count
  const count = await prisma.playbookLove.count({ where: { playbookId }});
  return count;
}
