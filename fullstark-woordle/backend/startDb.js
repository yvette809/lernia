import mongoose from "mongoose";
import { app } from "./index.js";

export function startDb(mongourl, port) {
  mongoose
    .connect(mongourl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      app.listen(port, () => {
        console.log(`server running on port ${port}`);
      })
    )
    .catch((error) => console.log(error));
}
