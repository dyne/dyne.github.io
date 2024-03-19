---
layout: ../../layouts/Layout.astro
title: "TorTV :: Run Tor on your TV"
description: ""
---

# TorTV :: Run Tor on your TV

<!--:en-->![](https://dyne.org/wp-content/uploads/2011/12/tortv-temp-logo.jpg "tortv-temp-logo")

TorTV is a build of the [Tor Project](http://www.torproject.org) maintained to run on TV devices and set-top boxes, so that anyone with such an household appliance can contribute to strengthen the Tor network.

Easy to deploy user downloads are provided, as well some developer documentation and mostly the code used: TorTV does not reimplements nor modifies the Tor source code in any way, it just provides binaries for embedded targets and some scripting to facilitate ease of installation.

Owning a WDTV box? The homebrew [WDLXTV](http://wdlxtv.com) firmware by B-Rad is a must! it will unleash all its power and let you run Tor on your TV, how cool is that ;^)

TorTV is in **ALPHA** stage: it consists of an ad-hoc build (app.bin) and installation instructions for the popular [WD TV](http://en.wikipedia.org/wiki/WD_TV) device series running the [WDLXTV](http://wdlxtv.com) firmware (MIPS based). If this project receives enough support and attention it will eventually grow to maintain Tor builds for more MIPS and ARM based devices.

![](https://dyne.org/wp-content/uploads/2011/12/wdtvlive-front.jpeg "wdtvlive-front")

# Download

All materials licensed GNU GPL and BSD [as listed by the Tor Project](https://www.torproject.org/download/download-unix.html.en).

## Binary (app.bin)

Binary releases are packaged as [ready to be installed as app.bin](http://wiki.wdlxtv.com/Installing_Applications) bundles.\
To verify the integrity of each file signed MD5 hash sums are provided. TorTV is maintained by Jaromil, lookup his key on pgp.mit.edu.

[Download TorTV.app.bin](http://ftp.dyne.org/tortv/binaries)

## Source code

Sources for download include the Tor version used and all the libraries to build it, in addition to the default build environment provided by [EmDebian](http://www.emdebian.org/)

TorTV development is [revisioned on GitHub](http://github.com/dyne/TorTV), if you like to contribute please fork the repository, make your modifications and file a pull request.

[Source Code used for TorTV](http://ftp.dyne.org/tortv)

# Hardware supported

If you have hints about more TV hardware that is based on the Linux kernel and can have applications added, [please let us know](https://dyne.org/contact)!

If you like this idea and would like to see it working on another device, please [donate us some money to buy the equipment](/donate). Ideally the next port of TorTV should be for the [Boxee](http://boxeeboxwiki.org/wiki/Main_Page), we can [buy one for 180 neuros](http://www.computerland.nl/a/site/Catalog/ItemDetail.aspx?ItemNo=20068928) with some help.

If you are a TV manufacturer interested in having this application running on your products [you are also very welcome to contact us](https://dyne.org/contact)!

# Feedback

Be welcome to join us on the [forum hosted by the WDLXTV project](http://forum.wdlxtv.com/viewtopic.php?f=40\&t=6100).

On its first release this software was [announced on the tor-talk mailinglist](https://lists.torproject.org/pipermail/tor-talk/2011-December/022370.html) and then rather immediately [Slashdotted](http://slashdot.org/story/11/12/15/2122244/running-tor-on-your-tv). Of course we hang out in both of these forums, which might interest you as well.

Beware this project is in a early stage of development and to contribute to the discussion you should really take the time to learn how WDLXTV works.

The log of operations made by our tor.app.bin is found in /tmp/tor.log

The app.bin will create a directory “tor” in the root of your usb device, where all default configurations and tor databases are found.<!--:--><!--:es-->

![](https://dyne.org/wp-content/uploads/2011/12/tortv-temp-logo.jpg "tortv-temp-logo")

TorTV is a build of the [Tor Project](http://www.torproject.org) maintained to run on TV devices and set-top boxes, so that anyone with such an household appliance can contribute to strengthen the Tor network.

Easy to deploy user downloads are provided, as well some developer documentation and mostly the code used: TorTV does not reimplements nor modifies the Tor source code in any way, it just provides binaries for embedded targets and some scripting to facilitate ease of installation.

Owning a WDTV box? The homebrew [WDLXTV](http://wdlxtv.com) firmware by B-Rad is a must! it will unleash all its power and let you run Tor on your TV, how cool is that ;^)

TorTV just started to be developed and is in **ALPHA** stage: it consists of an ad-hoc build (app.bin) and installation instructions for the popular [WD TV](http://en.wikipedia.org/wiki/WD_TV) device series running the [WDLXTV](http://wdlxtv.com) firmware (MIPS based). If this project receives enough support and attention it will eventually grow to maintain Tor builds for more MIPS and ARM based devices.

![](https://dyne.org/wp-content/uploads/2011/12/wdtvlive-front.jpeg "wdtvlive-front")

# Download

All materials licensed GNU GPL and BSD [as listed by the Tor Project](https://www.torproject.org/download/download-unix.html.en).

## Binary (app.bin)

Binary releases are packaged as [ready to be installed as app.bin](http://wiki.wdlxtv.com/Installing_Applications) bundles.

To verify the integrity of each file signed MD5 hash sums are provided. TorTV is maintained by Jaromil, lookup his key on pgp.mit.edu.

[Download TorTV.app.bin](http://ftp.dyne.org/tortv/binaries)

## Source code

Sources for download include the Tor version used and all the libraries to build it, in addition to the default build environment provided by [EmDebian](http://www.emdebian.org/)

TorTV development is [revisioned on GitHub](http://github.com/dyne/TorTV), if you like to contribute please fork the repository, make your modifications and file a pull request.

[Source Code used for TorTV](http://ftp.dyne.org/tortv)

# Hardware supported

If you have hints about more TV hardware that is based on the Linux kernel and can have applications added, [please let us know](https://dyne.org/contact)!

If you like this idea and would like to see it working on another device, please [donate us some money to buy the equipment](/donate). Ideally the next port of TorTV should be for the [Boxee](http://boxeeboxwiki.org/wiki/Main_Page), we can [buy one for 180 neuros](http://www.computerland.nl/a/site/Catalog/ItemDetail.aspx?ItemNo=20068928) with some help.

If you are a TV manufacturer interested in having this application running on your products [you are also very welcome to contact us](https://dyne.org/contact)!

# Feedback

Be welcome to join us on the [forum hosted by the WDLXTV project](http://forum.wdlxtv.com/viewtopic.php?f=40\&t=6100).

Beware this project is in a early stage of development and to contribute to the discussion you should really take the time to learn how WDLXTV works.

The log of operations made by our tor.app.bin is found in /tmp/tor.log

The app.bin will create a directory “tor” in the root of your usb device, where all default configurations and tor databases are found.

<!--:--><!--:it-->

![](https://dyne.org/wp-content/uploads/2011/12/tortv-temp-logo.jpg "tortv-temp-logo")

TorTV is a build of the [Tor Project](http://www.torproject.org) maintained to run on TV devices and set-top boxes, so that anyone with such an household appliance can contribute to strengthen the Tor network.

Easy to deploy user downloads are provided, as well some developer documentation and mostly the code used: TorTV does not reimplements nor modifies the Tor source code in any way, it just provides binaries for embedded targets and some scripting to facilitate ease of installation.

Owning a WDTV box? The homebrew [WDLXTV](http://wdlxtv.com) firmware by B-Rad is a must! it will unleash all its power and let you run Tor on your TV, how cool is that ;^)

TorTV just started to be developed and is in **ALPHA** stage: it consists of an ad-hoc build (app.bin) and installation instructions for the popular [WD TV](http://en.wikipedia.org/wiki/WD_TV) device series running the [WDLXTV](http://wdlxtv.com) firmware (MIPS based). If this project receives enough support and attention it will eventually grow to maintain Tor builds for more MIPS and ARM based devices.

![](https://dyne.org/wp-content/uploads/2011/12/wdtvlive-front.jpeg "wdtvlive-front")

# Download

All materials licensed GNU GPL and BSD [as listed by the Tor Project](https://www.torproject.org/download/download-unix.html.en).

## Binary (app.bin)

Binary releases are packaged as [ready to be installed as app.bin](http://wiki.wdlxtv.com/Installing_Applications) bundles.

To verify the integrity of each file signed MD5 hash sums are provided. TorTV is maintained by Jaromil, lookup his key on pgp.mit.edu.

[Download TorTV.app.bin](http://ftp.dyne.org/tortv/binaries)

## Source code

Sources for download include the Tor version used and all the libraries to build it, in addition to the default build environment provided by [EmDebian](http://www.emdebian.org/)

TorTV development is [revisioned on GitHub](http://github.com/dyne/TorTV), if you like to contribute please fork the repository, make your modifications and file a pull request.

[Source Code used for TorTV](http://ftp.dyne.org/tortv)

# Hardware supported

If you have hints about more TV hardware that is based on the Linux kernel and can have applications added, [please let us know](https://dyne.org/contact)!

If you like this idea and would like to see it working on another device, please [donate us some money to buy the equipment](/donate). Ideally the next port of TorTV should be for the [Boxee](http://boxeeboxwiki.org/wiki/Main_Page), we can [buy one for 180 neuros](http://www.computerland.nl/a/site/Catalog/ItemDetail.aspx?ItemNo=20068928) with some help.

If you are a TV manufacturer interested in having this application running on your products [you are also very welcome to contact us](https://dyne.org/contact)!

# Feedback

Be welcome to join us on the [forum hosted by the WDLXTV project](http://forum.wdlxtv.com/viewtopic.php?f=40\&t=6100).

Beware this project is in a early stage of development and to contribute to the discussion you should really take the time to learn how WDLXTV works.

The log of operations made by our tor.app.bin is found in /tmp/tor.log

The app.bin will create a directory “tor” in the root of your usb device, where all default configurations and tor databases are found.

