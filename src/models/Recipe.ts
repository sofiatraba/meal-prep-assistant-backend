import mongoose, {Schema} from "mongoose";


// Define the schema for the Recipe model
const RecipeSchema: Schema = new Schema({
    title: { type: String, required: true },
    ingredients: [{ name: String, quantity: String }],
    instructions: { type: String, required: true },
    cookTime: { type: Number, required: true },
    category: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// Create the Recipe model
const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe;

