exports.berita = (req, res) => {
  res.render("berita", {
    title: "berita",
    user: req.session.user || null,
  });
};
