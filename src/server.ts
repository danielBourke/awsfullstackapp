import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  /**************************************************************************** */
  app.get( "/filteredimage:image_url", async (req: Request, res: Response ) => {
    let image_url:string = req.query.image_url;
    const image =  await filterImageFromURL(image_url);
    if(!image){
      res.status(400).send("an image is required")
    }
    res.status(200).sendFile(image);
    deleteLocalFiles([image_url]);
  } );
  //! END @TODO1
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();