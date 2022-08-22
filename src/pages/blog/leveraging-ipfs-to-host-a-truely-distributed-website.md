---
layout: "../../layouts/BlogPost.astro"
title: Leveraging IPFS to host a truely distributed website
author: Sagnik Modak
created: 2021-04-20
pubDate: "Mar 20, 2021"
outline: true
cover: https://res.cloudinary.com/mind-matrix/image/upload/v1597059056/pexels-designecologist-1779487_mruw2n.jpg
description: See how you can use the power of Web3.0 to host your static websites for no cost with IPFS.
---

**TL;DR** With the power of Web3.0, you can now host your static websites for absolutely FREE with IPFS. You still do need to pay if you want a custom domain. Dynamic content is a completely different story and needs to be dealt with in a separate article. Read on to find out more.

The Internet is growing at an unprecedented pace. There are about 1.5 billion websites on the Internet at the time of writing this article. According to [this](https://www.millforbusiness.com/how-many-websites-are-there/) article, about 380 new websites are created every minute! Now, that means space on the internet is pricey. Especially in today's economy, you would need somewhere between $400 to $60,000 each year just to keep your website running.

But if you don't mind using your console and have 10 minutes to spare, I can show you how you can host your website for no more than ZERO dimes on the Internet. So, let's get started.

## Step 1: Setting Up IPFS

IPFS is a set of protocols based on the BitTorrent blockchain technology and improves upon it. It enables P2P file sharing just like bit-torrent but unlike torrent, it is designed to be a replacement for our traditional HTTP/HTTPS-based web. I will write a separate article in the future illustrating the problems with our current web and the need that gave rise to IPFS.

Now, you can install IPFS in several different ways depending upon your use case. In our case, we will be focusing on hosting a static website using IPFS and for us, the best way is to setup the IPFS Desktop Application. You can use the IPFS Command Line Utility also, but it comes bundled with the desktop app.
Download and install the application for your platform from their official Github page - [IPFS Desktop](https://github.com/ipfs-shipyard/ipfs-desktop#install)

## Step 2: Setting Up Your Website

Set up your static website for deploying to the internet. Remember, this method only supports STATIC content so make sure your website does not contain any dynamic data. Also, it is advised not to store any Secrets, API Keys or passwords in any of the files on the website. If you do need to use them, store them on a secure server. Read the footnotes on this article for more information about this. In our case, we will set up a simple website with an *index.html*, an *app.js* and an *app.css*.

If you have your static website ready to go, you do not need to follow along any further for this step and can skip straight to the next step by [clicking here](#step3).

1. Create an index.html file and put some content in it. For example:
``` html
<!DOCTYPE  html>
<html  lang="en">
  <head>
    <meta  charset="UTF-8">
    <meta  name="viewport"  content="width=device-width, initial-scale=1.0">
    <title>My First IPFS Website</title>
    <link  rel="stylesheet"  href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <link  rel="stylesheet"  href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap-theme.min.css">
  </head>
  <body>
    <nav  class="navbar navbar-default navbar-fixed-top">
      <div  class="container">
        <div  class="navbar-header">
          <button  type="button"  class="navbar-toggle collapsed"  data-toggle="collapse"  data-target="#navbar"  aria-expanded="false"  aria-controls="navbar">
            <span  class="sr-only">Toggle navigation</span>
            <span  class="icon-bar"></span>
            <span  class="icon-bar"></span>
            <span  class="icon-bar"></span>
          </button>
          <a  class="navbar-brand"  href="#">My Website</a>
        </div>
        <div  id="navbar"  class="collapse navbar-collapse">
          <ul  class="nav nav-tabs"  role="tablist">
            <li  role="presentation"  class="active">
              <a  aria-controls="home"  role="tab"  data-toggle="tab"  href="#home">Home</a>
            </li>
            <li  role="presentation">
              <a  aria-controls="about"  role="tab"  data-toggle="tab"  href="#about">About</a>
            </li>
            <li  role="presentation">
              <a  aria-controls="contact"  role="tab"  data-toggle="tab"  href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div  class="container">
      <div  class="my-website-content">
        <div  class="tab-content">
          <div  role="tabpanel"  class="tab-pane active"  id="home">
            <h1>My First IPFS Website</h1>
            <p  class="lead">
              Hi there, this is my first website running on IPFS. And the best part?
            </p>
            <h2>
              It's ABSOLUTELY FREE!
            </h2>
          </div>
          <div  role="tabpanel"  class="tab-pane"  id="about">
            <h1>About me</h1>
            <p  class="lead">
              I am great at what I do and that's all you need to know!
            </p>
          </div>
          <div  role="tabpanel"  class="tab-pane"  id="contact">
            <h1>Contact Me</h1>
            <p  class="lead">
              Need some help? Contact me.
            </p>
          </div>
        </div>
      </div>
    </div>
    <script  type="text/javascript"  src="http://code.jquery.com/jquery-3.5.0.min.js"></script>
    <script  src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <script  type="text/javascript"  src="/app.js"></script>
  </body>
</html>
```

2. Create an app.css with the following content:

``` css
body {
  padding-top: 50px;
}
.my-website-content {
  padding: 40px 15px;
  text-align: center;
}
```

3. Create an app.js with the following content:

``` js
$('.nav-tabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})
```

Now that we are done setting up our static website, we can focus on the fun part of uploading it to the Internet... for FREE!

<div  id="step3">

## Step 3: Hosting Your Website on IPFS

Now we add our site to IPFS. Let's say the root directory of your website is *mysite* (for this tutorial), i.e, all your files are in the path *mysite/* (ex. *mysite/index.html*, *mysite/app.css*, etc.).  Open up a terminal just outside the root directory of your website and type:
``` bash
ipfs add -r my-site/
```
This will generate a lot of hashes related to all your files. This will look something like this:
``` bash
added QmQiQSt4dKVFvi1zkYbrBWgX8CpasLmzux6daseoDq1Qc mysite/index.html
added QmQtFm6VcLdyMa6RqWESPgXsqmiaJ48RXrLFXkPPtfkni mysite/app.css
added QmZA2UBTwnhcLv66fARL9UV8W8a9ZA4iwTLcgUCsB1u1yW mysite/app.js
added QmPhdfcGJaQJnZu3AKn8NoiomDwDCRBicfqPt1YRqJBCz mysite
```
The only hash we are interested in is the last one.
This will give us a link to our website. We will also use this hash to publish our site on IPNS in the next step, so keep it handy.
Go ahead and open up your favourite web browser and type the following URL in the address bar:
``` url
https://ipfs.io/ipfs/<YOUR_FOLDER_HASH>
```
where, <YOUR_FOLDER_HASH> represents the last hash (next to the root folder name) obtained using the previous command. You will see your site up and running. Smooth!

However, you will soon discover that every time you update some little code in your website, you are presented with a new hash upon adding them to IPFS. In order to avoid this, we have to use an IPNS Peer ID which is described in the next step.

</div>

## Step 4: Obtaining a permanent link (using IPNS)

The goal is to obtain a permanent link to your website that is not affected by any updates you make to your website. This can be done using IPNS. Open up the terminal (if not already open). Then, using the hash obtained in the previous step, create an IPNS Peer ID by typing in:
``` bash
ipfs name publish <YOUR_FOLDER_HASH>
```
This will output something similar to this:
``` bash
Published to QmYtnfsf6vfcFDeZz1NTZyEXTixjjUnUS6UaPdMSsUBWxs: /ipfs/QmPhdfcGJaQJnZu3AKn8NoiomDwDCRBicfqPt1YRqJBCz
```

The Peer ID in the above output is the one appearing right next to the words "Published to" (i.e, *QmYtnfsf6vfcFDeZz1NTZyEXTixjjUnUS6UaPdMSsUBWxs* in this case). Copy this and paste it in your browser with the URL format as follows:

``` url
https://ipfs.io/ipns/<YOUR_PEER_ID>
```

Now every time you need to update your website just rerun the commands in Step 3 and Step 4. You will see that your Peer ID remains the same and you can access the updated website with the above URL.

## Footnotes

IPFS is not magic (although it's pretty close). Although it is envisioned to be a capable replacement for the HTTP protocol we use today, it is far from being perfect. I feel that it is my responsibility to inform the readers about the deal that they sign up for when using IPFS to host their website. This is why I have written this extra paragraph. People who got what they came for are welcome to stop reading and go build something amazing!

For those of you who need to know some more before you can start transfering you website to IPFS, here are some pros and cons you will likely be enjoying (... or not).

* Your website may take longer to become available throughout your target region. This is because it takes time for content to be distributed to a considerably large enough network of nodes to be readily available at locations logically further away from your own node. In short, you might see delays in updates taking effect.
* Your website and/or updates to the same may not be available at all. This is a minor problem. The reason for this is that if the nodes carrying your data in transit suddenly all break down at once, and your node is not functional at the same time, the data in transit is lost forever and so is your website/update. The chances of that happening however, are slim to none and while it can happen, it is very unlikely. For the more savvy readers, check out [Filecoin](https://filecoin.io/) that aims to solve this problem altogether.
* Your usage rate is doubled. This means that you will have to forfeit more data when uploading larger content that you would need to when using the traditional HTTPS protocol. This is because IPFS is a distributed system and adhering to the principles of the same, you need to give in order to get, i.e, you distribute content for others so that they distribute content for you. This means your usage is more than you would normally expect.
* Your content is distributed faster! Yes, it has been seen that hosting your site on IPFS gives you almost an instant 80% speed boost to loading times. This is because the content is distributed unlike the traditional centralized server systems. This means, when your visitor needs access, if any of their neighbouring nodes have already accessed your site, they will serve up the files to your visitor for you! That's not the only reason. There are some more. But those are beyond the scope of this article.
* Finally, you are limited only to static sites when hosting with IPFS and IPNS. There are ways to get around this using Remote Channels and whatnots but those are beyond this article. We will try to tackle this problem in an upcoming article. In the meantime, if you really want to host your dynamic site on The New Internet, there is a ready-made solution for you - The [Infura API](https://infura.io/) might just be what you are looking for. They also ensure your data remains available and on top of that, have a free tier to get you started on zero cost and scale as you need. I have not personally tried it so I cannot guarantee anything but it looks good to go.

Thanks for reading.

**Attributions**

Resources used:

* [Photo](https://www.pexels.com/photo/information-sign-on-shelf-251225/) by Tranmautritam from Pexels
* [Article](https://medium.com/coinmonks/how-to-add-site-to-ipfs-and-ipns-f121b4cfc8ee) by Jonybang on Coinmonks
