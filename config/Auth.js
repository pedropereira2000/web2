// objeto anónimo com propriedade 'ensureAuthenticated'
module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        // msg erro
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/users/login');
    },

    logAdmin:function(req, res, next) {
        if (req.isAuthenticated()) {
            if(req.user.type == "admin"){   
                return next();
            }
        }
        // msg erro
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/users/login');
    },

    ehAdmin: function(req, res, next){
        if (req.isAuthenticated()) {
            if(req.user.type == "admin"){
                res.redirect('/admin/config')
            }else if(req.user.type == "normal") {
                return next();
            }
        }
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/users/login');
    },

    ehAdminPontos: function(req, res, next){
        if (req.isAuthenticated()) {
            if(req.user.type == "admin"){
                res.redirect('/admin/pontos')
            }else if(req.user.type == "normal") {
                return next();
            }
        }
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/users/login');
    }
};