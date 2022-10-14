import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function App() {
  const [comments, setComments] = useState();
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);

  // const { videoId } = useParams();

  let openAiPrompt = `Topic: Breakfast\nSeven-Sentence Horror Story: He always stops crying when I pour the milk on his cereal. I just have to remember not to let him see his face on the carton.\n    \nTopic: Horror\nSeven-Sentence Horror Story:`;

  const handleForm = (event) => {
    event.preventDefault();

    setLoading(true);

    // chatBox.innerHTML = "";

    const userPrompt = event.target.message.value;

    // const formData = {
    //   message: userPrompt,
    // };

    setComments(userPrompt);

    const startingStr = openAiPrompt + " \nYou:" + userPrompt;

    axios
      .post(
        `https://api.openai.com/v1/completions`,
        {
          model: "text-davinci-002",
          prompt: startingStr,
          temperature: 0.5,
          max_tokens: 60,
          top_p: 1,
          frequency_penalty: 0.5,
          presence_penalty: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPEN_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      )

      .then((response) => {
        // createNewComment(response.data.choices[0].text);
        console.log(response);
        setResponse(response.data.choices[0].text);

        setLoading(false);
        // clearInput();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <video className="background-video" autoPlay loop muted poster="">
        <source src="" type="" />
      </video>

      <section className="navbar">
        <nav className="navbar__container">
          <div className="navbar__wrapper">
            <div className="navbar__left">
              <div className="navbar__date">
                <p className="navbar__date-text" id="clock">
                  <span id="clock"></span>
                </p>
              </div>
            </div>
            <div className="navbar__center">Horror Story</div>
            <div className="navbar__right">
              <p>Test</p>
            </div>
          </div>
        </nav>
      </section>
      <section className="chatbox">
        <div className="chatbox__wrapper">
          <div className="chatbox__container">
            <div className="chatbox__left"></div>
            <div className="chatbox__right"></div>
            <div className="chatbox__left"></div>
          </div>
          <div className="chatbox__form">
            <form onSubmit={handleForm} className="chatbox__form" id="form">
              <textarea
                className="chatbox__input"
                name="message"
                placeholder="Type your message here ..."
                type="submit"
                enterKeyHint="send"
              ></textarea>
              <button
                className="chatbox__submit"
                name="submit"
                type="submit"
                value="submit"
              >
                Send
              </button>
            </form>
            {loading && <p>Loading...</p>}
            {response && <p>{response}</p>}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
