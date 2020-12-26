import app from './app';

let server = app.listen(8080, () => {
    let address = server.address();
    if (typeof address == "object") {
        console.log(`Server Started on port`, address?.port)
    }
})