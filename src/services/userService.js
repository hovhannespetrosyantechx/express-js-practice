// Example service layer

const getFormattedUser = (user) => {

  return {
    ...user,
    role: 'student'
  };

};

module.exports = {
  getFormattedUser
};
