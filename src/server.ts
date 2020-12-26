import app from './app';
import './swagger'
let server = app.listen(8081, () => {
    let address = server.address();
    if (typeof address == "object") {
        console.log(`Server Started on port`, address?.port)
    }
})