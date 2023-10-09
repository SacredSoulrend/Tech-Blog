const formatDate = (date) => {
    // Format a JavaScript date object as a string (e.g., "MM/DD/YYYY")
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  const checkIfUserIsLoggedIn = (req) => {
    return !!req.session.user_id;
  };
  
  module.exports = { formatDate, checkIfUserIsLoggedIn };
  