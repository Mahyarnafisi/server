import Favorite from "../models/favorites.model.js";

export const getFavorites = async (req, res) => {
  const { userID } = req.params;
  try {
    // Get the user's favorite list
    const getFavorites = await Favorite.findOne({ userID: userID });
    res.status(200).json({
      message: "get favorites",
      getFavorites,
    });
  } catch (error) {
    console.log(error, "GET Favorite");
  }
};

export const postFavorite = async (req, res) => {
  const { userID } = req.params;
  const getUser = await Favorite.findOne({ userID: userID });

  try {
    // If the user already has a favorite list, update it
    if (getUser) {
      // Update the user's favorite list
      await Favorite.findOneAndUpdate({
        userID: userID,
        $push: { favoritesList: req.body },
      });

      return res.status(400).json({
        message: "User already has a favorite list and update it",
      });
    }

    // If the user does not have a favorite list, create a new one
    if (!getUser) {
      // Create a new favorite list
      const newFavorite = new Favorite({
        userID: userID,
        favoritesList: req.body,
      });
      await newFavorite.save();
      return res.status(200).json({
        message: "Post Favorite",
      });
    }
  } catch (error) {
    console.log(error, "POST Favorite");
  }
};

export const deleteFavorite = async (req, res) => {
  const { userID } = req.params;

  try {
    // Delete the item from the user's favorite list
    await Favorite.findOneAndUpdate({ userID: userID, $pull: { favoritesList: { _id: req.body.itemID } } });
    return res.status(200).json({
      message: "Delete Favorite ",
    });
  } catch (error) {
    console.log(error, "Delete Favorite");
  }
};
