import { useEffect } from 'react';

const InstagramEmbed = ({ url }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('src', '//www.instagram.com/embed.js');
    script.setAttribute('async', '');
    document.body.appendChild(script);
  }, []);

  return (
    <div className="my-8">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ width: '100%', margin: '0 auto' }}
      ></blockquote>
    </div>
  );
};

export default InstagramEmbed;
