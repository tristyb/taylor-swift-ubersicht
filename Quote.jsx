export const command = (dispatch) => {
  Promise.all([
    fetch('/taylor-swift-quote.widget/data/images.json'),
    fetch('/taylor-swift-quote.widget/data/quotes.json')
  ]).then((responses) => {
    return Promise.all(responses.map(response => {
      return response.json();
    }));
  }).then(data => {
    dispatch({
      type: 'FETCH_SUCCEDED', data: {
        image: data[0][Math.floor(Math.random() * data[0].length)],
        quote: data[1][Math.floor(Math.random() * data[1].length)]
      }
    })
  }).catch(error => {
    dispatch({ type: 'FETCH_FAILED', error });
  });
};

export const updateState = (event, previousState) => {
  console.log("updating state...");
  if (event.error) {
    console.log(event.error.message);
    return { ...previousState, error: event.error.message };
  }
  console.log(event.data);
  return { output: event.data };
};

// the refresh frequency in milliseconds
export const refreshFrequency = 300000;

// the CSS style for this widget, written using Emotion
// https://emotion.sh/
export const className = `
  @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
  left: 2.5%;
  top: 10%;
  color: white;

  blockquote {
    font-family: 'Special Elite', cursive;
    width: 300px;
    pointer-events: none;
    opacity: .95;
    transform: translateY(20px);
    background: #ebebdd;
    padding: 10px;
    margin: 0;
  }

  p {
    font-size: 16px;
    color: #222;
    text-shadow: 1px 1px 1px #fff;
    margin: 0;
    padding: 0;
    line-height: 1.2;
  }

  .tape {
    position: absolute;
    width: 150px;
    height: auto;
    transform: translateY(250px) translateX(220px) rotate(55deg);
    z-index: 3;
  }

  .image {
    width: 300px;
    height: 300px;
    overflow: hidden;
    transform: rotate(-2deg);
    position: relative;
  }

  .frame {
    width: 100%;
    position: relative;
    z-index: 2;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    object-position: top center;
    right: 0;
    bottom: 0;
    left: 0;
    object-fit: cover;
  }
`

// render gets called after the shell command has executed. The command's output
// is passed in as a string.
export const render = ({ output, error }) => {
  const img = output.image;
  const quote = output.quote;

  return error ? (
    <div>{error}</div>
  ) : (
    <div>
      <meta name="referrer" content="no-referrer" />
      <img className="tape" src="/taylor-swift-quote.widget/tape.png" />

      <div className="image">
        <img className="frame" src="/taylor-swift-quote.widget/frame.png" />
        <img src={img} />
      </div>

      <blockquote>
        <p>{quote}</p>
      </blockquote>
    </div>
  );
}

