### _Today, let's talk about a decade old technology that drives a third of all the Internet Traffic._

The internet has grown a lot. High-speed data cables, 4G connectivity, wireless routers,etc. have eased our Online life quite a bit. In the midst of all these "connectivity augmentations", **torrents** occupy an indelible place. For the average netaholic, a day without uTorrent is a day wasted. We need it for all kinds of software and media, especially the pirated ones. **Torrent** has become the brand-logo for Piracy in contemporary media industries. It owe this infamous title to torrent sharing websites like Kickass, PiratesBay, etc. While the topic of whether or not Kickass was right to do so is a whole new post on it's own, we are going to study the origins of this technology and not one specific (but massive) implication.

## Origin

File sharing has been around ever since ARPANET and maybe even before. Torrents were not the first of their kind. There were several other predecessors including the USENET most of which were very short-lived. For a detailed history of File Sharing before Torrents you can head over to [this](https://torrentfreak.com/the-history-of-filesharing-120422/) _TorrentFreak_ post. Wikipedia also has [a timeline of File Sharing](https://en.wikipedia.org/wiki/Timeline_of_file_sharing) and BitTorrent is quite a bit down the list. Files are nothing but streams of data that could be sent and received like any other packet of data over the internet. But what makes File Sharing harder than hosting a web page are these:

1. Files usually contain more sensitive data than publicly visible web pages
2. A typical file is usually larger than a typical website and therefore consume more time and data.
3. The existing internet protocols at that time were suited for web pages with limited markups and variations but not so much for other files.

All these contributed to the need for a new protocol for file sharing. In 2001, programmer [Bram Cohen](https://en.wikipedia.org/wiki/Bram_Cohen) (then, a student at the University at Buffalo, New York) rose to the cause and outlined a new protocol for faster and more reliable sharing of large files over the internet. He called it the _[BitTorrent Protocol](https://en.wikipedia.org/wiki/BitTorrent)_ (first released in April, 2001). He went on to make a client for this protocol which goes by the same name as the protocol. What makes it unique is the way in which it handles downloading of large files across the internet.

Predating the BitTorrent protocol, a proprietary file owned by a web admin was served only from the admin's own server. This meant that whenever N users wanted to download the file, the server had to open N connections and serve individual instances of the file to all the requesters. Also, since only a single packet of data could be sent over a single connection, the download was _linear_. This posed 2 main problems:

1. There was a lot of pressure on the central server and so it's maintenance costs were high. That also meant that if the central server failed, the resource would become unavailable to all.
2. The file download rate was limited to the server's ability to handle the open connections simultaneously.

Existing solutions to the aforesaid problems either involved additional hardware or setting up additional paid, trusted servers across the world. The BitTorrent Protocol reformed this completely. Instead of centralizing file downloads, the idea was to decentralize file sharing.

## Terminology

In order to understand how it worked, we first need to familiarize ourselves with some basic terminology.

#### Torrents

A file was divided into several _pieces_. The records for these pieces were stored in a separate, much smaller file (called a torrent file) along with additional meta-data about the file(like content length, file size, etc.). Optionally, it contained a list of _trackers_ (described below).

#### Seeders

A seeder was a computer connected to the internet, having the torrent file, the BitTorrent client, and has downloaded the complete file contents. They acted as servers which served the whole file over the internet. A peer could then download the entire file or a _piece_ of it from a connection to the seeder.

![](images/posts/A%20brief%20history%20of%20Torrents/220px-BitTorrent_network.svg.png)

The central computer has the entire file and is acting as a seeder in the above figure.

#### Leechers

A leecher was a computer with the partial file contents. Suppose someone has downloaded 2 of 5 pieces of data over the internet. He could then relay this data to another peer while simultaneously continuing downloading the rest of the 3 pieces (maybe even from another leecher !).

#### Trackers

As you can already realize, there is a lot of confusion going on over this hypothetical file of ours. Someone is seeding it, someone is leeching it. How will your client know which system to connect to? All this fuss could be avoided if some systems agreed to keep track of the file sharing (i.e, status of the seeders and leechers). They came to be known as Trackers as they kept track of the seeders and leechers and directed new clients to make the appropriate connections for downloading a particular file. In most cases, the server acted as a tracker too.

#### Peers

The people who have the torrent file and are in the process of downloading it's contents. The reason for inventing a separate term for them is this - A peer may or may not be a leecher. If someone opts to limit his upload speed to 0 Kb/s , he can still download the file contents but is no longer uploading any content to the swarm.

#### Swarm

An interconnected network of several seeders, peers and trackers sharing the same torrent is known as a swarm.

## The BitTorrent Protocol

It worked like this:

-  All computers having the BitTorrent Client and the Torrent file could share the file over the internet.
- A seeder _seeded_ the file or pieces of it to requesting clients
- A leecher requested the pieces it needs while simultaneously (partially) seeding the pieces it has already downloaded.
- Trackers kept track of the file transactions and connections. All clients were required to inform the Tracker of their activities and status.

This can be better illustrated by this animated GIF from Wikipedia.

![torrentcomp_small](images/posts/A%20brief%20history%20of%20Torrents/torrentcomp_small.gif)

> Animation of [protocol](https://en.wikipedia.org/wiki/Communications_protocol "Communications protocol") use: The colored dots beneath each computer in the animation represent different parts of the [file being shared](https://en.wikipedia.org/wiki/File_sharing "File sharing"). By the time a copy to a destination computer of each of those parts completes, a copy to another destination computer of that part (or other parts) is already taking place between users. The [tracker](https://en.wikipedia.org/wiki/BitTorrent_tracker "BitTorrent tracker") ([server](https://en.wikipedia.org/wiki/Server_(computing) "Server (computing)")) provides only a single copy of the file, and all the users clone its parts from one another.

Now, the file sharing was decentralized and the downloading of files became non-linear or non-sequential which meant somewhat faster downloads. Also, if the central server fails, the connected peers can keep downloading the file from a different source. The potential security loophole was that from the **Man-in-the-middle-attack** whereby, a malicious user would serve modified version of the file to the requesting client. But this was rectified soon by addition of cryptographic hashes for the file pieces in the Torrent file. Since the torrent file was downloaded from a trusted source, one can be sure that the file contents he fetched from another remote seeder/leecher were legit by just verifying their hashes.

## Anatomy of a Torrent File

A torrent file contains the following UTF-8 encoded information:

- announce—the URL of the tracker
- info—this maps to a dictionary whose keys are dependent on whether one or more files are being shared:
    - files—a list of dictionaries each corresponding to a file (only when multiple files are being shared). Each dictionary has the following keys:
        - length—size of the file in bytes.
        - path—a list of strings corresponding to subdirectory names, the last of which is the actual file name
    - length—size of the file in bytes (only when one file is being shared)
    - name—suggested filename where the file is to be saved (if one file)/suggested directory name where the files are to be saved (if multiple files)
    - piece length—number of bytes per piece. This is commonly 28 KiB = 256 KiB = 262,144 B.
    - pieces—a [hash list](https://en.wikipedia.org/wiki/Hash_list "Hash list"), i.e., a concatenation of each piece's [SHA-1](https://en.wikipedia.org/wiki/SHA-1 "SHA-1") hash. As SHA-1 returns a 160-bit hash, pieces will be a string whose length is a multiple of 160-bits. If the torrent contains multiple files, the pieces are formed by concatenating the files in the order they appear in the files dictionary (i.e. all pieces in the torrent are the full piece length except for the last piece, which may be shorter).

## Magnet Links

A newer, more widely accepted method of downloading torrent is the Magnet URI Scheme whereby, the cryptographic hash values are calculated by the client and not the server and are served via. a plain-text link only. This deprecates the need for a separate file to store the data while maintaining the security of file contents being shared. A typical magnet link is of the format:

_magnet:?xt=urn:btih:&dn=_ and some additional parameters.

Read more about Magnet URI Scheme [here](https://en.wikipedia.org/wiki/Magnet_URI_scheme).

## Analysis of Torrent File health

The analysis of a torrent file's health is a very good estimation of how good or bad a torrent is. For example, if the number of seeders is very less compared to the number of leechers, then the torrent will surely take a longer time to download. However, there might be faster seeding servers than leechers in a server and hence, the number of seeders is not a very accurate representation of torrent health. Even a smaller but faster group of seeders can guarantee better download speeds than a larger but slower group of seeders in the swarm. Hence, a better representation of a torrents health could be the ratio of the average number of bytes uploaded to the average number of bytes downloaded. This is known as the _**Seed Ratio**_ of the torrent. As is clear the seed ratio is dynamic. When the seed ratio of a torrent becomes zero, an average of 0 bytes of the torrent is uploaded per second, which means, you can expect virtually no download speed for the torrent. Such torrents are known as **Dead Torrents**. It is however, possible to resurrect a dead torrent. A person who has the complete file and chooses to manually _reseed_ the torrent is called a **reseeder.**

## A list of the best Torrent Clients

1. [uTorrent](http://www.utorrent.com/)
2. [BitTorrent](http://www.bittorrent.com/)
3. [Vuze](https://www.vuze.com/)
4. [BitComet](https://www.bitcomet.com/en)

## Decentralization of Torrent Sharing Platforms

There are several emerging projects in this new domain of File Sharing. A decentralized torrent sharing platform will ensure that there is no one person/community to point to.  Magnet Links was just the first step toward this direction. Some of the most notable projects are-

1. **[Open Bay](http://openbay.isohunt.to/):** The Open Bay platform lets you create a local copy of some of the most infamous torrent sharing websites like Kickass and ThePirateBay on your PC. This local copy can also serve the purpose of a tracker and a seeder.
2. **[RIVR](https://github.com/algoprog/rivr-search):** An Open-Source Torrent Search Engine. It lets you scrape torrents off some of Kickass, ThePirateBay, Isohunt, etc. It is a relatively newer project and the author wishes to make it a _distributed_ search engine. Your contributions towards this project could be beneficial to all.
3. **[TOR](https://www.torproject.org/projects/torbrowser.html.en):** While this project is not really related to the Torrents, it is an important part of the process. The Onion Router allows us to relay data from a different IP Address belonging to the Tor Network. This lets us stay anonymous while downloading data off the internet. Torrent sites are being blocked by the Government in several countries. Using the TOR Circuit, one can download torrent resources which are otherwise blocked in their respective countries.
4. **[eMule Project](http://www.emule-project.net/home/perl/general.cgi?l=1):** An offshoot of the earlier eDonkey Project with improved File-Sharing and a nice GUI support. Active since 2002.
5. **[Equabit](https://equabit.000webhostapp.com/):** A new project aimed at decentralization of torrent sharing platforms, which means, you share your part of the torrent database to the world wide web anonymously. This is also one of my own projects. Head over to the website's **Participation** page to know more.

## Further Reading

For a more technical study of Torrents and Analysis of Torrent as File-Sharing medium, you can refer to the following reads-

1. [**BTWorld: towards observing the global BitTorrent file-sharing network**](https://dl.acm.org/purchase.cfm?id=1851562&CFID=829661320&CFTOKEN=35315893) 
2. [Daily BitTorrent Statistics](http://iknowwhatyoudownload.com/en/stat/IN/daily) ( from _IKnowWhatYouDownload\*_ )
3. [LimeWire - Wikipedia](https://en.wikipedia.org/wiki/LimeWire)
4. [History of P2P Networks and File Sharing - WikiSpaces](https://wikispaces.psu.edu/pages/viewpage.action?pageId=75448010)
5. [eDonkey Network](https://en.wikipedia.org/wiki/EDonkey)

\*This freaky website claims that it can record your download information over BitTorrent Protocol unless you are behind a VPN or other such services. Read more about it [here](http://www.iflscience.com/technology/website-claims-reveal-torrenting-history-anyone/) at IFLScience!

If you like it, please share this post. Thank you for reading.