---
layout: ../../layouts/Layout.astro
title: "Frei0r :: Free Video Effect Plugins"
description: "Frei0r is free and open source plugin collection for video effects. Applications can use its API to embed more than 100 video filters, sources and mixers."
---

# Frei0r :: Free Video Effect Plugins

 

# What Frei0r is

Frei0r is a minimalistic plugin API for video effects. The main emphasis is on simplicity for an API that will round up the most common video effects into simple **filters, sources and mixers** that can be controlled by parameters. It’s our hope that this way these simple effects can be shared between many applications, avoiding their reimplementation by different projects.

## Video effects for whom?

Frei0r is not meant as a competing standard to more ambitious efforts that try to satisfy the needs of many different applications and more complex effects. It is not meant as a generic API for all kinds of video applications, as it doesn’t provides things like an extensive parameter mechanism or event handling. Eventually the frei0r API can be wrapped by higher level APIs expanding its functionalities (for instance as GStreamer, MLT, FFmpeg and others do).

Frei0r has been developed with production video software in mind, not video players or desktop toys of sorts. For instance it can be used like GStreamer, but its different as it aims to be lighter, for instance allowing host application developers to avoid memcpy and other buffering operations. Also it doesn’t enforces dependency from GNOME and such desktop frameworks.

# Current Status

Frei0r is mostly adopted on GNU/Linux and OSX platforms, counts more than 100 plugins and is used by several video software applications: [FFMpeg](http://ffmpeg.org), [PureData](http://www.artefacte.org/pd/), [Open Movie Editor](http://openmovieeditor.sourceforge.net/), [DVEdit](http://www.freenet.org.nz/dvedit), [Gephex](http://www.gephex.org/), [LiVES](http://lives.sf.net), [FreeJ](http://freej.dyne.org), [VeeJay](http://veejayhq.net), [MLT](http://www.mltframework.org/), [KDEnLive](http://www.kdenlive.org/), [Shotcut](http://www.shotcut.org/) and [flowblade](http://code.google.com/p/flowblade/). Find our more on the [Wikipedia page about Frei0r](http://en.wikipedia.org/wiki/Frei0r), where also contributions are welcome to complete our documentation.

[Latest release announcement](https://lists.dyne.org/lurker/message/20191207.134811.c6090a85.en.html)

For a quick glance of what is this project status, you can visit the [Frei0r page on OpenHub](http://www.ohloh.net/p/frei0r) and on [Freecode](http://freecode.com/projects/frei0r). A more detailed overview on code activity is provided on [github.com/dyne/frei0r](https://github.com/dyne/frei0r)

<!--
<script type="text/javascript" src="https://www.ohloh.net/p/294225/widgets/project_basic_stats.js"></script>

<script type="text/javascript" src="https://www.ohloh.net/p/294225/widgets/project_languages.js"></script>

If you like to  peek in what's boiling in the pot,  have a look at our <a href="http://github.com/dyne/frei0r/Issues">Issue tracker</a>
-->We are happy if more people like to get involved, so let us know about your creations! Code and patches are well accepted, get in touch with us on the [frei0r mailinglist](http://mailinglists.dyne.org/cgi-bin/mailman/listinfo/frei0r).

## History

Frei0r has been around since 2006, born from yearly brainstorms held at the [Piksel](http://www.piksel.no) conference with the participation of various free and open source video software developers. However, these meetings are not held anymore at Piksel and nowadays most of the discussion between developers is held online on the [Frei0r mailinglist](http://mailinglists.dyne.org/cgi-bin/mailman/listinfo/frei0r).

# Downloads

## Source code

[Stable source releases file zone](http://files.dyne.org/frei0r)

Frei0r sourcecode is released under the terms of the **GNU General Public License** and, eventually other compatible Free Software licenses. The latest source for frei0r plugins can be attained using **git** at: [github.com/dyne/frei0r](https://github.com/dyne/frei0r)

To build frei0r you have two options: one using GNU Autotools ( ./configure && make ) and one using CMake ( cmake . && make ) which works best when using on cygwin32.

### Auxiliary libraries

Optionally, frei0r can be built linking the following libraries:

*   [Gavl](http://gmerlin.sourceforge.net/) – required for the scale0tilt and vectorscope filters
*   [OpenCV – ](http://opencvlibrary.sourceforge.net/)required for face detection filters
*   [Cairo](http://cairographics.org/) – required for some fine color blending mixers

## GNU/Linux/BSD

Frei0r is packaged for all major GNU/Linux distributions, but it may be out-of-date.

## Apple / OSX

[MacPorts](http://www.macports.org) provides ready to install packages for OSX: in case you have this packaging system installed you just need to open a terminal and give the following command:

    sudo port install frei0r-plugins

Also Brew and Fink have packages.

## Miscro$oft / Windoz

[Zeranoe](http://ffmpeg.zeranoe.com/builds/) kindly provides some solid builds of FFMpeg which also include a recent version of the Frei0r plugin collection.

# Documentation

If you are new to frei0r (but not to programming) the best thing is probably to have a look at the [frei0r header](http://frei0r.dyne.org/codedoc/html/frei0r_8h.html), which is quite simple and well documented. While the main source of documentation for the Frei0r API is the header, the sourcecode is well commented so you can study its full [doxyfied documentation](http://frei0r.dyne.org/codedoc/html)online.

# Communication

You can get in touch with our developer community, send your new effects and share your intentions with us. We have a [free mailinglist](http://mailinglists.dyne.org/cgi-bin/mailman/listinfo/frei0r) open to subscriptions. This mailinglist is new, since the old mailinglist maintainer went bonkers. However, we are currently migrating the infrastructure and the archive link will be updated soon. If you have a contribution and like using GitHub, you can also file a pull request on the [Frei0r repository by ddennedy](https://github.com/ddennedy/frei0r), still good to notice us on the mailinglist about it.

# Acknowledgments

[![](https://www.dyne.org/wp-content/uploads/2012/02/livido_pikselites03.jpg "livido_pikselites03")](https://www.dyne.org/wp-content/uploads/2012/02/livido_pikselites03.jpg) Frei0r is the result of a collective effort in coordination with several software developers meeting at [Piksel](http://www.piksel.no) between 2003 and 2005 to find a common standard for video effect plugins to be used among their applications: Andraz Tori (Cinelerra/CVS), Daniel Fischer (Pakt/GStreamet), Denis Jaromil Rojo (FreeJ/Dyne), Gabriel “Salsaman” Finch (LiVES), Kentaro Fukuchi (EffecTV), Niels Elburg (VeeJay), Øyvind Kolås (Gegl/Babl/Gimp), Tom Schouten (PDP/PureData), Georg Seidel, Martin Bayer and Phillip Promesberger (Gephex). ![](https://www.dyne.org/wp-content/uploads/2012/02/livido_pikselites01.jpg "Pikselites") We first aimed at the realisation of a comprehensive specification for dynamically loaded plugins named [LiViDO](http://livido.dyne.org/codedoc/), which then spawned two implementations: one being Frei0r, a minimalistic implementation contributed by the Gephex team and the other one being the [WEED](http://lives.cvs.sourceforge.net/lives/lives/weed-docs/) implementation by LiVES developer Salsaman, sporting more features for GUI integration and scriptability. ![](https://www.dyne.org/wp-content/uploads/2012/02/livido_pikselites02.jpg "Pikselites") Within the span of a few years, the minimalistic approach of **frei0r** has been widely adopted among more applications and became a **de-facto standard**. Maintenance and further refinements were contributed by Carlo Prelz (MøB/BEK), Richard Spindler (Open Movie Editor) and Dan Dennedy (MLT/KDEnLive), while Debian/Ubuntu packaging and build system standardization were taken care of by dyne.org developers Filippo Giunchedi and Luca Bigliardi. For a complete list of contributors, please refer to the [AUTHORS](http://files.dyne.org/frei0r/AUTHORS) file.
