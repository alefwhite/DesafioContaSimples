module.exports = function (req, res, next) {
    if(req.session.user.id != undefined) {
        next();
    } else {
        res.json({"Logado" : false});
    }

}