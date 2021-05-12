import Database from "@replit/database"


const db = new Database()
db.set("rooms", JSON.stringify([[{roomNo: 1, occupied: false}]]))

export default async function handler(req, res) {
  switch(req.method) {
      case "GET":
        const data = await db.get("rooms")
        
        if(!data) 
            res.status(404)
         else
        res.json({data})
        break
    case "POST":
        console.log("POSTed in zimmer: %o", req.body)
        res.json({manipulation: false})
        break
    default:
        res.status(405).send("Method not allowed")
  }
}