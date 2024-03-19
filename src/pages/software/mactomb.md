---
layout: ../../layouts/Layout.astro
title: "MacTomb :: File Encryption on Mac OS X"
description: ""
---

# MacTomb :: File Encryption on Mac OS X

## A kind of Tomb porting on Mac OS X

MacTomb is a free and open source system for file encryption on Mac OS X, facilitating the backup of secret files through encrypted storage containers.

MacTomb shares most concepts with [Tomb](https://www.dyne.org/software/tomb/), that is, it can be considered its little brother.

MacTomb generates encrypted storage containers; it’s like a locked folder that can be safely transported and hidden in a filesystem.

For now, it supports only passphrase (symmetric) encryption, but efforts are being made to support both asymmetric encryption and DER certificates.

**MacTomb works only on Mac OS X systems**, and has been tested starting from Mac OS X 10.9.5.

If you are already familiar, [download the zip](https://github.com/davinerd/MacTomb/archive/master.zip) and jump to the [README](https://github.com/davinerd/MacTomb/blob/master/README.md).

## How does our file encryption on Mac OS X works

MacTomb is a simple shell script, you can just download the source\
distribution and copy it in your path, it needs only few binaries that are installed by default on every Mac OS X system (though some checks are however in place).

It leverages **hdiutil**, so everything is build around it, that means, we can only use its features. By default, mactombs are created using **AES256** and an **HFS+** file system, but you can change these parameters by customizing the script.

## What is missing from Tomb

This list are in fact really big, due to various reasons, mostly of the time due to the limit of hdiutil. What you **can’t do with MacTomb** that are features on Tomb, are:

*   creating an external key file to lock the tomb with: there is no such feature in hdiutil
*   close / slam / open a tomb: you can do by clicking the ‘Eject’ icon (Mac OS X way)
*   searching inside the tombs: you can use Finder (Mac OS X way), while Spotlight is disable by default on creation
*   creating the QR code as a paper backup measure: there is no such feature in hdiutil
*   steganography: there is no such feature in hdiutil; it could be implemented with 3rd party software, but there are no plans for this
*   password generation: Mac users can use KeyChain or other software
*   hooks: there is a kind of feature; see below

## What are the new features

What are the cool stuff then? First of all, Mac OS X lacks an encrypted DMG management software. MacTomb wants to be that: a software aided managing your mactombs. It’s not only a hdiutil wrapper though: it’s killer feature is to exploit Mac OS X’s **[Automator App](https://support.apple.com/en-is/HT2488)**.

How? By creating an Automator App that automatically mounts your mactomb, starting an application of your choice. You can think about this feature similar to Tomb’s hooks.

The design is quite different though. As Tomb uses a file inside the tomb that is executed on open and close, MacTomb uses an Automator App that calls a bash script (living somewhere on you HD, so outside the mactomb) that will do something. In this way, to configure your ‘hooks’, you have edit only the bash script, and the next time you click on the Automator App, it’ll be executed.

## Practical Examples

MacTomb allows you to do three main things: create the mactomb, create the bash script and create the Automator App:

|                                                                                |
| ------------------------------------------------------------------------------ |
|     # Creates a 100MB mactomb size bash mactomb.sh create -f ~/mactomb -s 100m |

\# Creates a 100MB mactomb size bash mactomb.sh create -f \~/mactomb -s 100m

|                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------------- |
|     # Creates a 100MB mactomb size and then copies file(s) inside bash mactomb.sh create -f ~/mactomb -s 100m -p ~/secret_files/ |

\# Creates a 100MB mactomb size and then copies file(s) inside bash mactomb.sh create -f \~/mactomb -s 100m -p \~/secret\_files/

|                                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     # Creates the bash file 'hook.sh' that will call Firefox with the profile  #'secretprofile' after 'mactomb.dmg' mouting (to be done through the script and not Finder) bash mactomb.sh app -f ~/mactomb.dmg -a  '/Applications/Firefox.app/Contents/MacOS/firefox-bin -p secretprofile' -b ~/hook.sh |

\# Creates the bash file 'hook.sh' that will call Firefox with the profile #'secretprofile' after 'mactomb.dmg' mouting (to be done through the script and not Finder) bash mactomb.sh app -f \~/mactomb.dmg -a '/Applications/Firefox.app/Contents/MacOS/firefox-bin -p secretprofile' -b \~/hook.sh

|                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------- |
|      # Creates the Automator App called 'mynewapp' that will call 'hook.sh' on opening bash mactomb.sh forge -b ~/hook.sh -o ~/mynewapp |

\# Creates the Automator App called 'mynewapp' that will call 'hook.sh' on opening bash mactomb.sh forge -b \~/hook.sh -o \~/mynewapp

The amazing thing is the **forge** command: it allows you to automate all the previous 3 steps in one command line:

|                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- |
|     bash mactomb.sh forge -f ~/mactomb -s 100m -a "/Applications/Firefox.app/Contents/MacOS/firefox-bin -p secretprofile" -b ~/hook.sh -o ~/mynewapp |

bash mactomb.sh forge -f \~/mactomb -s 100m -a "/Applications/Firefox.app/Contents/MacOS/firefox-bin -p secretprofile" -b \~/hook.sh -o \~/mynewapp

For more information, read the [README](https://github.com/davinerd/MacTomb/blob/master/README.md) and [this blog post](https://lostinict.wordpress.com/2015/09/27/mactomb-enhance-your-privacy-on-mac-os-x/).

## Source package

[Downloads](https://github.com/davinerd/MacTomb)

For licensing information see the [GNU General Public License](http://www.gnu.org/copyleft/gpl.html)

## Support

Donations are very welcome, see [our donation page](/donate).

To get in touch with developers join our chat on [irc.dyne.org](https://irc.dyne.org) (SSL over port 9999) on channel #dyne.

## Installation

**MacTomb works only on Mac OS X systems from 10.9.5 and above**.

**MacTomb is a single script** and can be installed manually anywhere your path.

Be in charge of your system and **may the source be with you**!

## Usage tips…

MacTomb can be adapted for ad-hoc use. While its three-way design needs absolute paths, you can move each object (mactomb, hook script and Automator App) around in your hard disk, in different hard disks, on the cloud, and wherever your want as long as there are absolute paths in there.

### Private data in daily use

Using the example in the practical example section, we can easily create an encrypted Firefox/Thunderbird/insert\_your\_preferred\_application\_with\_profile in the mactomb. After you issued the forge command, mount manually the mactomb, create the profile *secretprofile* inside, then close it. When you click on *mynewapp*, it will automatically calls the bash script, that will mounts the mactomb and run Firefix with your profile. Cool isn’t?

