---
layout: ../../layouts/Layout.astro
title: "HasciiCam :: ASCII art for the masses"
description: "HasciiCam makes it possible to have live ASCII art videos on the web. It captures from a webcam and renders ASCII letters to HTML or plain text formats."
---


# HasciiCam :: ASCII art for the masses

# Introduction[![](https://dyne.org/wp-content/uploads/2011/12/jaromil-hascii-sm.png "jaromil-hascii-sm")](https://dyne.org/wp-content/uploads/2011/12/jaromil-hascii-sm.png)

HasciiCam makes it possible to have live ascii video on the web. It captures video from a tv card and renders it into ascii letters, formatting the output into an html page with a refresh tag, or in a live ascii window, or in a simple text file. It gives the possiblity to anybody that has a bttv card, a unix box and a cheap modem line to show live (h)ascii video can be viewed without any need for extra applications, plugins, java etc.

## Long live ASCII art (now even in HTML!)

*   [HTML mode screenshots](http://ascii.dyne.org/hasciicam001.html) feat. chmod & thing.net
*   [ASCII portrait](http://ascii.dyne.org/rms-hasciicam.html) of Richard M. Stallman

# Documentation

## Features

*   low bandwidth live cam “streaming”
*   command line settings
*   customizable refresh rate
*   amazing live mode
*   gives you the coolest .plan you ever had
*   draws nifty symbols on your face

## Requirements

To run this software you need to have installed a working Free GNU/Linux system, like for instance [dyne:bolic](http://dynebolic.org/).

You can compile HasciiCam from sourcecode or you can look into the list of packages for your GNU/Linux distribution if a compiled version is allready there. You also need to install [AA-lib](http://aa-project.sourceforge.net/aalib) on your system, it is an excellent library used to convert video in ascii letters.

As hardware you need to have a webcam or a videocard supported by “video 4 linux”, most of the gear you can buy around should work well.

## Internals

Hasciicam is written in plain C and is operated via command line, comes with a comfortable help ( -h option ) and a [manual page](http://ascii.dyne.org/manpage.html).

Hasciicam grabs video using Video4Linux2 api: grabs YUV420 and uses the luminance component to obtain a grayscale frame, then renders each frame into (h)ascii using the AA-lib engine, armoring it in an html with a refresh tag.

HasciiCam is written in C and should be portable to various operating systems besides GNU/Linux, still you are strongly advised (is good for your karma) to use it on free GNU systems – and smoke a spliff sometimes.

[![](https://dyne.org/wp-content/uploads/2011/12/hasciicam-LIVE2.png "hasciicam-LIVE2")](https://dyne.org/wp-content/uploads/2011/12/hasciicam-LIVE2.png)

# Download

HasciiCam’s source code stable releases are made available on our FTP at [ftp.dyne.org/hasciicam](http://ftp.dyne.org/hasciicam)

Many GNU/Linux distributions have packaged hasciicam ready to install.

If you use Debian or Ubuntu, try just **apt-get install hasciicam**

## Development

Hasciicam is an early [RASTASOFT](http://rastasoft.org/) creation, *JAH BLESS*

The (new) code repository is on [github.com/jaromil/hasciicam](https://github.com/jaromil/hasciicam).

## Credits

Hasciicam.c has been originally written by Jaromil

Jan Hubicka is the creator of AA-Lib,the library used to render video in ASCII

Diego “Rapid” Torres contributed security patches

Matteo “Blended” Scassa contributed support of webcams

Dan Stowell contributed V4L2 support

A vast number of people and organisations have used hasciicam in various installations, scenography, concerts and even televised videos. The [Project Polascii](http://polascii.szdiy.org/) ported hasciicam to work even for polaroid photo cameras :^)

Thanks go to:

*   Gerd Knorr – for video4linux
*   Thomas Pfau – for the ftp library
*   Josto “Mathop” Chinelli – help on css with style
*   August Black – io buzz hacking
*   Boffh – usb cams hacking
*   Martin guy – karma to avoid buffer overflows
*   Erich “rat” Berger – for the text dump
*   Pbm & Megabug – watching ascii horizons
*   Alessandro Preite Martinez – Irix/SGI ports
