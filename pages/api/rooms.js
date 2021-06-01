const rooms = []
generateRandomRooms()

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const data = rooms

      if (!data) res.status(404)
      else res.json({ ok: true, data })

      break
    case 'POST':
      if (
        !('roomNo' in req.body) ||
        !('occupy' in req.body) ||
        (req.body.occupy === true &&
          (!('name' in req.body) || !'address' in req.body))
      )
        return res.status(400).json({
          ok: false,
          message:
            'Please specifiy roomNo and occupy, name and address are required when occupying',
        })

      const { occupy } = req.body
      const roomNo = to3DigitStr(req.body.roomNo)

      const level = Math.floor(req.body.roomNo / 100)

      if (level > rooms.length)
        return res.status(400).json({ ok: false, message: 'Level not found' })

      const roomI = rooms[level].findIndex((room) => room.roomNo == +roomNo)

      if (roomI < 0)
        return res.status(400).json({ ok: false, message: 'Room not found' })

      console.log({ room: rooms[level][roomI], occupy, level, ...req.body })

      if (!occupy && !rooms[level][roomI].occupied)
        return res
          .status(400)
          .json({ ok: false, message: 'Room is not occupied' })

      if (occupy && rooms[level][roomI].occupied)
        return res
          .status(400)
          .json({ ok: false, message: 'Room is already occupied' })

      rooms[level][roomI].occupied = occupy
      if (occupy) {
        rooms[level][roomI].name = req.body.name
        rooms[level][roomI].address = req.body.address
      } else {
        rooms[level][roomI].name = null
        rooms[level][roomI].address = null
      }

      res.json({ ok: true, room: rooms[level][roomI] })
      break
    default:
      res.status(405).send('Method not allowed')
  }
}

function generateRandomRooms() {
  for (let level = 0; level < 6; level++) {
    const _rooms = []
    for (let room = 1; room < 11; room++) {
      const roomKey = `${level}${to2DigitStr(room)}`
      const occupied = Math.random() > 0.6
      _rooms.push({
        roomNo: +roomKey,
        occupied,
        name: occupied ? 'Joe' : null,
        address: occupied ? 'Some Addr' : null,
      })
    }

    rooms.push(_rooms)
  }
  return
}

function to2DigitStr(num) {
  return ('00' + num).slice(-2)
}

function to3DigitStr(num) {
  return ('000' + num).slice(-3)
}
