import jwt from  'jsonwebtoken';

const jwtGen = (id) => {
  const payload = {
    user: id,
  };
  return jwt.sign(payload, process.env.REACT_APP_SECRET, { expiresIn: 60 * 1 });
}


export default jwtGen