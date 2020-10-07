const router = require('express').Router();
const { auth, file } = require('../controllers/controllers');
const { handleFile, autMiddleware } = require('../middlewares/middlewares');

const initAPIs = function (app) {
    router.post('/api/aut/login', auth.doLogin);
    router.post('/api/aut/register', auth.doRegister);
    router.post('/api/aut/logout', auth.doLogout);
    router.post('/api/aut/token/refresh', auth.doRefreshToken);
    
    router.get('/', function (req, res) {
        res.send(`<form method="post" action="/api/file/upload" enctype="multipart/form-data">
        <div>
          <label for="file">Choose a file</label>
          <input type="file" id="file" name="myFile">
        </div>
        <div>
          <input type="submit" value="Send file">
        </div>
      </form>`);
    });

    router.use(autMiddleware.canAuthenticate);

    router.post('/api/file/upload', handleFile.single('myFile'), file.doUpload);
    router.post('/api/file/get', file.getFiles);

    return app.use('/', router);
}

module.exports = initAPIs;
