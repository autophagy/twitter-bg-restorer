![Twitter bg restorer logo](chrome-src/options/images/logo.png)

A chrome extension that lets you set a custom background image and colour for web twitter. A nostalgic throwback to when the homepage wasn't a sea of searing white.

### Chrome
[Download from the Web Store](https://chrome.google.com/webstore/detail/twitter-background-restor/gcjejnlljikllkloanankijokfbaelhi)

### Firefox
[Download from the Mozilla Add-ons repository](https://addons.mozilla.org/en-US/firefox/addon/twitter-background-restorer/)

## Installation

Install from the site listed above and open the options for the extension. You can then upload an image and specify a colour.

You can currently:

- Upload a custom image
- Set a custom background colour
- Specify whether the image tiles or not
- Specify whether the image stretches to cover the page or not.

If you have any feature requests or ideas for improvement, please open an issue!

*Note: This is a purely local change. Other users cannot see the background you set, I'm afraid - this is only to re-implement homepage customisation that twitter has removed.*

## How it Works

The extension works by inserting a new CSS rule on the body of a twitter page based on the settings you choose. When you 'upload' the background image to the extension, it actually converts it into a [Base64](https://en.wikipedia.org/wiki/Base64) representation of the image and stores it locally in your chrome extension storage.

This Base64 data is then inserted into the page using the `background-image: url()` method - which solves the problem of being unable to pull an image from an extra-twitter location (whether it be from another hosted source or from the local machine).

## Links

This extension has been linked to from [The Guardian](http://www.theguardian.com/technology/2015/jul/21/twitter-removes-background-images-timeline-fix-chrom-plugin), [iDigitalTimes](http://www.idigitaltimes.com/twitter-background-image-disappeared-heres-how-fix-it-460114), [VentureBeat](http://venturebeat.com/2015/07/21/as-twitter-turns-off-timeline-background-images-one-developer-has-already-built-a-workaround/), [Gizmodo](http://www.gizmodo.jp/2015/07/_twitter_2.html) and [Lifehacker](http://www.lifehacker.co.uk/2015/07/21/how-to-get-your-background-wallpaper-back-on-twitter)!
