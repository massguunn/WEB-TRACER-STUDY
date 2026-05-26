exports.isLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    next();
  } else {
    res.send("Akses ditolak");
  }
};

exports.isMahasiswa = (req, res, next) => {
  if (req.session.user && req.session.user.role === "mahasiswa") {
    next();
  } else {
    res.send("Akses ditolak");
  }
};
