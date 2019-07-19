const fs = require('fs')

fs.readdir('../documents', (err, paths) => {

    console.log(paths)

})