import * as express from "express";
import {CardController} from "../controllers/card.controller";

const cardRouter = express.Router();


//Create a card for particular user
cardRouter.post("/create-card/:id",CardController.createCard);

//Get all the cards
cardRouter.get("/",CardController.getAllCards);

//Get a particular card
cardRouter.get("/:id",CardController.getCardByID);

cardRouter.put("/:id",CardController.updateCard);

cardRouter.delete("/:id",CardController.deleteCard);
export default cardRouter;