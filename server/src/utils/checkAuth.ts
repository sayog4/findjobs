import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

function authorization(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.access_token

  if (!token) return res.status(403).json({ message: 'You are Unauthorized!!' })

  try {
    const data = verify(token, process.env.JWT_SECRET as string)
    if (typeof data === 'string') return res.sendStatus(403)
    req.userId = data.id
  } catch (error) {
    return res.sendStatus(403)
  }
}
export { authorization }
