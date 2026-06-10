const db = require("../configs/db");
const bcrypt = require("bcrypt");

// HALAMAN LOGIN
exports.index = (req, res) => {
  res.render("login", {
    error: null,
  });
};

// PROSES LOGIN
exports.login = (req, res) => {
  const { username, password } = req.body;

  // CEK ADMIN
  const queryAdmin = "SELECT * FROM admin WHERE nip = ?";

  db.query(queryAdmin, [username], async (err, resultAdmin) => {
    if (err) {
      console.error(err);
      return res.render("login", {
        error: "Terjadi kesalahan pada server",
      });
    }

    // JIKA ADMIN DITEMUKAN
    if (resultAdmin.length > 0) {
      const admin = resultAdmin[0];

      const cekPassword = await bcrypt.compare(
        password,
        admin.password
      );

      if (cekPassword) {
        req.session.user = {
          id: admin.id,
          nama: admin.nama,
          role: "admin",
        };

        return res.redirect("/");
      }

      return res.render("login", {
        error: "Password admin salah!",
      });
    }

    // CEK MAHASISWA
    const queryMahasiswa =
      "SELECT * FROM mahasiswa WHERE nim = ?";

    db.query(
      queryMahasiswa,
      [username],
      async (err, resultMahasiswa) => {
        if (err) {
          console.error(err);
          return res.render("login", {
            error: "Terjadi kesalahan pada server",
          });
        }

        if (resultMahasiswa.length > 0) {
          const mahasiswa = resultMahasiswa[0];

          const cekPassword = await bcrypt.compare(
            password,
            mahasiswa.password
          );

          if (cekPassword) {
            req.session.user = {
              id: mahasiswa.id,
              nama: mahasiswa.nama,
              role: "mahasiswa",
            };

            return res.redirect("/");
          }

          return res.render("login", {
            error: "Password mahasiswa salah!",
          });
        }

        // USER TIDAK DITEMUKAN
        return res.render("login", {
          error: "Username atau password salah!",
        });
      }
    );
  });
};

// DASHBOARD ADMIN
exports.dashboardAdmin = (req, res) => {
  res.render("admin/dashboard", {
    title: "Dashboard Admin",
    user: req.session.user,
  });
};

// DASHBOARD MAHASISWA
exports.dashboardMahasiswa = (req, res) => {
  res.render("users/dashboard", {
    title: "Dashboard Mahasiswa",
    user: req.session.user,
  });
};

// LOGOUT
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};