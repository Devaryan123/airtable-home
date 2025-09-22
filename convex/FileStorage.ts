// convex/functions/files.ts
// Single Convex function that handles add / list / get operations via an `op` discriminator.
// Note: This is an RPC-style dispatcher. Call it from client as a mutation/action.
// If you prefer Convex queries (useQuery), keep list/get as separate query files.

type AddPayload = {
  op: "add"
  name: string
  url: string
  size?: number
  mimeType?: string
  metadata?: Record<string, any>
}

type ListPayload = {
  op: "list"
  limit?: number
  after?: string // pagination cursor: _id to start after
}

type GetPayload = {
  op: "get"
  id: string
}

type Payload = AddPayload | ListPayload | GetPayload

export default async function files(ctx: any, payload: Payload) {
  if (!payload || typeof (payload as any).op !== "string") {
    throw new Error("Invalid payload: missing op")
  }

  const op = (payload as any).op

  if (op === "add") {
    // add file metadata
    const p = payload as AddPayload
    if (typeof p.name !== "string" || typeof p.url !== "string") {
      throw new Error("add operation requires name and url")
    }

    const fileDoc = {
      name: p.name,
      url: p.url,
      size: typeof p.size === "number" ? p.size : null,
      mimeType: p.mimeType || null,
      metadata: p.metadata || null,
      ownerId: ctx.auth && ctx.auth.userId ? ctx.auth.userId : null,
      createdAt: new Date(),
    }

    const id = await ctx.db.insert("files", fileDoc)
    return { type: "added", id, ...fileDoc }
  }

  if (op === "list") {
    // list files (most recent first) with simple pagination
    const p = payload as ListPayload
    const limit = Math.min(p.limit || 20, 100)

    // Use table().all() for compatibility; for large collections you should use Convex query APIs.
    const all = await ctx.db.table("files").all()
    all.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    let startIndex = 0
    if (p.after) {
      const idx = all.findIndex((row: any) => row._id === p.after)
      if (idx >= 0) startIndex = idx + 1
    }

    const slice = all.slice(startIndex, startIndex + limit)
    const next = slice.length === limit ? slice[slice.length - 1]._id : null

    return { type: "list", items: slice, next }
  }

  if (op === "get") {
    // get single file by id
    const p = payload as GetPayload
    if (!p.id) throw new Error("get operation requires id")
    const doc = await ctx.db.get("files", p.id)
    return { type: "get", item: doc || null }
  }

  throw new Error(`Unknown op: ${op}`)
}
