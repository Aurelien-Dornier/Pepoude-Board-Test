export const middleware404 = (req, res) => {
  res.status(404).render("404");
};
