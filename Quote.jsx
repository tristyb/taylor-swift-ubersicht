// Options.

// Refresh every x minutes.
const mins = 5;
// Percentage from left of your screen.
const left = 2.5;
// Percentage from top of your screen.
const top = 10;



// The command gets the datsa for the output.
export const command = (dispatch) => {
  // Use promise.all to make sure we get the image url and the quote.
  Promise.all([
    fetch('/taylor-swift-quote.widget/data/images.json'),
    fetch('/taylor-swift-quote.widget/data/quotes.json')
  ]).then((responses) => {
    // Return the responses as json from both promises.
    return Promise.all(responses.map(response => {
      return response.json();
    }));
  }).then(data => {
    // Dispatch an object with a random image from the JSON and a random quote from the JSON.
    dispatch({
      type: 'FETCH_SUCCEDED', data: {
        image: data[0][Math.floor(Math.random() * data[0].length)],
        quote: data[1][Math.floor(Math.random() * data[1].length)]
      }
    })
  }).catch(error => {
    // Dispatch an error if there's been any errors.
    dispatch({ type: 'FETCH_FAILED', error });
  });
};



// This is the default update state from the ubersicht github. It just became required after I started using promises.
export const updateState = (event, previousState) => {
  if (event.error) {
    return {
      ...previousState,
      error: event.error.message
    };
  }

  return {
    output: event.data
  };
};



// Add an initial state that shows the 1989 album cover and the message getting quote. You likely won't ever see this I guess.
export const initialState = {
  output: {
    image: '/taylor-swift-quote.widget/images/1989.jpg',
    quote: 'Getting quote...',
  }
};



// The refresh frequency in milliseconds.
export const refreshFrequency = mins * 60 * 1000;



// the CSS style for this widget, written using Emotion
export const className = `
  @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
  left: ${left}%;
  top: ${top}%;
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
    background: #d3d3d3;
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
    /* Top center seems to work best for most images */
    object-position: top center;
    right: 0;
    bottom: 0;
    left: 0;
    object-fit: cover;
  }
`;



// If imgur 40-somethings then this 1989 image will be used.
function addDefaultSrc(ev) {
  ev.target.src = '/taylor-swift-quote.widget/images/1989.jpg'
}



// Render gets called after the shell command has executed. The command's output is passed in as an object.
export const render = ({ output }) => {
  // Initially I want these to be undefined so I can check for if the image is there or not.
  let img = undefined;
  let quote = undefined;

  const tape = '/taylor-swift-quote.widget/images/tape.png';
  const frame = '/taylor-swift-quote.widget/images/frame.png';

  // If we have an image we know the promise resolved and we can get both.
  if (output.image) {
    img = output.image;
    quote = output.quote;
  }

  // If image is still undefined then show a fallback photo.
  return img === undefined ? (
    <div>
      <meta name="referrer" content="no-referrer" />
      <img className="tape" src={tape} />

      <div className="image">
        <img className="frame" src={frame} />
        <img src='/taylor-swift-quote.widget/images/fallback.jpg' />
      </div>

      <blockquote>
        <p>Uh-oh, uh-oh, uh-oh, uh-oh, uh-ohhhhhh</p>
      </blockquote>
    </div>
  ) : (
    <div>
      <meta name="referrer" content="no-referrer" />
      <img className="tape" src={tape} />

      <div className="image">
        <img className="frame" src={frame} />
        <img src={img} onError={addDefaultSrc} />
      </div>

      <blockquote>
        <p>{quote}</p>
      </blockquote>
    </div>
  );
}

