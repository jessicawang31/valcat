import { useState } from "react";

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [finalStage, setFinalStage] = useState(false); // Only true after clicking Yes after k wtv bro
  const [noButtonGone, setNoButtonGone] = useState(false); // True after "k wtv bro." is clicked
  const [noButtonPosition, setNoButtonPosition] = useState(null);

  const yesButtonSize = noCount * 27 + 16;

  const noImages = [
    "/img/cat-1.jpg", "/img/cat-2.jpg", "/img/cat-3.jpg", "/img/cat-4.jpg",
    "/img/cat-5.jpg", "/img/cat-6.jpg", "/img/cat-7.jpg", "/img/cat-8.jpg",
    "/img/cat-9.jpg", "/img/cat-10.jpg", "/img/cat-11.jpg", "/img/cat-12.jpg",
    "/img/cat-13.jpg", "/img/cat-14.jpg"
  ];

  const phrases = [
    "No", "Bruh 👁️👄👁️", "Get a load of this guy", "为什么 😿", "My therapist will hear about this",
    "I hope your pillow is always warm at night", "I see how it is.", "I thought we were friends",
    "Oh you think you're funny?", "Your phone battery will die at 1% today", "I hope your socks get wet today",
    "I can't believe you've done this", "💔💔💔💔☹️☹️☹️☹️", "k wtv bro.", "null"
  ];

  const handleNoClick = () => {
    if (noCount < 14) {
      setNoCount(prev => prev + 1);
      setYesPressed(false); // Reset Yes when clicking No again

      if (noCount === 13) {
        setNoButtonGone(true); // No button disappears after "k wtv bro."
      } else if (noCount < 13) {
        setNoButtonPosition({
          top: `${Math.random() * 90}%`,
          left: `${Math.random() * 90}%`
        });
      }
    }
  };

  const handleYesClick = () => {
    if (noButtonGone) {
      setFinalStage(true); // Only move to finalStage if "k wtv bro." was clicked first
    } else {
      setYesPressed(true);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      {/* If finalStage is reached, only show "cat-yes.jpg" and "Ok yay!!!" */}
      {finalStage ? (
        <>
          <img
            src="/img/cat-yes.jpg"
            alt="Valentine Response"
            style={{ height: "500px", width: "auto", borderRadius: "10px" }}
          />
          <div className="text-4xl font-bold my-4">yay pooks!!!</div>
        </>
      ) : (
        <>
          {/* Show cat images correctly */}
          {!yesPressed ? (
            <>
              <img className="h-[250px]" src={noImages[Math.min(noCount, noImages.length - 1)]} alt="Changing Cat Image" />
              <h1 className="text-4xl my-4">Will you be my Valentine?</h1>
            </>
          ) : (
            <>
              {/* Show GIF when "Yes" is clicked, unless "k wtv bro." was clicked */}
              <img
                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHppMTBqYjA3aTZuanQ4cnVkbDk2bXZvc3MyY256aHB5d3h6bTF6biZlcD12MV9pbnRlcm5naWZfYnlfaWQmY3Q9Zw/qiMbLh4WHEZyw/giphy.gif"
                alt="Valentine Response"
                style={{ height: "500px", width: "auto", borderRadius: "10px" }}
              />
              <div className="text-4xl font-bold my-4">You thought bro</div>
            </>
          )}

          {/* Container for Yes and No buttons */}
          <div className="flex justify-center items-center mt-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
              style={{ fontSize: yesButtonSize, paddingLeft: yesButtonSize, paddingRight: yesButtonSize }}
              onClick={handleYesClick}
            >
              Yes
            </button>

            {/* Hide No button after "k wtv bro." is clicked */}
            {!noButtonGone && noCount < 14 && (
              <button
                onClick={handleNoClick}
                className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
                  noCount === 0 ? "" : "absolute"
                }`}
                style={noCount > 0 ? {
                  position: "absolute",
                  top: noButtonPosition?.top,
                  left: noButtonPosition?.left,
                  transition: "top 0.3s ease, left 0.3s ease"
                } : {}}
              >
                {phrases[noCount]}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
