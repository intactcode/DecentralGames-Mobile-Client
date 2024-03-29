import Head from 'next/head';
import { Constants } from '@/components/common';

declare const window: any;

interface HeaderProps {
  title: string;
  image: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { title, image } = props;
  function segmentSnippet() {
    if (typeof window === 'undefined') {
      return;
    }
    // create a queue, but don't obliterate an existing one
    var analytics = (window.analytics = window.analytics || []);

    // if the real analytics.js is already on the page return
    if (analytics.initialize) return;

    // if the snippet was invoked already show an error
    if (analytics.invoked) {
      if (window.console && console.error) {
        console.error('Segment snippet included twice.');
      }
      return;
    }

    // invoked flag, to make sure the snippet is never invoked twice
    analytics.invoked = true;

    // list of the methods in Analytics.js to stub
    analytics.methods = [
      'trackSubmit',
      'trackClick',
      'trackLink',
      'trackForm',
      'pageview',
      'identify',
      'reset',
      'group',
      'track',
      'ready',
      'alias',
      'debug',
      'page',
      'once',
      'off',
      'on',
      'addSourceMiddleware',
      'addIntegrationMiddleware',
      'setAnonymousId',
      'addDestinationMiddleware',
    ];

    // define a factory to create stubs. These are placeholders for methods in Analytics.js so that you never have to wait
    // for it to load to actually record data. The `method` is stored as the first argument, so we can replay the data
    analytics.factory = function (method: any) {
      return function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(method);
        analytics.push(args);
        return analytics;
      };
    };

    // for each of our methods, generate a queueing stub
    for (var i = 0; i < analytics.methods.length; i++) {
      var key = analytics.methods[i];
      analytics[key] = analytics.factory(key);
    }

    // define a method to load Analytics.js from our CDN, and that will be sure to only ever load it once
    analytics.load = function (key: string, options: any) {
      // create an async script element based on your key
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src =
        'https://cdn.segment.com/analytics.js/v1/' + key + '/analytics.min.js';

      // insert our script next to the first script element.
      var first = document.getElementsByTagName('script')[0];
      first.parentNode?.insertBefore(script, first);
      analytics._loadOptions = options;
    };

    // add a version to keep track of what's in the wild.
    analytics.SNIPPET_VERSION = '4.1.0';

    // load Analytics.js with your key, which will automatically load the tools you've enabled for your account
    analytics.load(Constants.SEGMENT_WRITE_KEY);

    window.addEventListener('scroll', (e: React.UIEvent<HTMLDivElement>) => {
      e.preventDefault();
      window.scrollTo(0, 0);
    });
  }

  return (
    <Head>
      <title>{title}</title>

      <meta property="og:title" content={title} />
      <meta property="og:description" content={Constants.DESCRIPTION} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={Constants.BASE_URL} />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no"
      ></meta>

      <link rel="icon" href="/favicon.ico" />

      {/* Use CDN URL to fix apple-touch-icon on self-signed SSL (local instance) */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://res.cloudinary.com/dnzambf4m/image/upload/v1641970123/icon-mobile_j2l4of.png"
      />
      <link rel="manifest" href="/manifest.json" />
      {typeof window !== 'undefined' ? (
        typeof window.analytics === 'undefined' ? (
          <script
            dangerouslySetInnerHTML={{
              __html: segmentSnippet() as unknown as string,
            }}
          />
        ) : null
      ) : null}
    </Head>
  );
};

export default Header;
