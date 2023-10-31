import EXPRESS from "express";
import { engine } from "express-handlebars";
import {join,dirname} from 'path'
import { fileURLToPath } from "url";
import morgan from "morgan";
import clienteRouter from "./routes/cliente.routes.js";

const app = EXPRESS();
const __dirname = dirname(fileURLToPath(import.meta.url))

//settings
app.set('port',process.env.port || 3000)
app.set('views', join(__dirname,'views'))
app.engine('.hbs',engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

//middlewares
app.use(morgan('dev'));
app.use(EXPRESS.urlencoded({extended: false}))
app.use(EXPRESS.json())

//routes
app.get('/',(req,res)=>{
    res.render('index')
})
app.use(clienteRouter)

//run server
app.listen(app.get('port'),()=>
    console.log('server listening on port',app.get('port'))
);