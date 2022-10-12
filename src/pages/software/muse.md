---
layout: ../../layouts/Layout.astro
title: MuSE - Stream Internet Radio
description: "MuSE is an application for the mixing, encoding, and network streaming of sound: it can mix a microphone and multiple channels and transmit to the Internet."
---

[![MuSE internet radio streamer](https://dyne.org/wp-content/uploads/2011/10/peachspeak1.png "MuSE")](https://dyne.org/wp-content/uploads/2011/10/peachspeak1.png)

MuSE is an application for the mixing, encoding, and network streaming of sound: it can mix up to 6 encoded audio bitstreams (from files or network, mp3 or ogg) plus a souncard input signal, the resulting stream can be played locally on the sound card and/or encoded at different bitrates, recorded to harddisk and/or streamed to the net. When sent to a server, the resulting audio can be listened thru the net by a vast number of [players](http://www.co.uk.lspace.org/fandom/afp/a-files/soundhelp.html) available on different operating systems.

To be operated MuSE offers graphical interfaces and a documented commandline interface in the good old unix style.

# Features

[![](https://dyne.org/wp-content/uploads/2011/12/muse0.7.2-shot-300x225.jpg "muse0.7.2-shot")](https://dyne.org/wp-content/uploads/2011/12/muse0.7.2-shot.jpg)

*   Mixes up to 6 channels + 1 soundcard input channel simultaniously
*   decodes and mixes both ogg and mp3, from files or network streams
*   encodes at different bitrates and sends multiple mp3 or ogg streams to icecast, shoutcast and darwin servers.
*   offers two different intuitive user interfaces and a documented command line interface
*   play, stop, pause/resume, position and volume for each channel, looping thru playlists and reconnecting automatically to lost server connections
*   efficient multithreaded architecture with emphasys on performance to support older CPUs
*   reusable API interface to the core mixing engine permits to adapt new interfaces

## Requirements

> MuSE provides the free software community with a user friendly but powerful tool for network audio streaming, making life easier for indypendent free speech online radios.

You need a POSIX.1b OS, GNU/Linux and FreeBSD are well tested. An OSX binary has been released and is available in the download section below.\
If you have success compiling MuSE on Win or Beos platforms let us know!

**stream servers** supported:\
[Icecast](http://icecast.org/) mp3 and ogg streaming server\
[Darwin Streaming Server](http://dss.macosforge.org/) with Icecast emulation\
[Shoutcast](http://www.shoutcast.com/broadcast-tools) mp3 streaming technology

## Optionals

[LAME](http://lame.sf.net) libraries, lame is the best mp3 encoder around and is free!\
[OGGVORBIS](http://www.vorbis.com) libraries, Ogg is the future of free streaming!\
[GTK+](http://www.gtk.org) libraries, a widget toolkit allready present in many systems\
[NCURSES](http://dickey.his.com/ncurses/ncurses.html) libraries, an old school text console windowing library

remember that if you compile from source using those libraries installed from the packages of your distribution, often you also need to install the -dev version of the libraries.

## Internals

MuSE is written in C++ and is a multithreaded application. It reads streams using the included libmpeg library (mp3 format) and it can optionally link the [OggVorbis](http://www.xiph.org/vorbis) library to read ogg files.\
For encoding the sound into mp3 it can **optionally** link the [LAME](http://lame.sf.net) encoder as a shared library using it thru API calls.\
MuSE also features much interactivity implementing two user interfaces: a GTK+ one for XWin environment and a NCURSES for text console, while with ‘muse -h’ you can have a full set of commandline options.

# Documentation

## Learn how to Stream Internet Radio on your own using only free software

[![](https://dyne.org/wp-content/uploads/2011/12/davecentral.gif "davecentral")](https://dyne.org/wp-content/uploads/2011/12/davecentral.gif)

*   [The MuSE streamer manual](http://flossmanuals.net/muse)
*   [Fortune streaming audio how-to](http://lab.dyne.org/StreamingRadioHowto)
*   [Manual en Espanol mestizaje](http://lab.dyne.org/MuSe/Manual/Espanol)
*   [Open Streaming manual](http://files.dyne.org/muse/opensource-radio-streaming.pdf) (19 MBytes PDF)
*   the [MuSE commandline manpage](http://muse.dyne.org/muse-man.html)
*   [Multiple Streaming Engine API](http://muse.dyne.org/codedoc) for programmers

# Download

## Sourcecode

Latest version is **0.9.2** released on **27 December 2005,** more about it in the [NEWS](http://files.dyne.org/muse/NEWS) and [ChangeLog](http://files.dyne.org/muse/ChangeLog).\
Source release is signed using [GnuPG](http://www.gnupg.org/).

Free downloads on [files.dyne.org/muse](http://files.dyne.org/muse)

## Binaries

[![](https://dyne.org/wp-content/uploads/2011/12/osx-large-300x187.jpg "muse-osx-large")](https://dyne.org/wp-content/uploads/2011/12/osx-large.jpg)

Some (quite old) already built binaries

*   [TGZ (Slackware) ](http://files.dyne.org/muse/binary/MuSE-0.9.2-i586-1.tgz)
*   [DEB (Debian etc.) ](http://files.dyne.org/muse/binary/MuSE-0.9.2-i386-1.deb)
*   [RPM (RedHat etc.) ](http://files.dyne.org/muse/binary/MuSE-0.9.2-i586-1.rpm)
*   [Mac OS X (PPC) ](http://files.dyne.org/muse/binary/MuSE-0.9.2-svn-PPC-8.3.dmg)
*   [Mac OS X (X86)](http://files.dyne.org/muse/binary/MuSE-0.9.2-svn-OSX86-1.dmg)

#

#

# Developers

*   Architecture, engine API and CLI by **[Jaromil](http://rastasoft.org)**
*   GTK+ 2.0 GUI by **Antonio “Nightolo” Radici**
*   NCurses text user interface by **Luca “Rubik” Profico**
*   Decoder channels by **Angelo “Pallotron” Failla**
*   OSX Carbon native GUI by **Andrea “Xant” Guzzo**

MuSE streamer also includes code by **Matteo “MoP” Nastasi** (resample and clip), **Woo-jae Jung** (mp3 decoder), **Jack Moffit** and **Chad Armstrong** (libshout), Mike Glover (cdk/ncurses) and modified code from **Scott Manley** (stream mixer) and **Charles Samuels** (buffered FIFO Pipe).

The [fundaments](http://funda.ment.org/) of MuSE existance where set by **August Black** and **Markus Seidl**.

Distribution packages are contributed by **Filippo Giunchedi** (.deb and man), **P\@sky Macchinista Fuochista** (.rpm), **Shining the Translucent** (.tgz)

Refer to the [AUTHORS](http://muse.dyne.org/AUTHORS) file for a complete list of contributors.

## Code repository

The MuSE code repository is on [code.dyne.org](http://code.dyne.org)

       git clone git://code.dyne.org/muse.git

It has been a long while since this software wasn’t updated, if you are practical with code you are welcome to file [detailed bugreports here](http://bugs.dyne.org).

# More tools

MuSE exists since the year 2000 and it works fairly well for what we need to do. However, in the meantime more people got active in developing audio streaming technologies for web radios and here we list efforts we think are worth having a look, all Free as in speech.

Of course you should already know [Icecast](http://icecast.org/). If you don’t, get ready because that’s our favorite streaming server.

The R.O.S.S project lists [more free radio tools](http://ross.sf.net/) and is yearly updated with good stuff.

If you feel like scripting in Python, then you must surely think you are smart! try [Liquidsoap](http://savonet.sourceforge.net/)

