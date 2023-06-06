import express from "express";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import User from "./api/User";


const app = express();




const port = process.env.PORT || 5432;
/** Server Handling */


app.use(express.static('src/upload/'))
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json())
app.use(cors());

app.use('/api/users', User)


app.get('/', ( req: express.Request, res: express.Response ) => {
	res.send('Hello World!')
})


//mongo
mongoose.connect('mongodb://localhost/nbamvp', { useNewUrlParser : true } as ConnectOptions)
	.then(() => {
		// tslint:disable-next-line:no-console
        app.listen(port, () => console.log('Server corriendo en el puerto ' + port));
	})
	.catch((err) => {
		// tslint:disable-next-line:no-console
		console.log(err);
	});
