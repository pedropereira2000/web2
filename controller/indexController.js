// exporta f.teste, chamada em /routes/index
exports.index = function (req, res) {
    res.render('welcome');
};

exports.home = function (req, res) {
    res.render('home', {user: req.user});
};

exports.tecnologias = function (req, res) {
    res.render('tecnologias', {user: req.user});
};

exports.projeto = function (req, res) {
    res.render('projeto', {user: req.user});
};

exports.autor = function (req, res) {
    res.render('autor', {user: req.user});
};
