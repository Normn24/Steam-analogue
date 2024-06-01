const delayLoader = () => (next) => (action) => {
  if (action.type.includes("/fulfilled") && action.type.includes(":load")) {
    setTimeout(() => {
      next(action);
    }, 1000);
  } else {
    next(action);
  }
};

export default delayLoader;
