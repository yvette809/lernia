import app from './src/app.js'

const port = 5080;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
