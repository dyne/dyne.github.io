---
layout: ../../layouts/Layout.astro
title: "WebNomad :: simple web design software"
description: "WebNomad is a set of scripts to generate websites and image galleries. Only HTML and shell script knowledge is needed for this simple web design software."
---

# WebNomad :: simple web design software

![Artichoke logo](https://www.dyne.org/wp-content/uploads/2013/09/carciofo-webnomad.jpg "Just like an artichoke: functional and pretty.")

WebNomad is a simple web design software made of shell scripts. It generates websites and image galleries fit for desktop as well mobile and tablet browsing. It can be operated on any device running **ZShell**, its themes are based on **Bootstrap** CSS, pages can be written in **Markdown** syntax interlaced into HTML, while it uses JQuery and **BlueImp** to make slideshows using all files found into a directory.

This software is console terminal based, yet fairly simple to operate. To make a website it is enough to have a bit of shell experience and to know HTML or even easier Markdown.

# Downloads

To get a stable release of WebNomad go on our file download zone:

[files.dyne.org/webnomad](https://files.dyne.org/webnomad)

# Demo

WebNomad has well established functionalities already used in production for a number of dyne.org websites, see some examples:

### [☞ Entropical.org](http://entropical.org) (art research project)

### [☞ Jaromil.dyne.org](http://jaromil.dyne.org) (portfolio)

### [☞ Silente.dyne.org](http://silente.dyne.org) (sound narrative)

### [☞ Dyne.org Reader’s Digest](https://lists.dyne.org/digest) (emails)

### [☞ Bubbleclub](https://bubbleclub.net) (fermentations)

# Usage

As of now, webnomad is operated from a Terminal. A simple interface might be built in future if [donors](/donate) request it.

[Docs in Spanish](https://lab.dyne.org/WebNomad.es)

First create a directory for your website, then place the webnomad directory inside it, i.e. the one downloaded from the source archive or git repo.

From a terminal, cd inside your new website’s directory and run:

     ./webnomad/init

the skeleton of your new webpage is created inside the directory:

     views/ -> contains the pages you want to edit
     tmpl/ -> contains templates like header, footer and navbar

Now go customise files in tmpl/ with your favorite HTML editor and then go as well in views/ to create your web pages, better start from index.html.

Please note that websites made with this tool have to statically include the webnomad distributed software in a sub-directory and all commands are called this way: **./webnomad/command**.

The most important command is to render: **./webnomad/render** will prepare all webpages in pub/ with all markdown rendered, header navbar and footer applied, ready for upload to your website with a recursive Scp or Rsync from pub/\* on any webserver.

## Live Preview

Of course is better to have a look at results before sending them live.

Running **./webnomad/preview** in background or in a separate terminal will launch the live preview. A browser (Firefox) will launch and will be refreshing automatically every time any webpage is changed in the project, so one can edit pages in **./views/\*** using any editor and by hitting save will have modifications shown side by side.

Preview renders web pages in the **./test** directory of your project, where index.html and other files will be found with paths local to the filesystem. To fire a single preview rendering without running a live preview in background, the command is “**./webnomad/render test**“.

To change the default web browser feel free to edit directly the preview script, you’ll see is very short code, as most of the code in webnomad.

## Simple web design software… how simple?

As you can read on this webpage already, we refer to simplicity mostly because webnomad is a small and light and can be used without other knowledge than HTML and Shell scripting. This is somehow common knowledge among web designers and admins. People with no experience of console terminals might still find it difficult to operate webnomad. After all, this is not a graphical software interface.

## Use Markdown

To avoid the tedious task of using HTML tags for everything, even simple formatted text, webnomad supports interlacing markdown sections within an HTML page. This is simply done opening and closing the tags **\<markdown> … \</markdown>** which can recur more than once in the same document.

This approach simplifies the use of markdown within a bootstrap styled page, where you can use the \<div> classes of bootstrap as usual, directly in HTML, but then go on filling them up with our beloved simplified markup – \*cough\* \*cough\* – markdown.

You’ll need to have installed a markdown interpreter in the path to be able to use this markup language in your pages.

## Image Slideshow

To create an image slideshow simply create a page with extension **.gal** or **.gallery** inside the **./views/** directory, for example one can call it

     views/vacation_in_Italy.gallery

To add images into it one should create a **\*-files** directory inside **./views/** better if named after the gallery page, something like:

     views/vacation_in_Italy-files/

Proceed copying your images inside the -files directory, resized to the format you want them to appear in the slideshow.

One can also use **./webnomad/convert** an optional script that helps to do batch conversions: it takes ImageMagick commands as arguments and executes them on all images found in a directory.

Now fill in the filenames of your images inside the .gallery file, one per line, relative to the ./views path. For instance our **./views/vacation\_in\_Italy.gallery** file can contain:

     vacation_in_Italy-files/Fontana_di_Trevi.jpg
     vacation_in_Italy-files/Torre_di_Pisa.jpg
     vacation_in_Italy-files/Er_cupolone.jpg
     vacation_in_Italy-files/Spiaggia_con_bagnanti.jpg
     vacation_in_Italy-files/Io_e_te_sudati.jpg

The usual **./webnomad/render** will prepare the slideshow as a webpage in **./pub** which in our case is **./pub/vacation\_in\_Italy.html**.

## Privacy for image metadata

Our software makes it very easy to defend your privacy by optionally weeding out all metadata from JPG images: we remove all EXIF and other similar headers added by cameras and post-processing applications, often adding information about the location of the picture, the time it was taken, the camera model, the software used to edit and sometimes even your username on your computer.

This features requires the [jhead](http://www.sentex.net/\~mwandel/jhead/) program to be installed and the config directive **EXIF\_CLEAN=1** to be present. Other related functionalities include auto-rotating images according to the orientation saved in the headers by the camera’s gyroscope or also adding a custom comment field to all images.

# Got suggestions?

Be welcome to stay in touch with us via IRC or Github, file a pull request or just go fork the pain away. WebNomad is open source and nomadic software, simple to modify in its source: its all shell script ;^)

[WebNomad on GitHub](https://github.com/dyne/WebNomad)

In fact its design is kept nomadic and off-the-cloud by the fact one includes the webnomad/ directory inside the project, so that if we update this code it won’t affect you until you decide to update it into your project. Our long term compatibility plans is simple: we won’t fiddle with your stuff. Enjoy!

