import jwt from 'jsonwebtoken'
import config from '../config'


const authenticateToken = (req: any, res: any, next: any) => {
  const {authorization: {secretKey}} = config 
}

export default {
  authenticateToken,
}
