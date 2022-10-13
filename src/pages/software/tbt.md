---
layout: ../../layouts/Layout.astro
title: "TBT :: Time Based Text"
description: ""
---

# TBT :: Time Based Text

# Introduction

[![](https://dyne.org/wp-content/uploads/2006/03/tbt-wheel.png "tbt-wheel")](https://dyne.org/wp-content/uploads/2006/03/tbt-wheel.png)

This software application records performance time of written text and vehicles it as additional information: saves and reproduces every single action during the composition of a text, so that we can circulate an additional dimension of emphasis in written communication.

> Thinking about gesture in art, people usually refer to choreography. If the topic is related to IT, instead, usability becomes the issue. But, what about gesture in computer art? Does it mean natural interaction or is it just a matter of performance? Certainly, a gesture is a way for emphasizing communication. A pioneer of net.art such as Jaromil is exploring this area with a project called Time Based Text (TBT). (Valentina Culatti, Neural.it)

As this simple concept, our implementation is also kept very minimalistic while we welcome programmers to embed it in communication applications, as in *emails, blogs, visual poetry, wiki websites, slides*, to embed emotions in plain text and open new practices for literature and poetry.

## Artworks

The artwork TBT by [Jaromil]() consists in an interactive art installation suitable for exhibitions. It consists of a table, chair, keyboard, 2 PC and monitors.

[Sister0](http://sister0.org/) uses TBT as an instrument in live poetry and theater performances.

[Michael Petchkovsky](http://www.cosmo0.dyndns.org/les_art/writings.html) has composed TBT poetry visible on his website.

The theoretical background of TBT is documented in this [interview by art critic Annet Dekker, published on Nettime](http://www.nettime.org/Lists-Archives/nettime-l-0804/msg00022.html).

## How TBT does it

A reference C/C++ implementation with a [manual page](http://tbt.dyne.org/manual.html) was initially released in **2006**, date of creation of this software. Nowadays **several implementations of TBT are available**: there is an **easy to use Mac OSX** application, a **dokuwiki plugin**, a **python-GTK** graphical interface, a **pure javascript** implementation and a **PHP class**. After 6 years now the concept behind TBT is gaining momentum as a new interaction pattern for on-line publication.

The original TBT sourcecode is written in thread-safe POSIX C++ and can be ported to most platforms, providing a real-time recorder for serial timed data, recording 64bit tuples key/msec with low-latency.

> TBT is made to vehicle more human-input information in written text

In the .tbt format, text is saved with a timestamp for each letter:

         _________ ___________
        |  u-int  |   u-int   |
        |  64bit  |   64bit   |    m-seconds = 1/1000 of a second
         --------- -----------
        |  char   | m-seconds |    char = ASCII or higher bit char code
         --------- -----------
        |    Total: 128bit    |
         ---------------------

Export functionality to different formats is provided, including generation of web-ready code in HTML and Javascript.

For developers willing to include TBT functionality in their software, the original C/C++ API is [documented here](http://tbt.dyne.org/codedoc).

[![](https://www.dyne.org/wp-content/uploads/2012/06/softpedia_free_award_f.gif "Softpedia \"100% Free\" award")](http://mac.softpedia.com/progClean/TBT-Clean-126880.html)

This software product was tested thoroughly and was found absolutely clean; therefore, it can be installed with no concern by any computer user.

## Downloads

For licensing information see the [GNU General Public License](http://www.gnu.org/copyleft/gpl.html).

### Source code

Latest stable release is 1.1 (09 April 2012) more about it in the [NEWS](http://files.dyne.org/tbt/NEWS) and [ChangeLog](http://files.dyne.org/freej/ChangeLog).

Source releases are checked and signed by [Jaromil](http://rastasoft.org/) using [GnuPG](http://www.gnupg.org/).

On [files.dyne.org/tbt](http://files.dyne.org/tbt) you find all present and past TBT releases, source code for extra plugins and more binaries that we occasionally build for various architectures.

The bleeding edge version is developed on our [code repository](http://git.dyne.org/) using **GIT**, you can clone the repository free and anonymously

           git clone git://code.dyne.org/tbt.git

please use this version when [reporting bugs](http://bugs.dyne.org/) and getting in contact with us.

> If you are looking for a Windows .exe version of TBT, boot the [Dyne:bolic Live CD](http://dynebolic.org/)

### Mac OSX

A binary ready to use is available on [files.dyne.org/tbt/binaries](http://files.dyne.org/tbt/binaries/)

Move the TBT application where you like and run it, it will record your writings in a TBT-Record.html file, in the same directory.

### Dokuwiki

TBT can be integrated into a web service using dokuwiki, the plugin written by Robin Gareus is included in our source distribution, as well found on [Robin’s homepage](http://rg42.org/wiki/tbt) and in the [Dokuwiki plugin archive](http://www.dokuwiki.org/plugin:tbt).

## Credits

Time Based Text is a software.art application developed by [Jaromil](http://jaromil.dyne.org/).

This software is not just a technical realization, it constitutes an interactive art installation by its author, as well as a critically acclaimed example of [Software Art](http://www.runme.org/project/+tbt/).

### Contributors

TBT was originally commissioned by [Impakt.nl](http://www.impakt.nl) Festival.

The TBT CMS was designed by [O.K. Parking](http://www.ok-parking.nl) and its PHP code written by [Angelo “Pallotron” Failla](http://www.pallotron.net/).

Pablo “Caedes” Martines contributed the Python-GTK graphical interface implementation for GNU/Linux and [Robin Gareus](http://gareus.org/) published a TBT dokuwiki plugin, also fixing our Javascript typewriter.

[Meinhard Benn](http://benn.org/) implemented a TBT recorder in pure javascript and [Andrea “Alpt” Lo Pumo](http://freaknet.org/alpt/) shared code suggestions, while [Xantar Majere](http://www.xant.net/) helped bundling the Apple/OSX version.

Additional thanks for their support and encouragement go to: [Florian Cramer](http://pleintekst.nl/), Annet Dekker, Paul Hendriks and [Susanne Jaschko](http://www.sujaschko.de/)

