---
layout: ../../layouts/Layout.astro
title: "Jaro Mail :: The Electronic Postman"
description: "Jaro Mail is a suite of console email tools to archive mails without storing them online. Made with old and reliable open source components and standards."
---

# Jaro Mail :: The Electronic Postman

![](https://dyne.org/wp-content/uploads/2012/06/jaromail-diagram.png)

Jaro Mail is an integrated suite of interoperable tools to manage **e-mail communication** in a **private and efficient** way, without relying too much on on-line services, in fact encouraging users to store their email locally.

Rather than reinventing the wheel, Jaro Mail reuses existing **free and open source** tools working since more than 10 years (and likely to exist for longer) and is mainly targeted to **Apple/OSX** and **GNU/Linux** desktop usage.

## Features

*   **Minimalistic**  interface with automatic threading
*   Targets intensive usage of **mailinglists**
*   Does **whitelisting** and integrates addressbooks
*   Can do **search and backup** by expressions
*   Automatically generates **filtering** rules
*   Import and export of **VCard** contacts
*   Computes and shows **statistics** on mail traffic
*   **Secure password storage** (native OS keyring)
*   Provides advanced maildir management tools

[![](https://www.dyne.org/wp-content/uploads/2012/06/softpedia_free_award_f.gif "Softpedia ")](http://mac.softpedia.com/progClean/Jaro-Mail-Clean-125739.html)

This software product was tested thoroughly and was found absolutely clean; therefore, it can be installed with no concern by any computer user.

*   **Stores e-mails locally** in a reliable format
*   Defers connections for **off-line operations**
*   Checks **SSL/TLS** server certificates (imap, smtp)
*   Supports **strong encryption** messaging (GnuPG)
*   Can send **anonymous emails** (Mixmaster)
*   Many languages! so exotic! such **UTF-8**!
*   Is **multi platform**: GNU/Linux/BSD, Apple/OSX
*   **Old school**, used by its author for the past 10 years

## Console email is the way! but what is this really made of?

To use Jaro Mail on your desktop client, you will require some programs. These programs are ready into the Apple/OSX package, but you will have to install them by yourself if you use GNU/Linux, preferably using your favourite package manager.

[![](https://www.dyne.org/wp-content/uploads/2012/06/jaromail-shot-300x187.png "jaromail-shot")](https://www.dyne.org/wp-content/uploads/2012/06/jaromail-shot.png)

Screenshot of a mailinglist folder open on OSX

*   [Mutt](http://www.mutt.org) is the mail user agent (terminal console)
*   [Fetchmail](http://www.fetchmail.info) for remote email retrieval (imap)
*   [MSmtp](http://msmtp.sourceforge.net) as mail transport agent (smtp)
*   [Notmuch](http://notmuchmail.org/) as search engine
*   [GnuPG](http://www.gnupg.org) for message encryption
*   [Mixmaster](http://mixmaster.sourceforge.net) to send anonymous emails
*   [Z Shell](http://www.zsh.org) the most awesome shell script interpreter

![nyan mail cat](https://www.dyne.org/wp-content/uploads/2012/06/nyanmailcat_horizbar-600.png)\

## Documentation

> “The aptly named JaroMail is a step in the right direction – precisely how I’ve used email the last 10 yrs” – Julian Oliver

It is **recommended that you read the user manual**: this is not exactly a typical consumer grade software and you won’t get far unless you know what you are doing. Even for experienced Mutt users there are things to learn in the manual, on how Jaro Mail redesigns the e-mail workflow for instance with whitelisting and remote sieve folders.\
[User Manual](http://files.dyne.org/jaromail/jaromail-manual.pdf)

*Seriously, if you are wondering what this software does and you are not satisfied by this silly homepage: the PDF manual is the place to look. It explains it all in detail, click the green button above and read the manual \*grin\**

## Download

[Download Zone](http://files.dyne.org/jaromail)

Jaro Mail **version 2** is made available in a ready to install form for **Apple/OSX** desktops.

**GNU/Linux** users can have the newest and faster **version 3** built and installed simply using **make** and **make install** console commands.

## Development

This software is developed in the spare time of one programmer who also uses it since several years. Do not expect it either to disappear nor to add big features. What one can expect is that I’m going to fix annoying bugs affecting me within a short time, since I do eat a lot of this dogfood… the code repository is on [Github.com/Dyne/JaroMail](https://github.com/dyne/JaroMail).

### Encrypted storage

![tomb logo](https://www.dyne.org/wp-content/uploads/2011/11/monmort1.png)

![nyan mail cat](https://www.dyne.org/wp-content/uploads/2012/06/nyanmailcat_horizbar-600.png)\

If you are concerned about your privacy, or in need to keep your communication confidential, then we recommend you to encrypt your emails using the [GNU Pretty Good Privacy](http://www.gnupg.org) tools and ask your peers to do the same.

To also encrypt your email archive when downloaded on local storage one can use [Tomb, the crypto undertaker](http://tomb.dyne.org) a small program to create encrypted folders promoting techniques that are well secure like key/storage separation, steganography etc.

Tomb integrates very well with Jaro Mail: one can make the `~/Mail` and `~/.gnupg` directories reside inside a tomb which will mount them in place inside the `$HOME` via its **bind-hooks**.

## Other interesting e-mail frameworks

Jaro Mail is not the only thing out there that makes you handle e-mails in a geeky and smart way, in fact there are plenty of projects like this out there and the real difficulty is to find one that is usable and most likely to endure years of development and still work with old setups.

> Why all this text based stuff?! there is a wonderful world behind every Terminal ;^) for an introduction have a look at the [Flossmanuals CLI guide](http://en.flossmanuals.net/command-line/)

Below you will find a list of frameworks that can be used as an alternative or complementary to Jaro Mail, since we all use the maildir format to store emails:

*   **mu** stands for [maildir utils](http://www.djcbsoftware.nl/code/mu/): it might be harder to install for the novice hacker and has less user-friendly documentation, but it definitely looks like a solid and fast complimentary software for our setup and it may replace Mairix in the future of Jaro Mail 2.0.
*   **cone** is a [COnsole Newsreader And Emailer](http://www.courier-mta.org/cone/) bringing some intelligent innovation into the console email world. Alternative to Mutt.

