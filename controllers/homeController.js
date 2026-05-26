exports.home = (req, res) => {
  res.render("home", {
    title: "Tracer Study",
    user: req.session.user || null,
  });
};
