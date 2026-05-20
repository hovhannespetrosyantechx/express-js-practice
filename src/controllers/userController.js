const registerUser = (req, res) => {
  const { username , password} = req.body;
  console.log(username, password);

  return res.status(201).json({message:'register route hit' })
};

// const loginUser = (req, res) => {
//   const { username, password} = req.body;
// };

module.exports = { loginUser, registerUser};
