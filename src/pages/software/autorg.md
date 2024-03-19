---
layout: ~/layouts/Layout.astro
title: "AutOrg :: autonomous and extensible editor for power users"
description: ""
---

# AutOrg :: autonomous and extensible editor for power users

AutOrg aims to be a **personal information organizer** that works **off-line on your computer** and supports easy **publishing**, **encryption** and **sharing** of selected parts of information. ![](https://www.dyne.org/wp-content/uploads/2012/10/autorg_logo.png "autorg_logo") All in all, AutOrg is “only” a text editor based on [Emacs](http://www.gnu.org/software/emacs/), pre-configured with [Org-mode](http://orgmode.org/) and many other extensions, then shipped ready to use for GNU/Linux and Mac/OSX users. It is regularly used by its maintainer for a variety of tasks like writing human language essays, programming code, making lecture slides, keeping passwords safe and teaching classes.

## Early but usable release

If you are already an Emacs user, you likely don’t need AutOrg. However, here you can take a quick look at the [collection of ELisp extensions](https://github.com/dyne/AutOrg/tree/master/elisp) we are integrating.

If you never heard about anything we have named so far, then this is your chance to become a bit more literate about **reliable computer tools**: grab this occasion and read on! The time you spend studying this stuff will all be saved off the frustrations from using proprietary, third-party tools or even worst on-line services which are apparently easy, but unreliable on the longer term.

If you like, you are welcome to [share your suggestions](https://dyne.org/contact) and [make a donation](/donate) to the people busy on this development.

# Features

*   Based on GNU Emacs, benefits from a large community of users worldwide
*   Integrates the productivity tool Org-mode helping to handle large amounts of text
*   Includes various extensions active by default for usability and comfortable use
*   Well readable font setting (AnonymousPro, also Inconsolata is recommende)
*   Exports text to ODT (LibreOffice) and LaTex or PDF using MacTex
*   Comes with spell checking functions for English language (more languages to come)
*   Syntax highlight for most programming and scripting languages, many color schemes
*   100% free and open source software

#

## Download

The **AutOrg binary distribution** is a universal build for Intel based Mac/OSX computers and its download is approximately 70MB big. It also includes the AnonymousPro font ready to be installed for the best visual experience while editing your text. **GNU/Linux** users can also make use of AutOrg by running the startup script in the gnu/ directory inside the source distribution on the Git repository.

[Download zone](http://files.dyne.org/autorg) [![](https://www.dyne.org/wp-content/uploads/2012/10/org-mode-manual.png "Org-Mode reference manual")](http://www.network-theory.co.uk/org/manual/)

.

.

Clone, fork and contribute on GitHub: [github.com/dyne/AutOrg](https://github.com/dyne/AutOrg)

 

## + Extensions

[![mactexlogoX5](https://www.dyne.org/wp-content/uploads/2012/10/mactexlogoX5.png)](http://tug.org/mactex/)AutOrg aims to integrate seamlessly with other software that facilitate writing and publishing, in particular with LaTex. If you are using AutOrg and you like to publish beautiful PDF files out of your work, we recommend to download and install **MacTex** which is a TexLive distribution of LaTex.

[![gpgtools](https://www.dyne.org/wp-content/uploads/2012/10/gpgtools-300x300.jpg)](https://gpgtools.org)\
To save information in a very secure way on your harddisk, never writing anything in clear, but transparently encrypting information on every save, AutOrg integrates with GnuPG both on GNU/Linux and Apple/OSX (via gpgtools). Just install GnuPG on your system and then create or open files with a **.org.asc** extension: AutOrg will automatically encrypt them on save and ask you which public key to use for that. This is a very simple way to keep your passwords safe (and organized using org-mode) inside an encrypted file that is interoperable: its all plain text that can be opened via gnupg on any platform.

[![FreeMind](https://www.dyne.org/wp-content/uploads/2012/10/wiki.png)](http://freemind.sourceforge.net/wiki/index.php/Main_Page)\
To make graphs and visualize ideas in an intuitive way is not easy. Org-mode helps a lot with that as an outliner, but showing the results to people can be fancier than that. **FreeMind** is a free and open source software available for all platforms which works off-line to visualise maps of concepts interlinked in a tree fashion. AutOrg can export directly to FreeMind, resulting in a wonderful way to present your notes to a meeting: take them into AutOrg and then render an image – without the need of any online service!

## Documentation

To learn about the enormous power of our tools, read the on-line [Org-mode manual](http://orgmode.org/org.html) and maybe buy the [Org Mode 7 Reference Book](http://www.network-theory.co.uk/org/manual/) by Network Theory Ltd.

If you like to organise a workshop on how to use AutOrg, which would be basically a user-friendly workshop for Mac/OSX, GNU/Linux and/or Android users on how to use Emacs and Org-mode in a productive way, do not hesitate and [contact us!](https://www.dyne.org/contact). It won’t be gratis, but it can be enlightening.

## Developers

Welcome to stay tuned! AutOrg is soon going to be much more than an editor. Meanwhile, you can browse its sourcecode on [Code.Dyne.org](http://code.dyne.org/autorg) – also fork it and send us patches.

[![](https://www.dyne.org/wp-content/uploads/2012/10/autorg_splash.jpg "Get it")](http://files.dyne.org/autorg)

