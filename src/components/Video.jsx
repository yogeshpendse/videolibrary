export function Video(params) {
  const yturl = `https://www.youtube-nocookie.com/embed/${params.videocode}`;
  return (
    <div>
      <h1>uyhg</h1>
      <iframe
        className="video-iframe"
        src={yturl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen="allowfullscreen"
      ></iframe>
    </div>
  );
}
