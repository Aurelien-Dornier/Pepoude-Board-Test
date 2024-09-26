// verrifies if the middleware function throws an error and sends a 500 error if it does
export const ctrlWrapper = (mdw) => {
  return async (req, res, next) => {
    try {
      await mdw(req, res, next);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "❌ Unexpected server error. Please try again later.",
      });
    }
  };
};
