import jwt from 'jsonwebtoken'
import appConfig from '../configs/appConfig'


const authenticateToken = (req: any, res: any, next: any) => {
  const {authorization: {secretKey}} = appConfig 
}

export default {
  authenticateToken,
}
