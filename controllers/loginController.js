const db = require("../configs/db");
const bcrypt = require("bcrypt");

exports.index = (req, res) => {
  res.render("login");
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  // CEK ADMIN
  const queryAdmin = "SELECT * FROM admin WHERE nip = ?";

  db.query(queryAdmin, [username], async (err, resultAdmin) => {
    if (err) throw err;

    // JIKA ADMIN DITEMUKAN
    if (resultAdmin.length > 0) {
      const admin = resultAdmin[0];

      const cekPassword = await bcrypt.compare(password, admin.password);

      if (cekPassword) {
        req.session.user = {
          id: admin.id,
          nama: admin.nama,
          role: "admin",
        };

        return res.redirect("/admin/dashboard");
      }
    }

    // CEK MAHASISWA
    const queryMahasiswa = "SELECT * FROM mahasiswa WHERE nim = ?";

    db.query(queryMahasiswa, [username], async (err, resultMahasiswa) => {
      if (err) throw err;

      if (resultMahasiswa.length > 0) {
        const mahasiswa = resultMahasiswa[0];

        const cekPassword = await bcrypt.compare(password, mahasiswa.password);

        if (cekPassword) {
          req.session.user = {
            id: mahasiswa.id,
            nama: mahasiswa.nama,
            role: "mahasiswa",
          };

          return res.redirect("/users/dashboard");
        }
      }

      res.send("Login gagal");
    });
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
