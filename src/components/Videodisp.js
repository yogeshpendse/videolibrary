export function Videodisp({ viddata }) {
  console.log("viddata", viddata);
  const url1 = `https://www.youtube-nocookie.com/embed/${viddata.videocode}`;
  const finurl = String(url1);
  // console.log("finurl", finurl);

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black"
        }}
      >
        {/* <iframe
          width="560"
          height="315"
          src={finurl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay;
clipboard-write; encrypted-media;
gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe> */}
        <iframe
          width="560"
          height="315"
          src={finurl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
