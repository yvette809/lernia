import { useState } from "react";

const Highscore = ({ handleSubmit }) => {
  const [name, setName] = useState("");
  const isValid = name.length > 0;

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleSubmit(name);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="your Name"
      />
      <input type="submit"  />
    </form>
  );
};

export default Highscore;
