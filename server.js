import configuration from "./src/config/configuration.js";
import { app } from "./src/app.js";

const { PORT } = configuration.server;

app.listen(PORT, () => {
  console.log(`Server is listening on port : ${PORT}`);
});
